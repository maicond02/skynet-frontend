interface User {
    id: string
    name: string
    email: string
    company?: string
    password: string
}

interface RegisterData {
    name: string
    email: string
    password: string
    company?: string
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
        const adminEmail = 'admin@email.com'
        const adminExists = this.users.some(user => user.email === adminEmail)

        if (!adminExists) {
            const adminUser: User = {
                id: 'admin-default',
                name: 'Administrador',
                email: adminEmail,
                password: '12345678',
                company: 'Skynet'
            }
            this.users.push(adminUser)
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
            company: data.company
        }

        this.users.push(newUser)
        this.saveUsersToStorage()

        return {
            success: true,
            message: 'Cadastro realizado com sucesso!',
            user: newUser
        }
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
}

let authServiceInstance: AuthService | null = null

export const useAuth = () => {
    if (typeof window !== 'undefined' && !authServiceInstance) {
        authServiceInstance = new AuthService()
    }

    return authServiceInstance || new AuthService()
}
