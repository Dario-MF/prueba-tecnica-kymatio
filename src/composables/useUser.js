import { useStore } from 'vuex'
import { computed } from 'vue'

const useUser = () => {
    const store = useStore()
    return {
        UserName: computed(() => store.getters['auth/getUserName']),
        Evolution: computed(() => store.getters['auth/getEvolution']),
        Alerts: computed(() => store.getters['auth/getAlerts']),
        Notifications: computed(() => store.getters['auth/getNotifications']),
        TimeLine: computed(() => store.getters['auth/getTimeLine']),
    }
}

export default useAuth