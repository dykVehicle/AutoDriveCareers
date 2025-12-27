<script setup lang="ts">
import { ref } from 'vue';
import { Download, MagicStick, Suitcase } from '@element-plus/icons-vue';

const rawJob = ref('');
const isGenerating = ref(false);
const generatedJob = ref<null | {
  title: string;
  department: string;
  salary: string;
  description: string[];
  requirements: string[];
  benefits: string[];
}>(null);

const generateJob = () => {
  if (!rawJob.value) return;
  isGenerating.value = true;
  
  setTimeout(() => {
    // Mock Logic
    const lines = rawJob.value.split('\n').filter(l => l.trim());
    const title = lines[0] || '高级算法工程师';
    
    generatedJob.value = {
      title: title,
      department: '自动驾驶研发部',
      salary: '40k - 70k · 16薪',
      description: [
        '负责自动驾驶感知/规划/控制核心算法的研发',
        '参与实车路测与数据分析，持续优化算法性能',
        '探索前沿技术，保持技术领先优势'
      ],
      requirements: [
        '计算机、自动化或相关专业硕士及以上学历',
        '熟练掌握 C++/Python，有扎实的编程基础',
        '有深度学习/机器学习相关项目经验优先'
      ],
      benefits: ['股票期权', '弹性工作', '免费三餐', '高端体检', '技术大牛带队']
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
          智能JD生成器 <span class="text-purple-600">AI</span>
        </h1>
        <p class="text-xl text-slate-600 max-w-2xl mx-auto">
          输入简单的岗位要求，AI 将自动为您生成极具吸引力的职位描述页面。
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-300px)] min-h-[600px]">
        <!-- Input Area -->
        <div class="flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div class="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 class="font-bold text-slate-700">岗位原始信息</h3>
            <span class="text-xs font-medium px-3 py-1 bg-purple-100 text-purple-700 rounded-full">输入</span>
          </div>
          <textarea
            v-model="rawJob"
            class="flex-1 p-6 resize-none focus:outline-none text-slate-600 leading-relaxed text-lg"
            placeholder="在此输入岗位信息...&#10;&#10;例如：&#10;招聘算法工程师&#10;要求熟悉 Python&#10;负责自动驾驶业务..."
          ></textarea>
          <div class="p-6 border-t border-slate-100 bg-slate-50">
            <button
              @click="generateJob"
              :disabled="!rawJob || isGenerating"
              class="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <el-icon :class="{'animate-spin': isGenerating}"><MagicStick /></el-icon>
              {{ isGenerating ? '正在生成中...' : '生成精美职位展示' }}
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
          
          <div class="flex-1 p-0 overflow-y-auto bg-slate-50 custom-scrollbar relative">
             <!-- Background decoration -->
             <div class="absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-slate-900 to-purple-900 z-0"></div>

            <div v-if="!generatedJob" class="h-full flex flex-col items-center justify-center text-slate-400 relative z-10">
              <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <el-icon :size="40"><Suitcase /></el-icon>
              </div>
              <p>在左侧输入内容并点击生成</p>
            </div>

            <div v-else class="relative z-10 px-8 pt-12 pb-8">
              <!-- Job Header Card -->
              <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h1 class="text-3xl font-black text-slate-900 mb-2">{{ generatedJob.title }}</h1>
                        <p class="text-slate-500 font-medium flex items-center gap-2">
                            <el-icon><Suitcase /></el-icon> {{ generatedJob.department }}
                        </p>
                    </div>
                    <div class="text-right">
                        <p class="text-2xl font-black text-blue-600">{{ generatedJob.salary }}</p>
                    </div>
                </div>
                <div class="flex gap-2 mt-4">
                    <span v-for="tag in generatedJob.benefits.slice(0, 3)" :key="tag" class="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-bold border border-purple-100">
                        {{ tag }}
                    </span>
                </div>
              </div>

              <!-- Content -->
              <div class="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                  <!-- Description -->
                  <div>
                    <h3 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span class="w-1.5 h-6 bg-purple-600 rounded-full"></span>
                        职位描述
                    </h3>
                    <ul class="space-y-3">
                        <li v-for="(item, idx) in generatedJob.description" :key="idx" class="flex gap-3 text-slate-600 leading-relaxed">
                            <span class="text-purple-600 font-bold">•</span>
                            {{ item }}
                        </li>
                    </ul>
                  </div>

                  <!-- Requirements -->
                  <div>
                    <h3 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span class="w-1.5 h-6 bg-purple-600 rounded-full"></span>
                        任职要求
                    </h3>
                    <ul class="space-y-3">
                        <li v-for="(item, idx) in generatedJob.requirements" :key="idx" class="flex gap-3 text-slate-600 leading-relaxed">
                            <span class="text-purple-600 font-bold">•</span>
                            {{ item }}
                        </li>
                    </ul>
                  </div>

                   <div class="pt-6 border-t border-slate-100">
                        <button class="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/20">
                            立即申请职位
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
