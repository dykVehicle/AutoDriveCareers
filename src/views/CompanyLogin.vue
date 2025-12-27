<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { ElMessage } from 'element-plus';
import { Lock, Message, Phone, OfficeBuilding } from '@element-plus/icons-vue';

const router = useRouter();
const authStore = useAuthStore();

const isLogin = ref(true);
const registrationType = ref<'email' | 'phone'>('email');
const countdown = ref(0);

const form = ref({
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  companyName: '',
  verificationCode: ''
});

const loading = ref(false);

// 发送验证码
const sendCode = async () => {
  if (!form.value.email) {
    ElMessage.error('请输入邮箱地址');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.value.email)) {
    ElMessage.error('请输入有效的邮箱地址');
    return;
  }

  try {
    await authStore.sendVerificationCode(form.value.email);
    ElMessage.success('验证码已发送，请查收邮件');
    
    countdown.value = 60;
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  } catch (error) {
    ElMessage.error('发送验证码失败，请稍后重试');
  }
};

const handleSubmit = async () => {
  // 验证表单
  if (isLogin.value) {
    if (registrationType.value === 'email' && !form.value.email) {
      ElMessage.error('请输入邮箱地址');
      return;
    }
    if (registrationType.value === 'phone' && !form.value.phone) {
      ElMessage.error('请输入手机号');
      return;
    }
    if (!form.value.password) {
      ElMessage.error('请输入密码');
      return;
    }
  } else {
    if (registrationType.value === 'email') {
      if (!form.value.email) {
        ElMessage.error('请输入邮箱地址');
        return;
      }
      if (!form.value.verificationCode) {
        ElMessage.error('请输入验证码');
        return;
      }
    }
    if (registrationType.value === 'phone' && !form.value.phone) {
      ElMessage.error('请输入手机号');
      return;
    }
    if (!form.value.companyName) {
      ElMessage.error('请输入企业名称');
      return;
    }
    if (!form.value.password) {
      ElMessage.error('请输入密码');
      return;
    }
    if (form.value.password !== form.value.confirmPassword) {
      ElMessage.error('两次输入的密码不一致');
      return;
    }
  }

  loading.value = true;

  try {
    if (isLogin.value) {
      await authStore.login({
        email: registrationType.value === 'email' ? form.value.email : undefined,
        phone: registrationType.value === 'phone' ? form.value.phone : undefined,
        password: form.value.password,
        userType: 'company'
      });
      ElMessage.success('登录成功！');
      router.push('/');
    } else {
      await authStore.register({
        email: registrationType.value === 'email' ? form.value.email : undefined,
        phone: registrationType.value === 'phone' ? form.value.phone : undefined,
        password: form.value.password,
        companyName: form.value.companyName,
        verificationCode: form.value.verificationCode,
        userType: 'company'
      });
      ElMessage.success('注册成功！');
      router.push('/');
    }
  } catch (error) {
    ElMessage.error(isLogin.value ? '登录失败，请检查凭证' : '注册失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  form.value = {
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    verificationCode: ''
  };
};

const switchRegistrationType = (type: 'email' | 'phone') => {
  registrationType.value = type;
  form.value.email = '';
  form.value.phone = '';
  form.value.verificationCode = '';
};
</script>

<template>
  <div class="min-h-screen flex bg-gradient-to-br from-slate-50 to-purple-50">
    <!-- Left Side: Visual & Branding -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white">
      <!-- Background Effects -->
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-slate-900/95 mix-blend-multiply"></div>
      
      <!-- Animated Shapes -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-overlay filter blur-[120px] opacity-40 animate-pulse-slow"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mix-blend-overlay filter blur-[120px] opacity-40 animate-pulse-slow" style="animation-delay: 2s"></div>
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
            寻找顶尖的<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-gradient bg-size-200">智能驾驶</span>
            <br>人才
          </h1>
          <p class="text-xl text-slate-200 max-w-md leading-relaxed mb-8 drop-shadow-lg">
            在这里发布职位，接触数千名优秀的自动驾驶领域专业人才。加速您的团队建设。🚀
          </p>
          <div class="flex gap-4">
            <div class="px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-sm font-bold flex items-center gap-2">
              <span class="text-2xl">🏢</span>
              <span>1000+ 企业入驻</span>
            </div>
            <div class="px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-sm font-bold flex items-center gap-2">
              <span class="text-2xl">👥</span>
              <span>10000+ 简历投递</span>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-4 text-sm text-slate-300">
          <span>&copy; 2025 AutoDrive Careers</span>
          <span class="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
          <span class="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
        </div>
      </div>
    </div>

    <!-- Right Side: Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white relative">
      <div class="absolute inset-0 lg:hidden bg-gradient-to-br from-slate-50 to-purple-50 -z-10"></div>
      
      <!-- Decorative elements -->
      <div class="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl"></div>

      <div class="max-w-md w-full relative z-10">
        <div class="text-center lg:text-left mb-12">
          <div class="inline-block lg:block mb-4">
            <span class="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold">
              {{ isLogin ? '🏢 欢迎回来' : '🎉 企业入驻' }}
            </span>
          </div>
          <h2 class="text-4xl font-black text-slate-900 mb-3">
            {{ isLogin ? '企业登录' : '企业注册' }}
          </h2>
          <p class="text-slate-600 text-lg">
            {{ isLogin ? '请输入您的凭证以访问账户 🔐' : '填写以下信息开始招聘优秀人才 ✨' }}
          </p>
        </div>

        <!-- 注册方式切换 -->
        <div v-if="!isLogin" class="flex gap-2 mb-6 p-1 bg-slate-100 rounded-xl">
          <button 
            @click="switchRegistrationType('email')"
            :class="['flex-1 py-2.5 rounded-lg font-bold text-sm transition-all', registrationType === 'email' ? 'bg-white text-purple-600 shadow' : 'text-slate-600']"
          >
            <el-icon class="mr-1"><Message /></el-icon>
            邮箱注册
          </button>
          <button 
            @click="switchRegistrationType('phone')"
            :class="['flex-1 py-2.5 rounded-lg font-bold text-sm transition-all', registrationType === 'phone' ? 'bg-white text-purple-600 shadow' : 'text-slate-600']"
          >
            <el-icon class="mr-1"><Phone /></el-icon>
            手机号注册
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-5">
            <!-- 邮箱输入 -->
            <div v-if="registrationType === 'email'">
              <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">企业邮箱</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-600 transition-colors">
                  <el-icon :size="20"><Message /></el-icon>
                </div>
                <input 
                  v-model="form.email"
                  type="email" 
                  class="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium text-base hover:border-slate-300"
                  placeholder="hr@company.com"
                  required
                />
              </div>
            </div>

            <!-- 手机号输入 -->
            <div v-else>
              <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">联系电话</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-600 transition-colors">
                  <el-icon :size="20"><Phone /></el-icon>
                </div>
                <input 
                  v-model="form.phone"
                  type="tel" 
                  class="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium text-base hover:border-slate-300"
                  placeholder="13800138000"
                  required
                />
              </div>
            </div>

            <!-- 验证码（仅邮箱注册时显示） -->
            <div v-if="!isLogin && registrationType === 'email'">
              <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">验证码</label>
              <div class="flex gap-2">
                <div class="relative group flex-1">
                  <input 
                    v-model="form.verificationCode"
                    type="text" 
                    class="block w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium text-base hover:border-slate-300"
                    placeholder="请输入验证码"
                    required
                  />
                </div>
                <button 
                  type="button"
                  @click="sendCode"
                  :disabled="countdown > 0"
                  class="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-sm hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {{ countdown > 0 ? `${countdown}秒` : '发送验证码' }}
                </button>
              </div>
            </div>

            <!-- 企业名称（仅注册时显示） -->
            <div v-if="!isLogin">
              <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">企业名称</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-600 transition-colors">
                  <el-icon :size="20"><OfficeBuilding /></el-icon>
                </div>
                <input 
                  v-model="form.companyName"
                  type="text" 
                  class="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium text-base hover:border-slate-300"
                  placeholder="请输入企业全称"
                  required
                />
              </div>
            </div>

            <!-- 密码 -->
            <div>
              <div class="flex justify-between items-center mb-2 ml-1">
                <label class="block text-sm font-bold text-slate-800">密码</label>
                <a v-if="isLogin" href="#" class="text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors">忘记密码？</a>
              </div>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-600 transition-colors">
                  <el-icon :size="20"><Lock /></el-icon>
                </div>
                <input 
                  v-model="form.password"
                  type="password" 
                  class="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium text-base hover:border-slate-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <!-- 确认密码（仅注册时显示） -->
            <div v-if="!isLogin">
              <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">确认密码</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-600 transition-colors">
                  <el-icon :size="20"><Lock /></el-icon>
                </div>
                <input 
                  v-model="form.confirmPassword"
                  type="password" 
                  class="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium text-base hover:border-slate-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            class="w-full flex items-center justify-center gap-3 py-4 px-6 border-2 border-transparent rounded-2xl shadow-xl shadow-purple-500/40 text-lg font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100 focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-500/50 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
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
            <button class="font-bold text-purple-600 hover:text-purple-700 ml-1 transition-colors relative group" @click="toggleMode">
              {{ isLogin ? '立即免费注册' : '直接登录' }}
              <span class="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </button>
          </p>
          <p class="text-sm text-slate-500 mt-4">
            候选人用户？
            <router-link to="/login" class="font-bold text-blue-600 hover:text-blue-700 ml-1 transition-colors">
              前往候选人登录
            </router-link>
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
</style>
