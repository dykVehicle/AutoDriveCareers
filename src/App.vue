<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import SensorCursor from './components/SensorCursor.vue';
import ScrollCar from './components/ScrollCar.vue';
import HolidayOverlay from './components/HolidayOverlay.vue';
import ClickSpark from './components/ClickSpark.vue';
import { Promotion, Position, OfficeBuilding, ChatDotRound } from '@element-plus/icons-vue';

const route = useRoute()
const isAuthPage = computed(() => ['/login'].includes(route.path))
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 selection:bg-blue-200 selection:text-blue-900 cursor-default">
    <SensorCursor />
    <ScrollCar />
    <HolidayOverlay />
    <ClickSpark />
    
    <header v-if="!isAuthPage" class="fixed w-full z-50 transition-all duration-300 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm supports-[backdrop-filter]:bg-white/60">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-3 group">
            <div class="relative w-10 h-10 flex items-center justify-center bg-slate-900 rounded-xl shadow-lg shadow-slate-900/20 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 overflow-hidden">
               <div class="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="text-xl font-bold tracking-tight text-slate-900 font-sans group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-colors">
              AutoDrive<span class="text-blue-600 group-hover:text-current">Careers</span>
            </span>
          </RouterLink>
          
          <div class="hidden md:flex ml-12 space-x-2">
            <RouterLink to="/" class="nav-item" active-class="active">首页</RouterLink>
            <RouterLink to="/jobs" class="nav-item" active-class="active">职位列表</RouterLink>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <RouterLink to="/login">
            <button class="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors px-4 py-2 rounded-lg hover:bg-slate-50">
              登录
            </button>
          </RouterLink>
          <button class="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5 hover:bg-slate-800 transition-all border border-transparent">
            企业入驻
          </button>
        </div>
      </nav>
    </header>

    <main class="flex-grow pt-20 relative z-10">
      <RouterView v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <footer v-if="!isAuthPage" class="bg-white border-t border-slate-100 py-20 relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div class="col-span-1 md:col-span-4">
            <div class="flex items-center space-x-2 mb-6">
              <div class="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span class="text-xl font-bold text-slate-900 tracking-tight">AutoDrive Careers</span>
            </div>
            <p class="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm">
              专注于汽车智能驾驶领域的人才招聘平台。连接全球顶尖人才与创新企业，驱动未来出行变革。
            </p>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <i class="fab fa-weixin"></i> <!-- FontAwesome placeholder, assuming availability or replace with SVG -->
                 <span class="font-serif font-bold">W</span>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                 <span class="font-serif font-bold">L</span>
              </a>
               <a href="#" class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                 <span class="font-serif font-bold">G</span>
              </a>
            </div>
          </div>
          
          <div class="col-span-1 md:col-span-2 md:col-start-6">
            <h4 class="text-slate-900 font-bold mb-6 text-sm uppercase tracking-wider">求职者</h4>
            <ul class="space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="#" class="hover:text-blue-600 transition-colors flex items-center"><el-icon class="mr-2 text-xs"><Position /></el-icon> 浏览职位</a></li>
              <li><a href="#" class="hover:text-blue-600 transition-colors flex items-center"><el-icon class="mr-2 text-xs"><OfficeBuilding /></el-icon> 热门公司</a></li>
              <li><a href="#" class="hover:text-blue-600 transition-colors flex items-center"><el-icon class="mr-2 text-xs"><Promotion /></el-icon> 求职攻略</a></li>
            </ul>
          </div>

          <div class="col-span-1 md:col-span-2">
            <h4 class="text-slate-900 font-bold mb-6 text-sm uppercase tracking-wider">企业服务</h4>
            <ul class="space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="#" class="hover:text-blue-600 transition-colors">发布职位</a></li>
              <li><a href="#" class="hover:text-blue-600 transition-colors">人才搜索</a></li>
              <li><a href="#" class="hover:text-blue-600 transition-colors">雇主品牌</a></li>
            </ul>
          </div>

          <div class="col-span-1 md:col-span-3">
            <h4 class="text-slate-900 font-bold mb-6 text-sm uppercase tracking-wider">联系我们</h4>
            <ul class="space-y-4 text-sm text-slate-500 font-medium">
              <li class="flex items-center"><el-icon class="mr-2"><ChatDotRound /></el-icon> contact@autodrivecareers.com</li>
              <li class="flex items-center"><el-icon class="mr-2"><OfficeBuilding /></el-icon> 上海市嘉定区安亭汽车城</li>
            </ul>
          </div>
        </div>
        <div class="mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 font-medium">
          <p>&copy; 2025 AutoDrive Careers. All rights reserved.</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="hover:text-slate-600">Privacy Policy</a>
            <a href="#" class="hover:text-slate-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
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
  @apply px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all rounded-full hover:bg-slate-50 relative;
}
.nav-item.active {
  @apply text-slate-900 bg-slate-100;
}
</style>
