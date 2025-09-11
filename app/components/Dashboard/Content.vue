<template>
  <div class="min-h-screen bg-black text-white">

    <!-- métricas rápidas -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      <Card
        v-for="(m, i) in metrics"
        :key="i"
        :pt="{ root: { class: '!bg-transparent border border-gray-600/60 rounded-xl backdrop-blur-sm' } }"
      >
        <p class="text-xs uppercase text-gray-400">{{ m.label }}</p>
        <p class="text-2xl font-bold text-[#22d3ee]">{{ m.value }}</p>
      </Card>
    </section>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 p-6">
      <!-- live stream -->
      <Card
        :pt="{ root: { class: '!bg-transparent border border-gray-600/60 rounded-xl backdrop-blur-sm col-span-1 xl:col-span-2' } }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Live Stream</h3>
            <div class="flex gap-2">
              <Button
                :icon="paused ? 'pi pi-play' : 'pi pi-pause'"
                rounded
                text
                @click="togglePause"
              />
              <Button icon="pi pi-expand" rounded text @click="showFull = true" />
            </div>
          </div>
        </template>

        <template v-if="error">
          <p class="text-red-400">Backend offline.</p>
        </template>
        <template v-else>
          <img
            ref="videoRef"
            src="http://localhost:8001/video_feed"
            alt="Stream"
            class="w-full max-h-[480px] object-cover border-4 border-[#22d3ee]/60 rounded-lg"
          />
        </template>
      </Card>

      <!-- painel lateral -->
      <div class="space-y-6">
        <!-- status -->
        <Card :pt="{ root: { class: '!bg-transparent border border-gray-600/60 rounded-xl backdrop-blur-sm' } }">
          <template #title> Status de Detecção </template>

          <template v-if="status">
            <div class="flex items-center gap-2 mb-3">
              <span class="font-semibold">Severidade:</span>
              <Tag :value="status.level" :severity="severityColor(status.level)" />
            </div>

            <ProgressBar
              :value="(status.max_confidence || 0) * 100"
              :showValue="false"
              class="h-2 mb-4"
            />
            <p class="text-sm text-gray-400">
              Última atualização: {{ status.last_update }}
            </p>
          </template>
          <template v-else>
            <p>Carregando…</p>
          </template>
        </Card>

        <!-- histórico de confiança -->
        <Card :pt="{ root: { class: '!bg-transparent border border-gray-600/60 rounded-xl backdrop-blur-sm' } }">
          <template #title> Histórico de Confiança </template>

          <template v-if="confidences.length">
            <ul class="space-y-1">
              <li v-for="(c, i) in confidences" :key="i" class="flex items-center gap-2 text-xs">
                <span class="w-10 text-right">{{ c.toFixed(2) }}</span>
                <div class="flex-1 bg-gray-700/40 rounded">
                  <div
                    class="h-2 rounded bg-[#22d3ee]"
                    :style="{ width: (c * 100) + '%' }"
                  ></div>
                </div>
              </li>
            </ul>
          </template>
          <template v-else>
            <p class="text-gray-400">Sem dados.</p>
          </template>
        </Card>

        <!-- alerta -->
        <Card :pt="{ root: { class: '!bg-transparent border border-gray-600/60 rounded-xl backdrop-blur-sm' } }">
          <template #title> Alerta Atual </template>

          <template v-if="status && status.alert">
            <p class="text-yellow-400">{{ status.alert }}</p>
          </template>
          <template v-else>
            <p class="text-gray-400">Nenhum alerta.</p>
          </template>
        </Card>
      </div>
    </div>

    <!-- timeline + incidents -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <Card :pt="{ root: { class: '!bg-transparent border border-gray-600/60 rounded-xl backdrop-blur-sm' } }">
        <template #title> Logs Recentes </template>

        <template v-if="reversedLogs.length">
          <Timeline :value="reversedLogs">
            <template #marker>
              <span class="pi pi-circle-fill text-[#22d3ee] text-xs"></span>
            </template>
            <template #content="{ item }">
              <small>{{ item }}</small>
            </template>
          </Timeline>
        </template>
        <template v-else>
          <p class="text-gray-400">Sem logs.</p>
        </template>
      </Card>

      <Card :pt="{ root: { class: '!bg-transparent border border-gray-600/60 rounded-xl backdrop-blur-sm' } }">
        <template #title> Incidentes Recentes </template>

        <template v-if="incidents.length">
          <ul class="space-y-2 text-sm">
            <li
              v-for="(i, idx) in incidents.slice().reverse()"
              :key="idx"
              class="flex justify-between"
            >
              <span>{{ i.date }} {{ i.time }}</span>
              <Tag :value="i.severity" :severity="severityColor(i.severity)" />
            </li>
          </ul>
        </template>
        <template v-else>
          <p class="text-gray-400">Nenhum incidente registrado.</p>
        </template>
      </Card>
    </section>

    <!-- full-screen modal -->
    <Dialog
      v-model:visible="showFull"
      header="Live Stream"
      maximizable
      modal
      :style="{ width: '90vw' }"
      :pt="{ root: { class: 'bg-black/90 backdrop-blur-sm' } }"
    >
      <img
        src="http://localhost:8001/video_feed"
        alt="Full stream"
        class="w-full h-[70vh] object-cover border-4 border-[#22d3ee]/60 rounded-lg"
      />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

type DetectionStatus = {
  level?: string
  max_confidence?: number
  detections?: number
  last_update?: string
  alert?: string
  logs?: string[]
}

const props = defineProps({
  backendBase: { type: String, default: 'http://localhost:8001' }
})

const status = ref<DetectionStatus | null>(null)
const incidents = ref<Array<{ date: string; time: string; severity: string }>>([])
const error = ref(false)
const paused = ref(false)
const showFull = ref(false)
const statusIntervalId = ref<number | null>(null)
const videoRef = ref<HTMLImageElement | null>(null)

const metrics = computed(() => [
  { label: 'Incidentes (sessão)', value: incidents.value.length },
  { label: 'Severidade atual', value: status.value?.level ?? '--' },
  {
    label: 'Conf. máx',
    value: (status.value && typeof status.value.max_confidence === 'number')
      ? status.value.max_confidence.toFixed(2)
      : '--'
  },
  { label: 'Detecções', value: status.value?.detections ?? '--' }
])

const confidences = computed(() => {
  const logs = (status.value?.logs ?? []).slice(-8)
  const rx = /Confidence:\s*([\d.]+)/
  return logs
    .map(l => parseFloat((l.match(rx)?.[1]) || '0'))
    .reverse()
})

const reversedLogs = computed(() => (status.value?.logs ?? []).slice().reverse())

function severityColor(l?: string) {
  return l === 'HIGH' ? 'danger' : (l === 'MILD' ? 'warning' : 'info')
}

async function fetchStatus() {
  try {
    const r = await fetch(`${props.backendBase}/status_view`)
    if (!r.ok) throw new Error('bad status')
    status.value = await r.json()
    error.value = false
  } catch (e) {
    error.value = true
  }
}

async function fetchIncidents() {
  try {
    const r = await fetch(`${props.backendBase}/incidents`)
    if (!r.ok) return
    const d = await r.json()
    incidents.value = (d?.incidents ?? []).slice(-6)
  } catch (e) {
    // ignore
  }
}

function togglePause() {
  paused.value = !paused.value
  if (videoRef.value) {
    videoRef.value.src = paused.value ? '' : `${props.backendBase}/video_feed`
  }
}

function onImgError() {
  error.value = true
}

onMounted(() => {
  fetchStatus()
  statusIntervalId.value = window.setInterval(fetchStatus, 5000)
  fetchIncidents()
})

onBeforeUnmount(() => {
  if (statusIntervalId.value) clearInterval(statusIntervalId.value)
})
</script>
