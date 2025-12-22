<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import SensorCursor from './components/SensorCursor.vue';
import ScrollCar from './components/ScrollCar.vue';

const route = useRoute()
const isAuthPage = computed(() => ['/login'].includes(route.path))
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 selection:bg-blue-200 selection:text-blue-900 cursor-none">
    <SensorCursor />
    <ScrollCar />
    
    <header v-if="!isAuthPage" class="fixed w-full z-50 transition-all duration-300 backdrop-blur-xl bg-white/70 border-b border-white/50 shadow-sm">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-3 group">
            <div class="relative w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-xl shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="text-xl font-bold tracking-tight text-slate-800 font-sans">
              AutoDrive<span class="text-blue-600">Careers</span>
            </span>
          </RouterLink>
          
          <div class="hidden md:flex ml-12 space-x-1">
            <RouterLink to="/" class="nav-item" active-class="active">首页</RouterLink>
            <RouterLink to="/jobs" class="nav-item" active-class="active">职位列表</RouterLink>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <RouterLink to="/login">
            <button class="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
              登录
            </button>
          </RouterLink>
          <button class="px-6 py-2.5 bg-slate-900 text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            企业入驻
          </button>
        </div>
      </nav>
    </header>

    <main class="flex-grow pt-20 relative z-10">
      <RouterView v-slot="{ Component }">
        <transition name="page-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <footer v-if="!isAuthPage" class="bg-white border-t border-slate-100 py-16 relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div class="col-span-1 md:col-span-1">
            <div class="flex items-center space-x-2 mb-6">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span class="text-lg font-bold text-slate-900">AutoDrive Careers</span>
            </div>
            <p class="text-slate-500 text-sm leading-relaxed">
              专注于汽车智能驾驶领域的人才招聘平台。<br>连接全球顶尖人才与创新企业。
            </p>
          </div>
          
          <div>
            <h4 class="text-slate-900 font-bold mb-6 text-sm uppercase tracking-wider">求职者</h4>
            <ul class="space-y-3 text-sm text-slate-500">
              <li><a href="#" class="hover:text-blue-600 transition-colors">浏览职位</a></li>
              <li><a href="#" class="hover:text-blue-600 transition-colors">热门公司</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-slate-900 font-bold mb-6 text-sm uppercase tracking-wider">企业服务</h4>
            <ul class="space-y-3 text-sm text-slate-500">
              <li><a href="#" class="hover:text-blue-600 transition-colors">发布职位</a></li>
              <li><a href="#" class="hover:text-blue-600 transition-colors">人才搜索</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-slate-900 font-bold mb-6 text-sm uppercase tracking-wider">联系我们</h4>
            <ul class="space-y-3 text-sm text-slate-500">
              <li>contact@autodrivecareers.com</li>
              <li>上海市嘉定区安亭汽车城</li>
            </ul>
          </div>
        </div>
        <div class="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; 2025 AutoDrive Careers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Page Transitions */
.page-slide-enter-active,
.page-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.page-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.page-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Nav Item Styling */
.nav-item {
  @apply px-4 py-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-all rounded-lg hover:bg-slate-50;
}
.nav-item.active {
  @apply text-blue-600 bg-blue-50 font-bold;
}
</style>
