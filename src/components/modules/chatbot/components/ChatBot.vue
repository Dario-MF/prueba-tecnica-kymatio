<template>
    <div class="chatbot chatbot--closed">
        <!-- add buttons -->
        <div class="chatbot__header">
            <img src="/assets/bot.png" alt="">
            <p>
                <strong>ChatBot Support</strong>
                <br> 
                <span>Online</span>
            </p>  
        </div>
        <div class="chatbot__message-window">
            <ul class="chatbot__messages">
                <template
                    v-for="msg in messages"
                    :key="msg.id"
                    
                >
                    <!--  bot msg -->
                    <li v-if="msg.type === 'bot'" class="bot-msg animation">
                        <span v-if="msg.isLoading" class='loader'><span class='loader__dot'></span><span class='loader__dot'></span><span class='loader__dot'></span></span>
                        <template v-else>
                            <div class="bot__profile-picture">
                                <img class="icon-avatar" src="/assets/bot.png" alt="">
                            </div>
                            <span  class="chatbot__arrow chatbot__arrow--left"></span>
                            <p class='chatbot__message'>
                                {{msg.text}}
                            </p>
                            <div v-if="msg.questions" class="chatbot__question__container">
                              <button
                                v-for="question in questionsData"
                                :key="question.id"
                                @click="onSelectQuestion(question.id)"
                                class="chatbot__question__title"
                              >
                                {{question.title}}
                              </button>
                            </div>
                            <div v-if="msg.answers" class="chatbot__question__container">
                              <button
                                v-for="answer in questionSelected[0].answers"
                                :key="answer.value"
                                @click="onSelectAnswer(answer.value)"
                                class="chatbot__question__title"
                              >
                                {{answer.title}}
                              </button>
                            </div>
                        </template>       
                    </li>
                    <!-- user-msg-->
                    <li v-else-if="msg.type === 'user'" class='user-msg animation'>
                        <p class='chatbot__message'>
                            {{msg.text}}
                        </p>
                        <span class='chatbot__arrow chatbot__arrow--right'></span>
                    </li>
                </template>
            </ul>
        </div>
        <div class="chatbot__entry chatbot--closed">
            <input 
                v-model="userMsg"
                type="text" 
                class="chatbot__input" 
                placeholder="Mandar mensaje..." 
            />
            <img 
                class="chatbot__icon-submit" 
                src="/assets/send.png" 
                alt="send"
                @click="onSendMsg"
            >
        </div>
    </div>
    <div class="chatbot__button">
        <button class="chatbot__open-button">
            icon open
        </button>
        <button class="chatbot__close-button">
            icon close
        </button>
  </div>
</template>

<script>
import {computed, ref} from 'vue'
import { v4 as uuidv4 } from 'uuid'
import {useStore} from 'vuex'

export default {
    
    setup() {
        const store = useStore() 
        const initialMessage = 'Hola 🖐. Soy tu asistente virtual. En que puedo ayudarte?.'
        const errorMessage = 'Lo siento 😅. Mis capacidades como bot son limitadas, puedes escoger una de las siguientes preguntas:'
        const historyMessages= ref([])
        const userMsg = ref('')
        const questionsData = ref([])
        const questionSelected = ref([])

        
        const loadData = async() => {
          await store.dispatch('chatbot/takeDataChatbot')
          const questions = store.getters['chatbot/getDataChatbot']
          questionsData.value = questions.map(q => {
              q.id = uuidv4()
              return q
          })
        }
        loadData()

        const loading = async() => {
            await setTimeout(() =>{
                historyMessages.value.forEach((e, idx) => {
                    if(e.isLoading) {
                        historyMessages.value[idx].isLoading = false
                    }
                })
            }, 500)
        }

        const botResponse = (status = 'initial', response) => {
            let text;
            let answers = false
            let questions = false

            switch (status) {
                case 'initial':
                    text = initialMessage
                    break;
                case 'question':
                    text = `${questionSelected.value[0].title}\n Seleccione la respuesta que le satisface:`
                    answers = true
                    break;
                case 'response':
                    text = `${response[0].title}\n Espero haberte sido util!`
                    break;
                case 'noSuccessMessages':
                    text = 'Espero haberte sido util!'
                    break;
                case 'error':
                    text = errorMessage
                    questions = true
                    break;
                default:
                    break;
            }
            historyMessages.value.push({
                type:'bot',
                id: uuidv4(),
                text,
                answers,
                questions,
                isLoading: true
            })
            loading()
            return historyMessages.value
        }

        const onSendMsg = () => {
            const id = uuidv4()
            const type = 'user'
            const text = userMsg.value
            historyMessages.value.push({id, type, text})
            userMsg.value = ''
            botResponse('error')
        }

        const onSelectQuestion = (idQuestion) => {
          questionSelected.value = questionsData.value.filter(q => q.id === idQuestion)
          botResponse('question')
        }

        const onSelectAnswer = (idAnswer) => {
          if(!questionSelected.value[0].successMessages){
            botResponse('noSuccessMessages')
            return;
          }
          const response = questionSelected.value[0].successMessages.filter(m => m.value === idAnswer)
          botResponse('response', response)
        }
        
        return {
            questionSelected,
            questionsData,
            userMsg,
            onSendMsg,
            onSelectQuestion,
            onSelectAnswer,
            messages: computed(() => botResponse()),
        }
    }
}
</script>

<style lang="scss" scoped>
  
.chatbot {
  z-index: $z-fixed;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -6px 99px -17px rgba(0, 0, 0, 0.68);

  @include mq(l) {
    max-width: 420px;
    height: 500px;
    right: 60px;
    top: 0;
  }
}

.chatbot__header {
  color: $color-text-ligth;
  display: flex;
  align-items: center;
  background-color: $color-accent;
  height: 54px;
  padding: 0 20px;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
  img {
      height: 80%;
      margin-right: 1rem;
  }
}


.chatbot__message-window {
  height: calc(100% - 134px);
  padding: (20px * 2) 20px 20px;
  background-color: white;
  overflow-x: none;
  overflow-y: auto;
  
  @include mq(l) {
    height: 380px;
  }
  
  &::-webkit-scrollbar { 
    display: none; 
  }
}

.chatbot__messages {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  width: auto;

  li {
    margin-bottom: 20px;

    &.bot-msg {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: flex-start;
      & .chatbot__question__container {
        width: 100%;
        flex-shrink: 0;
        margin-top: .5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        & .chatbot__question__title {
          @include btn;
          border: 2px solid $color-third;
          margin-bottom: .5rem;
          width: 80%;
          text-align: initial;
          &:hover {
            box-shadow: none;
            margin-bottom: .5rem;
            border-color: $color-fourth;
          }
        }
      }
    }

    &.user-msg {
      text-align: right;
      display: inline-flex;
      align-self: flex-end;
    }

    .bot__profile-picture{
      
      .icon-avatar {
        height: 40px;
        padding-top: 6px;
      }
    }
  }
}

.chatbot__message {
  display: block;
  padding: 12px 20px;
  word-break: break-word;
  margin: 0;
  border-radius: 6px;
  letter-spacing: -0.01em;
  line-height: 1.45;
  overflow: hidden;
  width: 80%;
  .bot-msg & {
    background-color: $color-third;
    
  }

  .user-msg & {
    background-color: $color-success;
    margin-left: 20px * 1.5;
  }
  
  a {
    color: rgb(0, 92, 128);
    word-break: break-all;
    display: inline-block;
  }
  
  p:first-child {
    margin-top: 0;
  }
  
  p:last-child {
    margin-bottom: 0;
  }
}

.animation{
  &:last-child {
    animation: fadein .25s;
    animation-timing-function: all 200ms cubic-bezier(0.550, 0.055, 0.675, 0.190);
  }
}

.chatbot__arrow {
  width: 0;
  height: 0;
  margin-top: 18px;
}

.chatbot__arrow--right {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid $color-third;
}

.chatbot__arrow--left {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid $color-third;
}

.chatbot__entry {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 80px;
  padding: 10px 20px;
  border-top: 1px solid $color-text-ligth-medium;
  background-color: $color-first;
}

.chatbot__input {
  height: 100%;
  width: 80%;
  border: 0;
  padding-left: 1rem; 
  margin-right: 1rem; 
  &:focus {
    outline: none;
  }
}

.chatbot__icon-submit {
  height: 35px;
  width: 35px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
      transform: scale(1.3);
  }
}

.loader {
  margin-bottom: -2px;
  text-align: center;
  opacity: .3;
}

.loader__dot {
  display: inline-block;
  vertical-align: middle;
  width: 6px;
  height: 6px;
  margin: 0 1px;
  background: black;
  border-radius: 50px;
  animation: loader 0.45s infinite alternate;
  &:nth-of-type(2) {
    animation-delay: .15s;
  }
  &:nth-of-type(3) {
    animation-delay: .35s;
  }
}

@keyframes loader {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-5px);
  }
}

@keyframes fadein {
  from { 
    opacity: 0;
    margin-top: 10px;
    margin-bottom: 0;
  }
  to   { 
    opacity: 1;
    margin-top: 0;
    margin-bottom: 10px;
  }
}

</style>