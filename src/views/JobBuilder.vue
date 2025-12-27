<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { ElMessage } from 'element-plus';
import type { Job } from '../types';

const router = useRouter();
const authStore = useAuthStore();

// 当前步骤
const currentStep = ref(1);

// 原始岗位描述文本
const rawJobText = ref('');

// 解析后的岗位数据
const parsedJob = ref<Job>({
  id: 0,
  title: '',
  company: '',
  salary: '',
  location: '',
  requirements: {
    experience: '',
    education: ''
  },
  tags: [],
  description: '',
  responsibilities: [],
  qualifications: []
});

// 模板选择
const selectedTemplate = ref(1);

// AI解析岗位描述
const parseJob = () => {
  if (!rawJobText.value.trim()) {
    ElMessage.error('请输入岗位描述内容');
    return;
  }

  // 模拟AI解析（实际应调用AI API）
  const text = rawJobText.value;
  
  // 简单的解析逻辑（示例）
  parsedJob.value = {
    id: Date.now(),
    title: '高级自动驾驶算法工程师',
    company: authStore.user?.type === 'company' ? authStore.user.companyName : '示例科技公司',
    salary: '40-70K·16薪',
    location: '上海·浦东新区',
    requirements: {
      experience: '3-5年',
      education: '本科及以上'
    },
    tags: ['L4', '自动驾驶', '感知算法', 'Python', 'C++'],
    description: text.substring(0, Math.min(300, text.length)) + '...',
    responsibilities: [
      '负责自动驾驶感知算法的研发和优化',
      '设计并实现高性能的目标检测和跟踪算法',
      '与团队协作完成算法的工程化部署',
      '持续跟踪学术界和工业界的最新技术进展'
    ],
    qualifications: [
      '计算机、自动化等相关专业本科及以上学历',
      '3年以上计算机视觉或深度学习相关工作经验',
      '精通Python/C++，熟悉TensorFlow/PyTorch等深度学习框架',
      '有自动驾驶或机器人相关项目经验者优先',
      '优秀的问题分析和解决能力，良好的团队协作精神'
    ]
  };

  currentStep.value = 2;
  ElMessage.success('岗位解析成功！');
};

// 保存岗位
const saveJob = () => {
  ElMessage.success('岗位已保存！');
  router.push('/jobs');
};

// 发布岗位
const publishJob = () => {
  ElMessage.success('岗位已发布！');
  router.push('/jobs');
};

// 添加职责
const addResponsibility = () => {
  parsedJob.value.responsibilities.push('');
};

// 删除职责
const removeResponsibility = (index: number) => {
  parsedJob.value.responsibilities.splice(index, 1);
};

// 添加要求
const addQualification = () => {
  parsedJob.value.qualifications.push('');
};

// 删除要求
const removeQualification = (index: number) => {
  parsedJob.value.qualifications.splice(index, 1);
};

// 添加标签
const newTag = ref('');
const addTag = () => {
  if (newTag.value.trim() && !parsedJob.value.tags.includes(newTag.value.trim())) {
    parsedJob.value.tags.push(newTag.value.trim());
    newTag.value = '';
  }
};

// 删除标签
const removeTag = (index: number) => {
  parsedJob.value.tags.splice(index, 1);
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- 标题 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-black text-slate-900 mb-4">
          🚀 智能岗位生成器
        </h1>
        <p class="text-xl text-slate-600">
          复制粘贴岗位描述，AI自动生成精美岗位展示
        </p>
      </div>

      <!-- 步骤指示器 -->
      <div class="flex items-center justify-center mb-12">
        <div class="flex items-center space-x-4">
          <div :class="['flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all', currentStep >= 1 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 'bg-slate-200 text-slate-500']">
            1
          </div>
          <div :class="['w-24 h-1 transition-all', currentStep >= 2 ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-slate-200']"></div>
          <div :class="['flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all', currentStep >= 2 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 'bg-slate-200 text-slate-500']">
            2
          </div>
          <div :class="['w-24 h-1 transition-all', currentStep >= 3 ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-slate-200']"></div>
          <div :class="['flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all', currentStep >= 3 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 'bg-slate-200 text-slate-500']">
            3
          </div>
        </div>
      </div>

      <!-- 步骤1: 输入原始岗位描述 -->
      <div v-if="currentStep === 1" class="bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <h2 class="text-3xl font-bold text-slate-900 mb-6">📝 粘贴岗位描述</h2>
        <p class="text-slate-600 mb-6">支持从任何文本格式复制岗位信息</p>
        
        <textarea
          v-model="rawJobText"
          rows="20"
          class="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-mono text-sm"
          placeholder="请在此粘贴岗位描述内容...

示例格式：
职位：高级自动驾驶算法工程师
薪资：40-70K·16薪
地点：上海·浦东新区
经验要求：3-5年
学历要求：本科及以上

岗位职责：
1. 负责自动驾驶感知算法的研发和优化
2. 设计并实现高性能的目标检测和跟踪算法
3. 与团队协作完成算法的工程化部署

任职要求：
1. 计算机、自动化等相关专业本科及以上学历
2. 3年以上计算机视觉或深度学习相关工作经验
3. 精通Python/C++，熟悉深度学习框架

标签：L4, 自动驾驶, 感知算法, Python, C++
"
        ></textarea>

        <div class="flex justify-end mt-8">
          <button
            @click="parseJob"
            class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            🚀 AI智能解析
          </button>
        </div>
      </div>

      <!-- 步骤2: 编辑和预览 -->
      <div v-if="currentStep === 2" class="space-y-8">
        <!-- 模板选择 -->
        <div class="bg-white rounded-3xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-slate-900 mb-6">🎨 选择展示模板</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              v-for="template in [1, 2, 3]" 
              :key="template"
              @click="selectedTemplate = template"
              :class="['cursor-pointer border-4 rounded-2xl p-6 transition-all hover:shadow-lg', selectedTemplate === template ? 'border-purple-600 shadow-lg' : 'border-slate-200']"
            >
              <div class="aspect-[1/1.4] bg-gradient-to-br from-slate-100 to-purple-50 rounded-xl flex items-center justify-center">
                <span class="text-4xl">💼</span>
              </div>
              <p class="text-center mt-4 font-bold text-slate-900">模板 {{ template }}</p>
            </div>
          </div>
        </div>

        <!-- 岗位编辑 -->
        <div class="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 class="text-2xl font-bold text-slate-900 mb-8">✏️ 编辑岗位信息</h2>
          
          <!-- 基本信息 -->
          <div class="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
            <h3 class="text-xl font-bold text-slate-900 mb-4">📋 基本信息</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">职位名称</label>
                <input 
                  v-model="parsedJob.title"
                  type="text"
                  class="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="如：高级算法工程师"
                />
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">公司名称</label>
                <input 
                  v-model="parsedJob.company"
                  type="text"
                  class="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">薪资范围</label>
                <input 
                  v-model="parsedJob.salary"
                  type="text"
                  class="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="如：40-70K·16薪"
                />
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">工作地点</label>
                <input 
                  v-model="parsedJob.location"
                  type="text"
                  class="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="如：上海·浦东新区"
                />
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">经验要求</label>
                <input 
                  v-model="parsedJob.requirements.experience"
                  type="text"
                  class="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="如：3-5年"
                />
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">学历要求</label>
                <input 
                  v-model="parsedJob.requirements.education"
                  type="text"
                  class="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="如：本科及以上"
                />
              </div>
            </div>
          </div>

          <!-- 岗位描述 -->
          <div class="mb-8">
            <h3 class="text-xl font-bold text-slate-900 mb-4">📄 岗位描述</h3>
            <textarea
              v-model="parsedJob.description"
              rows="4"
              class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
              placeholder="简要描述该岗位..."
            ></textarea>
          </div>

          <!-- 岗位职责 -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-slate-900">💼 岗位职责</h3>
              <button 
                @click="addResponsibility"
                class="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-bold hover:bg-purple-200 transition-all"
              >
                + 添加职责
              </button>
            </div>
            <div v-for="(_, index) in parsedJob.responsibilities" :key="index" class="mb-3 flex gap-2">
              <input 
                v-model="parsedJob.responsibilities[index]"
                type="text"
                class="flex-1 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                :placeholder="`职责 ${index + 1}`"
              />
              <button 
                @click="removeResponsibility(index)"
                class="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all"
              >
                删除
              </button>
            </div>
          </div>

          <!-- 任职要求 -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-slate-900">✅ 任职要求</h3>
              <button 
                @click="addQualification"
                class="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-bold hover:bg-purple-200 transition-all"
              >
                + 添加要求
              </button>
            </div>
            <div v-for="(_, index) in parsedJob.qualifications" :key="index" class="mb-3 flex gap-2">
              <input 
                v-model="parsedJob.qualifications[index]"
                type="text"
                class="flex-1 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                :placeholder="`要求 ${index + 1}`"
              />
              <button 
                @click="removeQualification(index)"
                class="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all"
              >
                删除
              </button>
            </div>
          </div>

          <!-- 标签 -->
          <div class="mb-8">
            <h3 class="text-xl font-bold text-slate-900 mb-4">🏷️ 岗位标签</h3>
            <div class="flex flex-wrap gap-2 mb-4">
              <span 
                v-for="(tag, index) in parsedJob.tags" 
                :key="index" 
                class="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold flex items-center gap-2 group"
              >
                {{ tag }}
                <button @click="removeTag(index)" class="text-purple-500 hover:text-purple-700">×</button>
              </span>
            </div>
            <div class="flex gap-2">
              <input 
                v-model="newTag"
                @keyup.enter="addTag"
                type="text"
                class="flex-1 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                placeholder="输入标签后按回车添加"
              />
              <button 
                @click="addTag"
                class="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all"
              >
                添加
              </button>
            </div>
          </div>

          <div class="flex justify-between mt-8">
            <button
              @click="currentStep = 1"
              class="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-all"
            >
              ← 返回
            </button>
            <div class="space-x-4">
              <button
                @click="saveJob"
                class="px-6 py-3 bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
              >
                💾 保存草稿
              </button>
              <button
                @click="publishJob"
                class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                🚀 发布岗位
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
