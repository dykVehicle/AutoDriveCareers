<script setup lang="ts">
import { useJobStore } from '../stores/jobs';
import { useRouter } from 'vue-router';
import { ArrowRight, Cpu, Connection } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';

const jobStore = useJobStore();
const router = useRouter();

const categories = [
  '感知算法', '决策规划', '嵌入式', '仿真与测试', '云平台与工具', '高精地图', '智能座舱', '车辆工程'
];

const goToCategory = (category: string) => {
  router.push({ path: '/jobs', query: { q: category } });
};

// Typing effect
const displayText = ref('');
const fullText = "连接智能驾驶的未来人才";
const typeSpeed = 100;

onMounted(() => {
  let i = 0;
  const timer = setInterval(() => {
    if (i < fullText.length) {
      displayText.value += fullText.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, typeSpeed);
});
</script>

<template>
  <div class="font-sans overflow-hidden">
    <!-- Hero Section with Moving Grid -->
    <section class="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      <!-- Cyber Grid Background -->
      <div class="absolute inset-0 bg-slate-950 perspective-grid">
        <div class="grid-floor"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 z-10"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 z-10"></div>
      </div>

      <!-- Floating Particles -->
      <div class="absolute inset-0 z-0">
        <div v-for="n in 20" :key="n" 
             class="absolute w-1 h-1 bg-cyan-500 rounded-full animate-float"
             :style="{ 
               left: `${Math.random() * 100}%`, 
               top: `${Math.random() * 100}%`,
               animationDelay: `${Math.random() * 5}s`,
               opacity: Math.random()
             }">
        </div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
        <div class="inline-block px-4 py-1 mb-6 rounded-full border border-cyan-500/30 bg-cyan-900/20 backdrop-blur-sm text-cyan-400 font-mono text-xs tracking-widest animate-pulse">
          SYSTEM_STATUS: ONLINE
        </div>
        
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
          {{ displayText }}<span class="animate-blink">_</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          [ 汇聚全球顶尖自动驾驶企业，连接 <span class="text-cyan-400 font-bold">500+</span> 高薪技术岗位 ]
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-6">
          <router-link to="/jobs">
            <button class="group relative px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold tracking-widest transition-all skew-x-[-10deg] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]">
              <span class="block skew-x-[10deg] flex items-center">
                INITIATE_SEARCH <el-icon class="ml-2 group-hover:translate-x-1 transition-transform"><ArrowRight /></el-icon>
              </span>
            </button>
          </router-link>
          <button class="group relative px-10 py-4 bg-transparent border border-cyan-500/50 hover:border-cyan-400 text-cyan-400 font-bold tracking-widest transition-all skew-x-[-10deg] hover:bg-cyan-900/20">
             <span class="block skew-x-[10deg]">DEPLOY_JOB</span>
          </button>
        </div>

        <!-- HUD Stats -->
        <div class="mt-20 flex justify-center gap-4 md:gap-12 text-center">
          <div v-for="(stat, index) in [
            { label: 'ACTIVE_JOBS', value: '158' },
            { label: 'COMPANIES', value: '42' },
            { label: 'AVG_SALARY', value: '35K' }
          ]" :key="index" class="p-6 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-lg min-w-[140px] hover:border-cyan-500/50 transition-colors group">
            <div class="text-3xl font-bold text-white font-mono group-hover:text-cyan-400 transition-colors">{{ stat.value }}</div>
            <div class="text-xs text-slate-500 mt-2 font-mono tracking-widest">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Dashboard -->
    <section class="py-24 bg-slate-950 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center mb-12">
          <div class="w-2 h-8 bg-cyan-500 mr-4 shadow-[0_0_10px_#06b6d4]"></div>
          <h2 class="text-3xl font-bold text-white font-mono">SECTORS_OVERVIEW</h2>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="cat in categories" :key="cat" 
               class="group relative p-6 bg-slate-900/50 border border-slate-800 hover:border-cyan-500 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer overflow-hidden"
               @click="goToCategory(cat)">
            <!-- Corner Accents -->
            <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div class="mb-4 text-cyan-600 group-hover:text-cyan-400 transition-colors">
              <el-icon :size="24"><Cpu /></el-icon>
            </div>
            <h3 class="text-lg font-bold text-slate-300 group-hover:text-white transition-colors">{{ cat }}</h3>
            <div class="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full bg-cyan-500 w-[40%] group-hover:w-[80%] transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Jobs Scanner -->
    <section class="py-24 bg-slate-900 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-12">
          <div class="flex items-center">
             <div class="w-2 h-8 bg-purple-500 mr-4 shadow-[0_0_10px_#a855f7]"></div>
             <h2 class="text-3xl font-bold text-white font-mono">PRIORITY_TARGETS</h2>
          </div>
          <router-link to="/jobs" class="text-cyan-400 hover:text-cyan-300 font-mono text-sm flex items-center group">
            [ VIEW_ALL ] <el-icon class="ml-2 group-hover:rotate-45 transition-transform"><Connection /></el-icon>
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="job in jobStore.jobs.slice(0, 6)" :key="job.id" 
               class="bg-slate-950 p-6 border border-slate-800 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 group relative">
            <div class="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100">
              <div class="text-[10px] text-purple-500 font-mono">ID: {{ 2049 + job.id }}</div>
            </div>
            
            <div class="flex items-start gap-4 mb-6">
              <div class="w-10 h-10 bg-slate-800 rounded flex items-center justify-center text-xs font-bold text-slate-400 group-hover:bg-purple-900/20 group-hover:text-purple-400 transition-colors">
                {{ job.company[0] }}
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-200 group-hover:text-purple-400 transition-colors line-clamp-1">
                  {{ job.title }}
                </h3>
                <p class="text-slate-500 text-sm mt-1">{{ job.company }}</p>
              </div>
            </div>

            <div class="flex flex-wrap gap-2 mb-6">
              <span v-for="tag in job.tags.slice(0, 2)" :key="tag" 
                    class="px-2 py-1 bg-slate-900 text-slate-400 text-xs border border-slate-700 font-mono">
                {{ tag }}
              </span>
            </div>
            
            <div class="flex items-center justify-between mt-auto">
              <span class="text-white font-bold font-mono">{{ job.salary }}</span>
              <router-link :to="`/jobs/${job.id}`">
                <button class="px-4 py-1.5 text-xs bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600 hover:text-white transition-colors uppercase tracking-wider">
                  Details
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.perspective-grid {
  perspective: 1000px;
  background-color: #020617;
}

.grid-floor {
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background-image: 
    linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  transform: rotateX(60deg);
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% { transform: rotateX(60deg) translateY(0); }
  100% { transform: rotateX(60deg) translateY(50px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); opacity: 0; }
  50% { opacity: 0.8; }
  100% { transform: translateY(-100px); opacity: 0; }
}

.animate-float {
  animation: float 10s infinite ease-in-out;
}

.animate-blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
