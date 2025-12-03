import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import tailwindcss from '@tailwindcss/vite';
const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{sky.50}',
            100: '{sky.100}',
            200: '{sky.200}',
            300: '{sky.300}',
            400: '{sky.400}',
            500: '{sky.500}',
            600: '{sky.600}',
            700: '{sky.700}',
            800: '{sky.800}',
            900: '{sky.900}',
            950: '{sky.950}'
        }
    }
})
export default defineNuxtConfig({
    modules: [
        '@primevue/nuxt-module', '@nuxtjs/google-fonts'
    ],
    vite: {
        plugins: [tailwindcss()]
    },
    nitro: {
        compatibilityDate: '2025-09-02',
        routeRules: {
            '/api/**': {
                proxy: process.env.NUXT_PUBLIC_API_TARGET || 'http://localhost:8001/**'
            }
        }
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
        }
    },
    googleFonts: {
        families: {
            Inter: [400, 500, 600, 700]
        },
        display: 'swap',
        preconnect: true,
        preload: true
    },
    css: [
        'primeicons/primeicons.css',
        'assets/css/main.css'
    ],
    primevue: {
        options: {
            theme: {
                preset: MyPreset
            }
        },
        components: {
            include: ['Toast', 'Button', 'InputText', 'Password', 'Checkbox']
        }
    }
})
