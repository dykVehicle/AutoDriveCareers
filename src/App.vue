<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import SensorCursor from './components/SensorCursor.vue';
import ScrollCar from './components/ScrollCar.vue';
import HolidayOverlay from './components/HolidayOverlay.vue';
import ClickSpark from './components/ClickSpark.vue';
import { Promotion, Position, OfficeBuilding, ChatDotRound, Document } from '@element-plus/icons-vue';

const route = useRoute()
const authStore = useAuthStore()
const isAuthPage = computed(() => ['/login', '/company-login', '/resume-builder', '/job-builder'].includes(route.path))

onMounted(() => {
  authStore.initAuth()
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 font-sans text-slate-800 selection:bg-blue-200 selection:text-blue-900 cursor-default">
    <SensorCursor />
    <ScrollCar />
    <HolidayOverlay />
    <ClickSpark />
    
    <!-- Decorative background elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-32 left-10 w-80 h-80 bg-gradient-to-tr from-cyan-400/10 to-pink-400/10 rounded-full blur-3xl animate-float-delayed"></div>
    </div>
    
    <header v-if="!isAuthPage" class="fixed w-full z-50 transition-all duration-300 backdrop-blur-xl bg-white/90 border-b border-white/50 shadow-lg shadow-slate-200/50 supports-[backdrop-filter]:bg-white/70">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-3 group">
            <div class="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-600/30 group-hover:shadow-xl group-hover:shadow-purple-600/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 overflow-hidden">
               <div class="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white relative z-10 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="text-xl font-bold tracking-tight text-slate-900 font-display group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300">
              AutoDrive<span class="text-blue-600 group-hover:text-current">Careers</span>
            </span>
          </RouterLink>
          
          <div class="hidden md:flex ml-12 space-x-2">
            <RouterLink to="/" class="nav-item" active-class="active">
              <span class="flex items-center gap-2">
                <span>🏠</span>
                <span>首页</span>
              </span>
            </RouterLink>
            <RouterLink to="/jobs" class="nav-item" active-class="active">
              <span class="flex items-center gap-2">
                <span>💼</span>
                <span>职位列表</span>
              </span>
            </RouterLink>
            <RouterLink v-if="authStore.isAuthenticated && authStore.user?.type === 'candidate'" to="/resume-builder" class="nav-item" active-class="active">
              <span class="flex items-center gap-2">
                <span>✨</span>
                <span>生成简历</span>
              </span>
            </RouterLink>
            <RouterLink v-if="authStore.isAuthenticated && authStore.user?.type === 'company'" to="/job-builder" class="nav-item" active-class="active">
              <span class="flex items-center gap-2">
                <span>🚀</span>
                <span>发布岗位</span>
              </span>
            </RouterLink>
          </div>
        </div>
        
        <div class="flex items-center space-x-3">
          <template v-if="authStore.isAuthenticated">
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-slate-700">
                {{ authStore.user?.type === 'candidate' ? authStore.user.name : authStore.user?.companyName }}
              </span>
              <button 
                @click="authStore.logout"
                class="text-sm font-bold text-slate-600 hover:text-red-600 transition-all duration-300 px-5 py-2.5 rounded-xl hover:bg-red-50 relative overflow-hidden group"
              >
                <span class="relative z-10">退出登录</span>
              </button>
            </div>
          </template>
          <template v-else>
            <RouterLink to="/login">
              <button class="text-sm font-bold text-slate-600 hover:text-slate-900 transition-all duration-300 px-5 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 relative overflow-hidden group">
                <span class="relative z-10">候选人登录</span>
                <div class="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </RouterLink>
            <RouterLink to="/company-login">
              <button class="px-6 py-2.5 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-900/30 hover:shadow-xl hover:shadow-blue-900/40 hover:-translate-y-0.5 transition-all duration-300 border border-transparent relative overflow-hidden group">
                <span class="relative z-10">企业入驻</span>
                <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </RouterLink>
          </template>
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

    <footer v-if="!isAuthPage" class="bg-gradient-to-b from-white to-slate-50 border-t border-slate-100 py-20 relative z-10 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div class="col-span-1 md:col-span-4">
            <div class="flex items-center space-x-3 mb-6 group">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span class="text-xl font-bold text-slate-900 tracking-tight font-display">AutoDrive Careers</span>
            </div>
            <p class="text-slate-600 text-sm leading-relaxed mb-8 max-w-sm">
              专注于汽车智能驾驶领域的人才招聘平台。连接全球顶尖人才与创新企业，驱动未来出行变革。✨
            </p>
            <div class="flex space-x-3">
              <a href="#" class="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center text-slate-500 hover:from-blue-500 hover:to-purple-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 group">
                <span class="font-serif font-bold text-lg group-hover:scale-110 transition-transform duration-300">W</span>
              </a>
              <a href="#" class="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center text-slate-500 hover:from-blue-500 hover:to-purple-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 group">
                <span class="font-serif font-bold text-lg group-hover:scale-110 transition-transform duration-300">L</span>
              </a>
              <a href="#" class="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center text-slate-500 hover:from-blue-500 hover:to-purple-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 group">
                <span class="font-serif font-bold text-lg group-hover:scale-110 transition-transform duration-300">G</span>
              </a>
            </div>
          </div>
          
          <div class="col-span-1 md:col-span-2 md:col-start-6">
            <h4 class="text-slate-900 font-bold mb-6 text-sm uppercase tracking-wider">求职者</h4>
            <ul class="space-y-4 text-sm text-slate-600 font-medium">
              <li>
                <RouterLink to="/jobs" class="hover:text-blue-600 transition-colors flex items-center group">
                  <el-icon class="mr-2 text-base group-hover:scale-110 transition-transform"><Position /></el-icon>
                  <span class="group-hover:translate-x-1 transition-transform">浏览职位</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/resume-builder" class="hover:text-blue-600 transition-colors flex items-center group">
                  <el-icon class="mr-2 text-base group-hover:scale-110 transition-transform"><Document /></el-icon>
                  <span class="group-hover:translate-x-1 transition-transform">生成简历</span>
                </RouterLink>
              </li>
              <li><a href="#" class="hover:text-blue-600 transition-colors flex items-center group"><el-icon class="mr-2 text-base group-hover:scale-110 transition-transform"><Promotion /></el-icon> <span class="group-hover:translate-x-1 transition-transform">求职攻略</span></a></li>
            </ul>
          </div>

          <div class="col-span-1 md:col-span-2">
            <h4 class="text-slate-900 font-bold mb-6 text-sm uppercase tracking-wider">企业服务</h4>
            <ul class="space-y-4 text-sm text-slate-600 font-medium">
              <li>
                <RouterLink to="/job-builder" class="hover:text-blue-600 transition-all flex items-center group">
                  <span class="group-hover:translate-x-1 transition-transform">发布职位</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/company-login" class="hover:text-blue-600 transition-all flex items-center group">
                  <span class="group-hover:translate-x-1 transition-transform">企业入驻</span>
                </RouterLink>
              </li>
              <li><a href="#" class="hover:text-blue-600 transition-all flex items-center group"><span class="group-hover:translate-x-1 transition-transform">雇主品牌</span></a></li>
            </ul>
          </div>

          <div class="col-span-1 md:col-span-3">
            <h4 class="text-slate-900 font-bold mb-6 text-sm uppercase tracking-wider">联系我们</h4>
            <ul class="space-y-4 text-sm text-slate-600 font-medium">
              <li class="flex items-center group"><el-icon class="mr-2 text-base text-blue-600 group-hover:scale-110 transition-transform"><ChatDotRound /></el-icon> <span class="group-hover:text-blue-600 transition-colors">contact@autodrivecareers.com</span></li>
              <li class="flex items-center group"><el-icon class="mr-2 text-base text-blue-600 group-hover:scale-110 transition-transform"><OfficeBuilding /></el-icon> <span class="group-hover:text-blue-600 transition-colors">上海市嘉定区安亭汽车城</span></li>
            </ul>
          </div>
        </div>
        <div class="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 font-medium">
          <p class="flex items-center gap-2">&copy; 2025 AutoDrive Careers. <span class="text-red-500 animate-pulse">❤️</span> All rights reserved.</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="hover:text-blue-600 transition-colors relative group">
              <span>Privacy Policy</span>
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" class="hover:text-blue-600 transition-colors relative group">
              <span>Terms of Service</span>
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
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
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Nav Item Styling */
.nav-item {
  @apply px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 relative;
}
.nav-item.active {
  @apply text-slate-900 bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm;
}
.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30%;
  height: 3px;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  border-radius: 2px;
}

/* Custom bg utilities */
.bg-size-200 {
  background-size: 200% 100%;
}
.bg-pos-0 {
  background-position: 0% 0%;
}
.bg-pos-100 {
  background-position: 100% 0%;
}
</style>
