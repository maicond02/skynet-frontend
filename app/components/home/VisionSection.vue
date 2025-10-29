<template>
    <HomeSection section-id="tela-1" title="Visão em tempo real, sem complicação"
        tagline="YOLOv8 + FastAPI • integra com suas câmeras">

        <div style="display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1rem;">
            <div v-for="badge in badges" :key="badge"
                style="background: rgba(62, 161, 255, 0.1); padding: 0.35rem 0.7rem; border-radius: 6px; border: 1px solid rgba(62, 161, 255, 0.3); font-size: 0.8rem;">
                <i class="pi pi-check-circle" style="color: #4ade80; margin-right: 0.35rem; font-size: 0.75rem;"></i>
                <span style="color: rgba(255, 255, 255, 0.9);">{{ badge }}</span>
            </div>
        </div>

        <div
            style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; max-width: 100%; margin: 0 auto 1rem; padding: 0 1rem;">
            <FeatureCard v-for="feature in features" :key="feature.title" :icon="feature.icon" :title="feature.title"
                :description="feature.description" />
        </div>

        <div
            style="background: linear-gradient(135deg, rgba(62, 161, 255, 0.1), rgba(124, 58, 237, 0.1)); padding: 1rem 1.25rem; border-radius: 10px; border: 1px solid rgba(62, 161, 255, 0.2); max-width: 700px; margin: 0 auto;">
            <h3 style="margin: 0 0 0.6rem 0; color: #fff; font-size: 0.95rem; text-align: center;">
                <i class="pi pi-star-fill" style="color: #fbbf24; margin-right: 0.35rem; font-size: 0.8rem;"></i>
                Como Funciona
            </h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                <div v-for="step in steps" :key="step.number" style="text-align: center;">
                    <div
                        style="background: rgba(62, 161, 255, 0.2); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.4rem; font-weight: bold; font-size: 0.85rem; color: #3ea1ff;">
                        {{ step.number }}
                    </div>
                    <h4 style="margin: 0 0 0.25rem 0; color: #fff; font-size: 0.85rem;">{{ step.title }}</h4>
                    <p style="margin: 0; color: rgba(255, 255, 255, 0.7); font-size: 0.75rem;">{{ step.description }}
                    </p>
                </div>
            </div>
        </div>

        <template #actions>
            <Button label="Ver demonstração" icon="pi pi-play" severity="primary" />
            <Button label="Começar grátis" icon="pi pi-arrow-right" severity="secondary" outlined />
        </template>
    </HomeSection>
</template>

<script>
import Button from 'primevue/button'
import HomeSection from '~/components/Home/Section.vue'
import FeatureCard from '~/components/Home/FeatureCard.vue'

export default {
    name: 'VisionSection',

    components: {
        Button,
        HomeSection,
        FeatureCard
    },

    data() {
        return {
            badges: [
                'Setup em minutos',
                'Sem infraestrutura complexa',
                'Alertas inteligentes'
            ],

            features: [
                {
                    icon: 'pi-bolt',
                    title: 'Processamento Ultra-Rápido',
                    description: 'Análise de vídeo em tempo real com latência inferior a 100ms. Detecção instantânea de eventos críticos para resposta imediata.'
                },
                {
                    icon: 'pi-shield',
                    title: 'Precisão Excepcional',
                    description: '99% de acurácia na detecção de eventos. Algoritmo YOLOv8 treinado com milhões de imagens para máxima confiabilidade.'
                },
                {
                    icon: 'pi-cloud',
                    title: 'API REST Simples',
                    description: 'Integração facilitada com qualquer sistema. Documentação completa, SDKs e suporte para as principais linguagens.'
                },
                {
                    icon: 'pi-chart-line',
                    title: 'Dashboard em Tempo Real',
                    description: 'Visualize todos os eventos detectados em um painel intuitivo. Histórico completo e estatísticas detalhadas.'
                },
                {
                    icon: 'pi-bell',
                    title: 'Alertas Customizáveis',
                    description: 'Configure notificações por email, SMS ou webhook. Defina regras específicas para cada tipo de evento detectado.'
                },
                {
                    icon: 'pi-code',
                    title: 'Código Aberto',
                    description: 'Backend FastAPI totalmente documentado. Customize e adapte a solução para suas necessidades específicas.'
                }
            ],

            steps: [
                {
                    number: 1,
                    title: 'Conecte suas câmeras',
                    description: 'Configure via API ou interface web'
                },
                {
                    number: 2,
                    title: 'Defina os eventos',
                    description: 'Escolha o que deseja detectar'
                },
                {
                    number: 3,
                    title: 'Receba alertas',
                    description: 'Notificações em tempo real'
                }
            ]
        }
    }
}
</script>

<style scoped></style>
