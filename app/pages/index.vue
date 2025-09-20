<template>
  <div class="page">
    <!-- NAV SUPERIOR FIXA -->
    <nav class="navbar">
      <div class="nav-inner">
        <Button label="Visão em tempo real" class="p-button-text" @click="scrollTo('tela-1')" />
        <Button label="Segurança & privacidade" class="p-button-text" @click="scrollTo('tela-2')" />
        <Button label="Onde usar" class="p-button-text" @click="scrollTo('tela-3')" />
      </div>
    </nav>

    <!-- CABEÇALHO / HERO -->
    <header class="hero">
      <h1 class="TitleSkinet">SKYNET VISION</h1>
      <p class="tagline">Visão além do humano</p>
      <div class="cardoracle">
        <img class="imageOracle" src="assets/css/img/icon_skynet_transparent.png" alt="Skynet">
      </div>
      <div>
        Powered by FastAPI · YOLOv8 · DirectML · Pytorch
      </div>
    </header>

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
/* Suaviza o scroll geral (extra ao scrollIntoView) */
html, body {
  scroll-behavior: smooth;
  background: #070b14;
  color: #e6f0ff;
  margin: 0;
}

/* NAV FIXA */
.navbar {
  position: sticky; /* fixa no topo durante a rolagem */
  top: 0;
  z-index: 50;
  backdrop-filter: blur(8px);
  background: rgba(7, 11, 20, 0.65);
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

/* Título e tagline (mantidos do seu estilo) */
.TitleSkinet{
  font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
  font-weight: 700;
  letter-spacing: .14em;
  font-size: clamp(2rem, 5vw, 4rem);
  margin: 0 0 .25rem 0;
  background: linear-gradient(90deg, #3ea1ff 0%, #7bb6ff 50%, #3ea1ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 18px rgba(62,161,255,.35);
  text-align: center;
}
.tagline {
  font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
  margin: 0 0 1.5rem;
  font-size: clamp(1rem, 2.3vw, 1.25rem);
  letter-spacing: .04em;
  background: linear-gradient(90deg, #3ea1ff 0%, #8ec5ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 12px rgba(62,161,255,.25);
  text-align: center;
}

.cardoracle{
    min-height: 55vh;
    min-height: 55dvh; 
    display: grid;                
    place-items: center;            
    position: relative;
    width: 100%;
}

.imageOracle{
  width: min(260px, 60vw);
  height: auto;
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
  background: linear-gradient(90deg, #3ea1ff 0%, #8ec5ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 12px rgba(62,161,255,.25);
}

/* Pequenos ajustes responsivos */
@media (max-width: 640px) {
  .nav-inner { justify-content: center; flex-wrap: wrap; }
}
</style>
