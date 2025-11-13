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
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 3rem 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    background: #000;
    scroll-snap-align: start;
}

@media (min-width: 768px) {
    .section {
        height: 100vh;
        padding: 2rem 1rem;
    }
}

.section-title {
    font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
    letter-spacing: 0.08em;
    font-size: clamp(1.25rem, 6vw, 2.5rem);
    margin-bottom: 0.5rem;
    color: #f9fafb;
    line-height: 1.2;
}

.tagline {
    font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
    margin: 0 0 1.5rem;
    font-size: clamp(0.8rem, 3.5vw, 1.1rem);
    letter-spacing: 0.04em;
    color: rgba(226, 232, 240, 0.85);
    text-align: center;
    padding: 0 1rem;
    line-height: 1.4;
}

@media (min-width: 768px) {
    .section-title {
        margin-bottom: 0.25rem;
    }

    .tagline {
        margin: 0 0 1rem;
        padding: 0;
    }
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
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 1rem;
}

@media (min-width: 768px) {
    .section-actions {
        margin-top: 0.75rem;
        gap: 0.75rem;
    }
}

.section-actions :deep(.p-button) {
    font-size: 0.875rem;
    padding: 0.625rem 1rem;
}

@media (min-width: 768px) {
    .section-actions :deep(.p-button) {
        font-size: 1rem;
        padding: 0.75rem 1.5rem;
    }
}
</style>
