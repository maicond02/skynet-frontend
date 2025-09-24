<template>
  <aside
    class="fixed inset-y-0 left-0 z-[1000] flex w-[280px] max-[960px]:w-[260px] flex-col border-r border-white/10 bg-[#14161c]/70 text-slate-200 backdrop-blur-md transition-[width] duration-300"
  >
    <div class="brand flex items-center gap-3 p-3 text-[1.2rem] font-bold tracking-wide text-zinc-50">
      <i class="pi pi-shield text-[1.3rem]"></i>
      <span>Skynet</span>
    </div>

    <nav class="menu-root flex-1 overflow-y-auto pt-2">
      <ul class="menu-list m-0 flex list-none flex-col gap-1.5 p-0">
        <li v-for="item in items" :key="item.route">
          <RouterLink
            :to="item.route"
            class="menu-link flex items-center gap-3 rounded-lg p-3 text-gray-300 no-underline transition-colors hover:bg-white/10 hover:text-white"
            :class="isRouteActive(item.route) ? 'bg-indigo-600 text-white font-medium' : ''"
          >
            <i :class="['pi', item.icon, 'text-[1.1rem]']"></i>
            <span class="text-[0.95rem] whitespace-nowrap">{{ item.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div class="sidebar-footer mt-auto px-1.5 py-2">
      <button
        type="button"
        @click="onLogout"
        class="w-full justify-center rounded-lg px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
      >
        <i class="pi pi-sign-out mr-2 align-[-2px]"></i>
        Sair
      </button>
    </div>
  </aside>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'AppSidebar',
  components: { RouterLink },
  data() {
    return {
      items: [
        { label: 'Dashboard', icon: 'pi-home', route: '/dashboard' },
        { label: 'Incidentes', icon: 'pi-exclamation-triangle', route: '/incidents' },
        { label: 'Configurações', icon: 'pi-cog', route: '/settings' },
        { label: 'Relatórios', icon: 'pi-chart-bar', route: '/reports' },
        { label: 'Usuários', icon: 'pi-users', route: '/users' }
      ]
    }
  },
  methods: {
    isRouteActive(targetRoute) {
      const currentPath = this.$route?.path || ''
      return currentPath === targetRoute || currentPath.startsWith(targetRoute + '/')
    },
    onLogout() {
      this.$router.push('/')
    }
  }
}
</script>
