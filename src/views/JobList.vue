<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useJobStore } from '../stores/jobs';
import { Search, Location, Filter } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const jobStore = useJobStore();

const searchQuery = ref((route.query.q as string) || '');
const jobs = computed(() => jobStore.filterJobs(searchQuery.value));

const handleSearch = () => {
  router.push({ query: { ...route.query, q: searchQuery.value } });
};

// Simple pagination mock
const currentPage = ref(1);
const pageSize = 10;
const displayedJobs = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return jobs.value.slice(start, start + pageSize);
});
</script>

<template>
  <div class="bg-slate-50 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Search Header -->
      <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-grow relative">
            <el-input
              v-model="searchQuery"
              placeholder="搜索职位关键词（如：感知、C++、上海）"
              size="large"
              :prefix-icon="Search"
              class="!text-lg"
              @keyup.enter="handleSearch"
            />
          </div>
          <button @click="handleSearch" class="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold shadow-md shadow-blue-200 transition-all flex items-center justify-center">
            搜索职位
          </button>
        </div>
        
        <!-- Filters (Visual only for now) -->
        <div class="mt-6 flex flex-wrap gap-4 items-center pt-6 border-t border-slate-100">
          <span class="text-sm font-semibold text-slate-700 flex items-center">
            <el-icon class="mr-1"><Filter /></el-icon> 筛选：
          </span>
          <div class="flex gap-2">
            <span class="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors">上海</span>
            <span class="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors">北京</span>
            <span class="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors">深圳</span>
          </div>
          <div class="w-px h-4 bg-slate-200 mx-2"></div>
           <div class="flex gap-2">
            <span class="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors">30-50K</span>
            <span class="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors">50K+</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Main List -->
        <div class="flex-grow space-y-4">
          <div v-for="job in displayedJobs" :key="job.id" 
               class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 group relative overflow-hidden">
            
            <div class="flex flex-col md:flex-row justify-between gap-4">
              <div class="flex-grow">
                <div class="flex items-center gap-3 mb-2">
                   <h2 class="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    <router-link :to="`/jobs/${job.id}`" class="before:absolute before:inset-0">{{ job.title }}</router-link>
                  </h2>
                  <span class="px-2 py-0.5 bg-green-50 text-green-600 text-xs font-bold rounded" v-if="job.tags.includes('急聘')">急聘</span>
                </div>
                
                <div class="flex items-center gap-4 text-slate-500 text-sm mb-4">
                  <span class="font-medium text-slate-700">{{ job.company }}</span>
                  <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span class="flex items-center gap-1"><el-icon><Location /></el-icon> {{ job.location }}</span>
                  <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>{{ job.requirements.experience }}</span>
                   <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>{{ job.requirements.education }}</span>
                </div>

                <div class="flex flex-wrap gap-2">
                  <span v-for="tag in job.tags.slice(0,4)" :key="tag" class="px-2.5 py-1 rounded bg-slate-50 text-slate-500 text-xs border border-slate-100">
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div class="flex flex-col items-end justify-between min-w-[120px]">
                <span class="text-blue-600 font-bold text-xl">{{ job.salary }}</span>
                <span class="text-slate-400 text-xs mt-auto">1天前发布</span>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="jobs.length === 0" class="text-center py-20 bg-white rounded-xl border border-dashed border-slate-200">
            <div class="text-slate-300 text-6xl mb-4">🔍</div>
            <h3 class="text-lg font-medium text-slate-900">未找到相关职位</h3>
            <p class="text-slate-500 mt-2">换个关键词试试？</p>
          </div>

          <!-- Pagination -->
           <div v-if="jobs.length > 0" class="flex justify-center mt-12">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="jobs.length"
              :page-size="pageSize"
              v-model:current-page="currentPage"
              class="!font-sans"
            />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
:deep(.el-input__wrapper) {
  padding: 8px 15px;
  border-radius: 8px;
  box-shadow: none !important;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
}
:deep(.el-input__wrapper.is-focus) {
  border-color: #3b82f6;
  background-color: #fff;
  box-shadow: 0 0 0 1px #3b82f6 !important;
}
</style>
