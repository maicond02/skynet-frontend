<template>
    <section class="p-4 sm:p-6 lg:p-8">
        <div class="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-white">Relatórios</h1>
                <p class="text-sm text-gray-400">Visão geral dos incidentes detectados</p>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <select v-model="range" class="bg-white/5 text-gray-100 border border-white/10 rounded-md px-3 py-2">
                    <option value="24h">Últimas 24h</option>
                    <option value="7d">Últimos 7 dias</option>
                    <option value="all">Tudo</option>
                </select>
                <button @click="refresh"
                    class="px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 text-sm text-white transition">Atualizar</button>
                <label class="flex items-center gap-2 text-sm text-gray-300">
                    <input type="checkbox" v-model="autoRefresh" /> Auto-refresh
                </label>
                <button @click="exportCSV" :disabled="!filtered.length"
                    class="px-3 py-2 rounded-md bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-sm">
                    <i class="pi pi-download mr-2"></i>Exportar CSV
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <div class="card">
                <div class="text-xs text-gray-400">Total de Incidentes</div>
                <div class="mt-1 text-3xl font-bold text-white">{{ summary.total }}</div>
            </div>
            <div class="card">
                <div class="text-xs text-gray-400">Severidade Alta</div>
                <div class="mt-1 text-3xl font-bold text-red-300">{{ summary.high }}</div>
            </div>
            <div class="card">
                <div class="text-xs text-gray-400">Severidade Moderada</div>
                <div class="mt-1 text-3xl font-bold text-yellow-300">{{ summary.mild }}</div>
            </div>
            <div class="card">
                <div class="text-xs text-gray-400">Confiança Média</div>
                <div class="mt-1 text-3xl font-bold text-sky-300">{{ avgConfidence }}</div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <!-- Barras por dia -->
            <div class="card lg:col-span-2">
                <div class="flex items-center justify-between mb-3">
                    <h2 class="text-white font-semibold">Incidentes por Dia</h2>
                    <span class="text-xs text-gray-400">{{ bars.labels.at(0) }} — {{ bars.labels.at(-1) }}</span>
                </div>
                <div class="h-40 flex items-end gap-2">
                    <div v-for="(v, i) in bars.values" :key="i" class="flex-1 flex flex-col items-center gap-1">
                        <div class="w-full rounded-t bg-sky-500/70" :style="{ height: barHeight(v) }"></div>
                        <div class="text-[10px] text-gray-400">{{ shortLabel(bars.labels[i]) }}</div>
                    </div>
                </div>
            </div>

            <!-- Heatmap por hora (apenas 24h) -->
            <div class="card">
                <div class="flex items-center justify-between mb-3">
                    <h2 class="text-white font-semibold">Distribuição por Hora</h2>
                    <span class="text-xs text-gray-400">{{ range === '24h' ? 'Últimas 24h' : '—' }}</span>
                </div>
                <div v-if="range === '24h'" class="grid grid-cols-6 gap-1">
                    <div v-for="(v, h) in byHour" :key="h" class="h-6 rounded"
                        :style="{ backgroundColor: heatColor(v) }" :title="`${h}:00 — ${v}`"></div>
                </div>
                <div v-else class="text-sm text-gray-400">Selecione "Últimas 24h" para ver o mapa de calor por hora.
                </div>
            </div>
        </div>

        <div class="card mt-6">
            <div class="flex items-center justify-between mb-3">
                <h2 class="text-white font-semibold">Incidentes Recentes</h2>
                <span class="text-xs text-gray-400">{{ filtered.length }} registros</span>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                    <thead class="bg-white/5 text-gray-300">
                        <tr>
                            <th class="text-left px-4 py-3 font-medium">Data</th>
                            <th class="text-left px-4 py-3 font-medium">Hora</th>
                            <th class="text-left px-4 py-3 font-medium">Sev.</th>
                            <th class="text-left px-4 py-3 font-medium">Conf.</th>
                            <th class="text-left px-4 py-3 font-medium">Dets</th>
                            <th class="text-left px-4 py-3 font-medium">Mensagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="loading">
                            <td colspan="6" class="px-4 py-6 text-center text-gray-400">Carregando...</td>
                        </tr>
                        <tr v-else-if="error">
                            <td colspan="6" class="px-4 py-6 text-center text-red-400">{{ error }}</td>
                        </tr>
                        <tr v-else-if="!filtered.length">
                            <td colspan="6" class="px-4 py-6 text-center text-gray-400">Nenhum registro.</td>
                        </tr>
                        <tr v-for="(inc, i) in filtered.slice(0, 20)" :key="i"
                            class="border-t border-white/10 hover:bg-white/5">
                            <td class="px-4 py-3 text-gray-200">{{ inc.date }}</td>
                            <td class="px-4 py-3 text-gray-200">{{ inc.time }}</td>
                            <td class="px-4 py-3">
                                <span :class="severityPillClass(inc.severity)"
                                    class="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold">{{
                                    inc.severity }}</span>
                            </td>
                            <td class="px-4 py-3 text-gray-200">{{ (inc.confidence * 100).toFixed(0) }}%</td>
                            <td class="px-4 py-3 text-gray-200">{{ inc.detections }}</td>
                            <td class="px-4 py-3 text-gray-300 max-w-[640px] truncate" :title="inc.message">{{
                                inc.message }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const API_BASE_URL = 'http://localhost:8001'

const loading = ref(false)
const error = ref('')
const incidents = ref([])
const range = ref('7d') // '24h' | '7d' | 'all'
const autoRefresh = ref(true)
let intervalId = null

const fetchIncidents = async () => {
    loading.value = true
    error.value = ''
    try {
        const res = await fetch(`${API_BASE_URL}/incidents`)
        if (!res.ok) throw new Error('Falha ao buscar incidentes')
        const data = await res.json()
        incidents.value = Array.isArray(data?.incidents) ? data.incidents.slice() : []
    } catch (e) {
        error.value = e?.message || 'Erro ao carregar incidentes'
    } finally {
        loading.value = false
    }
}

const toDate = (d, t) => new Date(`${d}T${t}`)

const filtered = computed(() => {
    const now = new Date()
    let minTime = 0
    if (range.value === '24h') minTime = now.getTime() - 24 * 3600 * 1000
    else if (range.value === '7d') minTime = now.getTime() - 7 * 24 * 3600 * 1000

    const list = incidents.value.filter(i => {
        const dt = toDate(i.date, i.time)
        return range.value === 'all' ? true : dt.getTime() >= minTime
    })
    // Ordenar desc
    list.sort((a, b) => {
        const aKey = `${a.date} ${a.time}`
        const bKey = `${b.date} ${b.time}`
        return aKey < bKey ? 1 : aKey > bKey ? -1 : 0
    })
    return list
})

const summary = computed(() => {
    let high = 0, mild = 0
    for (const i of filtered.value) {
        if (i.severity === 'HIGH') high++
        else if (i.severity === 'MILD') mild++
    }
    return { total: filtered.value.length, high, mild }
})

const avgConfidence = computed(() => {
    if (!filtered.value.length) return '—'
    const sum = filtered.value.reduce((a, c) => a + (Number(c.confidence) || 0), 0)
    return `${((sum / filtered.value.length) * 100).toFixed(0)}%`
})

// Barras por dia (últimos N dias baseados no range)
const bars = computed(() => {
    const days = new Map()
    for (const i of filtered.value) {
        days.set(i.date, (days.get(i.date) || 0) + 1)
    }
    const labels = Array.from(days.keys()).sort()
    const values = labels.map(l => days.get(l))
    return { labels, values }
})

const maxBar = computed(() => Math.max(1, ...(bars.value.values.length ? bars.value.values : [1])))
const barHeight = (v) => `${Math.round((v / maxBar.value) * 100)}%`
const shortLabel = (d) => (d ? d.slice(5) : '') // MM-DD

// Heatmap por hora (apenas 24h)
const byHour = computed(() => {
    const arr = Array.from({ length: 24 }, () => 0)
    if (range.value !== '24h') return arr
    for (const i of filtered.value) {
        const h = toDate(i.date, i.time).getHours()
        arr[h]++
    }
    return arr
})

const heatColor = (v) => {
    // from bg-sky-900-ish to bg-sky-500-ish
    const clamped = Math.min(10, v)
    const alpha = 0.15 + (clamped / 10) * 0.7
    return `rgba(56, 189, 248, ${alpha})` // sky-400 with variable alpha
}

const refresh = async () => { await fetchIncidents() }

onMounted(async () => {
    await fetchIncidents()
    intervalId = setInterval(() => { if (autoRefresh.value) fetchIncidents() }, 8000)
})
onUnmounted(() => { if (intervalId) clearInterval(intervalId) })

// CSV export
const exportCSV = () => {
    if (!filtered.value.length) return
    const header = ['date', 'time', 'severity', 'confidence', 'detections', 'message']
    const rows = filtered.value.map(i => [i.date, i.time, i.severity, i.confidence, i.detections, (i.message || '').replace(/\n/g, ' ')])
    const csv = [header.join(','), ...rows.map(r => r.map(v => typeof v === 'string' && v.includes(',') ? `"${v.replace(/"/g, '""')}"` : v).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `incidents_${range.value}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
}

// UI helpers
const severityPillClass = (sev) => {
    switch (sev) {
        case 'HIGH': return 'bg-red-500/15 text-red-300 border border-red-500/30'
        case 'MILD': return 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30'
        case 'NONE': return 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
        default: return 'bg-gray-500/15 text-gray-300 border border-gray-500/30'
    }
}
</script>

<style scoped>
.card {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    backdrop-filter: blur(10px);
    padding: 1rem;
}
</style>