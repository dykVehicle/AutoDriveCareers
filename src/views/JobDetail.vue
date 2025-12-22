<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useJobStore } from '../stores/jobs';
import { Location, Suitcase, School, ArrowLeft, Star, Share } from '@element-plus/icons-vue';

const route = useRoute();
const jobStore = useJobStore();
const jobId = Number(route.params.id);

const job = computed(() => jobStore.getJobById(jobId));
const goBack = () => window.history.back();

const isBookmarked = ref(false);
</script>

<template>
  <div v-if="job" class="bg-slate-50 min-h-screen py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <button @click="goBack" class="mb-8 flex items-center text-slate-500 hover:text-slate-900 transition-colors font-medium">
        <div class="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-3 hover:shadow-md transition-shadow">
          <el-icon><ArrowLeft /></el-icon>
        </div>
        返回列表
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Job Header -->
          <div class="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden">
            <!-- Decorative circle -->
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl pointer-events-none"></div>

            <div class="relative z-10">
              <div class="flex justify-between items-start mb-6">
                <h1 class="text-3xl font-black text-slate-900 tracking-tight">{{ job.title }}</h1>
                <span class="text-2xl font-bold text-blue-600">{{ job.salary }}</span>
              </div>
              
              <div class="flex flex-wrap items-center gap-6 text-slate-500 mb-8 font-medium">
                 <div class="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                  <el-icon class="text-slate-900"><Location /></el-icon>
                  {{ job.location }}
                </div>
                <div class="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                  <el-icon class="text-slate-900"><Suitcase /></el-icon>
                  {{ job.requirements.experience }}
                </div>
                <div class="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                  <el-icon class="text-slate-900"><School /></el-icon>
                  {{ job.requirements.education }}
                </div>
              </div>

              <div class="flex flex-wrap gap-2">
                <span v-for="tag in job.tags" :key="tag" class="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-full text-sm hover:border-blue-200 hover:text-blue-600 transition-colors">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Job Description -->
          <div class="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100">
            <h2 class="text-xl font-bold text-slate-900 mb-8 flex items-center">
              <span class="w-2 h-8 bg-orange-500 rounded-full mr-4"></span>
              职位详情
            </h2>
            
            <div class="prose prose-slate max-w-none prose-lg text-slate-600">
              <p class="mb-8 leading-relaxed">{{ job.description }}</p>
              
              <h3 class="text-slate-900 font-bold mb-4">岗位职责</h3>
              <ul class="space-y-3 mb-8">
                <li v-for="(item, index) in job.responsibilities" :key="index" class="flex items-start">
                  <span class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>

              <h3 class="text-slate-900 font-bold mb-4">任职要求</h3>
              <ul class="space-y-3">
                <li v-for="(item, index) in job.qualifications" :key="index" class="flex items-start">
                  <span class="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Company Card -->
          <div class="bg-white p-8 rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-100 sticky top-24">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/30">
                {{ job.company[0] }}
              </div>
              <div>
                <h3 class="font-bold text-lg text-slate-900">{{ job.company }}</h3>
                <p class="text-sm text-slate-500">自动驾驶 · 独角兽</p>
              </div>
            </div>
            
            <div class="space-y-4 mb-8 border-t border-b border-slate-50 py-6">
               <div class="flex justify-between text-sm">
                <span class="text-slate-500">公司规模</span>
                <span class="font-bold text-slate-900">500+ 人</span>
              </div>
               <div class="flex justify-between text-sm">
                <span class="text-slate-500">融资阶段</span>
                <span class="font-bold text-slate-900">D轮及以上</span>
              </div>
            </div>

            <div class="space-y-3">
              <button class="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-xl font-bold shadow-xl transition-all hover:-translate-y-1">
                立即投递
              </button>
              <div class="flex gap-3">
                <button @click="isBookmarked = !isBookmarked" class="flex-1 py-3 bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 rounded-xl font-medium transition-all flex items-center justify-center">
                  <el-icon class="mr-2" :class="isBookmarked ? 'text-yellow-500' : ''"><Star /></el-icon> {{ isBookmarked ? '已收藏' : '收藏' }}
                </button>
                <button class="flex-1 py-3 bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 rounded-xl font-medium transition-all flex items-center justify-center">
                  <el-icon class="mr-2"><Share /></el-icon> 分享
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
