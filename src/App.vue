<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-2">
            <!-- Icon/Logo Placeholder -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span class="text-2xl font-bold text-blue-600 tracking-tight">AutoDrive Careers</span>
          </RouterLink>
          <div class="hidden md:flex ml-10 space-x-8">
            <RouterLink to="/" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">首页</RouterLink>
            <RouterLink to="/jobs" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">职位列表</RouterLink>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <RouterLink to="/login">
            <el-button type="primary" plain>登录 / 注册</el-button>
          </RouterLink>
          <el-button type="primary">企业入驻</el-button>
        </div>
      </nav>
    </header>

    <main class="flex-grow">
      <RouterView />
    </main>

    <footer class="bg-slate-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AutoDrive Careers
            </h3>
            <p class="text-slate-400">专注于汽车智能驾驶领域的人才招聘平台，连接顶尖人才与创新企业。</p>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">快速链接</h4>
            <ul class="space-y-2 text-slate-400">
              <li><RouterLink to="/jobs" class="hover:text-white transition-colors">最新职位</RouterLink></li>
              <li><a href="#" class="hover:text-white transition-colors">公司列表</a></li>
              <li><a href="#" class="hover:text-white transition-colors">关于我们</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">联系我们</h4>
            <p class="text-slate-400">contact@autodrivecareers.com</p>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500">
          &copy; 2025 AutoDrive Careers. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Global overrides can go here */
</style>
