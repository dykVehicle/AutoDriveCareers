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
  <div v-if="job" class="bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 min-h-screen py-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <button @click="goBack" class="mb-10 flex items-center text-slate-600 hover:text-slate-900 transition-all duration-300 font-semibold group">
        <div class="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center mr-3 group-hover:shadow-lg group-hover:-translate-x-1 transition-all duration-300 border border-slate-100">
          <el-icon class="group-hover:-translate-x-0.5 transition-transform"><ArrowLeft /></el-icon>
        </div>
        <span class="text-lg">返回列表</span>
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- Job Header with enhanced gradient -->
          <div class="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden">
            <!-- Decorative gradient circles -->
            <div class="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>
            <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-cyan-400/20 to-pink-400/20 rounded-full blur-3xl pointer-events-none"></div>

            <div class="relative z-10">
              <div class="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                <h1 class="text-4xl font-black text-slate-900 tracking-tight">{{ job.title }}</h1>
                <span class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 whitespace-nowrap">{{ job.salary }}</span>
              </div>
              
              <div class="flex flex-wrap items-center gap-4 text-slate-600 mb-10 font-medium">
                 <div class="flex items-center gap-2.5 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2.5 rounded-xl border border-blue-100">
                  <el-icon class="text-blue-600 text-lg"><Location /></el-icon>
                  <span class="text-slate-800 font-semibold">{{ job.location }}</span>
                </div>
                <div class="flex items-center gap-2.5 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2.5 rounded-xl border border-purple-100">
                  <el-icon class="text-purple-600 text-lg"><Suitcase /></el-icon>
                  <span class="text-slate-800 font-semibold">{{ job.requirements.experience }}</span>
                </div>
                <div class="flex items-center gap-2.5 bg-gradient-to-r from-cyan-50 to-blue-50 px-4 py-2.5 rounded-xl border border-cyan-100">
                  <el-icon class="text-cyan-600 text-lg"><School /></el-icon>
                  <span class="text-slate-800 font-semibold">{{ job.requirements.education }}</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-3">
                <span v-for="tag in job.tags" :key="tag" class="px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl text-sm font-bold hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-md">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Job Description with enhanced styling -->
          <div class="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h2 class="text-2xl font-bold text-slate-900 mb-10 flex items-center">
              <span class="w-2 h-10 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full mr-4"></span>
              <span>职位详情</span>
            </h2>
            
            <div class="prose prose-slate max-w-none prose-lg text-slate-700">
              <p class="mb-10 leading-relaxed text-lg bg-gradient-to-r from-slate-50 to-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">{{ job.description }}</p>
              
              <h3 class="text-slate-900 font-bold mb-6 text-xl flex items-center gap-3">
                <span class="text-2xl">💼</span>
                <span>岗位职责</span>
              </h3>
              <ul class="space-y-4 mb-10">
                <li v-for="(item, index) in job.responsibilities" :key="index" class="flex items-start group">
                  <span class="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2.5 mr-4 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></span>
                  <span class="leading-relaxed">{{ item }}</span>
                </li>
              </ul>

              <h3 class="text-slate-900 font-bold mb-6 text-xl flex items-center gap-3">
                <span class="text-2xl">✅</span>
                <span>任职要求</span>
              </h3>
              <ul class="space-y-4">
                <li v-for="(item, index) in job.qualifications" :key="index" class="flex items-start group">
                  <span class="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2.5 mr-4 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></span>
                  <span class="leading-relaxed">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Sidebar with enhanced styling -->
        <div class="lg:col-span-1 space-y-8">
          <!-- Company Card -->
          <div class="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 sticky top-24 overflow-hidden relative">
            <!-- Background decoration -->
            <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="relative z-10">
              <div class="flex items-center gap-4 mb-8">
                <div class="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center text-white font-bold text-3xl shadow-2xl shadow-blue-600/40 relative overflow-hidden group">
                  <span class="relative z-10">{{ job.company[0] }}</span>
                  <div class="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div>
                  <h3 class="font-bold text-xl text-slate-900 mb-1">{{ job.company }}</h3>
                  <p class="text-sm text-slate-600 flex items-center gap-2">
                    <span>🚀</span>
                    <span>自动驾驶 · 独角兽</span>
                  </p>
                </div>
              </div>
              
              <div class="space-y-4 mb-8 border-t border-b border-slate-100 py-6">
                 <div class="flex justify-between text-sm">
                  <span class="text-slate-600 flex items-center gap-2">
                    <span>👥</span>
                    <span>公司规模</span>
                  </span>
                  <span class="font-bold text-slate-900">500+ 人</span>
                </div>
                 <div class="flex justify-between text-sm">
                  <span class="text-slate-600 flex items-center gap-2">
                    <span>💰</span>
                    <span>融资阶段</span>
                  </span>
                  <span class="font-bold text-slate-900">D轮及以上</span>
                </div>
              </div>

              <div class="space-y-3">
                <button class="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/50 relative overflow-hidden group">
                  <span class="relative z-10 flex items-center justify-center gap-2">
                    <span>立即投递</span>
                    <span class="text-xl">🚀</span>
                  </span>
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                </button>
                <div class="flex gap-3">
                  <button @click="isBookmarked = !isBookmarked" class="flex-1 py-3.5 bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-105">
                    <el-icon :class="isBookmarked ? 'text-yellow-500' : ''" class="group-hover:scale-110 transition-transform"><Star /></el-icon> 
                    <span>{{ isBookmarked ? '已收藏' : '收藏' }}</span>
                  </button>
                  <button class="flex-1 py-3.5 bg-white border-2 border-slate-200 text-slate-700 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-105">
                    <el-icon class="group-hover:scale-110 transition-transform"><Share /></el-icon> 
                    <span>分享</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
