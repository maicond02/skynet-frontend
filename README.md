# 🚨 IA para Monitoramento de Espaços Públicos

Plataforma modular para **monitoramento urbano em tempo real** usando **Visão Computacional**, **Edge + Cloud**, **Microserviços** e **Dashboard em Nuxt 3 + PrimeVue + Tailwind**.  
Detecta eventos de risco, gera alertas, cria evidências (clipes/imagens) e oferece analytics para gestores — **privacidade por padrão** (LGPD/GDPR).

<p align="left">
  <img alt="Python" src="https://img.shields.io/badge/Python-3.11+-blue"/>
  <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-uvicorn%20%7C%20pydantic-009485"/>
  <img alt="Spring Boot" src="https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F"/>
  <img alt="Nuxt" src="https://img.shields.io/badge/Nuxt-3-00DC82"/>
  <img alt="PrimeVue" src="https://img.shields.io/badge/PrimeVue-4.x-42B883"/>
  <img alt="Tailwind" src="https://img.shields.io/badge/TailwindCSS-3.x-38BDF8"/>
  <img alt="YOLOv8" src="https://img.shields.io/badge/YOLO-v8-000000"/>
  <img alt="Docker" src="https://img.shields.io/badge/Docker-ready-2496ED"/>
  <img alt="Kubernetes" src="https://img.shields.io/badge/Kubernetes-optional-326CE5"/>
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green"/>
</p>

---

## 🧭 Visão Geral

- 🔎 **Detecção em tempo real** no **Edge** (YOLOv8) + **refinamento em nuvem** (regras, trilhas e clipping).  
- 📡 **Ingestão de vídeo**: RTSP/Webcam/arquivo; multiplexação de streams.  
- ⚙️ **Microserviços**: APIs (FastAPI/Spring Boot), workers assíncronos, filas, storage de evidências (S3).  
- 🖥️ **Dashboard Nuxt 3**: PrimeVue + Tailwind, sockets em tempo real, filtros, heatmap.  
- 🔐 **Privacidade e conformidade** (LGPD/GDPR): anonimização, retenção, auditoria.  
- 📈 **Observabilidade**: métricas e logs estruturados (OpenTelemetry-ready).

---

## 🏗️ Arquitetura

```mermaid
flowchart LR
    subgraph Cameras
      A1[Câmera 1 (RTSP)] --> B
      A2[Câmera N (RTSP/Webcam)] --> B
    end

    subgraph Edge Node
      B[Ingestor + Decoding]
      B --> C[YOLOv8 (PyTorch/DirectML/CUDA/CPU)]
      C --> D[Tracker (ByteTrack/OC-SORT)]
      D --> E[Event Builder]
      E -->|JSON| Q[(Broker: Redis/Kafka)]
      E -->|clips/snapshots| S[(Object Storage/S3)]
    end

    subgraph Cloud
      Q --> G[FastAPI - Event API (REST/WS)]
      Q --> H[Workers - Rules & Enrichment]
      H --> I[(PostgreSQL)]
      H --> S
      G --> I
      G <-->|WebSocket| J[Nuxt 3 (PrimeVue + Tailwind)]
    end

    J --> K[UX Operador: Heatmap, Timeline, Filtros]
````

### Fluxo de Dados

1. **Edge** captura frames → **YOLOv8** → **tracking** → evento (classe, score, bbox, clipe/snapshot).
2. Eventos → **Broker** → **API/Workers** persistem no PostgreSQL e salvam mídia (S3/local).
3. **Nuxt 3** recebe alertas por **WebSocket**, renderiza timeline/heatmap em tempo real.

---

## 🧠 IA & Processamento

* **Detecção**: YOLOv8 (Ultralytics) com quantização opcional (FP16/INT8).
* **Aceleração**:

  * **NVIDIA**: `device=cuda`
  * **AMD (Windows)**: `device=dml` via `torch-directml` (RX 6600 XT compatível)
  * **CPU**: fallback (`device=cpu`)
* **Rastreamento**: ByteTrack / OC-SORT (configurável).
* **Regras**: IOU/NMS, zonas de interesse, permanência, contagem, direção.
* **Anonimização**: blur de rostos/placas, máscaras por ROI.
* **Mídia**: clipes MP4 e snapshots PNG com overlays e metadados.

---

## 🧩 Tecnologias

**Backend & Workers**

* Python 3.11+, FastAPI, Uvicorn, Pydantic v2
* Java 17+, Spring Boot 3 (serviços críticos/ETL, se desejado)
* PostgreSQL 15+, Redis/Kafka, Celery/RQ/Kafka Streams
* MinIO/S3 para evidências

**Frontend (Nuxt)**

* **Nuxt 3 (Vue 3 + Vite + Nitro)**
* **PrimeVue 4.x** (DataTable, Tag, Dialog, Toast…)
* **TailwindCSS 3** (+ @tailwindcss/forms)
* **WebSocket** nativo (stream de alertas)
* **Pinia** (estado global) — opcional
* **Mapas/Heatmap**: Vue-Leaflet / MapLibre (opcional)

**DevOps**

* Docker/Compose, Kubernetes (Helm opcional)
* Prometheus/Grafana, OpenTelemetry (traces/logs/métricas)

---

## 📦 Estrutura de Pastas (sugerida)

```
.
├── edge/
│   ├── ingestor/             # RTSP/Webcam -> frames
│   ├── detector/             # YOLOv8 + tracking
│   └── anonymizer/           # blur/ROI masks
├── services/
│   ├── api/                  # FastAPI (REST/WS)
│   ├── rules/                # workers: regras/ETL
│   └── media/                # clipping/snapshots
├── frontend/nuxt/            # Nuxt 3 + PrimeVue + Tailwind
├── infra/
│   ├── docker/               # Dockerfiles
│   ├── compose/              # docker-compose.yml
│   └── k8s/                  # charts/manifests
└── docs/                     # ADRs, diagramas, políticas
```

---

## ⚡ Setup Rápido

### 1) Pré-requisitos

* Python 3.11+, Node 18+, Docker
* GPU opcional (recomendado)

  * NVIDIA → CUDA 12+
  * AMD (Windows) → `pip install torch-directml` (DirectML)

### 2) Variáveis de Ambiente (`.env`)

```bash
# API
API_PORT=8080
JWT_SECRET=troque-me
CORS_ORIGINS=http://localhost:3000

# DB e Mensageria
DATABASE_URL=postgresql+psycopg://user:pass@db:5432/monitor
REDIS_URL=redis://redis:6379/0
# Ou Kafka:
# KAFKA_BROKERS=kafka:9092

# Armazenamento de evidências
MEDIA_BACKEND=s3
S3_ENDPOINT=http://minio:9000
S3_BUCKET=evidencias
S3_ACCESS_KEY=minio
S3_SECRET_KEY=minio123
S3_REGION=us-east-1

# IA
YOLO_MODEL=yolov8n.pt
DEVICE=dml   # cuda | dml | cpu
TRACKER=bytetrack
```

### 3) Subir via Docker Compose

```bash
docker compose -f infra/compose/docker-compose.yml up --build
```

### 4) Rodar local (desenvolvimento)

```bash
# Backend
cd services/api && pip install -r requirements.txt
uvicorn app.main:app --reload --port 8080

# Frontend (Nuxt)
cd frontend/nuxt
npm i
npm run dev
```

---

## 🖥️ Frontend (Nuxt + PrimeVue + Tailwind)

### Instalação

```bash
# dentro de frontend/nuxt
npm i nuxt primevue primeicons @nuxtjs/tailwindcss
```

### `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  app: { head: { title: 'Monitoramento Urbano' } },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:8080',
      wsUrl: process.env.WS_URL || 'ws://localhost:8080/ws/alerts'
    }
  }
})
```

### Plugin PrimeVue: `plugins/primevue.client.ts`

```ts
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'
import Ripple from 'primevue/ripple'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true, inputStyle: 'outlined' })
  nuxtApp.vueApp.use(ToastService)
  nuxtApp.vueApp.use(ConfirmationService)
  nuxtApp.vueApp.directive('tooltip', Tooltip)
  nuxtApp.vueApp.directive('ripple', Ripple)
})
```

### Estilos globais (`app.vue`)

```vue
<script setup lang="ts"></script>

<template>
  <NuxtPage />
</template>

<style>
@import 'primeicons/primeicons.css';
/* escolha de tema PrimeVue (ajuste conforme versão/tema instalado) */
@import 'primevue/resources/themes/aura-light-noir/theme.css';
</style>
```

### Tailwind (`tailwind.config.cjs`)

```js
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: { extend: {} },
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms')]
}
```

### Página de Timeline em tempo real (`pages/index.vue`)

```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

type EventItem = {
  id: string
  source: string
  class: string
  score: number
  timestamp: string
  track_id?: number
}

const events = ref<EventItem[]>([])
const toast = useToast()
let ws: WebSocket | null = null

const { wsUrl } = useRuntimeConfig().public

onMounted(() => {
  ws = new WebSocket(wsUrl)
  ws.onopen = () => toast.add({ severity: 'success', summary: 'Conectado', life: 1500 })
  ws.onmessage = (e) => {
    const payload = JSON.parse(e.data)
    events.value.unshift(payload)
    if (events.value.length > 300) events.value.pop()
  }
  ws.onerror = () => toast.add({ severity: 'error', summary: 'Erro WS', life: 2000 })
})

onBeforeUnmount(() => ws?.close())
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Eventos em Tempo Real</h1>
      <Button label="Atualizar" icon="pi pi-refresh" @click="location.reload()" />
    </div>

    <DataTable :value="events" dataKey="id" size="small" stripedRows scrollable scrollHeight="60vh">
      <Column field="timestamp" header="Horário" style="min-width: 12rem" />
      <Column field="source" header="Origem" style="min-width: 10rem" />
      <Column field="class" header="Classe" style="min-width: 10rem">
        <template #body="{ data }">
          <Tag :value="data.class" />
        </template>
      </Column>
      <Column field="score" header="Score" style="min-width: 8rem">
        <template #body="{ data }">{{ (data.score * 100).toFixed(1) }}%</template>
      </Column>
      <Column field="track_id" header="Track" style="min-width: 6rem" />
      <Column header="Ações" style="min-width: 10rem">
        <template #body="{ data }">
          <NuxtLink :to="`/events/${data.id}`" class="text-primary-600 hover:underline">Ver</NuxtLink>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
```

---

## 🔌 Endpoints (FastAPI)

```http
GET /health
WS  /ws/alerts                       # stream de alertas (para Nuxt)
GET /events?from=...&to=...          # lista eventos
GET /events/{id}                     # detalhe (metadados + links de mídia)
GET /events/{id}/media               # clipe/snapshot
POST /rules                          # cria/atualiza regra (zonas, classes, thresholds)
GET  /rules
```

**Exemplo de Evento (JSON)**

```json
{
  "id": "evt_01HW...",
  "source": "praca-central",
  "class": "aglomeracao",
  "score": 0.87,
  "timestamp": "2025-08-10T14:22:31Z",
  "bbox": [x, y, w, h],
  "track_id": 42,
  "media": {
    "snapshot": "s3://evidencias/.../evt_01HW.png",
    "clip": "s3://evidencias/.../evt_01HW.mp4"
  },
  "rule_matches": ["zona_risco", "contagem>n"]
}
```

---

## 🎥 Configuração de Streams

`edge/ingestor/config.yaml`

```yaml
streams:
  - id: "praca-central"
    url: "rtsp://usuario:senha@host:554/stream1"
    roi: [[10,10],[1024,10],[1024,600],[10,600]]   # opcional
    anonymize: true
  - id: "terminal-rodoviario"
    url: "rtsp://..."
    anonymize: false
```

---

## 🛡️ Privacidade, Segurança e Conformidade

* **Anonimização** de rostos/placas (pré/pós-detecção).
* **Retenção** configurável e rotinas de expurgo.
* **Auditabilidade**: logs estruturados, versão do modelo, thresholds por evento.
* **Sem biometria** por padrão (sem reconhecimento facial).
* **LGPD/GDPR**: finalidade explícita, minimização de dados, segurança e transparência.

---

## 📈 Observabilidade

* **Métricas**: FPS por stream, latência de inferência, TPS de eventos, uso de memória/GPU.
* **Traces/Logs**: OpenTelemetry (OTLP).
* **Dashboards**: Grafana com painéis de IA e infraestrutura.

---

## 🚀 Roadmap

* [x] MVP: ingestão + detecção + dashboard básico (Nuxt)
* [x] WebSocket para alertas ao vivo
* [ ] Regras avançadas (permanência, direção, contagem por zona)
* [ ] Heatmap geoespacial + geofences
* [ ] Exportações e relatórios periódicos
* [ ] Kubernetes com autoscaling (HPA/GPU)
* [ ] Edge/Federated Learning (atualizações com rollback)

---

## 🧪 Dicas de Performance

* **Edge**: modelos `yolov8n/s` para baixa latência; **Cloud**: `m/l` para precisão.
* FP16 em GPUs compatíveis; **INT8** com calibração.
* Decodificação por hardware quando disponível.
* **DirectML (AMD/Windows)**: `pip install torch-directml` + `model.to("dml")`.
* **CUDA (NVIDIA)**: alinhar versão do driver/CUDA com PyTorch.

---

## 👤 Créditos (Equipe)

* Vinicius de Moraes de Godoi — RA 220019338
* João Marcos Racanelli — RA 190008115
* Leonardo Marcondeli — RA 220021829
* Maicon Douglas Mendes Alves — RA 210017568

---

## 📜 Licença

Este projeto é distribuído sob a licença **UNISAL**.