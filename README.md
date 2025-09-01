## 💻 Plataforma Inteligente para Monitoramento Urbano

A **Plataforma de Monitoramento de Espaços Públicos** é uma solução modular para segurança e gestão urbana. Utilizando **Visão Computacional**, **IA na borda (`Edge`) e na nuvem (`Cloud`)**, a plataforma oferece monitoramento em **tempo real** para detecção de eventos de risco. Ela gera alertas automáticos, cria evidências (vídeos e imagens) e fornece análises valiosas para gestores públicos e privados. Todo o processo é construído com um foco rigoroso em **privacidade por padrão** (LGPD/GDPR), garantindo a conformidade e a proteção dos dados dos cidadãos.

\<p align="left"\>
  \<img alt="Python" src="[https://img.shields.io/badge/Python-3.11+-blue](https://img.shields.io/badge/Python-3.11+-blue)"/\>
  \<img alt="FastAPI" src="[https://img.shields.io/badge/FastAPI-uvicorn%20%7C%20pydantic-009485](https://img.shields.io/badge/FastAPI-uvicorn%20%7C%20pydantic-009485)"/\>
  \<img alt="Spring Boot" src="[https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F)"/\>
  \<img alt="Nuxt" src="[https://img.shields.io/badge/Nuxt-3-00DC82](https://img.shields.io/badge/Nuxt-3-00DC82)"/\>
  \<img alt="PrimeVue" src="[https://img.shields.io/badge/PrimeVue-4.x-42B883](https://img.shields.io/badge/PrimeVue-4.x-42B883)"/\>
  \<img alt="Tailwind" src="[https://img.shields.io/badge/TailwindCSS-3.x-38BDF8](https://img.shields.io/badge/TailwindCSS-3.x-38BDF8)"/\>
  \<img alt="YOLOv8" src="[https://img.shields.io/badge/YOLO-v8-000000](https://img.shields.io/badge/YOLO-v8-000000)"/\>
  \<img alt="Docker" src="[https://img.shields.io/badge/Docker-ready-2496ED](https://img.shields.io/badge/Docker-ready-2496ED)"/\>
  \<img alt="Kubernetes" src="[https://img.shields.io/badge/Kubernetes-optional-326CE5](https://img.shields.io/badge/Kubernetes-optional-326CE5)"/\>
  \<img alt="License" src="[https://img.shields.io/badge/License-MIT-green](https://img.shields.io/badge/License-MIT-green)"/\>
\</p\>

-----

## ✨ Principais Funcionalidades

A plataforma é composta por microserviços escaláveis que se integram para formar um sistema robusto de monitoramento:

  * **Detecção Inteligente**: Utiliza modelos de IA, como o **YOLOv8**, para detecção e rastreamento de objetos em tempo real na borda (`Edge`). Isso garante processamento rápido e eficiente.
  * **Gestão de Vídeo**: Ingestão de múltiplas fontes de vídeo (RTSP, Webcam, arquivos) com multiplexação de streams para otimizar o uso de recursos.
  * **Arquitetura de Microserviços**: Componentes modulares, incluindo APIs (com **FastAPI** e **Spring Boot**), *workers* assíncronos e armazenamento de evidências em serviços de nuvem (S3).
  * **Painel de Controle (`Dashboard`)**: Uma interface intuitiva, desenvolvida em **Nuxt 3** com **PrimeVue** e **Tailwind CSS**, que exibe eventos em tempo real, permite a visualização de *heatmaps* e oferece filtros para análise de dados.
  * **Conformidade e Segurança**: Recursos de privacidade integrados, como anonimização de rostos e placas, retenção de dados configurável e trilhas de auditoria, assegurando a adesão à **LGPD/GDPR**.
  * **Observabilidade Completa**: Monitoramento do sistema com métricas e logs estruturados (**OpenTelemetry**), permitindo a análise de desempenho e a resolução de problemas.

-----

## 🏗️ Arquitetura do Sistema

A arquitetura do projeto é dividida entre a borda (`Edge`) e a nuvem (`Cloud`) para otimizar o processamento e a escalabilidade.

### Fluxo de Dados:

1.  **Processamento na Borda (`Edge`)**: As câmeras enviam *streams* de vídeo que são processados por um ingestor. O **YOLOv8** detecta objetos e um *tracker* (ByteTrack/OC-SORT) os acompanha. Os eventos gerados (JSON) e mídias (clipes/snapshots) são enviados para a nuvem.
2.  **Processamento na Nuvem (`Cloud`)**: Os eventos chegam a um **broker de mensagens** (Redis/Kafka) e são consumidos por APIs e *workers*. As APIs persistem os dados no **PostgreSQL** e os *workers* processam regras de negócio.
3.  **Visualização**: O painel de controle em **Nuxt 3** recebe alertas em tempo real via **WebSocket**, exibindo a linha do tempo de eventos, *heatmaps* e outros filtros para análise.

-----

## 🛠️ Tecnologias Utilizadas

### Backend & Workers

  * **Python 3.11+**: FastAPI, Uvicorn, Pydantic v2
  * **Java 17+**: Spring Boot 3
  * **Banco de Dados**: PostgreSQL 15+
  * **Mensageria**: Redis / Kafka
  * **Armazenamento**: MinIO / AWS S3

### Frontend

  * **Framework**: Nuxt 3 (Vue 3 + Vite + Nitro)
  * **Componentes UI**: PrimeVue 4.x
  * **Estilização**: Tailwind CSS 3
  * **Comunicação**: WebSocket nativo

### DevOps

  * **Containerização**: Docker / Docker Compose
  * **Orquestração**: Kubernetes (opcional)
  * **Monitoramento**: Prometheus, Grafana, OpenTelemetry

-----

## 🚀 Como Começar

### 1\. Pré-requisitos

Certifique-se de ter instalado:

  * **Python 3.11+**
  * **Node.js 18+**
  * **Docker**
  * **GPU (Opcional)**: Para aceleração de IA.
      * **NVIDIA**: CUDA 12+
      * **AMD (Windows)**: `pip install torch-directml`

### 2\. Configuração

Crie um arquivo `.env` na raiz do projeto e preencha com suas variáveis de ambiente. Um exemplo de configuração está disponível no `README` original.

### 3\. Execução

  * **Via Docker Compose**: A maneira mais simples de rodar todos os serviços.
    ```bash
    docker compose -f infra/compose/docker-compose.yml up --build
    ```
  * **Localmente (para Desenvolvimento)**:
      * **Backend**:
        ```bash
        cd services/api && pip install -r requirements.txt
        uvicorn app.main:app --reload --port 8080
        ```
      * **Frontend**:
        ```bash
        cd frontend/nuxt
        npm i
        npm run dev
        ```
        Acesse o painel em `http://localhost:3000`.

-----

## 👤 Equipe do Projeto

  * Carlos Alberto de Aguiar - RA 220020298
  * Vinicius de Moraes de Godoi — RA 220019338
  * João Marcos Racanelli — RA 190008115
  * Leonardo Marcondeli — RA 220021829
  * Maicon Douglas Mendes Alves — RA 210017568

-----

## 📜 Licença

Este projeto é distribuído sob a licença **UNISAL**.