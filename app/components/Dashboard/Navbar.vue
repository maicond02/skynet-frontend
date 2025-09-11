
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
                    label: 'Dashboard',
                    icon: 'pi pi-home'
                },
                {
                    label: 'Incidentes',
                    icon: 'pi pi-exclamation-triangle'
                },
                {
                    label: 'Configurações',
                    icon: 'pi pi-cog'
                }
            ]
        };
    }
};
</script>
