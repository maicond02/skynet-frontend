<template>
  <div class="flex h-screen bg-gray-900 text-white overflow-hidden">
    <DashboardSidebar />
    
    <div class="flex-1 flex flex-col overflow-hidden ml-[280px] pt-12">
      <DashboardTopbar />

      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
main {
  height: 100vh;
}
</style>