interface User {
    id: string
    name: string
    email: string
    company?: string
    password?: string
    role?: string
    status?: string
    department?: string
    lastAccess?: string | Date | null
}

interface RegisterData {
    name: string
    email: string
    password: string
    company?: string
    role?: string
    status?: string
    department?: string
}

interface LoginData {
    email: string
    password: string
    remember?: boolean
}

const STORAGE_KEY = 'skynet_users'
const CURRENT_USER_KEY = 'skynet_current_user'

class AuthService {
    private users: User[] = []
    private currentUser: User | null = null

    constructor() {
        this.loadUsersFromStorage()
        this.loadCurrentUser()
        this.initializeDefaultUser()
    }

    private loadUsersFromStorage(): void {
        if (typeof window === 'undefined') return

        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                this.users = JSON.parse(stored)
            } catch (error) {
                console.error('Erro ao carregar usuários:', error)
                this.users = []
            }
        }
    }

    private saveUsersToStorage(): void {
        if (typeof window === 'undefined') return
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users))
    }

    private loadCurrentUser(): void {
        if (typeof window === 'undefined') return

        const stored = localStorage.getItem(CURRENT_USER_KEY)
        if (stored) {
            try {
                this.currentUser = JSON.parse(stored)
            } catch (error) {
                console.error('Erro ao carregar usuário atual:', error)
                this.currentUser = null
            }
        }
    }

    private saveCurrentUser(user: User | null): void {
        if (typeof window === 'undefined') return

        if (user) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
        } else {
            localStorage.removeItem(CURRENT_USER_KEY)
        }
        this.currentUser = user
    }

    private initializeDefaultUser(): void {
        const defaultUsers = [
            {
                id: 'admin-default',
                name: 'Administrador',
                email: 'admin@email.com',
                password: '12345678',
                company: 'Skynet',
                role: 'Administrador',
                status: 'active',
                department: 'Diretoria',
                lastAccess: new Date().toISOString()
            },
            {
                id: 'user-carlos',
                name: 'Carlos Alberto de Aguiar',
                email: 'carlos@skynet.com',
                password: '12345678',
                company: 'Skynet',
                role: 'Administrador',
                status: 'active',
                department: 'Segurança',
                lastAccess: new Date(Date.now() - 3600 * 1000).toISOString()
            },
            {
                id: 'user-joao',
                name: 'João Marcos Racanelli',
                email: 'joao@skynet.com',
                password: '12345678',
                company: 'Skynet',
                role: 'Operador',
                status: 'active',
                department: 'Operações',
                lastAccess: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
            },
            {
                id: 'user-leonardo',
                name: 'Leonardo Marcondeli',
                email: 'leonardo@skynet.com',
                password: '12345678',
                company: 'Skynet',
                role: 'Analista',
                status: 'active',
                department: 'Analytics',
                lastAccess: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
            },
            {
                id: 'user-maicon',
                name: 'Maicon Douglas Mendes Alves',
                email: 'maicon@skynet.com',
                password: '12345678',
                company: 'Skynet',
                role: 'Administrador',
                status: 'active',
                department: 'Desenvolvimento',
                lastAccess: new Date().toISOString()
            },
            {
                id: 'user-vinicius',
                name: 'Vinicius de Moraes de Godoi',
                email: 'vinicius@skynet.com',
                password: '12345678',
                company: 'Skynet',
                role: 'Operador',
                status: 'inactive',
                department: 'Suporte',
                lastAccess: null
            }
        ]

        let hasChanges = false
        defaultUsers.forEach(defaultUser => {
            if (!this.users.some(u => u.email === defaultUser.email)) {
                this.users.push(defaultUser)
                hasChanges = true
            }
        })

        if (hasChanges) {
            this.saveUsersToStorage()
        }
    }

    register(data: RegisterData): { success: boolean; message: string; user?: User } {
        const existingUser = this.users.find(user => user.email === data.email)

        if (existingUser) {
            return {
                success: false,
                message: 'Este e-mail já está cadastrado.'
            }
        }

        const newUser: User = {
            id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: data.name,
            email: data.email,
            password: data.password,
            company: data.company,
            role: data.role || 'Operador',
            status: data.status || 'active',
            department: data.department || '',
            lastAccess: null
        }

        this.users.push(newUser)
        this.saveUsersToStorage()

        return {
            success: true,
            message: 'Cadastro realizado com sucesso!',
            user: newUser
        }
    }

    updateUser(user: User): void {
        const index = this.users.findIndex(u => u.id === user.id)
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...user }
            this.saveUsersToStorage()
        }
    }

    deleteUser(userId: string): void {
        this.users = this.users.filter(u => u.id !== userId)
        this.saveUsersToStorage()
    }

    login(data: LoginData): { success: boolean; message: string; user?: User } {
        const user = this.users.find(
            u => u.email === data.email && u.password === data.password
        )

        if (!user) {
            return {
                success: false,
                message: 'E-mail ou senha incorretos.'
            }
        }

        this.saveCurrentUser(user)

        return {
            success: true,
            message: 'Login realizado com sucesso!',
            user
        }
    }

    logout(): void {
        this.saveCurrentUser(null)
    }

    getCurrentUser(): User | null {
        return this.currentUser
    }

    isAuthenticated(): boolean {
        return this.currentUser !== null
    }

    getAllUsers(): User[] {
        return this.users
    }

    checkAuthAndRedirect(router: any): boolean {
        if (!this.isAuthenticated()) {
            router.push('/login')
            return false
        }
        return true
    }
}

let authServiceInstance: AuthService | null = null

export const useAuth = () => {
    if (typeof window !== 'undefined' && !authServiceInstance) {
        authServiceInstance = new AuthService()
    }

    return authServiceInstance || new AuthService()
}
