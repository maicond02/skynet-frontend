<template>

    <div class="flex justify-end absolute top-6 left-0 right-12">
        <IconField iconPosition="left">
            <InputIcon class="pi pi-search"></InputIcon>
            <InputText placeholder="Buscar..." class="search-input" />
        </IconField>
        <Button icon="pi pi-bell" text rounded severity="secondary" v-badge.danger="'4'" />
        <Avatar image="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="large" shape="circle" />
    </div>

</template>

<script>
export default {
    name: 'DashboardTopbar'
}
</script>

<style scoped>
.floating-topbar {
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    right: 1.5rem;
    z-index: 999;

    display: flex;
    align-items: center;
    /* alinha verticalmente */
    justify-content: space-between;
    /* busca à esquerda, ações à direita */
    gap: 16px;
    padding: 0;
    /* sem padding do container */
    background: transparent;
    /* sem fundo */
    border: none;
    /* sem borda */
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
}

.search-container {
    flex: 1;
    max-width: 420px;
}

/* Mantém o input bonito e alinhado */
.search-container :deep(.search-input) {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    border-radius: 8px;
    width: 100%;
    height: 40px;
    /* altura consistente */
    line-height: 40px;
    /* alinha o texto verticalmente */
    transition: border-color 0.2s, box-shadow 0.2s;
}

.search-container :deep(.search-input:focus) {
    border-color: #4f46e5;
    box-shadow: 0 0 0 1px #4f46e5;
}

.search-container :deep(.p-icon) {
    color: rgba(255, 255, 255, 0.6);
}

.right-actions {
    display: flex;
    align-items: center;
    /* alinha ícones verticalmente */
    gap: 12px;
}

/* Badge mais discreto e alinhado */
.floating-topbar :deep(.p-badge) {
    min-width: 1.1rem;
    height: 1.1rem;
    line-height: 1.1rem;
    font-size: 0.7rem;
}
</style>
