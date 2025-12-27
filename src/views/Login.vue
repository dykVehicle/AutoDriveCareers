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
  <div class="min-h-screen flex bg-white">
    <!-- Left Side: Visual & Branding -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 text-white">
      <!-- Background Effects -->
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-40"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-slate-900/90 to-purple-900/90 mix-blend-multiply"></div>
      
      <!-- Animated Shapes -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-30 animate-pulse-slow"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-30 animate-pulse-slow" style="animation-delay: 2s"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-between w-full p-16">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="text-xl font-bold tracking-tight">AutoDrive Careers</span>
        </div>

        <div>
          <h1 class="text-5xl font-black mb-6 leading-tight">
            连接未来的<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">智能驾驶</span>人才
          </h1>
          <p class="text-lg text-slate-300 max-w-md leading-relaxed">
            加入全球顶尖的自动驾驶生态圈。这里汇聚了最前沿的算法工程师、车辆专家和创新领袖。
          </p>
        </div>

        <div class="flex items-center space-x-4 text-sm text-slate-400">
          <span>&copy; 2025 AutoDrive Careers</span>
          <span class="w-1 h-1 bg-slate-500 rounded-full"></span>
          <span>Privacy Policy</span>
          <span class="w-1 h-1 bg-slate-500 rounded-full"></span>
          <span>Terms</span>
        </div>
      </div>
    </div>

    <!-- Right Side: Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white relative">
      <!-- Mobile Background (Subtle) -->
      <div class="absolute inset-0 lg:hidden bg-slate-50 -z-10"></div>

      <div class="max-w-md w-full">
        <div class="text-center lg:text-left mb-10">
          <h2 class="text-3xl font-bold text-slate-900 mb-2">{{ isLogin ? '欢迎回来' : '创建账户' }}</h2>
          <p class="text-slate-500">
            {{ isLogin ? '请输入您的凭证以访问账户' : '填写以下信息开始您的旅程' }}
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">电子邮箱</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <el-icon><User /></el-icon>
                </div>
                <input 
                  v-model="form.email"
                  type="email" 
                  class="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-1.5 ml-1">
                <label class="block text-sm font-semibold text-slate-700">密码</label>
                <a v-if="isLogin" href="#" class="text-xs font-semibold text-blue-600 hover:text-blue-500">忘记密码？</a>
              </div>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <el-icon><Lock /></el-icon>
                </div>
                <input 
                  v-model="form.password"
                  type="password" 
                  class="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            class="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            :disabled="loading"
          >
            <span v-if="loading" class="mr-2 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            {{ isLogin ? '登 录' : '注 册' }}
          </button>
        </form>

        <div class="mt-8 pt-8 border-t border-slate-100 text-center">
          <p class="text-sm text-slate-600">
            {{ isLogin ? '还没有账号？' : '已有账号？' }}
            <button class="font-bold text-blue-600 hover:text-blue-500 ml-1 transition-colors" @click="isLogin = !isLogin">
              {{ isLogin ? '立即免费注册' : '直接登录' }}
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 确保背景图片不会太大 */
.bg-cover {
  background-size: cover;
}
</style>
