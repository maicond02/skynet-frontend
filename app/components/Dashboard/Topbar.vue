<template>
  <div class="floating-topbar">
    <div class="search-container">
      <IconField iconPosition="left">
        <InputIcon class="pi pi-search"></InputIcon>
        <InputText placeholder="Buscar..." class="search-input" />
      </IconField>
    </div>

    <Button icon="pi pi-bell" text rounded severity="secondary" v-badge.danger="'4'" />

    <Avatar image="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="large" shape="circle" />
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';

export default {
  name: 'DashboardTopbar',
  components: {
    InputText,
    IconField,
    InputIcon,
    Button,
    Avatar
  },
  directives: {
    'badge': Badge
  }
}
</script>

<style scoped>

.floating-topbar {

  position: absolute;
  top: 1rem;
  right: 1.5rem;
  z-index: 999;


  width: auto;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 12px;
  border-radius: 12px;


  background: rgba(28, 30, 38, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}


.search-container {
  width: 250px;
}


.search-container :deep(.search-input) {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 8px;
  width: 100%;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-container :deep(.search-input:focus) {
  border-color: #4f46e5;
  box-shadow: 0 0 0 1px #4f46e5;
}

.search-container :deep(.p-icon) {
  color: rgba(255, 255, 255, 0.6);
}


.floating-topbar :deep(.p-badge) {
  min-width: 1.2rem;
  height: 1.2rem;
  line-height: 1.2rem;
  font-size: 0.7rem;
}
</style>