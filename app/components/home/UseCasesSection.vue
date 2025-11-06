<template>
    <HomeSection section-id="tela-3" title="Onde Usar" tagline="Soluções versáteis para diferentes necessidades">

        <p
            style="max-width: 700px; margin: 0 auto 1.5rem; color: rgba(226, 232, 240, 0.9); font-size: 0.95rem; line-height: 1.6;">
            Nossa plataforma de visão computacional se adapta a diversos cenários.
            De segurança patrimonial a análise de fluxo, as possibilidades são infinitas.
        </p>

        <div
            style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 100%; margin: 0 auto 1.5rem; padding: 0 1rem;">
            <FeatureCard v-for="useCase in useCases" :key="useCase.title" :icon="useCase.icon" :title="useCase.title"
                :description="useCase.description" />
        </div>

        <div
            style="background: linear-gradient(135deg, rgba(15, 23, 42, 0.82), rgba(17, 24, 39, 0.82)); padding: 1.25rem; border-radius: 12px; border: 1px solid rgba(148, 163, 184, 0.24); max-width: 900px; margin: 0 auto;">
            <h3 style="margin: 0 0 1rem 0; color: #f8fafc; font-size: 1rem; text-align: center;">
                <i class="pi pi-star" style="color: #38bdf8; margin-right: 0.5rem;"></i>
                Setores que Utilizam
            </h3>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <div v-for="sector in sectors" :key="sector.name"
                    style="background: rgba(30, 41, 59, 0.65); padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid rgba(148, 163, 184, 0.28); font-size: 0.85rem; color: rgba(226, 232, 240, 0.92); display: flex; align-items: center; gap: 0.5rem;">
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

<style scoped></style>
