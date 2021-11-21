

export const getCurrentState = (state) => {
    return state.status
}
export const getUserName = (state) => {
    return `${state.user?.first_name} ${state.user?.last_name}`
}
export const getEvolution = (state) => {
    return state.user.evolution
}
export const getAlerts = (state) => {
    return state.user.alerts
}
export const getNotifications = (state) => {
    return state.user.notifications
}
export const getTimeLine = (state) => {
    return state.user.timeline
}