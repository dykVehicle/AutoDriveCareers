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
  <div class="bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 min-h-screen py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Search Header with enhanced styling -->
      <div class="bg-white p-3 rounded-3xl shadow-xl shadow-blue-200/30 mb-12 max-w-4xl mx-auto border border-white/50 backdrop-blur-xl">
        <div class="flex flex-col md:flex-row gap-3">
          <div class="flex-grow relative">
            <el-input
              v-model="searchQuery"
              placeholder="🔍 搜索职位、公司或关键词..."
              size="large"
              class="border-none !text-lg h-14 font-medium"
              :prefix-icon="Search"
              @keyup.enter="handleSearch"
            />
          </div>
          <button @click="handleSearch" class="px-10 py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 shrink-0 relative overflow-hidden group">
            <span class="relative z-10">搜索</span>
            <span class="text-xl relative z-10">🚀</span>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
          </button>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Filters Sidebar with enhanced styling -->
        <div class="w-full md:w-72 flex-shrink-0">
          <div class="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 sticky top-24 backdrop-blur-xl bg-white/95">
            <div class="flex items-center mb-6 font-bold text-slate-900 text-lg">
              <el-icon class="mr-2 text-blue-600"><Filter /></el-icon> 
              <span>筛选条件</span>
            </div>
            
            <div class="space-y-8">
              <div>
                <h4 class="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <span>📍</span>
                  <span>工作地点</span>
                </h4>
                <div class="space-y-3">
                  <label class="flex items-center space-x-3 cursor-pointer group" v-for="city in ['上海', '北京', '深圳', '杭州']" :key="city">
                    <input type="checkbox" class="w-4 h-4 rounded border-2 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 border-slate-300 transition-all">
                    <span class="text-slate-700 group-hover:text-blue-600 transition-colors font-medium">{{ city }}</span>
                  </label>
                </div>
              </div>
              
              <div class="border-t border-slate-100 pt-6">
                <h4 class="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <span>💰</span>
                  <span>薪资范围</span>
                </h4>
                <div class="space-y-3">
                  <label class="flex items-center space-x-3 cursor-pointer group" v-for="sal in ['30k以下', '30k-50k', '50k以上']" :key="sal">
                    <input type="checkbox" class="w-4 h-4 rounded border-2 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 border-slate-300 transition-all">
                    <span class="text-slate-700 group-hover:text-blue-600 transition-colors font-medium">{{ sal }}</span>
                  </label>
                </div>
              </div>
              
              <div class="border-t border-slate-100 pt-6">
                <button class="w-full py-3 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 rounded-xl font-bold hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                  重置筛选
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Main List with enhanced cards -->
        <div class="flex-grow space-y-5">
          <transition-group name="list" tag="div" class="space-y-5">
            <div v-for="(job, index) in displayedJobs" :key="job.id" 
                 class="bg-white p-7 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 hover:border-blue-200 cursor-pointer group relative overflow-hidden"
                 @click="$router.push(`/jobs/${job.id}`)"
                 :style="{ transitionDelay: `${index * 50}ms` }">
              
              <!-- Gradient overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
              
              <div class="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                <div class="flex-grow">
                  <div class="flex items-center gap-3 mb-3">
                     <h2 class="text-2xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {{ job.title }}
                    </h2>
                    <span class="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 text-xs font-bold rounded-full flex items-center gap-1" v-if="job.tags.includes('急聘')">
                      <span>🔥</span>
                      <span>急聘</span>
                    </span>
                  </div>
                  
                  <div class="flex items-center gap-4 text-slate-600 text-sm mb-5 flex-wrap">
                    <span class="font-bold text-slate-900 flex items-center gap-2">
                      <span class="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-xs font-bold text-blue-600">
                        {{ job.company[0] }}
                      </span>
                      {{ job.company }}
                    </span>
                    <span class="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                    <span class="flex items-center gap-1.5 font-medium">
                      <el-icon class="text-blue-600"><Location /></el-icon> 
                      {{ job.location }}
                    </span>
                    <span class="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                    <span class="font-medium">{{ job.requirements.experience }}</span>
                  </div>

                  <div class="flex flex-wrap gap-2">
                    <span v-for="tag in job.tags.slice(0,4)" :key="tag" class="px-4 py-2 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 text-slate-700 text-xs font-semibold group-hover:from-blue-100 group-hover:to-purple-100 group-hover:text-blue-700 transition-all duration-300 border border-slate-200 group-hover:border-blue-300">
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <div class="flex flex-col items-end justify-between min-w-[140px]">
                  <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-black text-2xl mb-4">{{ job.salary }}</span>
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center text-slate-500 group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-lg">
                    <el-icon :size="20"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"></path></svg></el-icon>
                  </div>
                </div>
              </div>
              
              <!-- Corner decoration -->
              <div class="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl"></div>
            </div>
          </transition-group>

          <!-- Empty State with enhanced styling -->
          <div v-if="jobs.length === 0" class="text-center py-32">
            <div class="text-8xl mb-6 animate-bounce-slow">🌪️</div>
            <h3 class="text-2xl font-bold text-slate-900 mb-3">这里空空如也</h3>
            <p class="text-slate-600 mt-2 text-lg">尝试调整一下搜索条件吧 ✨</p>
          </div>

          <!-- Pagination with enhanced styling -->
           <div v-if="jobs.length > 0" class="flex justify-center mt-16">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="jobs.length"
              :page-size="pageSize"
              v-model:current-page="currentPage"
              class="custom-pagination"
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

:deep(.el-input__inner) {
  font-weight: 500;
}

/* Custom pagination styling */
:deep(.custom-pagination) {
  .el-pagination__total,
  .el-pagination__jump {
    color: #475569;
    font-weight: 600;
  }
  
  .btn-prev,
  .btn-next,
  .el-pager li {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-weight: 600;
    color: #64748b;
    transition: all 0.3s;
    margin: 0 4px;
  }
  
  .btn-prev:hover,
  .btn-next:hover,
  .el-pager li:hover {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    color: white;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
  }
  
  .el-pager li.is-active {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    color: white;
    border-color: transparent;
    box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
  }
}

/* List transition animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
