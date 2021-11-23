

export const saveDataChatbot = (state, data) => {
    
    state.questions = [...data[0].questions]
}