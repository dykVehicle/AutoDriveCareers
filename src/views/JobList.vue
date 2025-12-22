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
  <div class="bg-slate-950 min-h-screen py-12 relative">
    <!-- Grid BG -->
    <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Search Header -->
      <div class="bg-slate-900/80 backdrop-blur border border-slate-800 p-8 rounded-none mb-8 shadow-2xl relative">
        <!-- Corner decors -->
        <div class="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500"></div>
        <div class="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500"></div>

        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-grow relative group">
            <el-input
              v-model="searchQuery"
              placeholder="INPUT_KEYWORDS..."
              size="large"
              :prefix-icon="Search"
              class="cyber-input"
              @keyup.enter="handleSearch"
            />
          </div>
          <button @click="handleSearch" class="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold tracking-widest border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all">
            EXECUTE
          </button>
        </div>
        
        <!-- Filters -->
        <div class="mt-6 flex flex-wrap gap-4 items-center pt-6 border-t border-slate-800">
          <span class="text-xs font-mono text-cyan-500 flex items-center">
            <el-icon class="mr-1"><Filter /></el-icon> FILTERS:
          </span>
          <div class="flex gap-2">
            <span v-for="loc in ['Shanghai', 'Beijing', 'Shenzhen']" :key="loc" class="px-3 py-1 bg-slate-800 text-slate-400 text-xs font-mono hover:bg-cyan-900 hover:text-cyan-400 cursor-pointer border border-slate-700 transition-colors">
              {{ loc }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Main List -->
        <div class="flex-grow space-y-4">
          <transition-group name="list" tag="div" class="space-y-4">
            <div v-for="(job, index) in displayedJobs" :key="job.id" 
                 class="bg-slate-900 border border-slate-800 p-6 hover:border-cyan-500/50 transition-all duration-300 group relative overflow-hidden"
                 :style="{ transitionDelay: `${index * 50}ms` }">
              
              <!-- Hover Glow -->
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-900/0 via-cyan-900/10 to-cyan-900/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>

              <div class="flex flex-col md:flex-row justify-between gap-4 relative z-10">
                <div class="flex-grow">
                  <div class="flex items-center gap-3 mb-2">
                     <h2 class="text-xl font-bold text-white font-mono group-hover:text-cyan-400 transition-colors">
                      <router-link :to="`/jobs/${job.id}`" class="before:absolute before:inset-0">
                        <span class="text-cyan-600 mr-2">></span>{{ job.title }}
                      </router-link>
                    </h2>
                    <span class="px-1.5 py-0.5 bg-red-900/30 text-red-500 text-[10px] font-mono border border-red-900/50" v-if="job.tags.includes('急聘')">HOT</span>
                  </div>
                  
                  <div class="flex items-center gap-4 text-slate-500 text-sm mb-4 font-mono">
                    <span class="text-slate-300">{{ job.company }}</span>
                    <span class="text-slate-700">|</span>
                    <span class="flex items-center gap-1"><el-icon><Location /></el-icon> {{ job.location }}</span>
                    <span class="text-slate-700">|</span>
                    <span>{{ job.requirements.experience }}</span>
                  </div>

                  <div class="flex flex-wrap gap-2">
                    <span v-for="tag in job.tags.slice(0,4)" :key="tag" class="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs border border-slate-700">
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <div class="flex flex-col items-end justify-between min-w-[120px]">
                  <span class="text-cyan-400 font-bold text-xl font-mono">{{ job.salary }}</span>
                  <span class="text-slate-600 text-xs mt-auto font-mono">T-Minus 24h</span>
                </div>
              </div>
            </div>
          </transition-group>

          <!-- Empty State -->
          <div v-if="jobs.length === 0" class="text-center py-20 border border-dashed border-slate-800 rounded">
            <div class="text-slate-700 text-6xl mb-4 font-mono">NULL</div>
            <h3 class="text-lg font-mono text-slate-400">NO_DATA_FOUND</h3>
          </div>

          <!-- Pagination -->
           <div v-if="jobs.length > 0" class="flex justify-center mt-12">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="jobs.length"
              :page-size="pageSize"
              v-model:current-page="currentPage"
              class="cyber-pagination"
            />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Custom Input Styling */
:deep(.cyber-input .el-input__wrapper) {
  background-color: #0f172a;
  box-shadow: none !important;
  border: 1px solid #334155;
  border-radius: 0;
  color: white;
}
:deep(.cyber-input .el-input__wrapper.is-focus) {
  border-color: #06b6d4;
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.2) !important;
}
:deep(.el-input__inner) {
  color: white;
  font-family: monospace;
}

/* List Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Pagination Overrides */
:deep(.el-pagination.is-background .btn-next),
:deep(.el-pagination.is-background .btn-prev),
:deep(.el-pagination.is-background .el-pager li) {
  background-color: #0f172a;
  color: #94a3b8;
  border: 1px solid #334155;
}
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #06b6d4;
  color: white;
  border-color: #06b6d4;
}
</style>
