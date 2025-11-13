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
    height: 120px;
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.82);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(148, 163, 184, 0.18);
    padding: 14px 16px;
    text-align: left;
    display: grid;
    align-content: center;
    gap: 8px;
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.35);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

@media (min-width: 768px) {
    .kpi-card {
        height: 140px;
        border-radius: 16px;
        padding: 18px 20px;
        gap: 10px;
    }
}

.kpi-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.45);
    background: rgba(30, 41, 59, 0.82);
}

.kpi-card--primary {
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.35), rgba(15, 23, 42, 0.58));
}

.kpi-value {
    font-size: clamp(24px, 5vw, 32px);
    font-weight: 800;
    letter-spacing: 0.5px;
}

.kpi-value--accent {
    color: #4ade80;
    text-shadow: 0 0 18px rgba(74, 222, 128, 0.35);
}

.kpi-title {
    color: rgba(148, 163, 184, 0.85);
    font-size: clamp(12px, 2.5vw, 14px);
    line-height: 1.35;
}

.kpi-illustration {
    position: absolute;
    right: 10px;
    bottom: 8px;
    font-size: 36px;
    opacity: 0.2;
}

@media (min-width: 768px) {
    .kpi-illustration {
        right: 14px;
        bottom: 10px;
        font-size: 44px;
    }
}
</style>
