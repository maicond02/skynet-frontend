<template>
    <div class="feature-card">
        <div class="feature-icon">
            <i :class="`pi ${icon}`"></i>
        </div>
        <h3 class="feature-title">{{ title }}</h3>
        <p class="feature-description">{{ description }}</p>
    </div>
</template>

<script>
export default {
    name: 'FeatureCard',

    props: {
        icon: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.feature-card {
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(6px);
    padding: 1.25rem;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.16);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    height: 100%;
}

.feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #38bdf8, #3b82f6);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-4px);
    border-color: rgba(59, 130, 246, 0.35);
    box-shadow: 0 12px 24px rgba(37, 99, 235, 0.18);
}

.feature-card:hover::before {
    opacity: 1;
}

.feature-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, #38bdf8, #2563eb);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.75rem;
    box-shadow: 0 4px 16px rgba(62, 161, 255, 0.3);
}

.feature-icon i {
    font-size: 1.5rem;
    color: #fff;
}

.feature-title {
    font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #f8fafc;
    margin: 0 0 0.5rem 0;
    letter-spacing: 0.02em;
}

.feature-description {
    color: rgba(226, 232, 240, 0.75);
    font-size: 0.85rem;
    line-height: 1.5;
    margin: 0;
}
</style>
