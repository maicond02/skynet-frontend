<template>
    <div>
        <Toast />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script>
import Toast from 'primevue/toast'

export default {
    components: {
        Toast
    }
}
</script>