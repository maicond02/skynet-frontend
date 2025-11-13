<template>
    <HomeSection section-id="tela-3" title="Onde Usar" tagline="Soluções versáteis para diferentes necessidades">

        <p class="intro-text">
            Nossa plataforma de visão computacional se adapta a diversos cenários.
            De segurança patrimonial a análise de fluxo, as possibilidades são infinitas.
        </p>

        <div class="usecases-grid">
            <FeatureCard v-for="useCase in useCases" :key="useCase.title" :icon="useCase.icon" :title="useCase.title"
                :description="useCase.description" />
        </div>

        <div class="sectors-box">
            <h3 class="sectors-title">
                <i class="pi pi-star" style="color: #38bdf8; margin-right: 0.5rem;"></i>
                Setores que Utilizam
            </h3>
            <div class="sectors-list">
                <div v-for="sector in sectors" :key="sector.name" class="sector-item">
                    <i :class="`pi ${sector.icon}`" style="color: #38bdf8; font-size: 0.9rem;"></i>
                    {{ sector.name }}
                </div>
            </div>
        </div>

        <template #actions>
            <Button label="Agendar Demonstração" icon="pi pi-calendar" severity="primary" />
            <Button label="Ver Casos de Sucesso" icon="pi pi-book" severity="secondary" outlined />
        </template>
    </HomeSection>
</template>

<script>
import Button from 'primevue/button'
import HomeSection from '~/components/Home/Section.vue'
import FeatureCard from '~/components/Home/FeatureCard.vue'

export default {
    name: 'UseCasesSection',

    components: {
        Button,
        HomeSection,
        FeatureCard
    },

    data() {
        return {
            useCases: [
                {
                    icon: 'pi-home',
                    title: 'Segurança Patrimonial',
                    description: 'Monitoramento perimetral 24/7 com detecção de invasões, escaladas e movimentos suspeitos em tempo real.'
                },
                {
                    icon: 'pi-car',
                    title: 'Controle de Acesso',
                    description: 'Gestão inteligente de fluxo de pessoas e veículos. Contagem automática, análise de padrões e alertas.'
                },
                {
                    icon: 'pi-exclamation-triangle',
                    title: 'Detecção de Incidentes',
                    description: 'Identificação automática de quedas, aglomerações, abandono de objetos e comportamentos anormais.'
                },
                {
                    icon: 'pi-building',
                    title: 'Cidades Inteligentes',
                    description: 'Monitoramento urbano, análise de tráfego, gestão de espaços públicos e segurança em larga escala.'
                }
            ],

            sectors: [
                { name: 'Varejo', icon: 'pi-shopping-cart' },
                { name: 'Indústria', icon: 'pi-cog' },
                { name: 'Logística', icon: 'pi-truck' },
                { name: 'Educação', icon: 'pi-book' },
                { name: 'Saúde', icon: 'pi-heart' },
                { name: 'Governo', icon: 'pi-flag' }
            ]
        }
    }
}
</script>

<style scoped>
.intro-text {
    max-width: 700px;
    margin: 0 auto 1.5rem;
    color: rgba(226, 232, 240, 0.9);
    font-size: 0.875rem;
    line-height: 1.6;
    padding: 0 1rem;
}

@media (min-width: 768px) {
    .intro-text {
        font-size: 0.95rem;
    }
}

.usecases-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 100%;
    margin: 0 auto 1.5rem;
    padding: 0 1rem;
}

@media (min-width: 768px) {
    .usecases-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.sectors-box {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.82), rgba(17, 24, 39, 0.82));
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.24);
    max-width: 900px;
    margin: 0 auto;
}

@media (min-width: 768px) {
    .sectors-box {
        padding: 1.25rem;
    }
}

.sectors-title {
    margin: 0 0 0.75rem 0;
    color: #f8fafc;
    font-size: 0.9rem;
    text-align: center;
}

@media (min-width: 768px) {
    .sectors-title {
        font-size: 1rem;
        margin: 0 0 1rem 0;
    }
}

.sectors-list {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
}

@media (min-width: 768px) {
    .sectors-list {
        gap: 1rem;
    }
}

.sector-item {
    background: rgba(30, 41, 59, 0.65);
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    border: 1px solid rgba(148, 163, 184, 0.28);
    font-size: 0.8rem;
    color: rgba(226, 232, 240, 0.92);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
}

@media (min-width: 768px) {
    .sector-item {
        padding: 0.6rem 1rem;
        font-size: 0.85rem;
    }
}
</style>
