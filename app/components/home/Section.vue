<template>
    <section :id="sectionId" class="section surface-card border-round">
        <h2 class="section-title">{{ title }}</h2>

        <p v-if="tagline" class="tagline">{{ tagline }}</p>

        <div class="section-content">
            <slot />
        </div>

        <div v-if="hasActions" class="section-actions">
            <slot name="actions" />
        </div>
    </section>
</template>

<script>
export default {
    name: 'HomeSection',

    props: {
        sectionId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        tagline: {
            type: String,
            default: ''
        }
    },

    computed: {
        hasActions() {
            return !!this.$slots.actions
        }
    }
}
</script>

<style scoped>
.section {
    min-height: 100vh;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem 1rem;
    border-top: 1px solid rgba(62, 161, 255, 0.12);
    border-bottom: 1px solid rgba(62, 161, 255, 0.12);
    background: radial-gradient(1200px 500px at 50% -10%, rgba(62, 161, 255, 0.08), transparent 60%);
    scroll-snap-align: start;
}

.section-title {
    font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
    letter-spacing: 0.08em;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    margin-bottom: 0.25rem;
    background: white;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 12px rgba(62, 161, 255, 0.25);
}

.tagline {
    font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
    margin: 0 0 1rem;
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    letter-spacing: 0.04em;
    background: white;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 12px rgba(62, 161, 255, 0.25);
    text-align: center;
}

.section-content {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    line-height: 1.7;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.section-actions {
    margin-top: 0.75rem;
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
}
</style>
