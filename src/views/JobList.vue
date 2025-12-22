<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useJobStore } from '../stores/jobs';
import { Search } from '@element-plus/icons-vue';

const route = useRoute();
const jobStore = useJobStore();

const searchQuery = ref((route.query.q as string) || '');
const jobs = computed(() => jobStore.filterJobs(searchQuery.value));
</script>

<template>
  <div class="bg-gray-50 min-h-[calc(100vh-64px)] py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Search Header -->
      <div class="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-grow">
            <el-input
              v-model="searchQuery"
              placeholder="搜索职位、公司或关键词"
              size="large"
              :prefix-icon="Search"
            />
          </div>
          <el-button type="primary" size="large" class="w-full md:w-auto px-8">搜索</el-button>
        </div>
        <div class="mt-4 flex gap-4 text-sm text-gray-500">
          <span>热门搜索：</span>
          <span class="cursor-pointer hover:text-blue-600">感知算法</span>
          <span class="cursor-pointer hover:text-blue-600">规控</span>
          <span class="cursor-pointer hover:text-blue-600">嵌入式</span>
        </div>
      </div>

      <!-- Job List -->
      <div class="grid gap-6">
        <div v-for="job in jobs" :key="job.id" 
             class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div class="flex-grow">
            <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
              <h2 class="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
                <router-link :to="`/jobs/${job.id}`">{{ job.title }}</router-link>
              </h2>
              <span class="text-blue-600 font-bold text-lg md:ml-auto">{{ job.salary }}</span>
            </div>
            
            <div class="flex items-center gap-4 text-gray-600 mb-3">
              <span class="font-medium">{{ job.company }}</span>
              <span class="w-px h-4 bg-gray-300"></span>
              <span>{{ job.location }}</span>
              <span class="w-px h-4 bg-gray-300"></span>
              <span>{{ job.requirements.experience }}</span>
              <span class="w-px h-4 bg-gray-300"></span>
              <span>{{ job.requirements.education }}</span>
            </div>

            <div class="flex flex-wrap gap-2">
              <el-tag v-for="tag in job.tags" :key="tag" size="small" type="info" effect="light" class="!bg-gray-100 !border-gray-200 !text-gray-600">
                {{ tag }}
              </el-tag>
            </div>
          </div>

          <div class="flex-shrink-0">
            <router-link :to="`/jobs/${job.id}`">
              <el-button type="primary" plain class="w-full md:w-auto">立即沟通</el-button>
            </router-link>
          </div>
        </div>

        <div v-if="jobs.length === 0" class="text-center py-12 text-gray-500">
          未找到相关职位
        </div>
      </div>

    </div>
  </div>
</template>
