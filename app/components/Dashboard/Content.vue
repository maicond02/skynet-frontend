<template>
    <div class="dashboard-container">
        <!-- Header Stats -->
        <div class="dashboard-header">
            <div class="header-title">
                <h1>Dashboard de Monitoramento</h1>
                <p class="header-subtitle">Visão em tempo real das câmeras e detecções</p>
            </div>

            <div class="quick-stats">
                <div class="stat-item">
                    <i class="pi pi-video"></i>
                    <div>
                        <span class="stat-label">Câmeras Ativas</span>
                        <span class="stat-value">1</span>
                    </div>
                </div>
                <div class="stat-item">
                    <i class="pi pi-check-circle" :class="connectionStatus"></i>
                    <div>
                        <span class="stat-label">Status</span>
                        <span class="stat-value">{{ isConnected ? 'Online' : 'Offline' }}</span>
                    </div>
                </div>
                <div class="stat-item">
                    <i class="pi pi-clock"></i>
                    <div>
                        <span class="stat-label">Uptime</span>
                        <span class="stat-value">{{ uptime }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="dashboard-grid">
            <!-- Video Feed Section -->
            <div class="video-section">
                <div class="video-player-container">
                    <div class="player-header">
                        <div class="camera-info">
                            <i class="pi pi-video"></i>
                            <h2>Câmera 01 - Pátio Principal</h2>
                        </div>

                        <div class="header-badges">
                            <div class="live-indicator">
                                <span class="live-pulse"></span>
                                LIVE
                            </div>
                            <div class="rec-indicator" :class="{ 'is-recording': isRecording }">
                                <span class="rec-dot"></span>
                                REC
                            </div>
                        </div>
                    </div>

                    <div class="video-wrapper">
                        <img :src="videoFeedUrl" alt="Video Feed" class="video-feed" />

                        <!-- Overlay Info -->
                        <div class="video-overlay">
                            <div class="overlay-item">
                                <i class="pi pi-calendar"></i>
                                {{ currentDate }}
                            </div>
                            <div class="overlay-item">
                                <i class="pi pi-clock"></i>
                                {{ currentTime }}
                            </div>
                        </div>
                    </div>

                    <div class="player-controls">
                        <div class="controls-left">
                            <Button icon="pi pi-play" text rounded size="small" class="control-btn" />
                            <Button icon="pi pi-pause" text rounded size="small" class="control-btn" />
                            <Button icon="pi pi-download" text rounded size="small" class="control-btn" />
                        </div>

                        <div class="controls-right">
                            <Button icon="pi pi-camera" text rounded size="small" class="control-btn"
                                v-tooltip.top="'Capturar Frame'" />
                            <Button icon="pi pi-cog" text rounded size="small" class="control-btn"
                                v-tooltip.top="'Configurações'" />
                            <Button icon="pi pi-arrows-alt" text rounded size="small" class="control-btn"
                                v-tooltip.top="'Tela Cheia'" />
                        </div>
                    </div>
                </div>

                <!-- Detection Info Cards -->
                <div class="detection-cards">
                    <Card class="info-card">
                        <template #content>
                            <div class="card-content">
                                <i class="pi pi-shield-check card-icon"></i>
                                <div>
                                    <p class="card-label">Nível de Severidade</p>
                                    <Tag :severity="getSeverityTag(status.level)" :value="status.level || 'NONE'"
                                        class="severity-tag" />
                                </div>
                            </div>
                        </template>
                    </Card>

                    <Card class="info-card">
                        <template #content>
                            <div class="card-content">
                                <i class="pi pi-percentage card-icon"></i>
                                <div>
                                    <p class="card-label">Confiança Máxima</p>
                                    <p class="card-value">{{ (status.max_confidence * 100).toFixed(1) }}%</p>
                                </div>
                            </div>
                        </template>
                    </Card>

                    <Card class="info-card">
                        <template #content>
                            <div class="card-content">
                                <i class="pi pi-eye card-icon"></i>
                                <div>
                                    <p class="card-label">Total de Detecções</p>
                                    <p class="card-value">{{ status.detections }}</p>
                                </div>
                            </div>
                        </template>
                    </Card>
                </div>
            </div>

            <!-- Sidebar Section -->
            <div class="sidebar-section">
                <!-- Alert Card -->
                <Card v-if="status.alert" class="alert-card">
                    <template #content>
                        <div class="alert-content">
                            <div class="alert-header">
                                <i class="pi pi-exclamation-triangle"></i>
                                <h3>Alerta Ativo</h3>
                            </div>
                            <p class="alert-message">{{ status.alert }}</p>
                            <div class="alert-time">{{ currentTime }}</div>
                        </div>
                    </template>
                </Card>

                <!-- Activity Logs -->
                <Card class="logs-card">
                    <template #header>
                        <div class="card-header">
                            <div class="header-title-group">
                                <i class="pi pi-list"></i>
                                <h3>Logs de Atividade</h3>
                            </div>
                            <Button icon="pi pi-refresh" text rounded size="small" @click="fetchStatus"
                                class="refresh-btn" v-tooltip.left="'Atualizar'" />
                        </div>
                    </template>
                    <template #content>
                        <ScrollPanel style="width: 100%; height: 320px">
                            <div v-if="status.logs.length" class="logs-list">
                                <div v-for="(log, index) in status.logs.slice().reverse()" :key="index"
                                    class="log-item">
                                    <i class="pi pi-circle-fill log-dot"></i>
                                    <span class="log-text">{{ log }}</span>
                                </div>
                            </div>
                            <div v-else class="empty-state">
                                <i class="pi pi-inbox"></i>
                                <p>Nenhum log recente</p>
                            </div>
                        </ScrollPanel>
                    </template>
                </Card>

                <!-- System Status -->
                <Card class="system-card">
                    <template #header>
                        <div class="card-header">
                            <div class="header-title-group">
                                <i class="pi pi-server"></i>
                                <h3>Status do Sistema</h3>
                            </div>
                        </div>
                    </template>
                    <template #content>
                        <div class="system-status">
                            <div class="status-row">
                                <span class="status-label">
                                    <i class="pi pi-bolt"></i>
                                    CPU
                                </span>
                                <span class="status-value">32%</span>
                            </div>
                            <div class="status-row">
                                <span class="status-label">
                                    <i class="pi pi-database"></i>
                                    Memória
                                </span>
                                <span class="status-value">1.2 GB</span>
                            </div>
                            <div class="status-row">
                                <span class="status-label">
                                    <i class="pi pi-wifi"></i>
                                    Latência
                                </span>
                                <span class="status-value">45ms</span>
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
import Tag from 'primevue/tag'
import Card from 'primevue/card'
import Button from 'primevue/button'
import ScrollPanel from 'primevue/scrollpanel'

export default {
    name: 'DashboardMonitoramento',
    components: {
        Tag,
        Card,
        Button,
        ScrollPanel
    },
    data() {
        const API_BASE_URL = 'http://localhost:8001'
        return {
            API_BASE_URL,
            videoFeedUrl: `${API_BASE_URL}/video_feed`,
            currentTime: new Date().toLocaleTimeString('pt-BR'),
            currentDate: new Date().toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            uptime: '2h 34m',
            status: {
                level: 'NONE',
                max_confidence: 0.0,
                detections: 0,
                alert: '',
                logs: []
            },
            statusIntervalId: null,
            timeIntervalId: null,
            isConnected: true
        }
    },
    computed: {
        isRecording() {
            return this.status.level === 'HIGH' || this.status.level === 'MILD'
        },
        connectionStatus() {
            return this.isConnected ? 'text-green-400' : 'text-red-400'
        }
    },
    methods: {
        async fetchStatus() {
            try {
                const response = await fetch(`${this.API_BASE_URL}/status_view`)
                if (!response.ok) throw new Error('Falha ao buscar status')
                const data = await response.json()

                this.status.level = data.level ?? this.status.level
                this.status.max_confidence = data.max_confidence ?? this.status.max_confidence
                this.status.detections = data.detections ?? this.status.detections
                this.status.alert = data.alert ?? this.status.alert
                this.status.logs = Array.isArray(data.logs) ? data.logs : this.status.logs
                this.isConnected = true
            } catch (error) {
                console.error('Erro ao atualizar status:', error)
                this.status.level = 'ERROR'
                this.status.alert = 'Conexão perdida com o servidor'
                this.isConnected = false
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
        },
        updateTime() {
            this.currentTime = new Date().toLocaleTimeString('pt-BR')
            this.currentDate = new Date().toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        }
    },
    mounted() {
        this.fetchStatus()
        this.statusIntervalId = setInterval(this.fetchStatus, 1500)
        this.timeIntervalId = setInterval(this.updateTime, 1000)
    },
    beforeUnmount() {
        if (this.statusIntervalId) clearInterval(this.statusIntervalId)
        if (this.timeIntervalId) clearInterval(this.timeIntervalId)
    }
}
</script>

<style scoped>
.dashboard-container {
    padding: 1.5rem;
    max-width: 1600px;
    margin: 0 auto;
}

/* Header */
.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
}

.header-title h1 {
    font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: #e2e8f0;
    margin: 0 0 0.25rem;
}

.header-subtitle {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;
    margin: 0;
}

.quick-stats {
    display: flex;
    gap: 2rem;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.stat-item i {
    font-size: 1.5rem;
    color: #38bdf8;
}

.stat-item i.text-green-400 {
    color: #4ade80;
}

.stat-item i.text-red-400 {
    color: #f87171;
}

.stat-label {
    display: block;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.stat-value {
    display: block;
    font-size: 1.125rem;
    font-weight: 700;
    color: #fff;
}

/* Grid Layout */
.dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 1.5rem;
}

/* Video Section */
.video-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.video-player-container {
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
}

.player-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    background: rgba(0, 0, 0, 0.6);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.camera-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.camera-info i {
    color: #38bdf8;
    font-size: 1.25rem;
}

.camera-info h2 {
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    margin: 0;
}

.header-badges {
    display: flex;
    gap: 1rem;
}

.live-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.75rem;
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 700;
    color: #ef4444;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.live-pulse {
    width: 8px;
    height: 8px;
    background: #ef4444;
    border-radius: 50%;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0.5;
        transform: scale(0.8);
    }
}

.rec-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.75rem;
    background: rgba(107, 114, 128, 0.15);
    border: 1px solid rgba(107, 114, 128, 0.3);
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.3s ease;
}

.rec-indicator.is-recording {
    background: rgba(239, 68, 68, 0.15);
    border-color: rgba(239, 68, 68, 0.3);
    color: #ef4444;
}

.rec-dot {
    width: 8px;
    height: 8px;
    background: currentColor;
    border-radius: 50%;
}

.video-wrapper {
    position: relative;
    aspect-ratio: 16 / 9;
    background: #000;
}

.video-feed {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.video-overlay {
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.overlay-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    font-size: 0.875rem;
    color: #fff;
    font-family: 'Courier New', monospace;
}

.overlay-item i {
    color: #38bdf8;
}

.player-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    background: rgba(0, 0, 0, 0.6);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.controls-left,
.controls-right {
    display: flex;
    gap: 0.5rem;
}

.control-btn {
    color: rgba(255, 255, 255, 0.7) !important;
    transition: all 0.2s ease;
}

.control-btn:hover {
    color: #38bdf8 !important;
    background: rgba(56, 189, 248, 0.1) !important;
}

/* Detection Cards */
.detection-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.info-card {
    background: rgba(0, 0, 0, 0.4) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 12px !important;
}

.info-card :deep(.p-card-body) {
    padding: 1.25rem;
}

.info-card :deep(.p-card-content) {
    padding: 0;
}

.card-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.card-icon {
    font-size: 2rem;
    color: #38bdf8;
}

.card-label {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 0.5rem;
}

.card-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
}

.severity-tag {
    font-size: 0.875rem !important;
    padding: 0.375rem 0.75rem !important;
    font-weight: 600 !important;
}

/* Sidebar */
.sidebar-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.alert-card {
    background: linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(202, 138, 4, 0.05)) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(234, 179, 8, 0.3) !important;
    border-radius: 12px !important;
}

.alert-card :deep(.p-card-body) {
    padding: 1.25rem;
}

.alert-card :deep(.p-card-content) {
    padding: 0;
}

.alert-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.alert-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.alert-header i {
    font-size: 1.5rem;
    color: #fbbf24;
}

.alert-header h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #fde047;
    margin: 0;
}

.alert-message {
    color: rgba(254, 240, 138, 0.9);
    font-size: 0.875rem;
    margin: 0;
    line-height: 1.5;
}

.alert-time {
    font-size: 0.75rem;
    color: rgba(254, 240, 138, 0.6);
    font-family: 'Courier New', monospace;
}

.logs-card,
.system-card {
    background: rgba(0, 0, 0, 0.4) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 12px !important;
}

.logs-card :deep(.p-card-header),
.system-card :deep(.p-card-header) {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.logs-card :deep(.p-card-body),
.system-card :deep(.p-card-body) {
    padding: 1.25rem;
}

.logs-card :deep(.p-card-content),
.system-card :deep(.p-card-content) {
    padding: 0;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-title-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.header-title-group i {
    color: #38bdf8;
    font-size: 1.125rem;
}

.header-title-group h3 {
    font-size: 0.9375rem;
    font-weight: 600;
    color: #fff;
    margin: 0;
}

.refresh-btn {
    color: rgba(255, 255, 255, 0.6) !important;
}

.refresh-btn:hover {
    color: #38bdf8 !important;
    background: rgba(56, 189, 248, 0.1) !important;
}

.logs-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-right: 0.5rem;
}

.log-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    transition: all 0.2s ease;
}

.log-item:hover {
    background: rgba(0, 0, 0, 0.3);
    border-color: rgba(56, 189, 248, 0.2);
}

.log-dot {
    font-size: 0.375rem;
    color: #38bdf8;
    margin-top: 0.375rem;
}

.log-text {
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.7);
    font-family: 'Courier New', monospace;
    line-height: 1.5;
    word-break: break-word;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    gap: 0.75rem;
}

.empty-state i {
    font-size: 2.5rem;
    color: rgba(255, 255, 255, 0.2);
}

.empty-state p {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.875rem;
    margin: 0;
}

.system-status {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.status-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 6px;
}

.status-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
}

.status-label i {
    color: #38bdf8;
}

.status-value {
    font-size: 0.9375rem;
    font-weight: 600;
    color: #fff;
}

/* Responsive */
@media (max-width: 1280px) {
    .dashboard-grid {
        grid-template-columns: 1fr;
    }

    .sidebar-section {
        grid-template-columns: repeat(2, 1fr);
        display: grid;
    }
}

@media (max-width: 768px) {
    .dashboard-container {
        padding: 1rem;
    }

    .dashboard-header {
        flex-direction: column;
        gap: 1.5rem;
        align-items: flex-start;
    }

    .quick-stats {
        width: 100%;
        flex-direction: column;
        gap: 1rem;
    }

    .detection-cards {
        grid-template-columns: 1fr;
    }

    .sidebar-section {
        grid-template-columns: 1fr;
    }

    .player-controls {
        flex-direction: column;
        gap: 1rem;
    }

    .controls-left,
    .controls-right {
        width: 100%;
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .header-title h1 {
        font-size: 1.5rem;
    }

    .video-overlay {
        font-size: 0.75rem;
    }
}
</style>
