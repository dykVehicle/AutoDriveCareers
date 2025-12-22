<script setup lang="ts">
import { useJobStore } from '../stores/jobs';
import { useRouter } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue';

const jobStore = useJobStore();
const router = useRouter();

const categories = [
  '感知算法', '决策规划', '嵌入式', '仿真与测试', '云平台与工具', '高精地图', '智能座舱', '车辆工程'
];

const goToCategory = (category: string) => {
  router.push({ path: '/jobs', query: { q: category } });
};
</script>

<template>
  <div class="font-sans">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden min-h-[600px] flex items-center">
      <!-- Abstract Background Shapes -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
         <div class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500 rounded-full blur-[120px]"></div>
         <div class="absolute top-[40%] -right-[10%] w-[60%] h-[60%] bg-indigo-500 rounded-full blur-[120px]"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
          定义<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">智能驾驶</span>的未来
        </h1>
        <p class="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto font-light">
          汇聚全球顶尖自动驾驶企业，连接 500+ 高薪技术岗位。
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-6">
          <router-link to="/jobs">
            <button class="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-lg font-semibold transition-all shadow-lg shadow-blue-900/50 hover:shadow-blue-600/50 transform hover:-translate-y-1">
              浏览最新职位
            </button>
          </router-link>
          <button class="px-10 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 rounded-full text-lg font-semibold transition-all transform hover:-translate-y-1">
            企业入驻发布
          </button>
        </div>

        <!-- Stats -->
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12 max-w-4xl mx-auto">
          <div>
            <div class="text-3xl font-bold text-white">150+</div>
            <div class="text-sm text-blue-200 mt-1">在招职位</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-white">50+</div>
            <div class="text-sm text-blue-200 mt-1">合作企业</div>
          </div>
           <div>
            <div class="text-3xl font-bold text-white">30k+</div>
            <div class="text-sm text-blue-200 mt-1">平均月薪</div>
          </div>
           <div>
            <div class="text-3xl font-bold text-white">24h</div>
            <div class="text-sm text-blue-200 mt-1">极速反馈</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-slate-900 mb-4">热门投递领域</h2>
          <p class="text-slate-500 max-w-2xl mx-auto">覆盖自动驾驶全栈技术体系，从感知算法到云端平台</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="cat in categories" :key="cat" 
               class="group relative p-8 bg-slate-50 rounded-2xl hover:bg-white border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 cursor-pointer text-center"
               @click="goToCategory(cat)">
            <div class="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <!-- Simple Icon Placeholder using first char -->
              <span class="text-2xl font-bold">{{ cat[0] }}</span>
            </div>
            <h3 class="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{{ cat }}</h3>
            <p class="text-sm text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
              查看职位 &rarr;
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Jobs -->
    <section class="py-24 bg-slate-50 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-12">
          <div>
            <h2 class="text-3xl font-bold text-slate-900">精选高薪职位</h2>
            <p class="text-slate-500 mt-2">每日更新，直通核心团队</p>
          </div>
          <router-link to="/jobs" class="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors bg-white px-6 py-3 rounded-full shadow-sm hover:shadow">
            查看全部职位 <el-icon class="ml-2"><ArrowRight /></el-icon>
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="job in jobStore.jobs.slice(0, 6)" :key="job.id" 
               class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col group">
            <div class="flex justify-between items-start mb-6">
              <div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">
                Logo
              </div>
              <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">{{ job.location }}</span>
            </div>
            
            <div class="mb-4">
              <h3 class="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1" :title="job.title">
                {{ job.title }}
              </h3>
              <p class="text-slate-500 mt-1 font-medium">{{ job.company }}</p>
            </div>

            <div class="flex flex-wrap gap-2 mb-6">
              <span v-for="tag in job.tags.slice(0, 3)" :key="tag" 
                    class="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs">
                {{ tag }}
              </span>
            </div>
            
            <div class="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
              <span class="text-slate-900 font-bold text-lg">{{ job.salary }}</span>
              <router-link :to="`/jobs/${job.id}`" class="text-sm text-slate-400 hover:text-blue-600 font-medium flex items-center">
                详情
              </router-link>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center md:hidden">
          <router-link to="/jobs">
            <button class="w-full px-6 py-4 bg-white text-blue-600 font-bold rounded-xl border border-blue-100 shadow-sm">
              查看全部职位
            </button>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-blue-600 mx-4 sm:mx-8 rounded-3xl mb-12 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div class="relative z-10 text-center max-w-3xl mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">准备好开启新的职业旅程了吗？</h2>
        <p class="text-blue-100 text-lg mb-10">
          立即注册，完善简历，让 500+ 自动驾驶名企发现你的才华。
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
           <router-link to="/login">
            <button class="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors w-full sm:w-auto">
              免费注册
            </button>
           </router-link>
           <button class="px-8 py-4 bg-blue-700 text-white border border-blue-500 rounded-xl font-bold hover:bg-blue-800 transition-colors w-full sm:w-auto">
             订阅职位日报
           </button>
        </div>
      </div>
    </section>
  </div>
</template>
