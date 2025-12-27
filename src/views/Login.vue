<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { User, Lock, Message, Iphone, OfficeBuilding } from '@element-plus/icons-vue';
import { useAuthStore, type UserRole } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

// State
const role = ref<UserRole>('candidate'); // 'candidate' or 'company'
const isLogin = ref(true); // Login vs Register
const loginMethod = ref<'password' | 'code'>('password'); // For candidate only

const form = reactive({
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  code: '',
  companyName: '',
});

const loading = ref(false);
const codeCooldown = ref(0);

// Computed
// If candidate + code login, show email/phone toggle? Or just one input?
// Requirement: "支持邮箱，手机号注册，其中邮箱注册支持验证码检验"
// Simplified interpretation:
// Candidate Register: 
//   - Phone + Code
//   - Email + Code
// Candidate Login:
//   - Phone/Email + Password
//   - Phone/Email + Code (optional, but good UX)
// 
// Let's structure it carefully.

const sendCode = () => {
  if (codeCooldown.value > 0) return;
  // Mock sending code
  codeCooldown.value = 60;
  const timer = setInterval(() => {
    codeCooldown.value--;
    if (codeCooldown.value <= 0) clearInterval(timer);
  }, 1000);
};

const handleSubmit = async () => {
  loading.value = true;
  try {
    const payload = {
        role: role.value,
        email: form.email,
        phone: form.phone,
        password: form.password
    };
    
    if (isLogin.value) {
        await authStore.login(payload);
    } else {
        await authStore.register(payload);
    }
    
    router.push('/');
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const toggleMode = () => {
    isLogin.value = !isLogin.value;
    // Reset form errors/state if needed
}
</script>

<template>
  <div class="min-h-screen flex bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Left Side: Visual & Branding (Keep existing) -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
       <!-- Background Effects -->
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-purple-900/95 to-slate-900/95 mix-blend-multiply"></div>
      
      <!-- Animated Shapes -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-overlay filter blur-[120px] opacity-40 animate-pulse-slow"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-overlay filter blur-[120px] opacity-40 animate-pulse-slow" style="animation-delay: 2s"></div>
        <div class="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mix-blend-overlay filter blur-[120px] opacity-30 animate-pulse-slow" style="animation-delay: 1s"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-between w-full p-16">
        <div class="flex items-center space-x-3 group cursor-pointer" @click="router.push('/')">
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
        </div>
      </div>
    </div>

    <!-- Right Side: Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white relative overflow-y-auto">
      
       <!-- Role Switcher (Top Right or Centered above form) -->
       <div class="absolute top-8 right-8 z-20 bg-slate-100 p-1 rounded-xl flex">
            <button 
                @click="role = 'candidate'"
                :class="['px-4 py-2 rounded-lg text-sm font-bold transition-all', role === 'candidate' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700']"
            >
                我是候选人
            </button>
            <button 
                @click="role = 'company'"
                :class="['px-4 py-2 rounded-lg text-sm font-bold transition-all', role === 'company' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700']"
            >
                我是企业
            </button>
       </div>

      <div class="max-w-md w-full relative z-10 mt-12 lg:mt-0">
        <div class="text-center lg:text-left mb-10">
          <div class="inline-block lg:block mb-4">
            <span :class="['px-4 py-2 rounded-full text-sm font-bold', role === 'candidate' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700']">
                {{ role === 'candidate' ? '👨‍💻 寻找机会' : '🏢 招聘人才' }}
            </span>
          </div>
          <h2 class="text-4xl font-black text-slate-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r"
              :class="role === 'candidate' ? 'from-blue-600 to-cyan-600' : 'from-purple-600 to-pink-600'">
            {{ isLogin ? '欢迎回来' : '创建账户' }}
          </h2>
          <p class="text-slate-600 text-lg">
             {{ role === 'candidate' ? '开启您的职业新篇章' : '找到最优秀的自动驾驶人才' }}
          </p>
        </div>

        <!-- Login Method Tabs (Candidate Only) -->
        <div v-if="role === 'candidate'" class="flex border-b border-slate-200 mb-6">
            <button 
                class="pb-3 px-4 text-sm font-bold border-b-2 transition-colors mr-4"
                :class="loginMethod === 'password' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'"
                @click="loginMethod = 'password'"
            >
                密码登录
            </button>
            <button 
                class="pb-3 px-4 text-sm font-bold border-b-2 transition-colors"
                :class="loginMethod === 'code' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'"
                @click="loginMethod = 'code'"
            >
                验证码登录/注册
            </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
            
            <!-- Company Fields -->
            <div v-if="role === 'company' && !isLogin">
                 <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">企业名称</label>
                 <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <el-icon :size="20"><OfficeBuilding /></el-icon>
                    </div>
                    <input 
                        v-model="form.companyName"
                        type="text" 
                        class="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all font-medium outline-none"
                        placeholder="例如：Tesla, Waymo"
                    />
                 </div>
            </div>

            <!-- Email / Phone Input -->
            <div>
              <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">
                  {{ loginMethod === 'code' ? '手机号 / 邮箱' : '邮箱 / 账号' }}
              </label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <el-icon :size="20" v-if="loginMethod === 'code'"><Iphone /></el-icon>
                  <el-icon :size="20" v-else><User /></el-icon>
                </div>
                <input 
                  v-model="form.email"
                  :type="loginMethod === 'code' ? 'text' : 'email'"
                  class="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all font-medium text-base hover:border-slate-300"
                  :class="role === 'candidate' ? 'focus:border-blue-500 focus:ring-blue-500/20' : 'focus:border-purple-500 focus:ring-purple-500/20'"
                  :placeholder="loginMethod === 'code' ? '请输入手机号或邮箱' : 'name@company.com'"
                  required
                />
              </div>
            </div>

            <!-- Password Input -->
            <div v-if="loginMethod === 'password'">
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
                  class="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all font-medium text-base hover:border-slate-300"
                  :class="role === 'candidate' ? 'focus:border-blue-500 focus:ring-blue-500/20' : 'focus:border-purple-500 focus:ring-purple-500/20'"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <!-- Confirm Password (Register + Password Mode) -->
            <div v-if="!isLogin && loginMethod === 'password'">
                 <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">确认密码</label>
                 <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <el-icon :size="20"><Lock /></el-icon>
                    </div>
                    <input 
                        v-model="form.confirmPassword"
                        type="password" 
                        class="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium outline-none"
                         :class="role === 'candidate' ? 'focus:border-blue-500 focus:ring-blue-500/20' : 'focus:border-purple-500 focus:ring-purple-500/20'"
                        placeholder="••••••••"
                    />
                 </div>
            </div>

            <!-- Verification Code -->
            <div v-if="loginMethod === 'code'">
                <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">验证码</label>
                <div class="flex gap-3">
                    <div class="relative group flex-grow">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <el-icon :size="20"><Message /></el-icon>
                        </div>
                        <input 
                            v-model="form.code"
                            type="text" 
                            class="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium outline-none"
                             :class="role === 'candidate' ? 'focus:border-blue-500 focus:ring-blue-500/20' : 'focus:border-purple-500 focus:ring-purple-500/20'"
                            placeholder="6位验证码"
                        />
                    </div>
                    <button 
                        type="button"
                        @click="sendCode"
                        :disabled="codeCooldown > 0 || !form.email"
                        class="px-6 rounded-2xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        :class="role === 'candidate' 
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'"
                    >
                        {{ codeCooldown > 0 ? `${codeCooldown}s` : '获取验证码' }}
                    </button>
                </div>
            </div>

          <button 
            type="submit" 
            class="w-full flex items-center justify-center gap-3 py-4 px-6 border-2 border-transparent rounded-2xl shadow-xl text-lg font-bold text-white bg-size-200 bg-pos-0 hover:bg-pos-100 focus:outline-none focus:ring-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group mt-8"
            :class="role === 'candidate' 
                ? 'shadow-blue-500/40 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 focus:ring-blue-500/30' 
                : 'shadow-purple-500/40 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 focus:ring-purple-500/30'"
            :disabled="loading"
          >
            <span v-if="loading" class="mr-2 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span class="relative z-10">
                {{ isLogin ? '登 录' : (loginMethod === 'code' && role === 'candidate' ? '登录 / 注册' : '注册企业') }}
            </span>
          </button>
        </form>

        <div class="mt-10 pt-8 border-t border-slate-200 text-center" v-if="loginMethod === 'password' || role === 'company'">
          <p class="text-base text-slate-700">
            {{ isLogin ? '还没有账号？' : '已有账号？' }}
            <button 
                class="font-bold ml-1 transition-colors relative group" 
                :class="role === 'candidate' ? 'text-blue-600 hover:text-blue-700' : 'text-purple-600 hover:text-purple-700'"
                @click="toggleMode"
            >
              {{ isLogin ? '立即免费注册' : '直接登录' }}
              <span class="absolute -bottom-0.5 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    :class="role === 'candidate' ? 'bg-blue-600' : 'bg-purple-600'"></span>
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-size-200 {
  background-size: 200% 100%;
}
.bg-pos-0 {
  background-position: 0% 0%;
}
.bg-pos-100 {
  background-position: 100% 0%;
}
.animate-pulse-slow {
    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
