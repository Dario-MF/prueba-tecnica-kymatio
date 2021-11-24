import mockApi from '@/API/mockApi'



export const takeDataChatbot = async ({ commit }) => {  
    try {
        const { data } = await mockApi.get('/chat')
        commit('saveDataChatbot', data)
        return { ok: true, message: 'Data loaded' }
    } catch (error) {
        return { ok: false, message: error.response.data.error.message }
    }
}