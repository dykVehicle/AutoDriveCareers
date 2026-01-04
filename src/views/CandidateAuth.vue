<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useAuthStore } from '../stores/auth';
import { isValidCnPhone, isValidEmail } from '../services/auth';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const redirectTo = computed(() => (route.query.redirect as string) || '/resume-builder');

const mode = ref<'login' | 'register'>('login');
const method = ref<'email' | 'phone'>('email');

const loading = ref(false);
const codeSending = ref(false);
const codeCooldown = ref(0);
let cooldownTimer: number | undefined;

const form = ref({
  email: '',
  phone: '',
  emailCode: '',
  password: '',
  displayName: ''
});

const canSendCode = computed(() => {
  if (mode.value !== 'register') return false;
  if (method.value !== 'email') return false;
  if (!isValidEmail(form.value.email)) return false;
  return codeCooldown.value <= 0 && !codeSending.value;
});

const startCooldown = (sec = 60) => {
  codeCooldown.value = sec;
  window.clearInterval(cooldownTimer);
  cooldownTimer = window.setInterval(() => {
    codeCooldown.value -= 1;
    if (codeCooldown.value <= 0) {
      window.clearInterval(cooldownTimer);
    }
  }, 1000);
};

const sendCode = async () => {
  try {
    codeSending.value = true;
    const rec = await auth.sendCandidateEmailCode(form.value.email);
    // 演示环境：直接弹出验证码
    ElMessage.success(`验证码已发送（演示）：${rec.code}（5分钟内有效）`);
    startCooldown(60);
  } catch (e: any) {
    ElMessage.error(e?.message || '发送验证码失败');
  } finally {
    codeSending.value = false;
  }
};

const validate = () => {
  if (method.value === 'email') {
    if (!isValidEmail(form.value.email)) throw new Error('请输入正确的邮箱');
    if (mode.value === 'register' && !form.value.emailCode.trim()) throw new Error('请输入邮箱验证码');
  } else {
    if (!isValidCnPhone(form.value.phone)) throw new Error('请输入正确的手机号');
  }
  if (form.value.password.trim().length < 6) throw new Error('密码至少 6 位');
};

const submit = async () => {
  try {
    validate();
    loading.value = true;
    if (mode.value === 'login') {
      await auth.login({
        role: 'candidate',
        email: method.value === 'email' ? form.value.email : undefined,
        phone: method.value === 'phone' ? form.value.phone : undefined,
        password: form.value.password
      });
      ElMessage.success('登录成功');
      await router.push(redirectTo.value);
    } else {
      await auth.register({
        role: 'candidate',
        method: method.value,
        email: method.value === 'email' ? form.value.email : undefined,
        phone: method.value === 'phone' ? form.value.phone : undefined,
        emailCode: method.value === 'email' ? form.value.emailCode : undefined,
        password: form.value.password,
        displayName: form.value.displayName
      });
      ElMessage.success('注册成功');
      await router.push('/resume-builder');
    }
  } catch (e: any) {
    ElMessage.error(e?.message || '操作失败');
  } finally {
    loading.value = false;
  }
};

const switchMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login';
  form.value.emailCode = '';
};

onMounted(() => {
  // already authed -> go to resume
  if (auth.isAuthed && auth.role === 'candidate') router.replace('/resume-builder');
});
</script>

<template>
  <div class="min-h-screen flex bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Left -->
    <div
      class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white"
    >
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-25"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-purple-900/95 to-slate-900/95 mix-blend-multiply"></div>
      <div class="relative z-10 flex flex-col justify-between w-full p-16">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="text-2xl font-bold tracking-tight drop-shadow-lg">AutoDrive Careers</span>
        </div>

        <div>
          <h1 class="text-6xl font-black mb-8 leading-tight drop-shadow-2xl">
            候选人<br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 animate-gradient bg-size-200">注册 / 登录</span>
          </h1>
          <p class="text-xl text-slate-200 max-w-md leading-relaxed mb-8 drop-shadow-lg">
            支持 <span class="font-black">邮箱/手机号</span> 注册登录；邮箱注册包含验证码校验（演示环境直接提示验证码）。
          </p>
          <div class="flex gap-4">
            <div class="px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-sm font-bold flex items-center gap-2">
              <span class="text-2xl">🧩</span>
              <span>一键套用简历模板</span>
            </div>
            <div class="px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-sm font-bold flex items-center gap-2">
              <span class="text-2xl">🖨️</span>
              <span>支持打印导出</span>
            </div>
          </div>
        </div>

        <div class="text-sm text-slate-300">
          <span>&copy; 2025 AutoDrive Careers</span>
        </div>
      </div>
    </div>

    <!-- Right -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white relative">
      <div class="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-pink-400/10 rounded-full blur-3xl"></div>

      <div class="max-w-md w-full relative z-10">
        <div class="text-center lg:text-left mb-10">
          <div class="inline-block lg:block mb-4">
            <span class="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-bold">
              {{ mode === 'login' ? '👋 欢迎回来' : '🎉 创建候选人账号' }}
            </span>
          </div>
          <h2 class="text-4xl font-black text-slate-900 mb-3">
            {{ mode === 'login' ? '候选人登录' : '候选人注册' }}
          </h2>
          <p class="text-slate-600 text-lg">开始生成一份“像作品集一样”的精美简历。</p>
        </div>

        <div class="flex gap-3 mb-6">
          <button
            class="flex-1 py-3 rounded-2xl font-bold border-2 transition-all"
            :class="method === 'email' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg shadow-blue-600/30' : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'"
            @click="method = 'email'"
          >
            邮箱
          </button>
          <button
            class="flex-1 py-3 rounded-2xl font-bold border-2 transition-all"
            :class="method === 'phone' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg shadow-blue-600/30' : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'"
            @click="method = 'phone'"
          >
            手机号
          </button>
        </div>

        <form class="space-y-5" @submit.prevent="submit">
          <div v-if="method === 'email'">
            <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">邮箱</label>
            <input v-model="form.email" type="email" class="input" placeholder="name@company.com" autocomplete="email" />
          </div>
          <div v-else>
            <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">手机号</label>
            <input v-model="form.phone" type="tel" class="input" placeholder="例如：13800000000" autocomplete="tel" />
          </div>

          <div v-if="mode === 'register' && method === 'email'">
            <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">邮箱验证码</label>
            <div class="flex gap-3">
              <input v-model="form.emailCode" class="input" placeholder="6位验证码" inputmode="numeric" />
              <button
                type="button"
                class="px-5 rounded-2xl font-bold border-2 border-slate-200 hover:border-blue-300 hover:text-blue-700 transition-all bg-white whitespace-nowrap"
                :disabled="!canSendCode"
                @click="sendCode"
              >
                {{ codeCooldown > 0 ? `${codeCooldown}s` : '获取验证码' }}
              </button>
            </div>
          </div>

          <div v-if="mode === 'register'">
            <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">昵称（可选）</label>
            <input v-model="form.displayName" class="input" placeholder="例如：张三 / Alex" />
          </div>

          <div>
            <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">密码</label>
            <input v-model="form.password" type="password" class="input" placeholder="至少 6 位" autocomplete="current-password" />
          </div>

          <button
            type="submit"
            class="w-full flex items-center justify-center gap-3 py-4 px-6 border-2 border-transparent rounded-2xl shadow-xl shadow-blue-500/40 text-lg font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
            :disabled="loading"
          >
            <span v-if="loading" class="mr-2 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span class="relative z-10">{{ mode === 'login' ? '登 录' : '注 册' }}</span>
            <span class="text-xl relative z-10">{{ mode === 'login' ? '🚀' : '✨' }}</span>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-slate-200 text-center">
          <p class="text-base text-slate-700">
            {{ mode === 'login' ? '还没有候选人账号？' : '已有账号？' }}
            <button class="font-bold text-blue-600 hover:text-blue-700 ml-1 transition-colors" @click="switchMode">
              {{ mode === 'login' ? '立即注册' : '直接登录' }}
            </button>
          </p>
          <p class="text-sm text-slate-500 mt-3">
            需要企业入驻？<button class="font-bold text-slate-700 hover:text-blue-700 transition-colors" @click="$router.push('/auth/company')">去企业入口</button>
          </p>
          <p class="text-xs text-slate-500 mt-3">
            提示：当前为纯前端演示，账号与会话存储在浏览器 localStorage。
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

