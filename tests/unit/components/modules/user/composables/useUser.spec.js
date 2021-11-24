import useUser from '@/components/modules/user/composables/useUser'

const mockStore = {
    dispatch: jest.fn(),
    commit: jest.fn(),
    getters: {
        'auth/getUserName': 'Test',
        'auth/getUserLastName': 'LastTest',
        'auth/getUserNameComplete': 'Test LastTest',
        'auth/getEvolution': [
            {
                date: "2021-03-07T09:41:10.911Z",
                value: 27349
            }
        ],
        'auth/getTimeLine': [
            {
                type: "cybersecurity",
                id: "a40fec47-ea3c-45da-9ab8-007726b83bf5",
                startDate: "2022-04-03T21:38:06.551Z",
                title: "Cybersecurity 02"
            }
        ],
        'auth/getNotifications': [
            {
                type: "password-renewal",
                date: "2022-01-19T00:07:53.318Z",
                text: "Beatae ea quaerat quod sit laudantium.",
                read: false
            }
        ],
        'auth/getAlerts': [
            {
                type: "danger",
                text: "Doloremque reiciendis voluptatum dicta tempora saepe voluptate."
            }
        ]
    }
}

jest.mock('vuex', () => ({
    useStore: () => mockStore
}))

describe('composable useUser tests', () => {

    beforeEach(() => jest.clearAllMocks())

    test('userInitials call getter and retun Initials', async() => {
        const { userInitials } = useUser()
        expect(userInitials.value).toBe('TL')       
    })

    test('timeline call getter and return data img and date', async() => {
        const { timeline } = useUser()
        
        expect(timeline.value[0].date).toBe("3 M04, 2022")
        expect(timeline.value[0].icon).toBe("/assets/cyber-security.png")
    })

    test('notifications call getter and return data img, date, and color', async() => {
        const { notifications } = useUser()
        
        expect(notifications.value[0].parseDate).toBe("19 M01, 2022")
        expect(notifications.value[0].icon).toBe("/assets/alert.png")
        expect(notifications.value[0].colorType).toBe("#effcb6")
    })
    test('alerts call getter and return data img, date, and color', async() => {
        const { alerts } = useUser()
        
        expect(alerts.value[0].colorType).toBe('#dc3545')
    })
    test('evolution call getter and return value', async() => {
        const { evolution } = useUser()
        
        expect(evolution.value).toEqual(mockStore.getters['auth/getEvolution'])
    })
    test('UserNameComplete call getter and return value', async() => {
        const { UserNameComplete } = useUser()
        
        expect(UserNameComplete.value).toEqual(mockStore.getters['auth/getUserNameComplete'])
    })
    test('userColor return color valid', async() => {
        const { userColor } = useUser()
        
        expect(userColor()).toContain('#')
        expect(userColor().length).toBe(7)
    })
})
