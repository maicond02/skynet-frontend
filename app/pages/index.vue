<template>
  <div class="p-6 space-y-12">
    <Button label="Ir para a seção" icon="pi pi-arrow-down" @click="scrollTo('segunda-secao')"/>

    <div>
        <h1 class="TitleSkinet">SKYNET VISION</h1>
        <p class="tagline">Visão além do humano</p>
        <div class="cardoracle">
            <img class="imageOracle" src="assets/css/img/icon_skynet_transparent.png" alt="Skynet">
        </div>
        
    </div>


    <section id="segunda-secao" class="p-4 surface-card border-round">
      <h2 class="mb-2">Segunda Seção</h2>
      <p>Chegou aqui via scroll suave 😎</p>
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
#segunda-secao { scroll-margin-top: 80px; }

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
  display: grid;
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
  display: grid;
  text-align: center;
}
.imageOracle{
    min-height: 100vh;
    display: grid;                  
    place-items: center;
}
.cardoracle{
    min-height: 100vh;
    display: grid;                
    place-items: center;            
    background: #0b0f1a;
    position: relative;
}

</style>
