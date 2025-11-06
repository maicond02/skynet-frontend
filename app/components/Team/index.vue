<template>
    <section class="team-section">
        <header class="team-header">
            <div>
                <h1 class="team-title">Usuários do Sistema</h1>
                <p class="team-subtitle">Controle quem pode acessar a plataforma e quais permissões possui.</p>
            </div>
            <Button icon="pi pi-user-plus" label="Novo usuário" severity="primary" @click="openCreateDialog" />
        </header>

        <Card class="team-card">
            <template #title>
                <div class="card-toolbar">
                    <span>Equipe cadastrada</span>
                    <Tag :value="`${filteredUsers.length} usuários`" severity="info" />
                </div>
            </template>

            <template #content>
                <div class="toolbar-controls">
                    <span class="p-input-icon-left">
                        <i class="pi pi-search"></i>
                        <InputText v-model="filters.search" placeholder="Buscar por nome ou e-mail"
                            class="w-full md:w-72" />
                    </span>

                    <Dropdown v-model="filters.status" :options="statusOptions" option-label="label"
                        option-value="value" class="status-filter" />
                </div>

                <DataTable :value="filteredUsers" data-key="id" :loading="loading" responsive-layout="scroll" row-hover
                    paginator :rows="8" :rows-per-page-options="[8, 16, 24]" empty-message="Nenhum usuário encontrado.">
                    <Column field="name" header="Colaborador" sortable>
                        <template #body="{ data }">
                            <div class="user-column">
                                <div class="avatar-fallback">{{ initials(data.name) }}</div>
                                <div class="user-info">
                                    <strong>{{ data.name }}</strong>
                                    <span>{{ data.email }}</span>
                                </div>
                            </div>
                        </template>
                    </Column>

                    <Column field="role" header="Função" sortable>
                        <template #body="{ data }">
                            <Tag :value="data.role" severity="info" />
                        </template>
                    </Column>

                    <Column field="status" header="Status" sortable>
                        <template #body="{ data }">
                            <Tag :value="statusLabel(data.status)" :severity="statusSeverity(data.status)" />
                        </template>
                    </Column>

                    <Column field="lastAccess" header="Último acesso" sortable>
                        <template #body="{ data }">
                            <span>{{ lastAccessLabel(data.lastAccess) }}</span>
                        </template>
                    </Column>

                    <Column header="Ações" body-class="actions-column">
                        <template #body="{ data }">
                            <div class="actions-group">
                                <Button icon="pi pi-pencil" rounded text severity="info"
                                    @click="openEditDialog(data)" />
                                <Button icon="pi pi-trash" rounded text severity="danger"
                                    @click="confirmDelete(data)" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </template>
        </Card>

        <Dialog v-model:visible="isDialogVisible" :modal="true" :style="{ width: '480px' }" :header="dialogTitle"
            dismissable-mask @hide="resetForm">
            <form class="form-grid" @submit.prevent="handleSubmit">
                <div>
                    <label for="name" class="form-label">Nome completo</label>
                    <InputText id="name" v-model.trim="form.name" placeholder="Nome do colaborador"
                        :class="inputClass('name')" />
                    <small v-if="errors.name" class="form-error">{{ errors.name }}</small>
                </div>

                <div>
                    <label for="email" class="form-label">E-mail corporativo</label>
                    <InputText id="email" v-model.trim="form.email" placeholder="email@empresa.com"
                        :class="inputClass('email')" />
                    <small v-if="errors.email" class="form-error">{{ errors.email }}</small>
                </div>

                <div>
                    <label for="role" class="form-label">Função</label>
                    <Dropdown id="role" v-model="form.role" :options="roles" placeholder="Selecione" class="w-full"
                        :class="inputClass('role')" />
                    <small v-if="errors.role" class="form-error">{{ errors.role }}</small>
                </div>

                <div>
                    <label for="status" class="form-label">Status</label>
                    <Dropdown id="status" v-model="form.status" :options="['active', 'inactive']"
                        :option-label="statusLabel" class="w-full" />
                </div>

                <div>
                    <label for="departments" class="form-label">Departamento</label>
                    <InputText id="departments" v-model.trim="form.department" placeholder="Equipe ou departamento" />
                </div>

                <div class="dialog-footer">
                    <Button label="Cancelar" text @click="closeDialog" />
                    <Button type="submit" :label="dialogPrimaryLabel" icon="pi pi-save" :loading="dialogLoading" />
                </div>
            </form>
        </Dialog>

        <Dialog v-model:visible="deleteDialogVisible" header="Remover usuário" :modal="true" :style="{ width: '420px' }"
            dismissable-mask>
            <div class="delete-content">
                <i class="pi pi-exclamation-triangle"></i>
                <div>
                    <p>Tem certeza que deseja remover {{ deleteTarget?.name }} do sistema?</p>
                    <small>Esta ação não pode ser desfeita.</small>
                </div>
            </div>

            <template #footer>
                <Button label="Cancelar" text @click="deleteDialogVisible = false" />
                <Button label="Remover" severity="danger" icon="pi pi-trash" :loading="dialogLoading"
                    @click="deleteUser" />
            </template>
        </Dialog>
    </section>
</template>

<script>
import Button from 'primevue/button'
import Card from 'primevue/card'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'

export default {
    name: 'TeamManagement',
    components: {
        Button,
        Card,
        Column,
        DataTable,
        Dialog,
        Dropdown,
        InputText,
        Tag
    },
    data() {
        return {
            users: [],
            loading: false,
            roles: ['Administrador', 'Operador', 'Analista'],
            statusOptions: [
                { label: 'Todos os status', value: 'ALL' },
                { label: 'Ativos', value: 'active' },
                { label: 'Inativos', value: 'inactive' }
            ],
            filters: {
                search: '',
                status: 'ALL'
            },
            isDialogVisible: false,
            dialogMode: 'create',
            dialogLoading: false,
            form: this.createEmptyForm(),
            errors: {},
            deleteDialogVisible: false,
            deleteTarget: null
        }
    },
    computed: {
        filteredUsers() {
            const searchTerm = this.filters.search.trim().toLowerCase()
            return this.users
                .filter((user) => {
                    if (this.filters.status === 'ALL') {
                        return true
                    }
                    return user.status === this.filters.status
                })
                .filter((user) => {
                    if (!searchTerm) {
                        return true
                    }
                    return (
                        user.name.toLowerCase().includes(searchTerm) ||
                        user.email.toLowerCase().includes(searchTerm) ||
                        user.role.toLowerCase().includes(searchTerm)
                    )
                })
        },
        dialogTitle() {
            return this.dialogMode === 'create' ? 'Registrar novo usuário' : 'Editar usuário'
        },
        dialogPrimaryLabel() {
            return this.dialogMode === 'create' ? 'Registrar' : 'Atualizar'
        }
    },
    methods: {
        async fetchUsers() {
            this.loading = true
            try {
                // Simula chamada à API para buscar usuários.
                await new Promise((resolve) => setTimeout(resolve, 600))
                this.users = [
                    {
                        id: 1,
                        name: 'Ana Ribeiro',
                        email: 'ana.ribeiro@skynet.ai',
                        role: 'Administrador',
                        status: 'active',
                        department: 'Segurança',
                        lastAccess: new Date(Date.now() - 3600 * 1000)
                    },
                    {
                        id: 2,
                        name: 'Bruno Martins',
                        email: 'bruno.martins@skynet.ai',
                        role: 'Operador',
                        status: 'active',
                        department: 'Operações',
                        lastAccess: new Date(Date.now() - 5 * 3600 * 1000)
                    },
                    {
                        id: 3,
                        name: 'Carla Dias',
                        email: 'carla.dias@skynet.ai',
                        role: 'Analista',
                        status: 'inactive',
                        department: 'Analytics',
                        lastAccess: null
                    }
                ]
            } finally {
                this.loading = false
            }
        },
        createEmptyForm() {
            return {
                id: null,
                name: '',
                email: '',
                role: null,
                status: 'active',
                department: ''
            }
        },
        inputClass(field) {
            return {
                'p-invalid': Boolean(this.errors[field])
            }
        },
        openCreateDialog() {
            this.dialogMode = 'create'
            this.form = this.createEmptyForm()
            this.errors = {}
            this.isDialogVisible = true
        },
        openEditDialog(user) {
            this.dialogMode = 'edit'
            this.form = { ...user }
            this.errors = {}
            this.isDialogVisible = true
        },
        closeDialog() {
            this.isDialogVisible = false
        },
        resetForm() {
            this.form = this.createEmptyForm()
            this.errors = {}
            this.dialogMode = 'create'
            this.dialogLoading = false
        },
        validateForm() {
            const errors = {}
            if (!this.form.name) {
                errors.name = 'Informe o nome completo.'
            }
            if (!this.form.email) {
                errors.email = 'Informe o e-mail corporativo.'
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
                errors.email = 'Informe um e-mail válido.'
            }
            if (!this.form.role) {
                errors.role = 'Selecione a função.'
            }
            this.errors = errors
            return Object.keys(errors).length === 0
        },
        async handleSubmit() {
            if (!this.validateForm()) {
                return
            }
            this.dialogLoading = true
            try {
                await new Promise((resolve) => setTimeout(resolve, 300))
                if (this.dialogMode === 'create') {
                    this.createUser()
                } else {
                    this.updateUser()
                }
                this.isDialogVisible = false
            } finally {
                this.dialogLoading = false
            }
        },
        createUser() {
            const nextId = this.users.reduce((highest, user) => Math.max(highest, user.id), 0) + 1
            this.users = [
                ...this.users,
                {
                    ...this.form,
                    id: nextId,
                    lastAccess: null
                }
            ]
        },
        updateUser() {
            this.users = this.users.map((user) => {
                if (user.id !== this.form.id) {
                    return user
                }
                return {
                    ...user,
                    ...this.form
                }
            })
        },
        confirmDelete(user) {
            this.deleteTarget = user
            this.deleteDialogVisible = true
        },
        async deleteUser() {
            if (!this.deleteTarget) {
                return
            }
            this.dialogLoading = true
            try {
                await new Promise((resolve) => setTimeout(resolve, 300))
                this.users = this.users.filter((user) => user.id !== this.deleteTarget.id)
                this.deleteDialogVisible = false
            } finally {
                this.dialogLoading = false
                this.deleteTarget = null
            }
        },
        statusLabel(value) {
            return value === 'active' ? 'Ativo' : 'Inativo'
        },
        statusSeverity(value) {
            return value === 'active' ? 'success' : 'danger'
        },
        lastAccessLabel(date) {
            if (!date) {
                return 'Nunca acessou'
            }
            const parsedDate = typeof date === 'string' ? new Date(date) : date
            if (Number.isNaN(parsedDate.getTime())) {
                return 'Data inválida'
            }
            const now = Date.now()
            const diffInSeconds = Math.round((parsedDate.getTime() - now) / 1000)
            const formatter = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' })
            const units = [
                { unit: 'day', seconds: 86400 },
                { unit: 'hour', seconds: 3600 },
                { unit: 'minute', seconds: 60 }
            ]
            for (const { unit, seconds } of units) {
                if (Math.abs(diffInSeconds) >= seconds) {
                    return formatter.format(Math.round(diffInSeconds / seconds), unit)
                }
            }
            return 'Agora mesmo'
        },
        initials(name) {
            if (!name) {
                return '??'
            }
            return name
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase())
                .join('')
        }
    },
    mounted() {
        this.fetchUsers()
    }
}
</script>

<style scoped>
.team-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem clamp(1rem, 4vw, 3rem);
}

.team-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
}

.team-title {
    margin: 0;
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 700;
    color: #ffffff;
}

.team-subtitle {
    margin: 0.35rem 0 0;
    color: rgba(255, 255, 255, 0.65);
}

.team-card {
    background: rgba(10, 18, 36, 0.6) !important;
    border: 1px solid rgba(62, 161, 255, 0.18) !important;
    border-radius: 18px !important;
    backdrop-filter: blur(18px);
}

.team-card :deep(.p-card-body) {
    padding: 1.5rem;
}

.card-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    color: rgba(255, 255, 255, 0.75);
}

.toolbar-controls {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.status-filter :deep(.p-dropdown) {
    width: 220px;
}

.user-column {
    display: flex;
    align-items: center;
    gap: 0.85rem;
}

.avatar-fallback {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: rgba(62, 161, 255, 0.95);
    background: rgba(62, 161, 255, 0.12);
}

.user-info {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    color: rgba(255, 255, 255, 0.8);
}

.user-info span {
    font-size: 0.85rem;
    color: rgba(148, 163, 184, 0.85);
}

.actions-group {
    display: flex;
    align-items: center;
    gap: 0.35rem;
}

.actions-column {
    width: 120px;
}

.form-grid {
    display: grid;
    gap: 1.25rem;
}

.form-label {
    display: block;
    margin-bottom: 0.35rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
}

.form-error {
    color: #f87171;
    font-size: 0.8rem;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.delete-content {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    color: rgba(255, 255, 255, 0.75);
}

.delete-content i {
    font-size: 1.75rem;
    color: #facc15;
    margin-top: 0.15rem;
}

.delete-content small {
    color: rgba(255, 255, 255, 0.6);
}

@media (min-width: 640px) {
    .toolbar-controls {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
}

@media (max-width: 640px) {
    .team-section {
        padding: 1.5rem;
    }

    .status-filter :deep(.p-dropdown) {
        width: 100%;
    }
}
</style>
