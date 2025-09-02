
<template>
    <div class="card">
        <Menubar :model="items" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    label: 'Início',
                    icon: 'pi pi-home'
                },
                {
                    label: 'Funcionalidades',
                    icon: 'pi pi-star'
                },
                {
                    label: 'Como funciona',
                    icon: 'pi pi-question'
                },
                {
                    label: 'Sobre nós',
                    icon: 'pi pi-id-card'
                },
                {
                    label: 'Contato',
                    icon: 'pi pi-whatsapp'
                },
            ]
        };
    }
};
</script>
