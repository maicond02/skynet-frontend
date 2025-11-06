<template>
    <section class="login-wrapper">
        <div class="login-card surface-card border-round">
            <header class="login-header">
                <h1 class="login-title">Acessar conta</h1>
                <p class="login-subtitle">Entre com seus dados para acompanhar seus projetos de visão computacional.</p>
            </header>

            <form class="login-form" @submit.prevent="handleSubmit">
                <div class="form-field">
                    <label for="email" class="form-label">E-mail</label>
                    <InputText id="email" v-model="form.email" type="email" placeholder="seuemail@empresa.com"
                        class="w-full" :class="{ 'p-invalid': errors.email }" />
                    <small v-if="errors.email" class="error-text">{{ errors.email }}</small>
                </div>

                <div class="form-field">
                    <label for="password" class="form-label">Senha</label>
                    <Password id="password" v-model="form.password" :feedback="false" toggle-mask placeholder="••••••••"
                        class="w-full" input-class="w-full" :input-props="{ autocomplete: 'current-password' }" />
                    <small v-if="errors.password" class="error-text">{{ errors.password }}</small>
                </div>

                <div class="form-extras">
                    <div class="remember-me">
                        <Checkbox input-id="remember" v-model="form.remember" :binary="true" />
                        <label for="remember">Lembrar de mim</label>
                    </div>
                    <button type="button" class="link-button" @click="handleForgotPassword">
                        Esqueci minha senha
                    </button>
                </div>

                <Button type="submit" label="Entrar" icon="pi pi-sign-in" class="w-full" :loading="isSubmitting" />

                <p class="register-hint">
                    Ainda não possui conta?
                    <button type="button" class="link-button" @click="$router.push('/register')">
                        Criar agora
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

export default {
    name: 'UserLogin',

    components: {
        InputText,
        Password,
        Checkbox,
        Button
    },

    data() {
        return {
            form: {
                email: '',
                password: '',
                remember: false
            },
            errors: {
                email: '',
                password: ''
            },
            isSubmitting: false
        }
    },

    methods: {
        validateForm() {
            const nextErrors = {
                email: '',
                password: ''
            }

            if (!this.form.email) {
                nextErrors.email = 'Informe um e-mail válido.'
            }

            if (!this.form.password) {
                nextErrors.password = 'Informe sua senha.'
            }

            this.errors = nextErrors

            return !nextErrors.email && !nextErrors.password
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
                // TODO: Substituir por chamada real à API de autenticação.
                await new Promise(resolve => setTimeout(resolve, 800))

                this.$emit('login', { ...this.form })
            } finally {
                this.isSubmitting = false
            }
        },

        handleForgotPassword() {
            this.$emit('forgot-password', this.form.email)
        }
    }
}
</script>

<style scoped>
.login-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    background: radial-gradient(1200px 600px at 50% -10%, rgba(62, 161, 255, 0.15), transparent 60%);
}

.login-card {
    width: 100%;
    max-width: 420px;
    padding: 2.5rem;
    box-shadow: 0 24px 60px rgba(12, 19, 34, 0.35);
    border: 1px solid rgba(62, 161, 255, 0.12);
}

.login-header {
    margin-bottom: 2rem;
    text-align: center;
}

.login-title {
    font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
    font-size: 1.8rem;
    margin: 0 0 0.5rem;
    background: linear-gradient(135deg, #3ea1ff, #7c3aed);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.login-subtitle {
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
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

.form-extras {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
}

.remember-me {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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

.register-hint {
    text-align: center;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 480px) {
    .login-card {
        padding: 1.75rem;
    }

    .form-extras {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
    }
}
</style>
