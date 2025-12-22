<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useJobStore } from '../stores/jobs';
import { Location, Suitcase, School, ArrowLeft, Warning } from '@element-plus/icons-vue';

const route = useRoute();
const jobStore = useJobStore();
const jobId = Number(route.params.id);

const job = computed(() => jobStore.getJobById(jobId));
const goBack = () => window.history.back();

// Gamification Animation
const isLoading = ref(true);
const matchPercent = ref(0);
const scanStage = ref('Initializing...');

onMounted(() => {
  // Simulate a system scan
  const stages = ['Connecting to Database...', 'Analyzing Skills...', 'Calculating Compatibility...', 'Access Granted'];
  let stageIdx = 0;
  
  const interval = setInterval(() => {
    if (matchPercent.value < 92) {
      matchPercent.value += 4;
      
      if (matchPercent.value % 25 === 0 && stageIdx < stages.length) {
        const nextStage = stages[stageIdx++];
        if (nextStage) {
          scanStage.value = nextStage;
        }
      }
    } else {
      clearInterval(interval);
      setTimeout(() => isLoading.value = false, 500);
    }
  }, 50);
});
</script>

<template>
  <div v-if="job" class="bg-slate-950 min-h-screen py-12 relative overflow-hidden">
    <!-- Background Decor -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <button @click="goBack" class="mb-8 flex items-center text-cyan-500 hover:text-white transition-colors font-mono text-sm">
        <el-icon class="mr-2"><ArrowLeft /></el-icon> [ RETURN_TO_BASE ]
      </button>

      <!-- Loading Overlay (Gamification) -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center h-[60vh]">
        <div class="w-64 h-2 bg-slate-800 rounded-full overflow-hidden mb-4 relative">
          <div class="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] transition-all duration-75" :style="{ width: `${matchPercent}%` }"></div>
        </div>
        <div class="font-mono text-cyan-400 text-xl">{{ matchPercent }}%</div>
        <div class="font-mono text-slate-500 text-sm mt-2">> {{ scanStage }}</div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Job Header -->
          <div class="bg-slate-900/80 backdrop-blur-md p-8 border-l-4 border-cyan-500 shadow-lg relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4 opacity-20">
              <el-icon :size="100" class="text-cyan-500"><Warning /></el-icon>
            </div>
            
            <div class="relative z-10">
              <div class="flex justify-between items-start mb-4">
                <h1 class="text-3xl font-bold text-white tracking-wide">{{ job.title }}</h1>
                <span class="text-2xl font-bold text-cyan-400 font-mono ml-4">{{ job.salary }}</span>
              </div>
              
              <div class="flex flex-wrap items-center gap-6 text-slate-400 mb-6 font-mono text-sm">
                 <div class="flex items-center gap-2">
                  <el-icon class="text-cyan-600"><Location /></el-icon>
                  {{ job.location }}
                </div>
                <div class="flex items-center gap-2">
                  <el-icon class="text-cyan-600"><Suitcase /></el-icon>
                  {{ job.requirements.experience }}
                </div>
                <div class="flex items-center gap-2">
                  <el-icon class="text-cyan-600"><School /></el-icon>
                  {{ job.requirements.education }}
                </div>
              </div>

              <div class="flex flex-wrap gap-2">
                <span v-for="tag in job.tags" :key="tag" class="px-3 py-1 bg-cyan-900/30 text-cyan-300 border border-cyan-500/30 text-xs font-mono">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Job Description (Terminal Style) -->
          <div class="bg-black/50 p-1 rounded-lg border border-slate-800">
            <div class="bg-slate-950 p-8 rounded border border-slate-800/50">
              <div class="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                <span class="ml-4 font-mono text-slate-500 text-xs">mission_details.txt</span>
              </div>

              <div class="prose prose-invert max-w-none prose-p:text-slate-400 prose-headings:text-cyan-100 prose-li:text-slate-400">
                <p class="mb-6 text-lg border-l-2 border-slate-700 pl-4 italic text-slate-300">{{ job.description }}</p>
                
                <h3 class="font-mono text-cyan-400 text-lg mt-8 mb-4 flex items-center">
                  <span class="mr-2">></span> RESPONSIBILITIES
                </h3>
                <ul class="space-y-2 list-none pl-0 font-mono text-sm">
                  <li v-for="(item, index) in job.responsibilities" :key="index" class="flex items-start group">
                    <span class="mr-3 text-slate-600 group-hover:text-cyan-500 mt-0.5">[+]</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>

                <h3 class="font-mono text-cyan-400 text-lg mt-8 mb-4 flex items-center">
                  <span class="mr-2">></span> REQUIREMENTS
                </h3>
                <ul class="space-y-2 list-none pl-0 font-mono text-sm">
                  <li v-for="(item, index) in job.qualifications" :key="index" class="flex items-start group">
                    <span class="mr-3 text-slate-600 group-hover:text-green-500 mt-0.5">[!]</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- AI Match Card -->
          <div class="bg-gradient-to-b from-slate-900 to-slate-950 p-6 border border-slate-800 sticky top-24">
            <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <h3 class="font-bold text-white font-mono">TARGET_ENTITY</h3>
              <div class="text-xs text-green-500 animate-pulse">● LIVE</div>
            </div>

            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-slate-800 flex items-center justify-center text-cyan-500 font-bold text-2xl border border-slate-700">
                {{ job.company[0] }}
              </div>
              <div>
                <h3 class="font-bold text-lg text-white">{{ job.company }}</h3>
                <p class="text-xs text-slate-500 font-mono">Level 4 Autonomous Driving</p>
              </div>
            </div>
            
            <!-- Skill Radar (CSS Visual Only) -->
            <div class="mb-8">
              <div class="text-xs text-slate-500 mb-2 font-mono">SKILL_REQUIREMENT_ANALYSIS</div>
              <div class="space-y-3">
                <div class="relative pt-1">
                  <div class="flex mb-2 items-center justify-between">
                    <span class="text-xs font-semibold inline-block text-cyan-600 uppercase">Coding</span>
                    <span class="text-xs font-semibold inline-block text-cyan-600">90%</span>
                  </div>
                  <div class="overflow-hidden h-1.5 mb-4 text-xs flex rounded bg-slate-800">
                    <div style="width:90%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-500"></div>
                  </div>
                </div>
                 <div class="relative pt-1">
                  <div class="flex mb-2 items-center justify-between">
                    <span class="text-xs font-semibold inline-block text-purple-600 uppercase">Algorithm</span>
                    <span class="text-xs font-semibold inline-block text-purple-600">85%</span>
                  </div>
                  <div class="overflow-hidden h-1.5 mb-4 text-xs flex rounded bg-slate-800">
                    <div style="width:85%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <button class="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all hover:translate-y-[-2px]">
                Initiate Application
              </button>
              <button class="w-full py-4 bg-transparent border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white font-mono text-xs uppercase tracking-widest transition-all">
                Save_To_Drive
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
