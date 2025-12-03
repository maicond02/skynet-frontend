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
            <Avatar :label="userInitial" size="large" shape="circle" class="user-avatar" />
        </div>
    </div>
</template>

<script>
import { useAuth } from '~/composables/useAuth'

export default {
    name: 'DashboardTopbar',

    data() {
        return {
            userInitial: ''
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
    }
}
</script>

<style scoped>
.topbar-container {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 1rem 1.5rem;
    background: #000;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.topbar-content {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    max-width: 100%;
}

.search-wrapper {
    flex: 1;
    max-width: 420px;
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
