<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isAuthPage = computed(() => ['/login'].includes(route.path))
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
    <header v-if="!isAuthPage" class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 transition-all duration-300">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-3 group">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="text-xl font-bold tracking-tight text-slate-900">AutoDrive <span class="text-blue-600">Careers</span></span>
          </RouterLink>
          <div class="hidden md:flex ml-12 space-x-1">
            <RouterLink to="/" class="px-4 py-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all" active-class="bg-blue-50 text-blue-600">首页</RouterLink>
            <RouterLink to="/jobs" class="px-4 py-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all" active-class="bg-blue-50 text-blue-600">职位列表</RouterLink>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <RouterLink to="/login">
            <button class="px-5 py-2 text-slate-600 hover:text-blue-600 font-medium transition-colors">登录</button>
          </RouterLink>
          <RouterLink to="/login">
            <button class="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg">
              企业入驻
            </button>
          </RouterLink>
        </div>
      </nav>
    </header>

    <main class="flex-grow">
      <RouterView />
    </main>

    <footer v-if="!isAuthPage" class="bg-white border-t border-slate-100 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div class="col-span-1 md:col-span-1">
            <div class="flex items-center space-x-2 mb-6">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span class="text-lg font-bold text-slate-900">AutoDrive Careers</span>
            </div>
            <p class="text-slate-500 text-sm leading-relaxed">
              专注于汽车智能驾驶领域的人才招聘平台，连接全球顶尖人才与创新企业，推动出行科技变革。
            </p>
          </div>
          
          <div>
            <h4 class="text-slate-900 font-bold mb-6">求职者</h4>
            <ul class="space-y-3 text-sm text-slate-500">
              <li><a href="#" class="hover:text-blue-600 transition-colors">浏览职位</a></li>
              <li><a href="#" class="hover:text-blue-600 transition-colors">热门公司</a></li>
              <li><a href="#" class="hover:text-blue-600 transition-colors">薪资报告</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-slate-900 font-bold mb-6">企业服务</h4>
            <ul class="space-y-3 text-sm text-slate-500">
              <li><a href="#" class="hover:text-blue-600 transition-colors">发布职位</a></li>
              <li><a href="#" class="hover:text-blue-600 transition-colors">人才搜索</a></li>
              <li><a href="#" class="hover:text-blue-600 transition-colors">企业认证</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-slate-900 font-bold mb-6">联系我们</h4>
            <ul class="space-y-3 text-sm text-slate-500">
              <li>contact@autodrivecareers.com</li>
              <li>上海市嘉定区安亭汽车城</li>
            </ul>
          </div>
        </div>
        <div class="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; 2025 AutoDrive Careers. All rights reserved.</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="hover:text-slate-600">隐私政策</a>
            <a href="#" class="hover:text-slate-600">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.h-18 {
  height: 4.5rem;
}
</style>
