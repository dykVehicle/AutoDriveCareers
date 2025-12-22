<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLogin = ref(true);

const form = ref({
  email: '',
  password: ''
});

const handleSubmit = () => {
  // Mock login
  setTimeout(() => {
    router.push('/');
  }, 500);
};
</script>

<template>
  <div class="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">{{ isLogin ? '登录账号' : '注册新账号' }}</h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ isLogin ? '还没有账号？' : '已有账号？' }}
          <a href="#" class="font-medium text-blue-600 hover:text-blue-500" @click.prevent="isLogin = !isLogin">
            {{ isLogin ? '立即注册' : '立即登录' }}
          </a>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">邮箱地址</label>
            <el-input v-model="form.email" type="email" placeholder="your@email.com" size="large" class="mt-1" />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
            <el-input v-model="form.password" type="password" placeholder="••••••••" size="large" class="mt-1" show-password />
          </div>
        </div>

        <div>
          <el-button type="primary" size="large" class="w-full" native-type="submit">
            {{ isLogin ? '登 录' : '注 册' }}
          </el-button>
        </div>
      </form>
    </div>
  </div>
</template>
