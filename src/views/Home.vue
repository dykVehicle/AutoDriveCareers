<script setup lang="ts">
import { useJobStore } from '../stores/jobs';
import { useRouter } from 'vue-router';
import { ArrowRight, Cpu } from '@element-plus/icons-vue';
import { ref } from 'vue';

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
</script>

<template>
  <div class="font-sans overflow-hidden" @mousemove="handleMouseMove">
    <!-- Hero Section -->
    <section class="relative min-h-[700px] flex items-center justify-center overflow-hidden bg-slate-50">
      
      <!-- Parallax Background Elements -->
      <div class="absolute inset-0 pointer-events-none">
        <!-- Big Circle -->
        <div class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl transition-transform duration-100"
             :style="{ transform: `translate(${mouseX * -1}px, ${mouseY * -1}px)` }"></div>
        <!-- Small Circle -->
        <div class="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-orange-100/50 rounded-full blur-3xl transition-transform duration-100"
             :style="{ transform: `translate(${mouseX * 1.5}px, ${mouseY * 1.5}px)` }"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
        
        <div class="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-white shadow-sm border border-slate-100 text-slate-600 text-sm font-medium animate-fade-in-up">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          正在招聘：150+ 岗位在线
        </div>
        
        <h1 class="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-tight text-slate-900 drop-shadow-sm">
          连接<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">智能驾驶</span><br>
          的未来人才
        </h1>
        
        <p class="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          让找工作像自动驾驶一样 <span class="font-bold text-slate-800">平滑</span>、<span class="font-bold text-slate-800">高效</span>、<span class="font-bold text-slate-800">精准</span>。
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-6">
          <router-link to="/jobs">
            <button class="group px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center mx-auto">
              开始探索
              <div class="ml-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-900 group-hover:translate-x-1 transition-transform">
                <el-icon><ArrowRight /></el-icon>
              </div>
            </button>
          </router-link>
        </div>

        <!-- Float Cards (Decorative) -->
        <div class="absolute top-1/2 left-10 hidden xl:block animate-float-slow">
          <div class="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 rotate-[-6deg]">
            <div class="text-3xl font-bold text-blue-600">35K+</div>
            <div class="text-xs text-slate-400">平均月薪</div>
          </div>
        </div>
        <div class="absolute bottom-20 right-20 hidden xl:block animate-float-delayed">
          <div class="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 rotate-[6deg]">
            <div class="flex -space-x-2">
              <div class="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
              <div class="w-8 h-8 rounded-full bg-slate-300 border-2 border-white"></div>
              <div class="w-8 h-8 rounded-full bg-slate-400 border-2 border-white"></div>
            </div>
            <div class="text-xs text-slate-400 mt-2">50+ 合作企业</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-24 bg-white relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-slate-900 mb-4">热门投递领域</h2>
          <div class="w-16 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="cat in categories" :key="cat" 
               class="group p-8 bg-slate-50 rounded-3xl hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer text-center"
               @click="goToCategory(cat)">
            <div class="mb-6 w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <el-icon :size="28"><Cpu /></el-icon>
            </div>
            <h3 class="text-lg font-bold text-slate-800">{{ cat }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Jobs -->
    <section class="py-24 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-12">
          <h2 class="text-3xl font-bold text-slate-900">精选职位</h2>
          <router-link to="/jobs" class="flex items-center text-blue-600 font-bold hover:underline">
            查看全部 <el-icon class="ml-1"><ArrowRight /></el-icon>
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="job in jobStore.jobs.slice(0, 6)" :key="job.id" 
               class="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group border border-slate-100">
            <div class="flex justify-between items-start mb-6">
              <div class="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl font-bold text-slate-400">
                {{ job.company[0] }}
              </div>
              <span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">{{ job.salary }}</span>
            </div>
            
            <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
              {{ job.title }}
            </h3>
            <p class="text-slate-500 text-sm mb-6">{{ job.company }} · {{ job.location }}</p>

            <div class="flex flex-wrap gap-2">
              <span v-for="tag in job.tags.slice(0, 2)" :key="tag" 
                    class="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium">
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
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
