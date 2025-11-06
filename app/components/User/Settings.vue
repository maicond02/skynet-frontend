<template>
    <section class="settings-wrapper">
        <div class="settings-card surface-card border-round">
            <header class="settings-header">
                <div>
                    <h1 class="settings-title">Configurações da conta</h1>
                    <p class="settings-subtitle">Gerencie seus dados pessoais, segurança e preferências de notificação.
                    </p>
                </div>
                <Button label="Salvar tudo" icon="pi pi-save" severity="primary" :loading="isSaving"
                    @click="handleSaveAll" />
            </header>

            <TabView class="settings-tabs">
                <TabPanel header="Perfil">
                    <form class="form-grid" @submit.prevent="handleSaveProfile">
                        <div class="form-field">
                            <label for="profileName" class="form-label">Nome completo</label>
                            <InputText id="profileName" v-model="profileForm.name" placeholder="Seu nome" class="w-full"
                                :class="{ 'p-invalid': profileErrors.name }" />
                            <small v-if="profileErrors.name" class="error-text">{{ profileErrors.name }}</small>
                        </div>

                        <div class="form-field">
                            <label for="profileEmail" class="form-label">E-mail</label>
                            <InputText id="profileEmail" v-model="profileForm.email" placeholder="seuemail@empresa.com"
                                class="w-full" type="email" :class="{ 'p-invalid': profileErrors.email }" />
                            <small v-if="profileErrors.email" class="error-text">{{ profileErrors.email }}</small>
                        </div>

                        <div class="form-field">
                            <label for="profileRole" class="form-label">Função</label>
                            <Dropdown id="profileRole" v-model="profileForm.role" :options="roleOptions"
                                option-label="label" option-value="value" placeholder="Selecione" class="w-full" />
                        </div>

                        <div class="form-field">
                            <label for="profileTimezone" class="form-label">Fuso horário</label>
                            <Dropdown id="profileTimezone" v-model="profileForm.timezone" :options="timezoneOptions"
                                option-label="label" option-value="value" placeholder="Selecione" class="w-full" />
                        </div>

                        <div class="form-actions">
                            <Button type="submit" label="Salvar perfil" icon="pi pi-check" :loading="isProfileSaving" />
                            <Button type="button" label="Cancelar" class="p-button-text" @click="resetProfile" />
                        </div>
                    </form>
                </TabPanel>

                <TabPanel header="Segurança">
                    <form class="security-form" @submit.prevent="handleSaveSecurity">
                        <div class="form-field">
                            <label for="currentPassword" class="form-label">Senha atual</label>
                            <Password id="currentPassword" v-model="securityForm.currentPassword" :feedback="false"
                                toggle-mask placeholder="••••••••" class="w-full" input-class="w-full"
                                :input-props="{ autocomplete: 'current-password' }" />
                            <small v-if="securityErrors.currentPassword" class="error-text">{{
                                securityErrors.currentPassword }}</small>
                        </div>

                        <div class="form-field">
                            <label for="newPassword" class="form-label">Nova senha</label>
                            <Password id="newPassword" v-model="securityForm.newPassword" :feedback="true" toggle-mask
                                prompt-label="Crie uma senha forte" weak-label="Fraca" medium-label="Média"
                                strong-label="Forte" class="w-full" input-class="w-full"
                                :input-props="{ autocomplete: 'new-password' }" />
                            <small v-if="securityErrors.newPassword" class="error-text">{{ securityErrors.newPassword
                                }}</small>
                        </div>

                        <div class="form-field">
                            <label for="confirmNewPassword" class="form-label">Confirmar nova senha</label>
                            <Password id="confirmNewPassword" v-model="securityForm.confirmNewPassword"
                                :feedback="false" toggle-mask class="w-full" input-class="w-full"
                                placeholder="Repita a nova senha" />
                            <small v-if="securityErrors.confirmNewPassword" class="error-text">{{
                                securityErrors.confirmNewPassword }}</small>
                        </div>

                        <div class="two-factor">
                            <div>
                                <h3>Autenticação em duas etapas</h3>
                                <p>Adicione uma camada extra de segurança utilizando códigos temporários.</p>
                            </div>
                            <Button type="button" label="Configurar 2FA" icon="pi pi-shield" severity="secondary"
                                outlined @click="handleSetupTwoFactor" />
                        </div>

                        <div class="form-actions">
                            <Button type="submit" label="Atualizar senha" icon="pi pi-lock"
                                :loading="isSecuritySaving" />
                        </div>
                    </form>
                </TabPanel>

                <TabPanel header="Notificações">
                    <form class="notifications-form" @submit.prevent="handleSaveNotifications">
                        <div class="notification-item" v-for="preference in notificationPreferences"
                            :key="preference.id">
                            <div>
                                <h3>{{ preference.title }}</h3>
                                <p>{{ preference.description }}</p>
                            </div>
                            <InputSwitch v-model="preference.enabled" />
                        </div>

                        <Divider />

                        <div class="form-actions">
                            <Button type="submit" label="Salvar preferências" icon="pi pi-bell"
                                :loading="isNotificationsSaving" />
                        </div>
                    </form>
                </TabPanel>
            </TabView>

            <Divider class="mt-6" />

            <section class="danger-zone">
                <div>
                    <h2>Zona de perigo</h2>
                    <p>Estas ações são irreversíveis. Proceda com cautela.</p>
                </div>
                <div class="danger-actions">
                    <Button label="Desativar conta" icon="pi pi-user-minus" severity="warning" outlined
                        @click="$emit('deactivate-account')" />
                    <Button label="Excluir permanentemente" icon="pi pi-trash" severity="danger"
                        @click="$emit('delete-account')" />
                </div>
            </section>
        </div>
    </section>
</template>

<script>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Password from 'primevue/password'
import InputSwitch from 'primevue/inputswitch'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Divider from 'primevue/divider'

export default {
    name: 'UserSettings',

    components: {
        Button,
        InputText,
        Dropdown,
        Password,
        InputSwitch,
        TabView,
        TabPanel,
        Divider
    },

    data() {
        return {
            isSaving: false,
            isProfileSaving: false,
            isSecuritySaving: false,
            isNotificationsSaving: false,
            profileForm: {
                name: 'Carla Menezes',
                email: 'carla.menezes@skynet.ai',
                role: 'ml-engineer',
                timezone: 'America/Sao_Paulo'
            },
            profileErrors: {
                name: '',
                email: ''
            },
            securityForm: {
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            },
            securityErrors: {
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            },
            notificationPreferences: [
                {
                    id: 'alerts-critical',
                    title: 'Alertas críticos em tempo real',
                    description: 'Receba notificações instantâneas sobre incidentes de alto risco detectados.',
                    enabled: true
                },
                {
                    id: 'weekly-report',
                    title: 'Relatório semanal por e-mail',
                    description: 'Resumo com estatísticas de detecções, uptime e principais eventos.',
                    enabled: true
                },
                {
                    id: 'maintenance',
                    title: 'Avisos de manutenção',
                    description: 'Saiba quando haverá atualizações de modelo ou janelas de manutenção programadas.',
                    enabled: false
                }
            ],
            roleOptions: [
                { label: 'Machine Learning Engineer', value: 'ml-engineer' },
                { label: 'Security Officer', value: 'security-officer' },
                { label: 'Administrador', value: 'admin' }
            ],
            timezoneOptions: [
                { label: 'GMT-3 • São Paulo', value: 'America/Sao_Paulo' },
                { label: 'GMT-5 • Bogotá', value: 'America/Bogota' },
                { label: 'GMT+0 • UTC', value: 'UTC' }
            ]
        }
    },

    methods: {
        validateProfile() {
            const nextErrors = {
                name: '',
                email: ''
            }

            if (!this.profileForm.name) {
                nextErrors.name = 'Informe seu nome.'
            }

            if (!this.profileForm.email) {
                nextErrors.email = 'Informe um e-mail válido.'
            }

            this.profileErrors = nextErrors
            return !nextErrors.name && !nextErrors.email
        },

        validateSecurity() {
            const nextErrors = {
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            }

            if (!this.securityForm.currentPassword) {
                nextErrors.currentPassword = 'Informe sua senha atual.'
            }

            if (!this.securityForm.newPassword) {
                nextErrors.newPassword = 'Crie uma nova senha.'
            }

            if (!this.securityForm.confirmNewPassword) {
                nextErrors.confirmNewPassword = 'Confirme a nova senha.'
            } else if (this.securityForm.newPassword && this.securityForm.confirmNewPassword !== this.securityForm.newPassword) {
                nextErrors.confirmNewPassword = 'As senhas não coincidem.'
            }

            this.securityErrors = nextErrors
            return Object.values(nextErrors).every(message => !message)
        },

        async handleSaveProfile() {
            if (this.isProfileSaving || !this.validateProfile()) {
                return
            }

            this.isProfileSaving = true

            try {
                await new Promise(resolve => setTimeout(resolve, 600))
                this.$emit('profile-saved', { ...this.profileForm })
            } finally {
                this.isProfileSaving = false
            }
        },

        resetProfile() {
            this.profileForm = {
                name: 'Carla Menezes',
                email: 'carla.menezes@skynet.ai',
                role: 'ml-engineer',
                timezone: 'America/Sao_Paulo'
            }
            this.profileErrors = {
                name: '',
                email: ''
            }
        },

        async handleSaveSecurity() {
            if (this.isSecuritySaving || !this.validateSecurity()) {
                return
            }

            this.isSecuritySaving = true

            try {
                await new Promise(resolve => setTimeout(resolve, 800))
                this.$emit('security-saved')
                this.securityForm = {
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                }
            } finally {
                this.isSecuritySaving = false
            }
        },

        handleSetupTwoFactor() {
            this.$emit('setup-2fa')
        },

        async handleSaveNotifications() {
            if (this.isNotificationsSaving) {
                return
            }

            this.isNotificationsSaving = true

            try {
                await new Promise(resolve => setTimeout(resolve, 400))
                this.$emit('notifications-saved', this.notificationPreferences)
            } finally {
                this.isNotificationsSaving = false
            }
        },

        async handleSaveAll() {
            if (this.isSaving) {
                return
            }

            this.isSaving = true

            try {
                await Promise.all([
                    this.handleSaveProfile(),
                    this.handleSaveSecurity(),
                    this.handleSaveNotifications()
                ])
                this.$emit('all-saved')
            } finally {
                this.isSaving = false
            }
        }
    }
}
</script>

<style scoped>
.settings-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1.5rem;
    background: radial-gradient(1400px 700px at 50% -15%, rgba(62, 161, 255, 0.18), transparent 65%);
}

.settings-card {
    width: 100%;
    max-width: 960px;
    padding: 2.5rem 3rem;
    box-shadow: 0 28px 60px rgba(12, 19, 34, 0.4);
    border: 1px solid rgba(62, 161, 255, 0.12);
}

.settings-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
}

.settings-title {
    font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
    font-size: 2rem;
    margin: 0 0 0.5rem;
    background: linear-gradient(135deg, #3ea1ff, #7c3aed);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.settings-subtitle {
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
}

.settings-tabs :deep(.p-tabview-nav) {
    border-bottom: 1px solid rgba(62, 161, 255, 0.12);
}

.settings-tabs :deep(.p-tabview-nav-link) {
    color: rgba(255, 255, 255, 0.7);
}

.settings-tabs :deep(.p-highlight .p-tabview-nav-link) {
    color: #3ea1ff;
    border-color: #3ea1ff;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
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

.security-form,
.notifications-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.two-factor {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-radius: 12px;
    border: 1px solid rgba(124, 58, 237, 0.14);
    background: rgba(124, 58, 237, 0.08);
    color: rgba(255, 255, 255, 0.85);
}

.two-factor h3 {
    margin: 0 0 0.25rem;
}

.two-factor p {
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
}

.notification-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border: 1px solid rgba(62, 161, 255, 0.12);
    border-radius: 12px;
    background: rgba(62, 161, 255, 0.06);
    color: rgba(255, 255, 255, 0.85);
}

.notification-item h3 {
    margin: 0 0 0.25rem;
}

.notification-item p {
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
}

.form-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.danger-zone {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid rgba(248, 113, 113, 0.35);
    background: rgba(248, 113, 113, 0.08);
    color: rgba(255, 255, 255, 0.85);
}

.danger-zone h2 {
    margin: 0 0 0.25rem;
}

.danger-zone p {
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
}

.danger-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
}

@media (max-width: 900px) {
    .settings-card {
        padding: 2rem;
    }

    .form-grid {
        grid-template-columns: 1fr;
    }

    .two-factor,
    .danger-zone,
    .notification-item,
    .form-actions {
        flex-direction: column;
        align-items: flex-start;
    }

    .two-factor button,
    .danger-actions {
        align-self: stretch;
    }

    .form-actions {
        width: 100%;
    }

    .form-actions .p-button {
        width: 100%;
        justify-content: center;
    }
}
</style>
