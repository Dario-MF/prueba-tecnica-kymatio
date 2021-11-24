import { computed, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "vuex";




const useChatbot = () => {
    const store = useStore()
    const questionsData = ref([])
    const initialMessage = "Hola 🖐. Soy tu asistente virtual. ¿En que puedo ayudarte?"
    const errorMessage = "Lo siento 😅. Mis capacidades como bot son limitadas, puedes escoger una de las siguientes preguntas:"
    const historyMessages = ref([])
    const userMsg = ref("")
    const questionSelected = ref([])

    const loadData = async () => {
        await store.dispatch("chatbot/takeDataChatbot");
        const questions = store.getters["chatbot/getDataChatbot"];
        questionsData.value = questions.map((q) => {
            q.id = uuidv4();
            return q;
        });
    };
    loadData()

    const loading = async () => {
        await setTimeout(() => {
            historyMessages.value.forEach((e, idx) => {
                if (e.isLoading) {
                    historyMessages.value[idx].isLoading = false;
                }
            });
        }, 2000);
    };

    const botResponse = (status = 'initial', response) => {
        let text;
        let answers = false;
        let questions = false;

        switch (status) {
            case "initial":
                text = initialMessage;
                break;
            case "question":
                text = `${questionSelected.value[0].title}\n Seleccione la respuesta que le satisface:`;
                answers = true;
                break;
            case "response":
                text = `${response[0].title}.\n ¡Espero haberte sido útil!`;
                break;
            case "noSuccessMessages":
                text = "¡Espero haberte sido útil!";
                break;
            case "error":
                text = errorMessage;
                questions = true;
                break;
            default:
                break;
        }
        historyMessages.value.push({
            type: "bot",
            id: uuidv4(),
            text,
            answers,
            questions,
            isLoading: true,
        });
        loading();
        return historyMessages.value;
    };

    const onSendMsg = () => {
        const id = uuidv4();
        const type = "user";
        const text = userMsg.value;
        historyMessages.value.push({ id, type, text });
        userMsg.value = "";
        botResponse("error");
    };

    const onSelectQuestion = (idQuestion) => {
        questionSelected.value = questionsData.value.filter(
            (q) => q.id === idQuestion
        );
        botResponse("question");
    };

    const onSelectAnswer = (idAnswer) => {
        if (!questionSelected.value[0].successMessages) {
            botResponse("noSuccessMessages");
            return;
        }
        const response = questionSelected.value[0].successMessages.filter(
            (m) => m.value === idAnswer
        );
        botResponse("response", response);
    };

    return {
        questionsData,
        questionSelected,
        onSelectQuestion,
        onSelectAnswer,

        userMsg,
        onSendMsg,
        messages: computed(() => botResponse()),
    };


}




export default useChatbot