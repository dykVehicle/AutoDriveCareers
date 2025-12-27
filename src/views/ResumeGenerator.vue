<script setup lang="ts">
import { ref } from 'vue';
import { Download, MagicStick } from '@element-plus/icons-vue';

const rawResume = ref('');
const isGenerating = ref(false);
const generatedResume = ref<null | {
  name: string;
  summary: string;
  experience: string[];
  education: string[];
  skills: string[];
}>(null);

const generateResume = () => {
  if (!rawResume.value) return;
  isGenerating.value = true;
  
  // Mock AI generation
  setTimeout(() => {
    // Simple mock logic: extract first line as name, split rest by newlines
    const lines = rawResume.value.split('\n').filter(l => l.trim());
    const name = lines[0] || '候选人姓名';
    
    generatedResume.value = {
      name: name,
      summary: '资深专业人士，拥有丰富的行业经验，致力于在自动驾驶领域创造价值。具备优秀的团队协作能力和解决复杂问题的能力。',
      experience: [
        '主导核心模块开发，提升系统性能 30%',
        '负责团队技术选型与架构设计',
        '协调跨部门合作，推动项目按时交付'
      ],
      education: [
        '计算机科学与技术硕士 - 知名大学',
        'GPA: 3.8/4.0'
      ],
      skills: ['Vue.js', 'TypeScript', 'Node.js', 'Python', '自动驾驶算法']
    };
    isGenerating.value = false;
  }, 1500);
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-black text-slate-900 mb-4">
          智能简历优化 <span class="text-blue-600">AI</span>
        </h1>
        <p class="text-xl text-slate-600 max-w-2xl mx-auto">
          粘贴您的现有简历，AI 将自动为您生成一份排版精美、重点突出的专业简历。
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-300px)] min-h-[600px]">
        <!-- Input Area -->
        <div class="flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div class="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 class="font-bold text-slate-700">原始简历内容</h3>
            <span class="text-xs font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">输入</span>
          </div>
          <textarea
            v-model="rawResume"
            class="flex-1 p-6 resize-none focus:outline-none text-slate-600 leading-relaxed text-lg"
            placeholder="在此粘贴您的简历内容...&#10;&#10;例如：&#10;张三&#10;全栈工程师&#10;5年经验..."
          ></textarea>
          <div class="p-6 border-t border-slate-100 bg-slate-50">
            <button
              @click="generateResume"
              :disabled="!rawResume || isGenerating"
              class="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <el-icon :class="{'animate-spin': isGenerating}"><MagicStick /></el-icon>
              {{ isGenerating ? '正在优化中...' : '一键生成精美简历' }}
            </button>
          </div>
        </div>

        <!-- Preview Area -->
        <div class="flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 relative">
          <div class="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 class="font-bold text-slate-700">预览效果</h3>
            <div class="flex gap-2">
                <button class="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
                    <el-icon><Download /></el-icon>
                </button>
                <span class="text-xs font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full">预览</span>
            </div>
          </div>
          
          <div class="flex-1 p-8 overflow-y-auto bg-slate-50 custom-scrollbar">
            <div v-if="!generatedResume" class="h-full flex flex-col items-center justify-center text-slate-400">
              <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <el-icon :size="40"><MagicStick /></el-icon>
              </div>
              <p>在左侧输入内容并点击生成</p>
            </div>

            <div v-else class="bg-white shadow-sm p-10 min-h-full mx-auto max-w-[21cm]">
              <!-- Resume Header -->
              <div class="border-b-2 border-slate-900 pb-6 mb-8">
                <h1 class="text-4xl font-bold text-slate-900 mb-2">{{ generatedResume.name }}</h1>
                <div class="flex flex-wrap gap-4 text-sm text-slate-600 font-medium">
                  <span>📍 北京</span>
                  <span>📧 candidate@example.com</span>
                  <span>📱 138-0000-0000</span>
                </div>
              </div>

              <!-- Summary -->
              <div class="mb-8">
                <h2 class="text-lg font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span class="w-2 h-8 bg-blue-600 rounded-full"></span>
                  个人简介
                </h2>
                <p class="text-slate-600 leading-relaxed">
                  {{ generatedResume.summary }}
                </p>
              </div>

              <!-- Experience -->
              <div class="mb-8">
                <h2 class="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                   <span class="w-2 h-8 bg-blue-600 rounded-full"></span>
                   工作经历
                </h2>
                <div class="space-y-4">
                  <div class="relative pl-6 border-l-2 border-slate-200">
                    <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-600"></div>
                    <div class="flex justify-between items-baseline mb-1">
                      <h3 class="font-bold text-slate-900">高级软件工程师</h3>
                      <span class="text-sm text-slate-500 font-medium">2020 - 至今</span>
                    </div>
                    <p class="text-blue-600 font-medium text-sm mb-2">某知名科技公司</p>
                    <ul class="list-disc list-inside text-slate-600 space-y-1">
                      <li v-for="(item, idx) in generatedResume.experience" :key="idx">{{ item }}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Education -->
               <div class="mb-8">
                <h2 class="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                   <span class="w-2 h-8 bg-blue-600 rounded-full"></span>
                   教育背景
                </h2>
                <div class="space-y-4">
                    <div v-for="(edu, idx) in generatedResume.education" :key="idx" class="flex justify-between">
                         <span class="text-slate-700 font-medium">{{ edu }}</span>
                    </div>
                </div>
               </div>

                <!-- Skills -->
               <div>
                <h2 class="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                   <span class="w-2 h-8 bg-blue-600 rounded-full"></span>
                   技能专长
                </h2>
                <div class="flex flex-wrap gap-2">
                    <span v-for="skill in generatedResume.skills" :key="skill" class="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold">
                        {{ skill }}
                    </span>
                </div>
               </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}
</style>
