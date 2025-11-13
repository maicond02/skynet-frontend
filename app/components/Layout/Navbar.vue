<template>
    <nav class="navbar">
        <div class="navbar-container">
            <div class="brand-container" @click="navigateToHome">
                <div class="brand-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#gradient1)" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" fill="url(#gradient2)" />
                        <path d="M2 17L12 22L22 17" stroke="url(#gradient1)" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="url(#gradient1)" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <defs>
                            <linearGradient id="gradient1" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stop-color="#38bdf8" />
                                <stop offset="100%" stop-color="#3b82f6" />
                            </linearGradient>
                            <linearGradient id="gradient2" x1="2" y1="2" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3" />
                                <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.1" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <span class="brand-logo">Skynet</span>
            </div>

            <div class="desktop-menu">
                <div class="menu-links">
                    <a v-for="item in menuItems" :key="item.label" @click="item.command" class="menu-link">
                        <i :class="`pi ${item.icon}`"></i>
                        {{ item.label }}
                    </a>
                </div>
                <div class="navbar-actions">
                    <Button label="Login" icon="pi pi-sign-in" text @click="navigateToLogin" class="login-btn" />
                    <Button label="Registro" icon="pi pi-user-plus" severity="primary" @click="navigateToRegister"
                        class="register-btn" />
                </div>
            </div>

            <div class="mobile-controls">
                <Button label="Login" icon="pi pi-sign-in" text @click="navigateToLogin" class="login-btn-mobile" />
                <Button label="Registro" icon="pi pi-user-plus" severity="primary" @click="navigateToRegister"
                    class="register-btn-mobile" />
                <Button :icon="mobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'" text @click="toggleMobileMenu"
                    class="menu-toggle" />
            </div>
        </div>

        <Transition name="mobile-menu">
            <div v-if="mobileMenuOpen" class="mobile-menu">
                <a v-for="item in menuItems" :key="item.label" @click="handleMobileMenuClick(item.command)"
                    class="mobile-menu-link">
                    <i :class="`pi ${item.icon}`"></i>
                    {{ item.label }}
                </a>
            </div>
        </Transition>
    </nav>
</template>

<script>
import Button from 'primevue/button'

export default {
    name: 'LayoutNavbar',

    components: {
        Button
    },

    data() {
        return {
            mobileMenuOpen: false,
            menuItems: [
                {
                    label: 'Home',
                    icon: 'pi-home',
                    command: () => this.handleScrollTo('top')
                },
                {
                    label: 'Visão em Tempo Real',
                    icon: 'pi-video',
                    command: () => this.handleScrollTo('tela-1')
                },
                {
                    label: 'Segurança & Privacidade',
                    icon: 'pi-shield',
                    command: () => this.handleScrollTo('tela-2')
                },
                {
                    label: 'Onde Usar',
                    icon: 'pi-map-marker',
                    command: () => this.handleScrollTo('tela-3')
                }
            ]
        }
    },

    methods: {
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen
        },

        handleMobileMenuClick(command) {
            this.mobileMenuOpen = false
            if (command) {
                command()
            }
        },

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
        },

        navigateToHome() {
            this.$router.push('/')
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
    background: rgba(0, 0, 0, 0.95);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.brand-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    transition: transform 0.2s ease;
    z-index: 51;
}

.brand-container:hover {
    transform: scale(1.02);
}

.brand-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.brand-icon svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.4));
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
    text-transform: uppercase;
    position: relative;
}

.brand-logo::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #38bdf8, #3b82f6);
    transition: width 0.3s ease;
}

.brand-container:hover .brand-logo::after {
    width: 100%;
}

.desktop-menu {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex: 1;
    justify-content: flex-end;
}

.menu-links {
    display: flex;
    gap: 0.5rem;
}

.menu-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    color: rgba(255, 255, 255, 0.9);
    background: transparent;
    border-radius: 8px;
    transition: all 0.2s ease;
    cursor: pointer;
    font-size: 0.9375rem;
    font-weight: 500;
    text-decoration: none;
}

.menu-link i {
    color: rgba(255, 255, 255, 0.7);
}

.menu-link:hover {
    background: rgba(59, 130, 246, 0.12);
    color: #38bdf8;
}

.menu-link:hover i {
    color: #38bdf8;
}

.navbar-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
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

.mobile-controls {
    display: none;
}

.mobile-menu {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.98);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding: 1rem;
    z-index: 49;
}

.mobile-menu-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    color: rgba(255, 255, 255, 0.9);
    background: rgba(15, 23, 42, 0.5);
    border-radius: 8px;
    margin-bottom: 0.5rem;
    transition: all 0.2s ease;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.mobile-menu-link:last-child {
    margin-bottom: 0;
}

.mobile-menu-link i {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.125rem;
}

.mobile-menu-link:active {
    background: rgba(59, 130, 246, 0.2);
    color: #38bdf8;
    border-color: rgba(56, 189, 248, 0.3);
}

.mobile-menu-link:active i {
    color: #38bdf8;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition: all 0.3s ease;
}

.mobile-menu-enter-from {
    opacity: 0;
    transform: translateY(-20px);
}

.mobile-menu-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

@media (max-width: 1024px) {
    .navbar-container {
        padding: 0.75rem 1.5rem;
    }
}

@media (max-width: 768px) {
    .navbar-container {
        padding: 0.75rem 1rem;
    }

    .brand-container {
        gap: 0.5rem;
    }

    .brand-icon {
        width: 28px;
        height: 28px;
    }

    .brand-logo {
        font-size: 1.25rem;
    }

    .desktop-menu {
        display: none;
    }

    .mobile-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .login-btn-mobile,
    .register-btn-mobile {
        font-size: 0.875rem;
    }

    .menu-toggle {
        font-size: 1.25rem;
        color: rgba(255, 255, 255, 0.9) !important;
    }

    .menu-toggle:hover {
        background: rgba(59, 130, 246, 0.12) !important;
        color: #38bdf8 !important;
    }
}

@media (max-width: 480px) {
    .navbar-container {
        padding: 0.625rem 0.75rem;
    }

    .brand-logo {
        font-size: 1.125rem;
    }

    .login-btn-mobile :deep(.p-button-label),
    .register-btn-mobile :deep(.p-button-label) {
        display: none;
    }

    .mobile-menu {
        top: 56px;
    }
}
</style>
