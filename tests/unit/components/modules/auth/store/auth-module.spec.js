import createVuexStore from '../../../../mocks/store-mock'


describe('Vuex testing auth store', () => {

    test('Initial state', () => {
        const store = createVuexStore({
            status: 'authenticating',
            user: null,
            idToken: null,
        })
        const { status, user, idToken } = store.state.auth
        expect(status).toBe('authenticating')
        expect(user).toBe(null)
        expect(idToken).toBe(null)
    })
    /* MUTATIONS */
    test('mutations: loginUser', () => {
        const store = createVuexStore({
            status: 'authenticating',
            user: null,
            idToken: null,
            refreshToken: null
        })
        const payload = {
            user: {
                first_name: "Salvatore",
                last_name: "Koelpin",
            },
            idToken: 'ABC-123',
        }

        store.commit('auth/loginUser', payload)
        const { status, user, idToken } = store.state.auth

        expect(status).toBe('authenticated')
        expect(user).toEqual({ first_name: "Salvatore", last_name: "Koelpin"})
        expect(idToken).toBe('ABC-123')
    })
    test('mutations: logout', () => {
        localStorage.setItem('idToken', 'ABC-123')

        const store = createVuexStore({
            status: 'authenticated',
            user: {
                first_name: "Salvatore",
                last_name: "Koelpin",
            },
            idToken: 'ABC-123'
        })

        store.commit('auth/logout')
        const { status, user, idToken } = store.state.auth
       
        expect(status).toBe('not-authenticated')
        expect(user).toBe(null)
        expect(idToken).toBe(null)
        expect(localStorage.getItem('idToken')).toBe(null)
    })
    /* GETTERS */
    test('getters: all getters', () => {

        const evolution = [{date: "2021-03-07T09:41:10.911Z"}]
        const alerts = [{ type: "danger"}]
        const notifications = [{type: "password-renewal"}]
        const timeline = [{ type: "cybersecurity" }]
        
        const store = createVuexStore({
            status: 'authenticated',
            user: {
                first_name: "Salvatore",
                last_name: "Koelpin",
                evolution,
                alerts,
                notifications,
                timeline
            },
            idToken: 'ABC-123'
        })
        const status = store.getters['auth/getCurrentState']
        const userName = store.getters['auth/getUserName']
        const evolutionData = store.getters['auth/getEvolution']
        const alertsData = store.getters['auth/getAlerts']
        const notificationsData = store.getters['auth/getNotifications']
        const timelineData = store.getters['auth/getTimeLine']

        expect(status).toBe('authenticated')
        expect(userName).toBe('Salvatore')
        expect(evolutionData).toEqual(evolution)
        expect(alertsData).toEqual(alerts)
        expect(notificationsData).toEqual(notifications)
        expect(timelineData).toEqual(timeline)
    })
    /* ACTIONS */
    test('actions: createUser - user created', async() => {
        const store = createVuexStore({
            status: 'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })

        const newUser = {
            name: "Test",
            surname: "test",
            email: "test@test.com",
            password: "123456",
            confirmPassword: "123456",
            conditions: true,
        }
        
        const {ok, message} = await store.dispatch('auth/createUser', newUser)
       
        const { status, user, idToken } = store.state.auth
       
        expect(ok).toBeTruthy()
        expect(message).toBe('Usuario registrado')
        expect(status).toBe('authenticated')
        // Al ser un fake register solo extrae los datos de la api facilitada.
        // No graba nada en la api.
        expect(user.first_name).toBe('Salvatore')
        expect(idToken).toBeTruthy()
    })
    test('actions: checkAuthentication - valid', async() => {
        const store = createVuexStore({
            status: 'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })
        const userLogin = {
            email: "test@test.com",
            password: "123456",
        }
        // SignIn for create token
        await store.dispatch('auth/signInUser', userLogin)
        const { idToken } = store.state.auth
        // Logout user and delete tokens
        store.commit('auth/logout')
        // Save token in storage.
        localStorage.setItem('idToken', idToken)
        // Check authentication.
        const {ok, message} = await store.dispatch('auth/checkAuthentication')

        const { status, user, idToken: token } = store.state.auth
       
        expect(ok).toBeTruthy()
        expect(message).toBe('Usuario checked')
        expect(status).toBe('authenticated')
        expect(user.first_name).toBe('Salvatore')
        expect(token).toBeTruthy()
    })
    test('actions: checkAuthentication - invalid ', async() => {
        const store = createVuexStore({
            status: 'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })
        const userLogin = {
            email: "test@test.com",
            password: "123456",
        }
        // no token in storage
        localStorage.removeItem('idToken')
        const respNoToken = await store.dispatch('auth/checkAuthentication')

        expect(respNoToken.ok).toBeFalsy()
        expect(respNoToken.message).toBe('No hay token valido')
        // invalid token
        // No se puede comprobar al ser un fake login.
    })
    
    
    
    
    
    
    

})
