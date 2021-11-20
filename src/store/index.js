import { createStore } from 'vuex'
import chatbot from '@/components/modules/chatbot/store/chatbot'
import auth from '@/components/modules/auth/store/auth'

const store = createStore({
  modules: {
    chatbot,
    auth,
  }
})


export default store