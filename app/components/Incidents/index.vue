<template>
	<section class="p-4 sm:p-6 lg:p-8">
		<div class="mb-6 flex items-center justify-between gap-4">
			<div>
				<h1 class="text-2xl font-bold text-white">Incidentes</h1>
				<p class="text-sm text-gray-400">Monitoramento de eventos detectados pela IA</p>
			</div>
			<div class="flex items-center gap-2">
				<button @click="refresh" class="px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 text-sm text-white transition">Atualizar</button>
				<label class="flex items-center gap-2 text-sm text-gray-300">
					<input type="checkbox" v-model="autoRefresh" /> Atualizar automaticamente
				</label>
			</div>
		</div>

		<div class="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
			<div>
				<label class="block text-xs text-gray-400 mb-1">Severidade</label>
				<select v-model="filters.severity" class="w-full bg-white/5 text-gray-100 border border-white/10 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600">
					<option value="">Todas</option>
					<option value="HIGH">Alta</option>
					<option value="MILD">Moderada</option>
					<option value="NONE">Nenhuma</option>
				</select>
			</div>
			<div class="sm:col-span-2">
				<label class="block text-xs text-gray-400 mb-1">Buscar (mensagem)</label>
				<input v-model.trim="filters.search" type="text" placeholder="Ex.: Violent Activity Detected"
					class="w-full bg-white/5 text-gray-100 placeholder-gray-400 border border-white/10 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600" />
			</div>
		</div>

		<div class="overflow-hidden rounded-xl border border-white/10 bg-black/30 backdrop-blur-md">
			<div class="overflow-x-auto">
				<table class="min-w-full text-sm">
					<thead class="bg-white/5 text-gray-300">
						<tr>
							<th class="text-left px-4 py-3 font-medium">Data</th>
							<th class="text-left px-4 py-3 font-medium">Hora</th>
							<th class="text-left px-4 py-3 font-medium">Severidade</th>
							<th class="text-left px-4 py-3 font-medium">Confiança</th>
							<th class="text-left px-4 py-3 font-medium">Detecções</th>
							<th class="text-left px-4 py-3 font-medium">Mensagem</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="loading">
							<td colspan="6" class="px-4 py-6 text-center text-gray-400">Carregando incidentes...</td>
						</tr>
						<tr v-else-if="error">
							<td colspan="6" class="px-4 py-6 text-center text-red-400">{{ error }}</td>
						</tr>
						<tr v-else-if="!filteredIncidents.length">
							<td colspan="6" class="px-4 py-6 text-center text-gray-400">Nenhum incidente encontrado.</td>
						</tr>
						<tr v-for="(inc, idx) in paginatedIncidents" :key="idx" class="border-t border-white/10 hover:bg-white/5">
							<td class="px-4 py-3 text-gray-200">{{ inc.date }}</td>
							<td class="px-4 py-3 text-gray-200">{{ inc.time }}</td>
							<td class="px-4 py-3">
								<span :class="severityPillClass(inc.severity)" class="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold">
									<span :class="dotClass(inc.severity)" class="w-1.5 h-1.5 rounded-full"></span>
									{{ inc.severity }}
								</span>
							</td>
							<td class="px-4 py-3 text-gray-200">{{ (inc.confidence * 100).toFixed(0) }}%</td>
							<td class="px-4 py-3 text-gray-200">{{ inc.detections }}</td>
							<td class="px-4 py-3 text-gray-300 max-w-[640px] truncate" :title="inc.message">{{ inc.message }}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div v-if="pages > 1" class="flex items-center justify-between px-4 py-3 border-t border-white/10 text-gray-300">
				<span class="text-xs">Página {{ page }} de {{ pages }} — {{ filteredIncidents.length }} incidentes</span>
				<div class="flex items-center gap-2">
					<button @click="prevPage" :disabled="page === 1" class="px-3 py-1.5 rounded-md bg-white/10 disabled:opacity-40">Anterior</button>
					<button @click="nextPage" :disabled="page === pages" class="px-3 py-1.5 rounded-md bg-white/10 disabled:opacity-40">Próxima</button>
				</div>
			</div>
		</div>
	</section>
	</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const API_BASE_URL = 'http://localhost:8001'

const loading = ref(false)
const error = ref('')
const incidents = ref([])
const autoRefresh = ref(true)
let intervalId = null

const filters = reactive({
	severity: '',
	search: '',
})

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

const filteredIncidents = computed(() => {
	let list = incidents.value.slice()
	// Filtro por severidade
	if (filters.severity) {
		list = list.filter(i => i.severity === filters.severity)
	}
	// Busca por texto na mensagem
	if (filters.search) {
		const q = filters.search.toLowerCase()
		list = list.filter(i => (i.message || '').toLowerCase().includes(q))
	}
	// Ordena por data/hora desc
	list.sort((a, b) => {
		const aKey = `${a.date} ${a.time}`
		const bKey = `${b.date} ${b.time}`
		return aKey < bKey ? 1 : aKey > bKey ? -1 : 0
	})
	return list
})

// Paginação simples (cliente)
const page = ref(1)
const pageSize = ref(10)
const pages = computed(() => Math.max(1, Math.ceil(filteredIncidents.value.length / pageSize.value)))
const paginatedIncidents = computed(() => {
	const start = (page.value - 1) * pageSize.value
	return filteredIncidents.value.slice(start, start + pageSize.value)
})
const nextPage = () => { if (page.value < pages.value) page.value++ }
const prevPage = () => { if (page.value > 1) page.value-- }

const refresh = async () => {
	await fetchIncidents()
	page.value = 1
}

onMounted(async () => {
	await fetchIncidents()
	intervalId = setInterval(() => { if (autoRefresh.value) fetchIncidents() }, 5000)
})
onUnmounted(() => { if (intervalId) clearInterval(intervalId) })

// UI helpers
const severityPillClass = (sev) => {
	switch (sev) {
		case 'HIGH': return 'bg-red-500/15 text-red-300 border border-red-500/30'
		case 'MILD': return 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30'
		case 'NONE': return 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
		default: return 'bg-gray-500/15 text-gray-300 border border-gray-500/30'
	}
}
const dotClass = (sev) => {
	switch (sev) {
		case 'HIGH': return 'bg-red-400'
		case 'MILD': return 'bg-yellow-400'
		case 'NONE': return 'bg-emerald-400'
		default: return 'bg-gray-400'
	}
}
</script>

<style scoped>
/* opcional: nenhuma regra adicional necessária */
</style>
