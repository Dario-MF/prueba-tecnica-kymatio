

export const getCurrentState = (state) => {
    return state.status
}
export const getUserName = (state) => {
    return `${state.user?.first_name} ${state.user?.last_name}`
}