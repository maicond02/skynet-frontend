<template>
    <nav class="navbar">
        <Menubar :model="menuItems" class="custom-menubar">
            <template #start>
                <span class="brand-logo">Skynet</span>
            </template>
            <template #end class="justify-content-end">
                <div class="justify-content-end">
                    <Button label="Login" icon="pi pi-sign-in" text @click="navigateToLogin" class="login-btn" />
                    <Button label="Registro" icon="pi pi-user-plus" severity="primary" @click="navigateToRegister"
                        class="register-btn" />
                </div>
            </template>
        </Menubar>
    </nav>
</template>

<script>
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'

export default {
    name: 'LayoutNavbar',

    components: {
        Menubar,
        Button
    },

    data() {
        return {
            menuItems: [
                {
                    label: 'Home',
                    icon: 'pi pi-home',
                    command: () => this.handleScrollTo('top')
                },
                {
                    label: 'Visão em Tempo Real',
                    icon: 'pi pi-video',
                    command: () => this.handleScrollTo('tela-1')
                },
                {
                    label: 'Segurança & Privacidade',
                    icon: 'pi pi-shield',
                    command: () => this.handleScrollTo('tela-2')
                },
                {
                    label: 'Onde Usar',
                    icon: 'pi pi-map-marker',
                    command: () => this.handleScrollTo('tela-3')
                }
            ]
        }
    },

    methods: {
        handleScrollTo(sectionId) {
            if (sectionId === 'top') {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                return
            }

            const element = document.getElementById(sectionId)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        },

        navigateToLogin() {
            this.$router.push('/login')
        },

        navigateToRegister() {
            this.$router.push('/register')
        }
    }
}
</script>

<style scoped>
.navbar {
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(8px);
    background: rgba(0, 0, 0, 0.9);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.brand-logo {
    font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #38bdf8, #3b82f6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: 0.05em;
    margin-right: 2rem;
}

:deep(.custom-menubar) {
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 0.5rem 2rem;
    width: 100%;
    margin: 0;
}

:deep(.p-menubar) {
    display: flex !important;
    align-items: center !important;
    width: 100%;
    gap: 1.5rem;
}

:deep(.p-menubar-start) {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
}

:deep(.p-menubar-root-list) {
    display: flex;
    gap: 0.5rem;
    flex: 1 1 auto;
    justify-content: center;
}

:deep(.p-menubar-end) {
    display: flex;
    align-items: center;
    margin-left: auto !important;
    flex: 0 0 auto;
}

:deep(.p-menuitem-link) {
    background: transparent !important;
    color: rgba(255, 255, 255, 0.9) !important;
    border-radius: 8px;
    transition: all 0.2s ease;
}

:deep(.p-menuitem-link:hover) {
    background: rgba(59, 130, 246, 0.12) !important;
    color: #38bdf8 !important;
}

:deep(.p-menuitem-icon) {
    color: rgba(255, 255, 255, 0.7);
}

:deep(.p-menuitem-link:hover .p-menuitem-icon) {
    color: #38bdf8;
}

.navbar-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
}

.login-btn {
    color: rgba(255, 255, 255, 0.9) !important;
}

.login-btn:hover {
    color: #38bdf8 !important;
    background: rgba(59, 130, 246, 0.12) !important;
}

.register-btn {
    font-weight: 600;
}

@media (max-width: 768px) {
    .brand-logo {
        font-size: 1.25rem;
        margin-right: 1rem;
    }

    :deep(.custom-menubar) {
        padding: 0.5rem;
    }

    .navbar-actions {
        gap: 0.25rem;
    }

    .navbar-actions :deep(.p-button-label) {
        display: none;
    }
}
</style>
