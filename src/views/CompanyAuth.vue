<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useAuthStore } from '../stores/auth';
import { isValidCnPhone, isValidEmail } from '../services/auth';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const redirectTo = computed(() => (route.query.redirect as string) || '/job-builder');

const mode = ref<'login' | 'register'>('login');
const method = ref<'email' | 'phone'>('email');

const loading = ref(false);

const form = ref({
  email: '',
  phone: '',
  password: '',
  companyName: '',
  contactName: ''
});

const validate = () => {
  if (method.value === 'email') {
    if (!isValidEmail(form.value.email)) throw new Error('请输入正确的邮箱');
  } else {
    if (!isValidCnPhone(form.value.phone)) throw new Error('请输入正确的手机号');
  }

  if (mode.value === 'register') {
    if (!form.value.companyName.trim()) throw new Error('请输入公司名称');
    if (!form.value.contactName.trim()) throw new Error('请输入联系人姓名');
  }
  if (form.value.password.trim().length < 6) throw new Error('密码至少 6 位');
};

const submit = async () => {
  try {
    validate();
    loading.value = true;
    if (mode.value === 'login') {
      await auth.login({
        role: 'company',
        email: method.value === 'email' ? form.value.email : undefined,
        phone: method.value === 'phone' ? form.value.phone : undefined,
        password: form.value.password
      });
      ElMessage.success('登录成功');
      await router.push(redirectTo.value);
    } else {
      await auth.register({
        role: 'company',
        method: method.value,
        email: method.value === 'email' ? form.value.email : undefined,
        phone: method.value === 'phone' ? form.value.phone : undefined,
        password: form.value.password,
        companyName: form.value.companyName,
        contactName: form.value.contactName
      });
      ElMessage.success('入驻成功');
      await router.push('/job-builder');
    }
  } catch (e: any) {
    ElMessage.error(e?.message || '操作失败');
  } finally {
    loading.value = false;
  }
};

const switchMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login';
};

onMounted(() => {
  if (auth.isAuthed && auth.role === 'company') router.replace('/job-builder');
});
</script>

<template>
  <div class="min-h-screen flex bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Left -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-25"
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
            企业<br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 animate-gradient bg-size-200">入驻 / 登录</span>
          </h1>
          <p class="text-xl text-slate-200 max-w-md leading-relaxed mb-8 drop-shadow-lg">
            支持邮箱/手机号入驻。入驻后可把岗位描述直接粘贴进来，一键生成“像官网一样”的岗位展示页。
          </p>
          <div class="flex gap-4">
            <div class="px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-sm font-bold flex items-center gap-2">
              <span class="text-2xl">🧠</span>
              <span>自动结构化 JD</span>
            </div>
            <div class="px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-sm font-bold flex items-center gap-2">
              <span class="text-2xl">📣</span>
              <span>一键复制发布</span>
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
            <span class="px-4 py-2 bg-gradient-to-r from-slate-100 to-blue-100 text-slate-800 rounded-full text-sm font-bold">
              {{ mode === 'login' ? '👋 欢迎回来' : '🏢 企业入驻' }}
            </span>
          </div>
          <h2 class="text-4xl font-black text-slate-900 mb-3">
            {{ mode === 'login' ? '企业登录' : '企业入驻注册' }}
          </h2>
          <p class="text-slate-600 text-lg">把岗位描述粘贴进来，自动生成精美岗位展示。</p>
        </div>

        <div class="flex gap-3 mb-6">
          <button
            class="flex-1 py-3 rounded-2xl font-bold border-2 transition-all"
            :class="method === 'email' ? 'bg-gradient-to-r from-slate-900 to-blue-900 text-white border-transparent shadow-lg shadow-slate-900/30' : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'"
            @click="method = 'email'"
          >
            邮箱
          </button>
          <button
            class="flex-1 py-3 rounded-2xl font-bold border-2 transition-all"
            :class="method === 'phone' ? 'bg-gradient-to-r from-slate-900 to-blue-900 text-white border-transparent shadow-lg shadow-slate-900/30' : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'"
            @click="method = 'phone'"
          >
            手机号
          </button>
        </div>

        <form class="space-y-5" @submit.prevent="submit">
          <div v-if="method === 'email'">
            <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">企业邮箱</label>
            <input v-model="form.email" type="email" class="input" placeholder="hr@company.com" autocomplete="email" />
          </div>
          <div v-else>
            <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">手机号</label>
            <input v-model="form.phone" type="tel" class="input" placeholder="例如：13800000000" autocomplete="tel" />
          </div>

          <div v-if="mode === 'register'">
            <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">公司名称</label>
            <input v-model="form.companyName" class="input" placeholder="例如：AutoDrive Tech" />
          </div>
          <div v-if="mode === 'register'">
            <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">联系人</label>
            <input v-model="form.contactName" class="input" placeholder="例如：王女士 / HR 张三" />
          </div>

          <div>
            <label class="block text-sm font-bold text-slate-800 mb-2 ml-1">密码</label>
            <input v-model="form.password" type="password" class="input" placeholder="至少 6 位" autocomplete="current-password" />
          </div>

          <button
            type="submit"
            class="w-full flex items-center justify-center gap-3 py-4 px-6 border-2 border-transparent rounded-2xl shadow-xl shadow-slate-900/20 text-lg font-bold text-white bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
            :disabled="loading"
          >
            <span v-if="loading" class="mr-2 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span class="relative z-10">{{ mode === 'login' ? '登 录' : '入 驻' }}</span>
            <span class="text-xl relative z-10">{{ mode === 'login' ? '🏁' : '✨' }}</span>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-slate-200 text-center">
          <p class="text-base text-slate-700">
            {{ mode === 'login' ? '还没有企业账号？' : '已有企业账号？' }}
            <button class="font-bold text-blue-600 hover:text-blue-700 ml-1 transition-colors" @click="switchMode">
              {{ mode === 'login' ? '立即入驻' : '直接登录' }}
            </button>
          </p>
          <p class="text-sm text-slate-500 mt-3">
            我是候选人？<button class="font-bold text-slate-700 hover:text-blue-700 transition-colors" @click="$router.push('/auth/candidate')">去候选人入口</button>
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

