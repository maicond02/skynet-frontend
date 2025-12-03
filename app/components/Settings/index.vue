<template>
	<div class="settings-wrapper p-4 md:p-6 max-w-7xl mx-auto">
		<div class="header mb-8">
			<h1 class="text-3xl font-bold text-white mb-2 flex items-center gap-3">
				<i class="pi pi-cog text-2xl text-indigo-500"></i>
				Configurações
			</h1>
			<p class="text-gray-400">Gerencie os parâmetros globais do sistema Skynet.</p>
		</div>

		<div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
			<!-- Coluna Principal -->
			<div class="xl:col-span-2 space-y-6">

				<!-- Card de Notificações -->
				<div class="settings-card bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden">
					<div class="card-header p-6 border-b border-white/10 bg-white/5">
						<div class="flex items-center gap-3">
							<div class="icon-box p-2 rounded-lg bg-blue-500/10 text-blue-400">
								<i class="pi pi-bell text-xl"></i>
							</div>
							<div>
								<h2 class="text-lg font-semibold text-white">Alertas e Notificações</h2>
								<p class="text-sm text-gray-400">Defina a frequência dos alertas de segurança</p>
							</div>
						</div>
					</div>
					<div class="card-body p-6 space-y-6">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div class="field flex flex-col gap-2">
								<label class="text-sm font-medium text-gray-300">Intervalo Telegram</label>
								<InputNumber v-model="form.telegram_alert_interval" suffix=" s" showButtons :min="1"
									class="w-full" inputClass="bg-white/5 border-white/10 text-white" />
								<small class="text-gray-500">Tempo mínimo entre mensagens enviadas ao Telegram.</small>
							</div>
							<div class="field flex flex-col gap-2">
								<label class="text-sm font-medium text-gray-300">Intervalo de Chamadas</label>
								<InputNumber v-model="form.emergency_call_interval" suffix=" s" showButtons :min="1"
									class="w-full" inputClass="bg-white/5 border-white/10 text-white" />
								<small class="text-gray-500">Tempo de espera entre chamadas de emergência
									automáticas.</small>
							</div>
						</div>
					</div>
				</div>

				<!-- Card de Armazenamento -->
				<div class="settings-card bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden">
					<div class="card-header p-6 border-b border-white/10 bg-white/5">
						<div class="flex items-center gap-3">
							<div class="icon-box p-2 rounded-lg bg-purple-500/10 text-purple-400">
								<i class="pi pi-database text-xl"></i>
							</div>
							<div>
								<h2 class="text-lg font-semibold text-white">Armazenamento</h2>
								<p class="text-sm text-gray-400">Gerenciamento de arquivos e gravações</p>
							</div>
						</div>
					</div>
					<div class="card-body p-6">
						<div class="field flex flex-col gap-2">
							<label class="text-sm font-medium text-gray-300">Diretório de Gravações</label>
							<div class="p-inputgroup flex">
								<span class="p-inputgroup-addon bg-white/5 border-white/10 text-gray-400 border-r-0">
									<i class="pi pi-folder"></i>
								</span>
								<InputText v-model="form.video_save_path" placeholder="/caminho/para/videos"
									class="w-full bg-white/5 border-white/10 text-white" />
							</div>
							<small class="text-gray-500">Caminho local onde os vídeos de incidentes serão
								salvos.</small>
						</div>
					</div>
				</div>

			</div>

			<!-- Coluna Lateral -->
			<div class="xl:col-span-1 space-y-6">
				<!-- Card de Ações -->
				<div class="settings-card bg-[#0a0a0a] border border-white/10 rounded-xl p-6 sticky top-24">
					<h3 class="text-lg font-semibold text-white mb-4">Controle</h3>

					<div class="flex flex-col gap-3">
						<Button label="Salvar Alterações" icon="pi pi-save" @click="saveSettings" :loading="saving"
							class="w-full" />

						<Button label="Recarregar" icon="pi pi-refresh" severity="secondary" @click="fetchSettings"
							:disabled="saving" class="w-full" outlined />
					</div>

					<div v-if="message"
						:class="['mt-4 p-3 rounded-lg text-sm flex items-start gap-2 animate-fade-in',
							messageType === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20']">
						<i
							:class="['pi mt-0.5', messageType === 'success' ? 'pi-check-circle' : 'pi-exclamation-circle']"></i>
						<span>{{ message }}</span>
					</div>

					<div class="mt-6 pt-6 border-t border-white/10">
						<h4 class="text-sm font-medium text-gray-400 mb-3">Status do Sistema</h4>
						<div class="space-y-2">
							<div class="flex justify-between text-sm">
								<span class="text-gray-500">API Backend</span>
								<span class="text-emerald-400 flex items-center gap-1">
									<span class="w-2 h-2 rounded-full bg-emerald-400"></span> Online
								</span>
							</div>
							<div class="flex justify-between text-sm">
								<span class="text-gray-500">Versão</span>
								<span class="text-gray-300">v1.0.2</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

export default {
	name: 'SettingsIndex',
	components: {
		InputText,
		InputNumber,
		Button
	},
	data() {
		return {
			form: {
				telegram_alert_interval: 10,
				emergency_call_interval: 30,
				video_save_path: 'output'
			},
			saving: false,
			loading: false,
			message: '',
			messageType: '',
			API_BASE_URL: 'http://localhost:8001'
		}
	},
	mounted() {
		this.fetchSettings()
	},
	methods: {
		async fetchSettings() {
			this.loading = true
			try {
				const res = await fetch(`${this.API_BASE_URL}/settings`)
				if (res.ok) {
					const data = await res.json()
					this.form = {
						telegram_alert_interval: data.telegram_alert_interval || 10,
						emergency_call_interval: data.emergency_call_interval || 30,
						video_save_path: data.video_save_path || 'output'
					}
				} else {
					throw new Error('Falha na comunicação com API')
				}
			} catch (e) {
				console.error(e)
				// Fallback silencioso ou mensagem de erro se crítico
				// this.showMessage('Não foi possível carregar as configurações.', 'error')
			} finally {
				this.loading = false
			}
		},
		async saveSettings() {
			if (!this.form.video_save_path) {
				this.showMessage('O diretório de vídeos é obrigatório.', 'error')
				return
			}

			this.saving = true
			this.message = ''

			try {
				const body = new URLSearchParams()
				body.append('telegram_alert_interval', String(this.form.telegram_alert_interval))
				body.append('emergency_call_interval', String(this.form.emergency_call_interval))
				body.append('video_save_path', this.form.video_save_path)

				const res = await fetch(`${this.API_BASE_URL}/update_settings`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body
				})

				const data = await res.json()
				if (!res.ok || data?.error) throw new Error(data?.error || 'Falha ao salvar')

				this.showMessage('Configurações atualizadas com sucesso!', 'success')
			} catch (e) {
				this.showMessage(e.message || 'Erro ao salvar configurações', 'error')
			} finally {
				this.saving = false
			}
		},
		showMessage(text, type) {
			this.message = text
			this.messageType = type

			if (type === 'success') {
				setTimeout(() => {
					this.message = ''
					this.messageType = ''
				}, 3000)
			}
		}
	}
}
</script>

<style scoped>
.animate-fade-in {
	animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(-5px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* Customização profunda para InputNumber do PrimeVue para combinar com o tema dark */
:deep(.p-inputnumber-input) {
	background: transparent !important;
	border: none !important;
	color: white !important;
}

:deep(.p-inputnumber-button) {
	background: rgba(255, 255, 255, 0.1) !important;
	border: 1px solid rgba(255, 255, 255, 0.1) !important;
	color: rgba(255, 255, 255, 0.8) !important;
}

:deep(.p-inputnumber-button:hover) {
	background: rgba(255, 255, 255, 0.2) !important;
	color: white !important;
}
</style>
