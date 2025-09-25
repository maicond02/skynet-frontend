<template>
  <div class="page">
    <!-- NAV SUPERIOR FIXA -->
    <nav class="navbar">
      <div class="nav-inner">
        <Button label="Visão em tempo real" severity="secondary" raised class="button-nav" @click="scrollTo('tela-1')" />
        <Button label="Segurança & privacidade" severity="secondary" raised class="button-nav" @click="scrollTo('tela-2')" />
        <Button label="Onde usar" severity="secondary" raised class="button-nav" @click="scrollTo('tela-3')" />
      </div>
    </nav>

    <!-- CABEÇALHO / HERO -->
 <section class="hero">
    <div class="hero__overlay" />
    <div class="container">
      <!-- Headline -->
      <h1 class="headline">
        Unlocking the tecnologia
      </h1>

      <!-- Sub -->
      <p class="sub">
        We empower businesses to succeed in the digital age with IT solutions
        that streamline operations, enhance efficiency, and drive growth.
      </p>

      <!-- Ações -->
      <div class="actions">
        <Button label="Let's start" class="btn-pill-white px-4 py-3" severity="secondary" rounded />
        <Button
          label="Play video"
          icon="pi pi-play"
          text
          class="btn-ghost-white px-4 py-3"
          rounded
        />
      </div>

      <!-- Cards de métricas -->
      <div class="metrics grid">
        <div class="col-12 md:col-3">
          <div class="kpi-card">
            <div class="kpi-value">7k+</div>
            <div class="kpi-title">Trusted, satisfied<br />customers.</div>
          </div>
        </div>

        <div class="col-12 md:col-3">
          <div class="kpi-card kpi-card--primary">
            <div class="kpi-value kpi-value--accent">8+</div>
            <div class="kpi-title">
              Expertise driving<br />business success.
            </div>
            <i class="pi pi-leaf kpi-illustration" />
          </div>
        </div>

        <div class="col-12 md:col-3">
          <div class="kpi-card">
            <div class="kpi-value">24/7</div>
            <div class="kpi-title">
              Support available<br />to assist you.
            </div>
          </div>
        </div>

        <div class="col-12 md:col-3">
          <div class="kpi-card">
            <div class="kpi-value">50+</div>
            <div class="kpi-title">
              Successful projects<br />delivered.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    <!-- SEÇÕES (TELAS) -->
    <section id="tela-1" class="section surface-card border-round">
      <h2 class="section-title">Visão em tempo real, sem complicação</h2>
      <p class="tagline">YOLOv8 + FastAPI • integra com suas câmeras</p>
      <p>Detecte eventos importantes em poucos cliques, com baixa latência e instalação rápida.</p>
      <div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;">
        <Button label="Ver demo" />
        <Button label="Começar" class="p-button-text" />
      </div>
    </section>

    <section id="tela-2" class="section surface-card border-round">
      <h2 class="section-title">Segurança & privacidade</h2>
      <p style="max-width:720px;margin:0 auto 0.5rem;line-height:1.7;">
        Tratamos segurança e privacidade como prioridade de projeto. Estamos estruturando práticas e recursos
        para operação responsável, com foco em controle de dados e conformidade.
      </p>
      <ul style="max-width:720px;margin:0 auto;line-height:1.7;">
        <li>Boas práticas em desenvolvimento e deploy (em evolução).</li>
        <li>Opções de configuração para cenários sensíveis (em avaliação).</li>
        <li>Documentação transparente sobre limites atuais e próximos passos.</li>
      </ul>
      <div style="margin-top:1rem;display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;">
        <Button label="Saiba mais" />
        <Button label="Falar com a gente" class="p-button-text" />
      </div>
    </section>

    <section id="tela-3" class="section surface-card border-round">
      <h2 class="section-title">Onde usar</h2>
      <ul style="columns:2;gap:1.5rem;max-width:720px;margin:0 auto;">
        <li>Segurança perimetral</li>
        <li>Fluxo de pessoas/veículos</li>
        <li>Detecção de quedas/violência</li>
        <li>Monitoramento urbano/industrial</li>
      </ul>
      <div style="margin-top:1rem;display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;">
        <Button label="Falar com especialista" />
        <Button label="Solicitar avaliação" class="p-button-text" />
      </div>
    </section>
  </div>
</template>

<script setup>
function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style>

/* NAV FIXA */
.navbar {
  position: sticky; /* fixa no topo durante a rolagem */
  top: 0;
  z-index: 50;
  backdrop-filter: blur(8px);
  background: rgba(12, 19, 34, 1);
  border-bottom: 1px solid rgba(62,161,255,0.15);
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: .75rem 1rem;
  display: flex;
  gap: .5rem;
  align-items: center;
}

.hero {
  min-height: 80vh;
  display: grid;
  place-items: center;
  gap: 1rem;
  padding: 4rem 1rem 2rem;
}

.tagline {
  font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
  margin: 0 0 1.5rem;
  font-size: clamp(1rem, 2.3vw, 1.25rem);
  letter-spacing: .04em;
  background: white;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 12px rgba(62,161,255,.25);
  text-align: center;
}

/* Seções full-screen (as “telas”) */
.section {
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 3rem 1rem;
  border-top: 1px solid rgba(62,161,255,.12);
  border-bottom: 1px solid rgba(62,161,255,.12);
  background: radial-gradient(1200px 500px at 50% -10%, rgba(62,161,255,.08), transparent 60%);
}

/* âncora por causa da navbar fixa */
#tela-1, #tela-2, #tela-3 {
  scroll-margin-top: 72px; /* ajuste se mudar a altura da navbar */
}

.section-title {
  font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
  letter-spacing: .08em;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: .5rem;
  background: white;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 12px rgba(62,161,255,.25);
}

.button-nav{
  background: transparent;
  color: white;
  border-color: transparent;
}

.hero {
  position: relative;
  overflow: hidden;
  background: radial-gradient(1200px 600px at 50% -10%, rgba(124, 58, 237, 0.25), transparent 60%),
              linear-gradient(180deg, rgba(11, 7, 22, 0.9), rgba(11, 7, 22, 0.9)),
              var(--bg-1);
  color: var(--text);
  padding: 96px 0 56px;
  min-height: 92vh;
    min-height: 80vh;
  display: grid;
  place-items: center;
  gap: 1rem;
  padding: 4rem 1rem 2rem;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.05) 0,
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px,
      transparent 12px
    );
  opacity: 0.15;
  pointer-events: none;
  mix-blend-mode: overlay;
}

/* Container central (PrimeFlex container-like) */
.container {
  width: min(1120px, 92vw);
  margin: 0 auto;
  text-align: center;
}

/* ---------- Tipografia ---------- */
.headline {
  font-size: clamp(32px, 4.4vw, 64px);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: 0.2px;
  margin: 0;
}

.sub {
  margin: 18px auto 28px;
  color: var(--muted);
  font-size: clamp(15px, 1.8vw, 18px);
  max-width: 760px;
}

/* ---------- Ações ---------- */
.actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;
}

/* ---------- Cards ---------- */
.metrics {
  margin-top: 6px;
}

.kpi-card {
  position: relative;
  height: 140px;
  border-radius: 16px;
  background: var(--glass);
  backdrop-filter: blur(6px);
  border: 1px solid var(--glass-border);
  padding: 18px 20px;
  text-align: left;
  display: grid;
  align-content: center;
  gap: 10px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color .2s ease;
}
.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.45);
  background: rgba(255, 255, 255, 0.08);
}

.kpi-card--primary {
  background: linear-gradient(135deg, rgba(27, 108, 255, 0.35), rgba(37, 42, 70, 0.39));
}

.kpi-value {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 0.5px;
}
.kpi-value--accent {
  color: #4ade80; /* verde suave para o "8+" */
  text-shadow: 0 0 18px rgba(74, 222, 128, 0.35);
}

.kpi-title {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.35;
}

.kpi-illustration {
  position: absolute;
  right: 14px;
  bottom: 10px;
  font-size: 44px;
  opacity: 0.2;
}

/* ---------- Botões (reaproveitando o que fizemos antes) ---------- */
.p-button.p-button-text.btn-ghost-white {
  background-color: transparent;
  border-color: transparent;
}
.p-button.p-button-text.btn-ghost-white,
.p-button.p-button-text.btn-ghost-white .p-button-label,
.p-button.p-button-text.btn-ghost-white .p-button-icon {
  color: #fff !important;
}

.p-button.btn-pill-white {
  background-color: #ffffff;
  color: #111827;
  border-color: transparent;
  border-radius: 9999px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.06s ease;
}
.p-button.btn-pill-white .p-button-label,
.p-button.btn-pill-white .p-button-icon {
  color: #111827;
}

/* ---------- Utilidades simples ---------- */
.grid { display: grid; gap: 16px; }
.col-12 { grid-column: 1 / -1; }
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(12, 1fr); }
  .md\:col-3 { grid-column: span 3 / span 3; }
}

/* Pequenos ajustes responsivos */
@media (max-width: 640px) {
  .nav-inner { 
    justify-content: center; 
    flex-wrap: wrap;
    align-items: center;
   }
}
</style>
