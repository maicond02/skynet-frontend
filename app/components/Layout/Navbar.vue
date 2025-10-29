<template>
    <nav class="navbar">
        <Menubar :model="menuItems" class="custom-menubar">
            <template #start>
                <span class="brand-logo">Skynet</span>
            </template>
        </Menubar>
    </nav>
</template>

<script>
import Menubar from 'primevue/menubar'

export default {
    name: 'LayoutNavbar',

    components: {
        Menubar
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
    background: rgba(12, 19, 34, 0.95);
    border-bottom: 1px solid rgba(62, 161, 255, 0.15);
}

.brand-logo {
    font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #3ea1ff, #7c3aed);
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
    padding: 0.5rem 1rem;
    max-width: 1200px;
    margin: 0 auto;
}

:deep(.p-menubar-root-list) {
    gap: 0.5rem;
}

:deep(.p-menuitem-link) {
    background: transparent !important;
    color: rgba(255, 255, 255, 0.9) !important;
    border-radius: 8px;
    transition: all 0.2s ease;
}

:deep(.p-menuitem-link:hover) {
    background: rgba(62, 161, 255, 0.1) !important;
    color: #3ea1ff !important;
}

:deep(.p-menuitem-icon) {
    color: rgba(255, 255, 255, 0.7);
}

:deep(.p-menuitem-link:hover .p-menuitem-icon) {
    color: #3ea1ff;
}

@media (max-width: 768px) {
    .brand-logo {
        font-size: 1.25rem;
        margin-right: 1rem;
    }

    :deep(.custom-menubar) {
        padding: 0.5rem;
    }
}
</style>
