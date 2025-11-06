<template>
    <HomeSection section-id="tela-2" title="Segurança & Privacidade"
        tagline="Proteção de dados e conformidade em primeiro lugar">

        <p
            style="max-width: 700px; margin: 0 auto 1.5rem; color: rgba(226, 232, 240, 0.9); font-size: 0.95rem; line-height: 1.6;">
            Desenvolvemos nosso sistema com as melhores práticas de segurança e privacidade.
            Seu controle sobre os dados é absoluto, com transparência total sobre processamento e armazenamento.
        </p>

        <div
            style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 100%; margin: 0 auto 1.5rem; padding: 0 1rem;">
            <FeatureCard v-for="security in securityFeatures" :key="security.title" :icon="security.icon"
                :title="security.title" :description="security.description" />
        </div>

        <div
            style="background: linear-gradient(135deg, rgba(15, 23, 42, 0.82), rgba(17, 24, 39, 0.82)); padding: 1.25rem; border-radius: 12px; border: 1px solid rgba(148, 163, 184, 0.24); max-width: 800px; margin: 0 auto;">
            <h3 style="margin: 0 0 1rem 0; color: #f8fafc; font-size: 1rem; text-align: center;">
                <i class="pi pi-shield" style="color: #38bdf8; margin-right: 0.5rem;"></i>
                Certificações & Conformidade
            </h3>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <div v-for="cert in certifications" :key="cert"
                    style="background: rgba(30, 41, 59, 0.65); padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid rgba(148, 163, 184, 0.28); font-size: 0.85rem; color: rgba(226, 232, 240, 0.92);">
                    <i class="pi pi-check-circle" style="color: #38bdf8; margin-right: 0.4rem; font-size: 0.8rem;"></i>
                    {{ cert }}
                </div>
            </div>
        </div>

        <template #actions>
            <Button label="Política de Privacidade" icon="pi pi-file" severity="primary" />
            <Button label="Falar com Especialista" icon="pi pi-comments" severity="secondary" outlined />
        </template>
    </HomeSection>
</template>

<script>
import Button from 'primevue/button'
import HomeSection from '~/components/Home/Section.vue'
import FeatureCard from '~/components/Home/FeatureCard.vue'

export default {
    name: 'SecuritySection',

    components: {
        Button,
        HomeSection,
        FeatureCard
    },

    data() {
        return {
            securityFeatures: [
                {
                    icon: 'pi-lock',
                    title: 'Criptografia End-to-End',
                    description: 'Todos os dados são criptografados em trânsito e em repouso. Utilizamos AES-256 e TLS 1.3 para máxima segurança.'
                },
                {
                    icon: 'pi-eye-slash',
                    title: 'Privacidade por Design',
                    description: 'Processamento local opcional. Você decide se os dados ficam na sua infraestrutura ou na nuvem.'
                },
                {
                    icon: 'pi-verified',
                    title: 'Conformidade LGPD',
                    description: 'Sistema desenvolvido em conformidade com a Lei Geral de Proteção de Dados. Auditoria completa disponível.'
                },
                {
                    icon: 'pi-history',
                    title: 'Logs & Auditoria',
                    description: 'Registro completo de todas as operações. Rastreabilidade total para atender requisitos de compliance.'
                }
            ],

            certifications: [
                'LGPD Compliant',
                'ISO 27001 Ready',
                'SOC 2 Type II',
                'Código Aberto'
            ]
        }
    }
}
</script>

<style scoped></style>
