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

// Pagination
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
      <div class="bg-white p-2 rounded-2xl shadow-lg shadow-slate-200/50 mb-12 max-w-4xl mx-auto">
        <div class="flex flex-col md:flex-row gap-2">
          <div class="flex-grow relative">
            <el-input
              v-model="searchQuery"
              placeholder="搜索职位、公司或关键词..."
              size="large"
              class="border-none !text-lg h-14"
              :prefix-icon="Search"
              @keyup.enter="handleSearch"
            />
          </div>
          <button @click="handleSearch" class="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-md transition-all flex items-center justify-center shrink-0">
            搜索
          </button>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="w-full md:w-64 flex-shrink-0">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
            <div class="flex items-center mb-6 font-bold text-slate-900">
              <el-icon class="mr-2"><Filter /></el-icon> 筛选条件
            </div>
            
            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-medium text-slate-500 mb-3">工作地点</h4>
                <div class="space-y-2">
                  <label class="flex items-center space-x-2 cursor-pointer group" v-for="city in ['上海', '北京', '深圳', '杭州']" :key="city">
                    <input type="checkbox" class="rounded text-blue-600 focus:ring-blue-500 border-gray-300">
                    <span class="text-slate-700 group-hover:text-blue-600 transition-colors">{{ city }}</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-slate-500 mb-3">薪资范围</h4>
                <div class="space-y-2">
                  <label class="flex items-center space-x-2 cursor-pointer group" v-for="sal in ['30k以下', '30k-50k', '50k以上']" :key="sal">
                    <input type="checkbox" class="rounded text-blue-600 focus:ring-blue-500 border-gray-300">
                    <span class="text-slate-700 group-hover:text-blue-600 transition-colors">{{ sal }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main List -->
        <div class="flex-grow space-y-4">
          <transition-group name="list" tag="div" class="space-y-4">
            <div v-for="(job, index) in displayedJobs" :key="job.id" 
                 class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 cursor-pointer group"
                 @click="$router.push(`/jobs/${job.id}`)"
                 :style="{ transitionDelay: `${index * 50}ms` }">
              
              <div class="flex flex-col md:flex-row justify-between gap-4">
                <div class="flex-grow">
                  <div class="flex items-center gap-3 mb-2">
                     <h2 class="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {{ job.title }}
                    </h2>
                    <span class="px-2 py-0.5 bg-orange-50 text-orange-600 text-xs font-bold rounded-full" v-if="job.tags.includes('急聘')">急聘</span>
                  </div>
                  
                  <div class="flex items-center gap-4 text-slate-500 text-sm mb-4">
                    <span class="font-medium text-slate-900">{{ job.company }}</span>
                    <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span class="flex items-center gap-1"><el-icon><Location /></el-icon> {{ job.location }}</span>
                    <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>{{ job.requirements.experience }}</span>
                  </div>

                  <div class="flex flex-wrap gap-2">
                    <span v-for="tag in job.tags.slice(0,4)" :key="tag" class="px-3 py-1 rounded-lg bg-slate-50 text-slate-600 text-xs font-medium group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <div class="flex flex-col items-end justify-between min-w-[120px]">
                  <span class="text-blue-600 font-bold text-xl">{{ job.salary }}</span>
                  <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <el-icon><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"></path></svg></el-icon>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>

          <!-- Empty State -->
          <div v-if="jobs.length === 0" class="text-center py-24">
            <div class="text-6xl mb-4">🌪️</div>
            <h3 class="text-lg font-bold text-slate-900">这里空空如也</h3>
            <p class="text-slate-500 mt-2">尝试调整一下搜索条件吧</p>
          </div>

          <!-- Pagination -->
           <div v-if="jobs.length > 0" class="flex justify-center mt-12">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="jobs.length"
              :page-size="pageSize"
              v-model:current-page="currentPage"
            />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
:deep(.el-input__wrapper) {
  box-shadow: none !important;
  background-color: transparent;
  padding-left: 1rem;
}
</style>
