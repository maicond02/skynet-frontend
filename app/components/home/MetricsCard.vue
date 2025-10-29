<template>
    <div :class="cardClasses">
        <div :class="valueClasses">{{ value }}</div>
        <div class="kpi-title">{{ title }}</div>
        <i v-if="icon" :class="iconClasses" />
    </div>
</template>

<script>
export default {
    name: 'MetricsCard',

    props: {
        value: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        isPrimary: {
            type: Boolean,
            default: false
        },
        isAccent: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        }
    },

    computed: {
        cardClasses() {
            return [
                'kpi-card',
                {
                    'kpi-card--primary': this.isPrimary
                }
            ]
        },

        valueClasses() {
            return [
                'kpi-value',
                {
                    'kpi-value--accent': this.isAccent
                }
            ]
        },

        iconClasses() {
            return `pi ${this.icon} kpi-illustration`
        }
    }
}
</script>

<style scoped>
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
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
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
    color: #4ade80;
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
</style>
