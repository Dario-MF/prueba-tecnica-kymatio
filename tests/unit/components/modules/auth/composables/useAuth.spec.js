import useAuth from '@/components/modules/auth/composables/useAuth'

const mockStore = {
    dispatch: jest.fn(),
    commit: jest.fn(),
    getters: {
        'auth/getCurrentState': 'authenticated'
    }
}

jest.mock('vuex', () => ({
    useStore: () => mockStore
}))

describe('composable useAuth tests', () => {

    beforeEach(() => jest.clearAllMocks())

    test('createUser call dispatch-createUser and return value', async() => {
        const { createUser } = useAuth()

        const newUser = {name: 'Test3', email: 'test3@test.com', password: '123456'}
        mockStore.dispatch.mockReturnValue({ ok: true, message: 'Usuario registrado' })

        const resp = await createUser(newUser)
        
        expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", {"email": "test3@test.com", "name": "Test3", "password": "123456"})
        expect(resp).toEqual({ ok: true, message: 'Usuario registrado' })
    })
    test('loginUser call dispatch and return response', async() => {
        const { loginUser } = useAuth()

        const newUser = { email: 'test3@test.com', password: '123456'}
        mockStore.dispatch.mockReturnValue({ ok: true, message: 'Usuario logueado' })

        const resp = await loginUser(newUser)
        
        expect(mockStore.dispatch).toHaveBeenCalledWith("auth/signInUser", {email: "test3@test.com", password: "123456"})
        expect(resp).toEqual({ ok: true, message: 'Usuario logueado' })
    })
    test('checkStatus call dispatch and return response', async() => {
        const { checkStatus } = useAuth()

        mockStore.dispatch.mockReturnValue({ ok: true, message: 'Usuario  checked' })

        const resp = await checkStatus()
        
        expect(mockStore.dispatch).toHaveBeenCalledWith("auth/checkAuthentication")
        expect(resp).toEqual({ ok: true, message: 'Usuario  checked' })
    })
    test('logout', async() => {
        const { logout } = useAuth()
        await logout()
        expect(mockStore.commit).toHaveBeenCalledWith("auth/logout")
    })
    test('computed: authStatus is computed prop and call getter', () => {
        const { authStatus } = useAuth()
        expect(authStatus.value).toBe(mockStore.getters['auth/getCurrentState'])
    })
})
