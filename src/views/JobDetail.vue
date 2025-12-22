<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useJobStore } from '../stores/jobs';
import { Location, Suitcase, School } from '@element-plus/icons-vue';

const route = useRoute();
const jobStore = useJobStore();
const jobId = Number(route.params.id);

const job = computed(() => jobStore.getJobById(jobId));
</script>

<template>
  <div v-if="job" class="bg-gray-50 min-h-[calc(100vh-64px)] py-8">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header Card -->
      <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ job.title }}</h1>
            <p class="text-lg text-gray-600">{{ job.company }}</p>
          </div>
          <div class="text-left md:text-right">
            <p class="text-2xl font-bold text-blue-600 mb-1">{{ job.salary }}</p>
          </div>
        </div>

        <div class="flex flex-wrap gap-6 text-gray-600 mb-6">
          <div class="flex items-center gap-2">
            <el-icon><Location /></el-icon>
            {{ job.location }}
          </div>
          <div class="flex items-center gap-2">
            <el-icon><Suitcase /></el-icon>
            {{ job.requirements.experience }}
          </div>
          <div class="flex items-center gap-2">
            <el-icon><School /></el-icon>
            {{ job.requirements.education }}
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-8">
          <el-tag v-for="tag in job.tags" :key="tag" size="large" effect="plain">{{ tag }}</el-tag>
        </div>

        <div class="flex gap-4">
          <el-button type="primary" size="large" class="px-8">立即投递</el-button>
          <el-button size="large">收藏职位</el-button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="md:col-span-2 space-y-6">
          <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 class="text-xl font-bold mb-6 pb-4 border-b">职位描述</h2>
            <div class="prose max-w-none text-gray-700">
              <p class="mb-4">{{ job.description }}</p>
              
              <h3 class="font-bold text-lg mt-6 mb-3">岗位职责：</h3>
              <ul class="list-disc pl-5 space-y-2 mb-6">
                <li v-for="(item, index) in job.responsibilities" :key="index">{{ item }}</li>
              </ul>

              <h3 class="font-bold text-lg mt-6 mb-3">任职要求：</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li v-for="(item, index) in job.qualifications" :key="index">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="md:col-span-1 space-y-6">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 class="font-bold text-lg mb-4">公司信息</h3>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-bold">Logo</div>
              <div>
                <div class="font-bold">{{ job.company }}</div>
                <div class="text-sm text-gray-500">自动驾驶 · D轮及以上</div>
              </div>
            </div>
            <p class="text-gray-600 text-sm mb-4">
              专注于L4级自动驾驶技术研发与应用，致力于打造安全、可靠的无人驾驶系统。
            </p>
            <el-button class="w-full" plain>查看公司主页</el-button>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div v-else class="text-center py-20 text-gray-500">
    加载中或职位不存在...
  </div>
</template>
