import mockApi from '@/API/mockApi'


export const signInUser = async ({ commit }, user) => {
    // Fake login
    /* const { email, password } = user; */
    const idToken = 'fakeToken-Authenticated'
    try {
        const { data } = await mockApi.get('/profile')
        commit('loginUser', {
            user: data[0],
            idToken
        })
        return { ok: true, message: 'Usuario logueado' }
    } catch (error) {
        return { ok: false, message: error.response.data.error.message }
    }
}

export const createUser = async ({ commit }, user) => {
    // Fake creation user
    /* const { email, password, name, surname } = user; */
    const idToken = 'fakeToken-Authenticated'
    try {
        const { data } = await mockApi.get('/profile')
        commit('loginUser', {
            user: data[0],
            idToken
        })
        return { ok: true, message: 'Usuario registrado' }
    } catch (error) {
        return { ok: false, message: error.response.data.error.message }
    }
}

export const checkAuthentication = async ({ commit }) => {
    // Fake checked with fake token.
    const idToken = localStorage.getItem('idToken')
    
    if (!idToken) {
        commit('logout')
        return { ok: false, message: 'No hay token valido' }
    }
    try {
        const { data } = await mockApi.get('/profile')
        commit('loginUser', {
            user: data[0],
            idToken
        })
        return { ok: true, message: 'Usuario checked' }
    } catch (error) {
        commit('logout')
        return { ok: false, message: error.response.data.error.message }
    }
}