<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useJobStore } from '../stores/jobs';
import { Location, Suitcase, School, ArrowLeft } from '@element-plus/icons-vue';

const route = useRoute();
const jobStore = useJobStore();
const jobId = Number(route.params.id);

const job = computed(() => jobStore.getJobById(jobId));

const goBack = () => window.history.back();
</script>

<template>
  <div v-if="job" class="bg-slate-50 min-h-screen py-12">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <button @click="goBack" class="mb-6 flex items-center text-slate-500 hover:text-blue-600 transition-colors">
        <el-icon class="mr-1"><ArrowLeft /></el-icon> 返回职位列表
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Job Header -->
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div class="flex justify-between items-start mb-4">
              <h1 class="text-3xl font-bold text-slate-900">{{ job.title }}</h1>
              <span class="text-2xl font-bold text-blue-600 whitespace-nowrap ml-4">{{ job.salary }}</span>
            </div>
            
            <div class="flex flex-wrap items-center gap-6 text-slate-500 mb-6">
               <div class="flex items-center gap-2">
                <el-icon><Location /></el-icon>
                {{ job.location }}
              </div>
              <div class="flex items-center gap-2">
                <el-icon><Suitcase /></el-icon>
                {{ job.requirements.experience }}
              </div>
              <div class="flex items-center gap-2">
                <el-icon><School /></el-icon>
                {{ job.requirements.education }}
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <span v-for="tag in job.tags" :key="tag" class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Job Description -->
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 class="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <span class="w-1 h-6 bg-blue-600 rounded-full mr-3"></span>
              职位描述
            </h2>
            <div class="prose prose-slate max-w-none text-slate-600 leading-relaxed">
              <p class="mb-6 text-lg">{{ job.description }}</p>
              
              <h3 class="font-bold text-slate-900 text-lg mt-8 mb-4">岗位职责</h3>
              <ul class="space-y-2 list-none pl-0">
                <li v-for="(item, index) in job.responsibilities" :key="index" class="flex items-start">
                  <span class="mr-3 text-blue-600 mt-1.5">•</span>
                  <span>{{ item }}</span>
                </li>
              </ul>

              <h3 class="font-bold text-slate-900 text-lg mt-8 mb-4">任职要求</h3>
              <ul class="space-y-2 list-none pl-0">
                <li v-for="(item, index) in job.qualifications" :key="index" class="flex items-start">
                  <span class="mr-3 text-blue-600 mt-1.5">•</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Company Card -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-slate-400 font-bold text-xl">
                {{ job.company[0] }}
              </div>
              <div>
                <h3 class="font-bold text-lg text-slate-900">{{ job.company }}</h3>
                <p class="text-sm text-slate-500">自动驾驶 · 独角兽</p>
              </div>
            </div>
            
            <div class="space-y-4 mb-8">
               <div class="flex justify-between text-sm">
                <span class="text-slate-500">公司规模</span>
                <span class="font-medium text-slate-900">500-2000人</span>
              </div>
               <div class="flex justify-between text-sm">
                <span class="text-slate-500">融资阶段</span>
                <span class="font-medium text-slate-900">D轮及以上</span>
              </div>
               <div class="flex justify-between text-sm">
                <span class="text-slate-500">工作地点</span>
                <span class="font-medium text-slate-900">{{ job.location }}</span>
              </div>
            </div>

            <div class="space-y-3">
              <button class="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
                立即投递
              </button>
              <button class="w-full py-3.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-bold transition-all">
                聊一聊
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="text-center">
      <div class="text-6xl mb-4">🤔</div>
      <p class="text-slate-500">职位不存在或已下线</p>
      <router-link to="/jobs" class="text-blue-600 font-medium mt-4 inline-block hover:underline">返回职位列表</router-link>
    </div>
  </div>
</template>
