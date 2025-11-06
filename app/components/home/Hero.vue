<template>
    <section class="hero">
        <div class="hero__overlay" />
        <div class="container">
            <h1 class="headline">{{ headline }}</h1>

            <p class="sub">{{ subtitle }}</p>

            <div class="actions">
                <Button label="Começar" class="btn-pill-white px-4 py-3" severity="secondary" rounded />
                <Button label="Ver demonstração" icon="pi pi-play" text class="btn-ghost-white px-4 py-3" rounded />
            </div>

            <div class="metrics grid">
                <div class="col-12 md:col-3">
                    <MetricsCard value="99%" title="Precisão na detecção de eventos" />
                </div>

                <div class="col-12 md:col-3">
                    <MetricsCard value="<100ms" title="Latência em tempo real" :is-primary="true" :is-accent="true"
                        icon="pi-leaf" />
                </div>

                <div class="col-12 md:col-3">
                    <MetricsCard value="24/7" title="Monitoramento contínuo" />
                </div>

                <div class="col-12 md:col-3">
                    <MetricsCard value="YOLOv8" title="Tecnologia de ponta em IA" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Button from 'primevue/button'
import MetricsCard from './MetricsCard.vue'

export default {
    name: 'HomeHero',

    components: {
        Button,
        MetricsCard
    },

    props: {
        headline: {
            type: String,
            default: 'Desbloqueando a tecnologia'
        },
        subtitle: {
            type: String,
            default: 'Capacitamos empresas a terem sucesso na era digital com soluções de TI que otimizam operações, aumentam a eficiência e impulsionam o crescimento.'
        }
    }
}
</script>

<style scoped>
.hero {
    position: relative;
    overflow: hidden;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.95), rgba(15, 23, 42, 0.92));
    color: #f8fafc;
    padding: 96px 0 56px;
    min-height: 100vh;
    height: 100vh;
    display: grid;
    place-items: center;
    gap: 1rem;
    scroll-snap-align: start;
}

.hero__overlay {
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(0deg,
            rgba(255, 255, 255, 0.05) 0,
            rgba(255, 255, 255, 0.05) 1px,
            transparent 1px,
            transparent 12px);
    opacity: 0.15;
    pointer-events: none;
    mix-blend-mode: overlay;
}

.container {
    width: min(1120px, 92vw);
    margin: 0 auto;
    text-align: center;
}

.headline {
    font-size: clamp(32px, 4.4vw, 64px);
    line-height: 1.08;
    font-weight: 800;
    letter-spacing: 0.2px;
    margin: 0;
}

.sub {
    margin: 18px auto 28px;
    color: rgba(226, 232, 240, 0.76);
    font-size: clamp(15px, 1.8vw, 18px);
    max-width: 760px;
}

.actions {
    display: flex;
    gap: 14px;
    justify-content: center;
    align-items: center;
    margin-bottom: 48px;
}

.metrics {
    margin-top: 6px;
}

.grid {
    display: grid;
    gap: 16px;
}

.col-12 {
    grid-column: 1 / -1;
}

@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(12, 1fr);
    }

    .md\:col-3 {
        grid-column: span 3 / span 3;
    }
}

.p-button.p-button-text.btn-ghost-white {
    background-color: transparent;
    border-color: transparent;
}

.p-button.p-button-text.btn-ghost-white,
.p-button.p-button-text.btn-ghost-white .p-button-label,
.p-button.p-button-text.btn-ghost-white .p-button-icon {
    color: #fff !important;
}

.p-button.btn-pill-white {
    background-color: #ffffff;
    color: #111827;
    border-color: transparent;
    border-radius: 9999px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
    transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.06s ease;
}

.p-button.btn-pill-white .p-button-label,
.p-button.btn-pill-white .p-button-icon {
    color: #111827;
}
</style>
