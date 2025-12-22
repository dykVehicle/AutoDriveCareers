<script setup lang="ts">
import { useJobStore } from '../stores/jobs';
import { useRouter } from 'vue-router';

const jobStore = useJobStore();
const router = useRouter();

const categories = [
  '决策规划', '感知算法', '控制算法', '嵌入式', '仿真测试', '高精地图', '车联网', '智能座舱'
];

const goToCategory = (category: string) => {
  router.push({ path: '/jobs', query: { q: category } });
};
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-blue-600 text-white overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-800 opacity-90"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          连接智能驾驶的未来人才
        </h1>
        <p class="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
          汇聚全球顶尖自动驾驶企业，为您提供最前沿的职业机会。
        </p>
        <div class="flex justify-center gap-4">
          <router-link to="/jobs">
            <el-button size="large" type="primary" class="!text-lg !px-8 !py-6 !font-semibold">
              浏览职位
            </el-button>
          </router-link>
          <el-button size="large" plain class="!text-lg !px-8 !py-6 !font-semibold !bg-transparent !text-white !border-white hover:!bg-white hover:!text-blue-600">
            发布职位
          </el-button>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">热门投递领域</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="cat in categories" :key="cat" 
               class="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all cursor-pointer text-center group border border-gray-100"
               @click="goToCategory(cat)">
            <h3 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{{ cat }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Jobs -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-8">
          <h2 class="text-3xl font-bold text-gray-900">最新招聘职位</h2>
          <router-link to="/jobs" class="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            查看全部 <span class="ml-1">&rarr;</span>
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="job in jobStore.jobs.slice(0, 3)" :key="job.id" 
               class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
            <div class="mb-4">
              <h3 class="text-xl font-bold text-gray-900 line-clamp-1">{{ job.title }}</h3>
              <p class="text-gray-500 mt-1">{{ job.company }}</p>
            </div>
            <div class="mb-4 flex flex-wrap gap-2">
              <el-tag v-for="tag in job.tags.slice(0, 2)" :key="tag" size="small" effect="plain">{{ tag }}</el-tag>
            </div>
            <div class="mt-auto flex items-center justify-between">
              <span class="text-blue-600 font-bold text-lg">{{ job.salary }}</span>
              <span class="text-gray-400 text-sm">{{ job.location }}</span>
            </div>
            <router-link :to="`/jobs/${job.id}`" class="mt-4">
              <el-button class="w-full">查看详情</el-button>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
