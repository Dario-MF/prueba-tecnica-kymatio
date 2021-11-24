import { createStore } from 'vuex'
import { chatbotState } from './mock-chatbotState'
import auth from '@/components/modules/auth/store/auth'
import chatbot from '@/components/modules/chatbot/store/chatbot'



const createVuexStore = (authInitState, chatbotInitState = chatbotState) => {
    return createStore({
        modules: {
            auth: {
                ...auth,
                state: { ...authInitState }
            },
            chatbot: {
                ...chatbot,
                state: { ...chatbotInitState }
            }
        }
    })
}

export default createVuexStore