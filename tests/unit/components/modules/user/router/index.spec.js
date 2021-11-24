import router from '@/components/modules/user/router'


describe('Tests in router user', () => {
    test('config router', async () => {
        expect(router).toMatchObject({
            name: 'user',
            component: expect.any(Function),
            children: [
                {
                    path: '/profile',
                    name: 'profile',
                    component: expect.any(Function),
                },
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: expect.any(Function),
                },
                {
                    path: '/sesions',
                    name: 'sesions',
                    component: expect.any(Function),
                },
                {
                    path: '/faq',
                    name: 'faq',
                    component: expect.any(Function),
                },
            ]
        })

        const promiseRoutes = []
        router.children.forEach(child => promiseRoutes.push(child.component()))

        const promiseRoutesResolved = (await Promise.all(promiseRoutes)).map(r => r.default.name)

        expect(promiseRoutesResolved).toContain('faq')
        expect(promiseRoutesResolved).toContain('sesions')
        expect(promiseRoutesResolved).toContain('dashboard')
        expect(promiseRoutesResolved).toContain('profile')
    })
})
