<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { User, Lock } from '@element-plus/icons-vue';

const router = useRouter();
const isLogin = ref(true);

const form = ref({
  email: '',
  password: ''
});

const loading = ref(false);

const handleSubmit = () => {
  loading.value = true;
  // Mock login simulation
  setTimeout(() => {
    loading.value = false;
    router.push('/');
  }, 1000);
};
</script>

<template>
  <div class="min-h-screen flex bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Left Side: Visual & Branding -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      <!-- Background Effects -->
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-purple-900/95 to-slate-900/95 mix-blend-multiply"></div>
      
      <!-- Animated Shapes with enhanced colors -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-overlay filter blur-[120px] opacity-40 animate-pulse-slow"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-overlay filter blur-[120px] opacity-40 animate-pulse-slow" style="animation-delay: 2s"></div>
        <div class="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mix-blend-overlay filter blur-[120px] opacity-30 animate-pulse-slow" style="animation-delay: 1s"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-between w-full p-16">
        <div class="flex items-center space-x-3 group cursor-pointer">
          <div class="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="text-2xl font-bold tracking-tight drop-shadow-lg">AutoDrive Careers</span>
        </div>

        <div>
          <h1 class="text-6xl font-black mb-8 leading-tight drop-shadow-2xl">
            连接未来的<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 animate-gradient bg-size-200">智能驾驶</span>
            <br>人才
          </h1>
          <p class="text-xl text-slate-200 max-w-md leading-relaxed mb-8 drop-shadow-lg">
            加入全球顶尖的自动驾驶生态圈。这里汇聚了最前沿的算法工程师、车辆专家和创新领袖。✨
          </p>
          <div class="flex gap-4">
            <div class="px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-sm font-bold flex items-center gap-2">
              <span class="text-2xl">🚀</span>
              <span>5000+ 职位</span>
            </div>
            <div class="px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-sm font-bold flex items-center gap-2">
              <span class="text-2xl">💼</span>
              <span>1000+ 企业</span>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-4 text-sm text-slate-300">
          <span>&copy; 2025 AutoDrive Careers</span>
          <span class="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
          <span class="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
          <span class="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
          <span class="hover:text-white transition-colors cursor-pointer">Terms</span>
        </div>
      </div>
    </div>

    <!-- Right Side: Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white relative">
      <!-- Mobile Background (Subtle gradient) -->
      <div class="absolute inset-0 lg:hidden bg-gradient-to-br from-slate-50 to-blue-50 -z-10"></div>
      
      <!-- Decorative elements -->
      <div class="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-pink-400/10 rounded-full blur-3xl"></div>

      <div class="max-w-md w-full relative z-10">
        <div class="text-center lg:text-left mb-12">
          <div class="inline-block lg:block mb-4">
            <span class="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-bold">{{ isLogin ? '👋 欢迎回来' : '🎉 创建账户' }}</span>
          </div>
          <h2 class="text-4xl font-black text-slate-900 mb-3 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text">{{ isLogin ? '欢迎回来' : '创建账户' }}</h2>
          <p class="text-slate-600 text-lg">
            {{ isLogin ? '请输入您的凭证以访问账户 🔐' : '填写以下信息开始您的旅程 ✨' }}
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-5">
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">电子邮箱</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <el-icon :size="20"><User /></el-icon>
                </div>
                <input 
                  v-model="form.email"
                  type="email" 
                  class="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-base hover:border-slate-300"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-2 ml-1">
                <label class="block text-sm font-bold text-slate-800">密码</label>
                <a v-if="isLogin" href="#" class="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">忘记密码？</a>
              </div>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <el-icon :size="20"><Lock /></el-icon>
                </div>
                <input 
                  v-model="form.password"
                  type="password" 
                  class="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-base hover:border-slate-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            class="w-full flex items-center justify-center gap-3 py-4 px-6 border-2 border-transparent rounded-2xl shadow-xl shadow-blue-500/40 text-lg font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 bg-pos-0 hover:bg-pos-100 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
            :disabled="loading"
          >
            <span v-if="loading" class="mr-2 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span class="relative z-10">{{ isLogin ? '登 录' : '注 册' }}</span>
            <span class="text-xl relative z-10">{{ isLogin ? '🚀' : '✨' }}</span>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
          </button>
        </form>

        <div class="mt-10 pt-8 border-t border-slate-200 text-center">
          <p class="text-base text-slate-700">
            {{ isLogin ? '还没有账号？' : '已有账号？' }}
            <button class="font-bold text-blue-600 hover:text-blue-700 ml-1 transition-colors relative group" @click="isLogin = !isLogin">
              {{ isLogin ? '立即免费注册' : '直接登录' }}
              <span class="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure background size utilities work */
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
