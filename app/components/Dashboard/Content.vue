<template>
    <div class="p-4 sm:p-6 lg:p-8">
        <h1 class="text-2xl font-bold text-white mb-6">Dashboard de Monitoramento</h1>

        <div class="flex flex-col xl:flex-row gap-6">
            <div class="xl:flex-1 xl:w-3/4">
                <div class="video-player-container">
                    <div class="player-header">
                        <h2 class="text-lg font-semibold text-gray-200">Câmera 01 - Pátio</h2>

                        <div class="live-indicator">
                            <span class="live-pulse"></span>
                            LIVE
                        </div>
                    </div>

                    <div class="aspect-video bg-black overflow-hidden">
                        <img :src="videoFeedUrl" alt="Video Feed" class="w-full h-full object-contain" />
                    </div>

                    <div class="player-controls">
                        <div class="controls-left">
                            <div class="rec-indicator" :class="{ 'is-recording': isRecording }">
                                <span class="rec-dot"></span>
                                REC
                            </div>
                            <span class="font-mono text-sm">{{ currentTime }}</span>
                        </div>

                        <div class="controls-right">
                            <i class="pi pi-cog control-icon"></i>
                            <i class="pi pi-arrows-alt control-icon"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="xl:w-1/4 min-w-[320px] flex flex-col gap-4">
                <div class="status-cards-row">
                    <Card class="status-card compact">
                        <template #title>Severidade</template>
                        <template #content>
                            <Tag :severity="getSeverityTag(status.level)" :value="status.level || 'N/A'"
                                class="text-xs px-2 py-1" />
                        </template>
                    </Card>

                    <Card class="status-card compact">
                        <template #title>Confiança</template>
                        <template #content>
                            <p class="text-lg font-semibold text-white">
                                {{ (status.max_confidence * 100).toFixed(0) }}%
                            </p>
                        </template>
                    </Card>

                    <Card class="status-card compact">
                        <template #title>Detecções</template>
                        <template #content>
                            <p class="text-lg font-semibold text-white">{{ status.detections }}</p>
                        </template>
                    </Card>
                </div>

                <Card v-if="status.alert" class="alert-card">
                    <template #content>
                        <div class="flex items-center gap-3">
                            <i class="pi pi-exclamation-triangle text-yellow-400 text-xl"></i>

                            <div>
                                <h3 class="font-bold text-yellow-300">Alerta Disparado</h3>
                                <p class="text-sm text-yellow-300/80">{{ status.alert }}</p>
                            </div>
                        </div>
                    </template>
                </Card>

                <Card class="logs-card">
                    <template #title>Logs Recentes</template>
                    <template #content>
                        <ScrollPanel style="width: 100%; height: 180px">
                            <div v-if="status.logs.length" class="flex flex-col gap-2 pr-2">
                                <p v-for="(log, index) in status.logs.slice().reverse()" :key="index"
                                    class="text-sm font-mono text-gray-400 border-b border-gray-700 pb-1">
                                    {{ log }}
                                </p>
                            </div>
                            <p v-else class="text-gray-500">Nenhum log recente.</p>
                        </ScrollPanel>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
import Tag from 'primevue/tag'
import Card from 'primevue/card'
import ScrollPanel from 'primevue/scrollpanel'

export default {
    name: 'DashboardMonitoramento',
    components: {
        Tag,
        Card,
        ScrollPanel
    },
    data() {
        const API_BASE_URL = 'http://localhost:8001'
        return {
            API_BASE_URL,
            videoFeedUrl: `${API_BASE_URL}/video_feed`,
            currentTime: new Date().toLocaleTimeString('pt-BR'),
            status: {
                level: 'NONE',
                max_confidence: 0.0,
                detections: 0,
                alert: '',
                logs: []
            },
            statusIntervalId: null,
            timeIntervalId: null
        }
    },
    computed: {
        isRecording() {
            return this.status.level === 'HIGH' || this.status.level === 'MILD'
        }
    },
    methods: {
        async fetchStatus() {
            try {
                const response = await fetch(`${this.API_BASE_URL}/status_view`)
                if (!response.ok) throw new Error('Falha ao buscar status')
                const data = await response.json()
                // Atualiza mantendo a reatividade do objeto
                this.status.level = data.level ?? this.status.level
                this.status.max_confidence = data.max_confidence ?? this.status.max_confidence
                this.status.detections = data.detections ?? this.status.detections
                this.status.alert = data.alert ?? this.status.alert
                this.status.logs = Array.isArray(data.logs) ? data.logs : this.status.logs
            } catch (error) {
                console.error('Erro ao atualizar status:', error)
                this.status.level = 'ERROR'
                this.status.alert = 'Conexão perdida'
                this.status.logs = []
                this.status.detections = 0
                this.status.max_confidence = 0
            }
        },
        getSeverityTag(level) {
            switch (level) {
                case 'HIGH':
                    return 'danger'
                case 'MILD':
                    return 'warning'
                case 'NONE':
                    return 'success'
                default:
                    return 'info'
            }
        }
    },
    mounted() {
        // Atualiza imediatamente ao montar
        this.fetchStatus()

        // Atualizações periódicas
        this.statusIntervalId = setInterval(this.fetchStatus, 1500)
        this.timeIntervalId = setInterval(() => {
            this.currentTime = new Date().toLocaleTimeString('pt-BR')
        }, 1000)
    },
    beforeUnmount() {
        if (this.statusIntervalId) clearInterval(this.statusIntervalId)
        if (this.timeIntervalId) clearInterval(this.timeIntervalId)
    }
}
</script>

<style scoped>
.video-player-container {
    background-color: #000;
    border: 1px solid rgb(255 255 255 / 0.1);
    border-radius: 0.75rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.player-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background-color: rgb(255 255 255 / 0.05);
}

.live-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #f87171;
}

.live-pulse {
    width: 0.625rem;
    height: 0.625rem;
    background-color: #ef4444;
    border-radius: 9999px;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.3;
    }
}

.player-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: rgb(255 255 255 / 0.05);
    color: #d1d5db;
}

.controls-left,
.controls-right {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.control-icon {
    font-size: 1.25rem;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s;
}

.control-icon:hover {
    opacity: 1;
}

.rec-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    color: #6b7280;
    transition: color 0.3s;
}

.rec-indicator.is-recording {
    color: #f87171;
}

.rec-dot {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 9999px;
    background-color: currentColor;
    transition: background-color 0.3s;
}

.status-cards-row {
    display: flex;
    gap: 0.5rem;
    width: 100%;
}

.status-cards-row .status-card.compact {
    flex: 1;
    min-width: 0;
}

.status-card,
.alert-card,
.logs-card {
    background: rgba(0, 0, 0, 0.3) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 12px !important;
}

.status-card.compact :deep(.p-card-body) {
    padding: 0.5rem !important;
}

.status-card.compact :deep(.p-card-title) {
    font-size: 0.7rem;
    color: #d1d5db;
    margin-bottom: 0.25rem;
    font-weight: 500;
    text-align: center;
}

.status-card.compact :deep(.p-card-content) {
    text-align: center;
}

.status-card :deep(.p-card),
.alert-card :deep(.p-card),
.logs-card :deep(.p-card) {
    background: transparent !important;
    border: none !important;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37) !important;
}

.status-card :deep(.p-card-title) {
    font-size: 0.875rem;
    color: #d1d5db;
    margin-bottom: 0.75rem;
    font-weight: 500;
}

.status-card :deep(.p-card-content),
.alert-card :deep(.p-card-content),
.logs-card :deep(.p-card-content) {
    padding: 0;
}

.status-card :deep(.p-card-body),
.alert-card :deep(.p-card-body),
.logs-card :deep(.p-card-body) {
    padding: 1.25rem;
}

.logs-card :deep(.p-card-title) {
    font-size: 0.875rem;
    color: #d1d5db;
    margin-bottom: 0.75rem;
    font-weight: 500;
}
</style>
