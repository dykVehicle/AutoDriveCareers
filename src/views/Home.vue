<script setup lang="ts">
import { useJobStore } from '../stores/jobs';
import { useRouter } from 'vue-router';
import { ArrowRight, Cpu, DataBoard, Van, MapLocation, MagicStick, VideoCamera, Setting } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';

const jobStore = useJobStore();
const router = useRouter();

const categories = [
  { name: '感知算法', icon: VideoCamera, color: 'text-blue-500', bg: 'bg-blue-50' },
  { name: '决策规划', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-50' },
  { name: '嵌入式', icon: Setting, color: 'text-orange-500', bg: 'bg-orange-50' },
  { name: '仿真与测试', icon: DataBoard, color: 'text-green-500', bg: 'bg-green-50' },
  { name: '云平台', icon: MapLocation, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { name: '高精地图', icon: MapLocation, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { name: '智能座舱', icon: MagicStick, color: 'text-pink-500', bg: 'bg-pink-50' },
  { name: '车辆工程', icon: Van, color: 'text-red-500', bg: 'bg-red-50' },
];

const goToCategory = (category: string) => {
  router.push({ path: '/jobs', query: { q: category } });
};

// Parallax effect
const mouseX = ref(0);
const mouseY = ref(0);

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 20;
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 20;
};

// Poetry System
const poems = [
  "天生我材必有用，千金散尽还复来",
  "长风破浪会有时，直挂云帆济沧海",
  "大鹏一日同风起，扶摇直上九万里",
  "会当凌绝顶，一览众山小",
  "路漫漫其修远兮，吾将上下而求索"
];
const currentPoem = ref('');
const poemIndex = ref(0);

const typePoem = () => {
  const target = poems[poemIndex.value] || '';
  let charIdx = 0;
  currentPoem.value = '';
  
  const typeTimer = setInterval(() => {
    if (charIdx < target.length) {
      currentPoem.value += target.charAt(charIdx);
      charIdx++;
    } else {
      clearInterval(typeTimer);
      // Wait and then switch
      setTimeout(() => {
        poemIndex.value = (poemIndex.value + 1) % poems.length;
        typePoem();
      }, 5000);
    }
  }, 150);
};

onMounted(() => {
  typePoem();
});
</script>

<template>
  <div class="font-sans overflow-hidden bg-slate-50" @mousemove="handleMouseMove">
    <!-- Hero Section -->
    <section class="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      
      <!-- Vibrant Background Gradient (Aurora) -->
      <div class="absolute inset-0 bg-slate-50">
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-cyan-50/50"></div>
        <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>
      
      <!-- Animated Shapes -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-[120px] mix-blend-multiply opacity-50 animate-float-slow"
             :style="{ transform: `translate(${mouseX * -1.5}px, ${mouseY * -1.5}px)` }"></div>
        <div class="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/30 to-green-400/30 rounded-full blur-[120px] mix-blend-multiply opacity-50 animate-float-delayed"
             :style="{ transform: `translate(${mouseX * 1.5}px, ${mouseY * 1.5}px)` }"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
        
        <!-- Poetry Widget -->
        <div class="mb-12 animate-fade-in-up" style="animation-delay: 0.1s">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white/50 shadow-sm text-sm font-medium text-slate-600">
            <span class="flex h-2 w-2 relative mr-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span class="font-serif tracking-widest">{{ currentPoem }}<span class="animate-pulse">|</span></span>
          </div>
        </div>
        
        <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] text-slate-900 drop-shadow-sm animate-fade-in-up" style="animation-delay: 0.2s">
          连接<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">智能驾驶</span><br>
          的未来人才
        </h1>
        
        <p class="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up" style="animation-delay: 0.3s">
          这里没有枯燥的JD，只有通往未来的车票。<br>
          <span class="font-bold text-slate-800">Code Your Way to Autonomy.</span>
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up" style="animation-delay: 0.4s">
          <router-link to="/jobs">
            <button class="relative group px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-[0_20px_40px_-15px_rgba(15,23,42,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center mx-auto overflow-hidden ring-4 ring-slate-900/10">
              <span class="relative z-10">开始探索</span>
              <div class="ml-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white group-hover:translate-x-1 transition-transform relative z-10">
                <el-icon><ArrowRight /></el-icon>
              </div>
              <!-- Button Shine Effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            </button>
          </router-link>
        </div>

        <!-- Fun Stats Cards -->
        <div class="absolute top-[20%] left-[5%] hidden xl:block animate-float-slow cursor-pointer hover:scale-110 transition-transform duration-300 z-10">
          <div class="bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/50 rotate-[-6deg] hover:rotate-0 transition-all duration-300 group">
            <div class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 mb-1">35K+</div>
            <div class="text-xs text-slate-500 font-bold uppercase tracking-wider group-hover:text-slate-800 transition-colors">平均月薪 💰</div>
          </div>
        </div>
        
        <div class="absolute bottom-[20%] right-[5%] hidden xl:block animate-float-delayed cursor-pointer hover:scale-110 transition-transform duration-300 z-10">
          <div class="bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/50 rotate-[6deg] hover:rotate-0 transition-all duration-300 group">
            <div class="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">🚀</div>
            <div class="text-xs text-slate-500 font-bold uppercase tracking-wider group-hover:text-slate-800 transition-colors">极速入职</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-32 bg-white relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <h2 class="text-4xl font-black text-slate-900 mb-6 tracking-tight">热门投递领域</h2>
          <p class="text-slate-500 max-w-2xl mx-auto text-lg">
            涵盖自动驾驶全栈技术链，从底层感知到上层规划，从车端嵌入式到云端平台。
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="cat in categories" :key="cat.name" 
               class="group relative p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-transparent hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer text-center overflow-hidden"
               @click="goToCategory(cat.name)">
            
            <div class="relative z-10">
              <div :class="`mb-6 w-20 h-20 mx-auto rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${cat.bg} ${cat.color}`">
                <el-icon :size="32"><component :is="cat.icon" /></el-icon>
              </div>
              <h3 class="text-lg font-bold text-slate-800 group-hover:text-slate-900 transition-colors">{{ cat.name }}</h3>
              <p class="text-xs text-slate-400 mt-2 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                120+ 职位热招
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Jobs -->
    <section class="py-32 bg-slate-50/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-16">
          <div>
            <h2 class="text-4xl font-black text-slate-900 mb-4 tracking-tight">精选职位 ✨</h2>
             <p class="text-slate-500">每日更新，甄选高薪机会</p>
          </div>
          <router-link to="/jobs" class="hidden sm:flex items-center text-slate-900 font-bold hover:text-blue-600 transition-colors bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md border border-slate-100">
            查看全部 <el-icon class="ml-2"><ArrowRight /></el-icon>
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="job in jobStore.jobs.slice(0, 6)" :key="job.id" 
               class="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group border border-slate-100 relative overflow-hidden cursor-pointer"
               @click="router.push(`/jobs/${job.id}`)">
            
            <div class="flex justify-between items-start mb-6">
              <div class="w-14 h-14 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center text-xl font-bold text-slate-600 group-hover:text-white group-hover:bg-slate-900 transition-all duration-300 shadow-inner">
                {{ job.company[0] }}
              </div>
              <span class="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">{{ job.salary }}</span>
            </div>
            
            <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
              {{ job.title }}
            </h3>
            <p class="text-slate-500 text-sm mb-8 font-medium">{{ job.company }} · {{ job.location }}</p>

            <div class="flex flex-wrap gap-2">
              <span v-for="tag in job.tags.slice(0, 2)" :key="tag" 
                    class="px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-600 rounded-xl text-xs font-semibold group-hover:bg-white group-hover:shadow-sm transition-all">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="mt-12 text-center sm:hidden">
           <router-link to="/jobs" class="inline-flex items-center justify-center text-slate-900 font-bold hover:text-blue-600 transition-colors bg-white px-8 py-4 rounded-full shadow-lg border border-slate-100 w-full">
            查看全部 <el-icon class="ml-2"><ArrowRight /></el-icon>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 覆盖 Element UI 的图标导入问题 */
</style>
