export default defineNuxtRouteMiddleware((to) => {
    if (typeof window === 'undefined') return

    const CURRENT_USER_KEY = 'skynet_current_user'
    const stored = localStorage.getItem(CURRENT_USER_KEY)

    const isAuthenticated = !!stored
    const publicRoutes = ['/login', '/register', '/']

    if (!isAuthenticated && !publicRoutes.includes(to.path)) {
        return navigateTo('/login')
    }

    if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
        return navigateTo('/app/dashboard')
    }
})
