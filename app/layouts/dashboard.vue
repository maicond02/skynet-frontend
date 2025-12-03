<template>
  <div class="dashboard-layout">
    <DashboardSidebar />

    <div class="dashboard-main">
      <DashboardTopbar />

      <main class="dashboard-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  background: #000;
  color: #fff;
  overflow: hidden;
}

.dashboard-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 280px;
  height: 100vh;
  overflow: hidden;
}

.dashboard-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  position: relative;
  z-index: 1;
}
</style>