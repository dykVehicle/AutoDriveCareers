<script setup lang="ts">
import { useJobStore } from '../stores/jobs';
import { useRouter } from 'vue-router';
import { ArrowRight, Cpu } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';

const jobStore = useJobStore();
const router = useRouter();

const categories = [
  '感知算法', '决策规划', '嵌入式', '仿真与测试', '云平台与工具', '高精地图', '智能座舱', '车辆工程'
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
    <section class="relative min-h-[750px] flex items-center justify-center overflow-hidden">
      
      <!-- Vibrant Background Gradient (Aurora) -->
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50"></div>
      
      <!-- Animated Shapes -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-[100px] opacity-20 transition-transform duration-100"
             :style="{ transform: `translate(${mouseX * -1}px, ${mouseY * -1}px)` }"></div>
        <div class="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-r from-cyan-400 to-green-400 rounded-full blur-[100px] opacity-20 transition-transform duration-100"
             :style="{ transform: `translate(${mouseX * 1.5}px, ${mouseY * 1.5}px)` }"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
        
        <!-- Poetry Widget -->
        <div class="mb-10 min-h-[40px] flex justify-center">
          <div class="px-6 py-2 rounded-lg bg-white/60 backdrop-blur border border-white shadow-sm inline-flex items-center">
            <span class="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 animate-pulse"></span>
            <span class="font-serif text-slate-800 text-lg tracking-widest">{{ currentPoem }}<span class="animate-blink">|</span></span>
          </div>
        </div>
        
        <h1 class="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-tight text-slate-900 drop-shadow-sm">
          连接<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">智能驾驶</span><br>
          的未来人才
        </h1>
        
        <p class="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          这里没有枯燥的JD，只有通往未来的车票。<br>
          <span class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Code Your Way to Autonomy.</span>
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-6">
          <router-link to="/jobs">
            <button class="relative group px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-lg shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_30px_-10px_rgba(59,130,246,0.5)] hover:-translate-y-1 transition-all flex items-center justify-center mx-auto overflow-hidden">
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
        <div class="absolute top-1/3 left-10 hidden xl:block animate-float-slow cursor-pointer hover:scale-110 transition-transform">
          <div class="bg-white/80 backdrop-blur p-4 rounded-2xl shadow-xl border border-white rotate-[-6deg] hover:rotate-0 transition-transform">
            <div class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">35K+</div>
            <div class="text-xs text-slate-500 font-bold">平均月薪 💰</div>
          </div>
        </div>
        
        <div class="absolute bottom-20 right-20 hidden xl:block animate-float-delayed cursor-pointer hover:scale-110 transition-transform">
          <div class="bg-white/80 backdrop-blur p-4 rounded-2xl shadow-xl border border-white rotate-[6deg] hover:rotate-0 transition-transform">
            <div class="text-4xl mb-1">🚀</div>
            <div class="text-xs text-slate-500 font-bold">极速入职</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-24 bg-white relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-slate-900 mb-4">热门投递领域</h2>
          <div class="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="cat in categories" :key="cat" 
               class="group p-8 rounded-3xl border border-slate-100 bg-white hover:border-transparent hover:shadow-2xl transition-all duration-300 cursor-pointer text-center relative overflow-hidden"
               @click="goToCategory(cat)">
            <!-- Colorful Background on Hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative z-10">
              <div class="mb-6 w-16 h-16 mx-auto bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 group-hover:scale-110 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-md transition-all duration-300">
                <el-icon :size="28"><Cpu /></el-icon>
              </div>
              <h3 class="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{{ cat }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Jobs -->
    <section class="py-24 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-12">
          <h2 class="text-3xl font-bold text-slate-900">精选职位 ✨</h2>
          <router-link to="/jobs" class="flex items-center text-blue-600 font-bold hover:text-purple-600 transition-colors">
            查看全部 <el-icon class="ml-1"><ArrowRight /></el-icon>
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="job in jobStore.jobs.slice(0, 6)" :key="job.id" 
               class="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group border border-slate-100 relative overflow-hidden">
            
            <!-- Gradient Border Bottom -->
            <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

            <div class="flex justify-between items-start mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-xl font-bold text-slate-500 group-hover:text-slate-700 transition-colors">
                {{ job.company[0] }}
              </div>
              <span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">{{ job.salary }}</span>
            </div>
            
            <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all line-clamp-1">
              {{ job.title }}
            </h3>
            <p class="text-slate-500 text-sm mb-6">{{ job.company }} · {{ job.location }}</p>

            <div class="flex flex-wrap gap-2">
              <span v-for="tag in job.tags.slice(0, 2)" :key="tag" 
                    class="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium group-hover:bg-slate-100 transition-colors">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-float-slow {
  animation: float 6s ease-in-out infinite;
}
.animate-float-delayed {
  animation: float 7s ease-in-out infinite 1s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-6deg); }
  50% { transform: translateY(-20px) rotate(0deg); }
  100% { transform: translateY(0) rotate(-6deg); }
}

@keyframes shimmer {
  100% { transform: translateX(100%); }
}
.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-blink {
  animation: blink 1s infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
