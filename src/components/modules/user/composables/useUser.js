import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const useUser = () => {
    const store = useStore()
    const timelineData = ref( store.getters['auth/getTimeLine'])
    const notificationsData = ref(store.getters['auth/getNotifications'])
    const alertsData = ref(store.getters['auth/getAlerts'])

    const initials = () => {
        const name = store.getters['auth/getUserName']
        const lastName = store.getters['auth/getUserLastName']
        return `${name?.charAt(0).toUpperCase()}${lastName?.charAt(0).toUpperCase()}`
    }

    const userColor = () => {
        const hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];
        let newColor = "#";
        for (let i = 0; i < 6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hexValues[x];
            newColor += y;
        }
        return newColor;
    }

    const timelineParse = () => {
        const timelineSort = timelineData.value.sort((a, b) => {
            return new Date(b.startDate) - new Date(a.startDate);
        });
        return timelineSort.map(entry => {
            const day = new Date(entry.startDate).getDate();
            const month = new Date(entry.startDate).toLocaleString("default", {
                month: "long",
            });
            const year = new Date(entry.startDate).toLocaleString("default", {
                year: "numeric"
            });
            entry.date = `${day} ${month[0].toUpperCase()}${month.substring(1)}, ${year}`
            entry.icon = (entry.type === 'cybersecurity') ? '/assets/cyber-security.png' : '/assets/phising.png'
            return entry
        })
    }

    const notificationsParse = () => {
        const notificationSort = notificationsData.value.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        return notificationSort.map(entry => {
            // Based in colors bootstrap.
            switch (entry.type) {
                case 'password-renewal':
                    entry.colorType = '#effcb6'
                    entry.icon = '/assets/alert.png'
                    break
                case 'email-breach':
                    entry.colorType = '#f5bcc2'
                    entry.icon = '/assets/warning.png'
                    break
                case 'new-coworker"':
                    entry.colorType = '#91d9e4'
                    entry.icon = '/assets/info.png'
                    break
                default:
                    entry.colorType = '#91d9e4'
                    entry.icon = '/assets/info.png'
            }

            const day = new Date(entry.date).getDate();
            const month = new Date(entry.date).toLocaleString("default", {
                month: "short",
            });
            const year = new Date(entry.date).toLocaleString("default", {
                year: "numeric"
            });
            entry.parseDate = `${day} ${month[0].toUpperCase()}${month.substring(1)}, ${year}`

            return entry
        })
    }

    const parseAlerts = () => {
        return alertsData.value.map(entry => {
            switch (entry.type) {
                case 'danger':
                    entry.colorType = '#dc3545'
                    break;
                case 'warning':
                    entry.colorType = '#ffc107'
                    break;
                case 'info':
                    entry.colorType = '#17a2b8'
                    break;
                default:
                    entry.colorType = '#17a2b8'
                    break;
            }
            entry.id = uuidv4()
            return entry
        })
    }

    return {
        userColor,
        userInitials: computed(() => initials()),
        UserNameComplete: computed(() => store.getters['auth/getUserNameComplete']),
        evolution: computed(() => store.getters['auth/getEvolution']),
        alerts: computed(() => parseAlerts()),
        notifications: computed(() => notificationsParse()),
        timeline: computed(() => timelineParse()),
    }
}

export default useUser