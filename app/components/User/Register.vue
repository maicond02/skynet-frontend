<template>
    <section class="register-wrapper">
        <div class="register-card surface-card border-round">
            <header class="register-header">
                <h1 class="register-title">Criar conta</h1>
                <p class="register-subtitle">
                    Cadastre-se para configurar pipelines de visão computacional personalizados e gerenciar toda a sua
                    operação.
                </p>
            </header>

            <form class="register-form" @submit.prevent="handleSubmit">
                <div class="form-grid">
                    <div class="form-field">
                        <label for="name" class="form-label">Nome completo</label>
                        <InputText id="name" v-model="form.name" placeholder="Nome e sobrenome" class="w-full"
                            :class="{ 'p-invalid': errors.name }" />
                        <small v-if="errors.name" class="error-text">{{ errors.name }}</small>
                    </div>

                    <div class="form-field">
                        <label for="company" class="form-label">Empresa</label>
                        <InputText id="company" v-model="form.company" placeholder="Nome da empresa" class="w-full" />
                    </div>
                </div>

                <div class="form-field">
                    <label for="email" class="form-label">E-mail corporativo</label>
                    <InputText id="email" v-model="form.email" type="email" placeholder="voce@empresa.com"
                        class="w-full" :class="{ 'p-invalid': errors.email }" />
                    <small v-if="errors.email" class="error-text">{{ errors.email }}</small>
                </div>

                <div class="form-grid">
                    <div class="form-field">
                        <label for="password" class="form-label">Senha</label>
                        <Password id="password" v-model="form.password" :feedback="false" toggle-mask
                            placeholder="Crie uma senha segura" class="w-full" input-class="w-full"
                            :input-props="{ autocomplete: 'new-password' }" />
                        <small v-if="errors.password" class="error-text">{{ errors.password }}</small>
                    </div>

                    <div class="form-field">
                        <label for="confirmPassword" class="form-label">Confirmar senha</label>
                        <Password id="confirmPassword" v-model="form.confirmPassword" :feedback="false" toggle-mask
                            placeholder="Repita a senha" class="w-full" input-class="w-full"
                            :input-props="{ autocomplete: 'new-password' }" />
                        <small v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</small>
                    </div>
                </div>

                <div class="privacy-callout">
                    <i class="pi pi-shield"></i>
                    <span>
                        Seus dados são protegidos com criptografia end-to-end e seguem nossa política de privacidade.
                    </span>
                </div>

                <div class="accept-terms">
                    <Checkbox input-id="terms" v-model="form.acceptTerms" :binary="true" />
                    <label for="terms">
                        Eu concordo com os
                        <button type="button" class="link-button" @click="handleOpenTerms">Termos de Uso</button>
                        e a Política de Privacidade.
                    </label>
                </div>
                <small v-if="errors.acceptTerms" class="error-text">{{ errors.acceptTerms }}</small>

                <Button type="submit" label="Criar conta" icon="pi pi-user-plus" class="w-full"
                    :loading="isSubmitting" />

                <p class="login-hint">
                    Já possui uma conta?
                    <button type="button" class="link-button" @click="$router.push('/login')">
                        Entrar
                    </button>
                </p>
            </form>
        </div>
    </section>
</template>

<script>
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import { useAuth } from '~/composables/useAuth'
import { useToast } from 'primevue/usetoast'

export default {
    name: 'UserRegister',

    components: {
        InputText,
        Password,
        Checkbox,
        Button
    },

    setup() {
        const authService = useAuth()
        const toast = useToast()

        return {
            authService,
            toast
        }
    },

    data() {
        return {
            form: {
                name: '',
                company: '',
                email: '',
                password: '',
                confirmPassword: '',
                acceptTerms: false
            },
            errors: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                acceptTerms: ''
            },
            isSubmitting: false
        }
    },

    methods: {
        validateForm() {
            const nextErrors = {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                acceptTerms: ''
            }

            if (!this.form.name) {
                nextErrors.name = 'Informe seu nome completo.'
            }

            if (!this.form.email) {
                nextErrors.email = 'Informe um e-mail válido.'
            }

            if (!this.form.password) {
                nextErrors.password = 'Crie uma senha.'
            }

            if (!this.form.confirmPassword) {
                nextErrors.confirmPassword = 'Confirme a senha.'
            } else if (this.form.password && this.form.confirmPassword !== this.form.password) {
                nextErrors.confirmPassword = 'As senhas não coincidem.'
            }

            if (!this.form.acceptTerms) {
                nextErrors.acceptTerms = 'É necessário aceitar os termos para continuar.'
            }

            this.errors = nextErrors

            return Object.values(nextErrors).every(message => !message)
        },

        async handleSubmit() {
            if (this.isSubmitting) {
                return
            }

            if (!this.validateForm()) {
                return
            }

            this.isSubmitting = true

            try {
                await new Promise(resolve => setTimeout(resolve, 500))

                const result = this.authService.register({
                    name: this.form.name,
                    email: this.form.email,
                    password: this.form.password,
                    company: this.form.company
                })

                if (result.success) {
                    if (this.toast) {
                        this.toast.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: result.message,
                            life: 3000
                        })
                    }

                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 1000)
                } else {
                    if (this.toast) {
                        this.toast.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: result.message,
                            life: 4000
                        })
                    }
                }
            } catch (error) {
                if (this.toast) {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'Erro ao realizar cadastro. Tente novamente.',
                        life: 4000
                    })
                }
            } finally {
                this.isSubmitting = false
            }
        },

        handleOpenTerms() {
            this.$emit('open-terms')
        }
    }
}
</script>

<style scoped>
.register-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    background: transparent;
}

.register-card {
    width: 100%;
    max-width: 540px;
    padding: 2.75rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.register-header {
    margin-bottom: 2rem;
    text-align: center;
}

.register-title {
    font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
    font-size: 1.9rem;
    margin: 0 0 0.5rem;
    background: linear-gradient(135deg, #3ea1ff, #7c3aed);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.register-subtitle {
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
}

.register-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-label {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
}

.error-text {
    color: #f87171;
    font-size: 0.8rem;
}

.privacy-callout {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    border: 1px solid rgba(62, 161, 255, 0.25);
    background: rgba(62, 161, 255, 0.08);
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.85rem;
}

.privacy-callout .pi {
    color: #3ea1ff;
    font-size: 1.2rem;
}

.accept-terms {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.75);
}

.accept-terms label {
    cursor: pointer;
}

.link-button {
    background: transparent;
    border: none;
    padding: 0;
    color: #3ea1ff;
    cursor: pointer;
    font-weight: 600;
    transition: color 0.2s ease;
}

.link-button:hover {
    color: #7c3aed;
}

.login-hint {
    text-align: center;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 640px) {
    .register-card {
        padding: 2rem;
    }

    .form-grid {
        grid-template-columns: 1fr;
    }
}
</style>
