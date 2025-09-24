<template>
	<section class="p-4 sm:p-6 lg:p-8">
		<div class="mb-6">
			<h1 class="text-2xl font-bold text-white">Configurações</h1>
			<p class="text-sm text-gray-400">Ajustes da aplicação e limites de alerta</p>
		</div>

		<div class="rounded-xl border border-white/10 bg-black/30 backdrop-blur-md p-6 max-w-2xl">
			<form @submit.prevent="onSubmit" class="space-y-5">
				<div>
					<label for="telegram_alert_interval" class="block text-sm text-gray-300 mb-1">Intervalo de alerta no Telegram (segundos)</label>
					<input id="telegram_alert_interval" v-model.number="form.telegram_alert_interval" type="number" min="1"
						class="w-full bg-white/5 text-gray-100 border border-white/10 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600" />
					<p v-if="errors.telegram_alert_interval" class="text-xs text-red-400 mt-1">{{ errors.telegram_alert_interval }}</p>
				</div>

				<div>
					<label for="emergency_call_interval" class="block text-sm text-gray-300 mb-1">Intervalo de chamada de emergência (segundos)</label>
					<input id="emergency_call_interval" v-model.number="form.emergency_call_interval" type="number" min="1"
						class="w-full bg-white/5 text-gray-100 border border-white/10 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600" />
					<p v-if="errors.emergency_call_interval" class="text-xs text-red-400 mt-1">{{ errors.emergency_call_interval }}</p>
				</div>

				<div>
					<label for="video_save_path" class="block text-sm text-gray-300 mb-1">Diretório de salvamento de vídeos</label>
					<input id="video_save_path" v-model.trim="form.video_save_path" type="text" placeholder="ex.: output"
						class="w-full bg-white/5 text-gray-100 placeholder-gray-400 border border-white/10 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600" />
					<p v-if="errors.video_save_path" class="text-xs text-red-400 mt-1">{{ errors.video_save_path }}</p>
				</div>

				<div class="flex items-center gap-3 pt-2">
					<button type="submit" :disabled="saving" class="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white">
						<span v-if="saving" class="pi pi-spin pi-spinner mr-2"></span>
						Salvar alterações
					</button>
					<button type="button" @click="reset" :disabled="saving" class="px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 text-white">Recarregar</button>
					<span v-if="message" :class="messageClass" class="text-sm">{{ message }}</span>
				</div>
			</form>
		</div>
	</section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const API_BASE_URL = 'http://localhost:8001'

const form = reactive({
	telegram_alert_interval: 10,
	emergency_call_interval: 30,
	video_save_path: 'output',
})
const baseSnapshot = ref(null)
const saving = ref(false)
const message = ref('')
const messageType = ref('') // 'success' | 'error'
const errors = reactive({ telegram_alert_interval: '', emergency_call_interval: '', video_save_path: '' })

const validate = () => {
	errors.telegram_alert_interval = ''
	errors.emergency_call_interval = ''
	errors.video_save_path = ''
	let ok = true
	if (!form.telegram_alert_interval || form.telegram_alert_interval < 1) {
		errors.telegram_alert_interval = 'Deve ser um inteiro >= 1'
		ok = false
	}
	if (!form.emergency_call_interval || form.emergency_call_interval < 1) {
		errors.emergency_call_interval = 'Deve ser um inteiro >= 1'
		ok = false
	}
	if (!form.video_save_path) {
		errors.video_save_path = 'Informe um diretório válido'
		ok = false
	}
	return ok
}

const fetchSettings = async () => {
	try {
		const res = await fetch(`${API_BASE_URL}/settings`)
		if (!res.ok) throw new Error('Falha ao carregar configurações')
		const data = await res.json()
		form.telegram_alert_interval = data.telegram_alert_interval
		form.emergency_call_interval = data.emergency_call_interval
		form.video_save_path = data.video_save_path
		baseSnapshot.value = JSON.stringify(form)
	} catch (e) {
		messageType.value = 'error'
		message.value = e?.message || 'Erro ao carregar configurações'
	}
}

const onSubmit = async () => {
	if (!validate()) return
	saving.value = true
	message.value = ''
	messageType.value = ''
	try {
		const body = new URLSearchParams()
		body.append('telegram_alert_interval', String(form.telegram_alert_interval))
		body.append('emergency_call_interval', String(form.emergency_call_interval))
		body.append('video_save_path', form.video_save_path)

		const res = await fetch(`${API_BASE_URL}/update_settings`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body
		})
		const data = await res.json()
		if (!res.ok || data?.error) throw new Error(data?.error || 'Falha ao salvar configurações')
		messageType.value = 'success'
		message.value = 'Configurações salvas com sucesso.'
		baseSnapshot.value = JSON.stringify(form)
	} catch (e) {
		messageType.value = 'error'
		message.value = e?.message || 'Erro ao salvar configurações'
	} finally {
		saving.value = false
	}
}

const reset = async () => {
	await fetchSettings()
	message.value = ''
	messageType.value = ''
}

onMounted(fetchSettings)

const messageClass = computed(() =>
	messageType.value === 'success' ? 'text-emerald-400' : messageType.value === 'error' ? 'text-red-400' : ''
)
</script>

<style scoped>
/* opcional */
</style>
