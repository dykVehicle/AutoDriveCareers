<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import SensorCursor from './components/SensorCursor.vue';

const route = useRoute()
const isAuthPage = computed(() => ['/login'].includes(route.path))
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-950 font-sans text-slate-200 selection:bg-cyan-500 selection:text-black">
    <SensorCursor />
    
    <header v-if="!isAuthPage" class="fixed w-full z-50 transition-all duration-300 backdrop-blur-md bg-slate-950/70 border-b border-cyan-900/30">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-3 group">
            <div class="relative w-10 h-10 flex items-center justify-center">
              <div class="absolute inset-0 bg-cyan-500 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="text-xl font-bold tracking-tight text-white font-mono">
              Auto<span class="text-cyan-400">Drive</span>_Careers
            </span>
          </RouterLink>
          
          <div class="hidden md:flex ml-16 space-x-2">
            <RouterLink to="/" class="nav-item" active-class="active">[ 首页 CENTER ]</RouterLink>
            <RouterLink to="/jobs" class="nav-item" active-class="active">[ 职位 JOBS ]</RouterLink>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <RouterLink to="/login">
            <button class="text-xs font-mono text-cyan-400 hover:text-cyan-300 tracking-wider">
              &lt;LOGIN /&gt;
            </button>
          </RouterLink>
          <button class="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded skew-x-[-10deg] border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
            <span class="block skew-x-[10deg] font-bold text-sm">企业入驻</span>
          </button>
        </div>
      </nav>
    </header>

    <main class="flex-grow pt-20">
      <RouterView v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <footer v-if="!isAuthPage" class="bg-slate-950 border-t border-slate-800/50 py-12 relative overflow-hidden">
      <!-- Grid Background -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div class="col-span-1 md:col-span-1">
            <div class="text-2xl font-bold text-white mb-4 font-mono">ADC_SYSTEM</div>
            <p class="text-slate-500 text-sm font-mono leading-relaxed">
              &gt; Initializing connection...<br>
              &gt; Connecting talent with future...<br>
              &gt; Status: Online
            </p>
          </div>
          <!-- Links omitted for brevity, keeping existing structure but styled -->
          <div>
            <h4 class="text-cyan-400 font-bold mb-6 font-mono text-sm">[ NAVIGATE ]</h4>
            <ul class="space-y-3 text-sm text-slate-400 font-mono">
              <li><a href="#" class="hover:text-cyan-400 transition-colors">:: 浏览职位</a></li>
              <li><a href="#" class="hover:text-cyan-400 transition-colors">:: 热门公司</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-cyan-400 font-bold mb-6 font-mono text-sm">[ ENTERPRISE ]</h4>
            <ul class="space-y-3 text-sm text-slate-400 font-mono">
              <li><a href="#" class="hover:text-cyan-400 transition-colors">:: 发布职位</a></li>
              <li><a href="#" class="hover:text-cyan-400 transition-colors">:: 人才库</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-cyan-400 font-bold mb-6 font-mono text-sm">[ SIGNAL ]</h4>
            <ul class="space-y-3 text-sm text-slate-400 font-mono">
              <li>contact@autodrivecareers.com</li>
              <li>上海市嘉定区安亭汽车城</li>
            </ul>
          </div>
        </div>
        <div class="mt-12 pt-8 border-t border-slate-800/50 text-center text-xs text-slate-600 font-mono">
          &copy; 2025 AutoDrive Careers. SYSTEM_VER 2.0.1
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0f172a;
}
::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #06b6d4;
}

/* Page Transitions */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Nav Item Styling */
.nav-item {
  @apply px-4 py-2 text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors;
}
.nav-item.active {
  @apply text-cyan-400 bg-cyan-950/30 border border-cyan-900/50 rounded;
  text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
}
</style>
