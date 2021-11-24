import createVuexStore from '../../../../mocks/store-mock'



describe('Vuex testing chatbot store', () => {

    test('Initial state', () => {
        const store = createVuexStore({}, {
            questions: null
        })
        const { questions } = store.state.chatbot
        expect(questions).toBe(null)
    })

    /* MUTATIONS */
    test('mutations: saveDataChatbot', () => {
        const store = createVuexStore( {}, {
            questions: null
        })
        const payload = [
            {
                questions:[
                    {
                        title: "Quibusdam exercitationem qui culpa ducimus modi iusto.",
                        answers: [{title: "sed error enim",value: 1},]
                    }
                ]
            }
        ]

        store.commit('chatbot/saveDataChatbot', payload)
        const { questions } = store.state.chatbot

        expect(questions).toEqual(payload[0].questions)
    })
    /* GETTERS */
    test('getters: getDataChatbot', () => {
        const questions = [
            {
                title: "Quibusdam exercitationem qui culpa ducimus modi iusto.",
                answers: [{ title: "sed error enim", value: 1 },]
            }
        ]
        const store = createVuexStore({}, {
            questions
        })

        const questionsStore = store.getters['chatbot/getDataChatbot']
        expect(questionsStore).toEqual(questions)
    })
    /* ACTIONS */
    test('actions: takeDataChatbot', async () => {
        const store = createVuexStore({}, {
            questions: null
        })

        const { ok, message } = await store.dispatch('chatbot/takeDataChatbot')

        const { questions } = store.state.chatbot

        expect(ok).toBeTruthy()
        expect(message).toBe('Data loaded')
        expect(questions.length).toBe(4)
    })
})
