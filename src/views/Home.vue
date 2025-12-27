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
  <div class="font-sans overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20" @mousemove="handleMouseMove">
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      
      <!-- Vibrant Background Gradient (Aurora) -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-100/40 via-purple-100/40 to-cyan-100/40"></div>
        <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>
      
      <!-- Animated Shapes with more vibrant colors -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-[-10%] right-[-5%] w-[900px] h-[900px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-[140px] mix-blend-normal opacity-60 animate-float-slow"
             :style="{ transform: `translate(${mouseX * -1.5}px, ${mouseY * -1.5}px)` }"></div>
        <div class="absolute bottom-[10%] left-[-5%] w-[700px] h-[700px] bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full blur-[140px] mix-blend-normal opacity-60 animate-float-delayed"
             :style="{ transform: `translate(${mouseX * 1.5}px, ${mouseY * 1.5}px)` }"></div>
        <div class="absolute top-[40%] left-[50%] w-[500px] h-[500px] bg-gradient-to-r from-green-400/15 to-blue-400/15 rounded-full blur-[120px] mix-blend-normal opacity-50 animate-float"
             :style="{ transform: `translate(${mouseX * -0.8}px, ${mouseY * -0.8}px)` }"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
        
        <!-- Poetry Widget with enhanced styling -->
        <div class="mb-12 animate-fade-in-up" style="animation-delay: 0.1s">
          <div class="inline-flex items-center px-5 py-2.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg shadow-blue-500/10 text-sm font-medium text-slate-700 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
            <span class="flex h-2.5 w-2.5 relative mr-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </span>
            <span class="font-serif tracking-widest bg-gradient-to-r from-slate-700 via-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">{{ currentPoem }}<span class="animate-pulse text-blue-600">|</span></span>
          </div>
        </div>
        
        <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] text-slate-900 animate-fade-in-up relative" style="animation-delay: 0.2s">
          <span class="relative inline-block">
            连接
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl -z-10"></div>
          </span>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient bg-size-200 inline-block relative">
            智能驾驶
            <div class="absolute -inset-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-3xl -z-10 animate-pulse-slow"></div>
          </span>
          <br>
          <span class="relative inline-block">
            的未来人才
            <div class="absolute -bottom-3 left-0 right-0 h-3 bg-gradient-to-r from-yellow-400/40 via-orange-400/40 to-red-400/40 blur-sm -z-10 skew-y-1"></div>
          </span>
        </h1>
        
        <p class="text-xl md:text-2xl text-slate-700 mb-12 max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in-up" style="animation-delay: 0.3s">
          这里没有枯燥的JD，只有通往未来的车票。✨<br>
          <span class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700">Code Your Way to Autonomy.</span>
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up" style="animation-delay: 0.4s">
          <router-link to="/jobs">
            <button class="relative group px-12 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-2xl font-bold text-lg shadow-[0_20px_50px_-15px_rgba(59,130,246,0.5)] hover:shadow-[0_30px_60px_-12px_rgba(147,51,234,0.6)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto overflow-hidden ring-4 ring-blue-600/20 hover:ring-purple-600/30">
              <span class="relative z-10 flex items-center gap-3">
                <span>开始探索</span>
                <span class="text-2xl">🚀</span>
              </span>
              <div class="ml-3 w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white group-hover:translate-x-1 group-hover:scale-110 transition-all relative z-10">
                <el-icon><ArrowRight /></el-icon>
              </div>
              <!-- Button Shine Effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
              <!-- Glow effect -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 -z-10"></div>
            </button>
          </router-link>
        </div>

        <!-- Fun Stats Cards with enhanced styling -->
        <div class="absolute top-[20%] left-[5%] hidden xl:block animate-float-slow cursor-pointer hover:scale-110 transition-transform duration-300 z-10">
          <div class="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)] border border-white/60 rotate-[-6deg] hover:rotate-0 transition-all duration-300 group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-2 relative z-10">35K+</div>
            <div class="text-xs text-slate-600 font-bold uppercase tracking-wider group-hover:text-blue-600 transition-colors relative z-10 flex items-center gap-1">平均月薪 <span class="text-xl">💰</span></div>
          </div>
        </div>
        
        <div class="absolute bottom-[20%] right-[5%] hidden xl:block animate-float-delayed cursor-pointer hover:scale-110 transition-transform duration-300 z-10">
          <div class="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-[0_20px_60px_-15px_rgba(147,51,234,0.3)] border border-white/60 rotate-[6deg] hover:rotate-0 transition-all duration-300 group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300 relative z-10">🚀</div>
            <div class="text-xs text-slate-600 font-bold uppercase tracking-wider group-hover:text-purple-600 transition-colors relative z-10">极速入职</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-32 bg-gradient-to-b from-white via-slate-50/50 to-white relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <div class="inline-block mb-4">
            <span class="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-bold">热门领域</span>
          </div>
          <h2 class="text-5xl font-black text-slate-900 mb-6 tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text">热门投递领域</h2>
          <p class="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            涵盖自动驾驶全栈技术链，从底层感知到上层规划，从车端嵌入式到云端平台。💡
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="cat in categories" :key="cat.name" 
               class="group relative p-8 rounded-[2rem] bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/50 hover:border-transparent hover:from-white hover:to-white hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer text-center overflow-hidden"
               @click="goToCategory(cat.name)">
            
            <!-- Hover gradient background -->
            <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-[2rem]"
                 :class="`${cat.bg.replace('bg-', 'from-')} to-white`"></div>
            
            <div class="relative z-10">
              <div :class="`mb-6 w-20 h-20 mx-auto rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg ${cat.bg} ${cat.color} group-hover:shadow-xl`">
                <el-icon :size="36"><component :is="cat.icon" /></el-icon>
              </div>
              <h3 class="text-lg font-bold text-slate-800 group-hover:text-slate-900 transition-colors mb-1">{{ cat.name }}</h3>
              <p class="text-xs text-slate-500 mt-2 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                120+ 职位热招 🔥
              </p>
            </div>
            
            <!-- Corner accent -->
            <div class="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div :class="`absolute top-3 right-3 w-2 h-2 rounded-full ${cat.bg.replace('bg-', 'bg-').replace('-50', '-400')}`"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Jobs -->
    <section class="py-32 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex flex-col md:flex-row justify-between items-center md:items-end mb-16">
          <div class="text-center md:text-left mb-6 md:mb-0">
            <div class="inline-block mb-4">
              <span class="px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 rounded-full text-sm font-bold flex items-center gap-2">
                <span class="text-xl">✨</span>
                <span>每日精选</span>
              </span>
            </div>
            <h2 class="text-5xl font-black text-slate-900 mb-4 tracking-tight">精选职位</h2>
            <p class="text-slate-600 text-lg">每日更新，甄选高薪机会 💎</p>
          </div>
          <router-link to="/jobs" class="hidden sm:flex items-center gap-2 text-slate-900 font-bold hover:text-blue-600 transition-all duration-300 bg-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl border border-slate-100 hover:border-blue-200 hover:-translate-y-1 group">
            <span>查看全部</span>
            <el-icon class="group-hover:translate-x-1 transition-transform"><ArrowRight /></el-icon>
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="job in jobStore.jobs.slice(0, 6)" :key="job.id" 
               class="bg-white p-8 rounded-[2rem] shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 group border border-slate-100 hover:border-blue-200 relative overflow-hidden cursor-pointer"
               @click="router.push(`/jobs/${job.id}`)">
            
            <!-- Gradient overlay on hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem]"></div>
            
            <div class="relative z-10">
              <div class="flex justify-between items-start mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-slate-100 to-blue-100 rounded-2xl flex items-center justify-center text-xl font-bold text-slate-700 group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 shadow-md group-hover:shadow-xl group-hover:scale-110">
                  {{ job.company[0] }}
                </div>
                <span class="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 rounded-xl text-sm font-bold group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">{{ job.salary }}</span>
              </div>
              
              <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                {{ job.title }}
              </h3>
              <p class="text-slate-600 text-sm mb-8 font-medium flex items-center gap-2">
                <span class="font-semibold text-slate-700">{{ job.company }}</span>
                <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>{{ job.location }}</span>
              </p>

              <div class="flex flex-wrap gap-2">
                <span v-for="tag in job.tags.slice(0, 2)" :key="tag" 
                      class="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-600 transition-all">
                  {{ tag }}
                </span>
              </div>
            </div>
            
            <!-- Corner decoration -->
            <div class="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl"></div>
          </div>
        </div>
        
        <div class="mt-12 text-center sm:hidden">
           <router-link to="/jobs" class="inline-flex items-center justify-center gap-2 text-slate-900 font-bold hover:text-blue-600 transition-all duration-300 bg-white px-8 py-4 rounded-2xl shadow-lg border border-slate-100 w-full hover:-translate-y-1">
            <span>查看全部</span>
            <el-icon><ArrowRight /></el-icon>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 覆盖 Element UI 的图标导入问题 */
</style>
