import { useStore } from 'vuex'
import { computed } from 'vue'

const useAuth = () => {
    const store = useStore()

    const createUser = async (user) => {
        const response = await store.dispatch('auth/createUser', user)
        return response
    }
    const loginUser = async (user) => {
        const response = await store.dispatch('auth/signInUser', user)
         return response
    }
    const checkStatus = async () => {
        const response = await store.dispatch('auth/checkAuthentication')
         return response
    }

    const logout = () => {
        store.commit('auth/logout')
    }

    return {
        createUser,
        loginUser,
        checkStatus,
        logout,

        authStatus: computed(() => store.getters['auth/getCurrentState']),
    }
}

export default useAuth