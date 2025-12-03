<template>
    <div class="topbar-container">
        <div class="topbar-content">
            <div class="search-wrapper">
                <IconField iconPosition="left">
                    <InputIcon class="pi pi-search"></InputIcon>
                    <InputText placeholder="Buscar..." class="search-input" />
                </IconField>
            </div>
            <Button icon="pi pi-bell" text rounded severity="secondary" v-badge.danger="'4'" class="action-btn" />
            <Avatar :label="userInitial" size="large" shape="circle" class="user-avatar" @click="toggleMenu" />
            <Menu ref="menu" :model="menuItems" :popup="true" class="user-menu" />
        </div>
    </div>
</template>

<script>
import { useAuth } from '~/composables/useAuth'
import Menu from 'primevue/menu'

export default {
    name: 'DashboardTopbar',

    components: {
        Menu
    },

    data() {
        return {
            userInitial: '',
            menuItems: [
                {
                    label: 'Sair',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        this.handleLogout()
                    }
                }
            ]
        }
    },

    mounted() {
        const authService = useAuth()
        const user = authService.getCurrentUser()

        if (user && user.email) {
            this.userInitial = user.email.charAt(0).toUpperCase()
        } else {
            this.userInitial = 'U'
        }
    },

    methods: {
        toggleMenu(event) {
            this.$refs.menu.toggle(event)
        },

        handleLogout() {
            const authService = useAuth()
            authService.logout()
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.topbar-container {
    position: sticky;
    top: 0;
    z-index: 999;
    padding: 1rem 1.5rem;
    background: #000;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    flex-shrink: 0;
}

.topbar-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    flex-wrap: nowrap;
}

.search-wrapper {
    flex: 0 1 420px;
    min-width: 200px;
}

.search-wrapper :deep(.p-inputtext) {
    width: 100%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #fff;
    border-radius: 10px;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    transition: all 0.2s ease;
}

.search-wrapper :deep(.p-inputtext::placeholder) {
    color: rgba(255, 255, 255, 0.5);
}

.search-wrapper :deep(.p-inputtext:focus) {
    background: rgba(255, 255, 255, 0.12);
    border-color: #3ea1ff;
    box-shadow: 0 0 0 3px rgba(62, 161, 255, 0.15);
}

.search-wrapper :deep(.p-icon) {
    color: rgba(255, 255, 255, 0.6);
    left: 0.75rem;
}

.action-btn {
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.2s ease;
    flex-shrink: 0;
}

.action-btn:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    color: #fff !important;
}

.user-avatar {
    background: linear-gradient(135deg, #3ea1ff, #7c3aed);
    color: #fff;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: 2px solid rgba(255, 255, 255, 0.2);
    flex-shrink: 0;
}

.user-avatar:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(62, 161, 255, 0.3);
}

.topbar-content :deep(.p-badge) {
    min-width: 1.1rem;
    height: 1.1rem;
    line-height: 1.1rem;
    font-size: 0.7rem;
    background: #ef4444;
}

@media (max-width: 768px) {
    .topbar-container {
        padding: 0.75rem 1rem;
    }

    .search-wrapper {
        max-width: 280px;
    }

    .topbar-content {
        gap: 0.75rem;
    }
}

@media (max-width: 640px) {
    .search-wrapper {
        max-width: 200px;
    }
}
</style>
