<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { ElMessage } from 'element-plus';
import type { Resume } from '../types';

const router = useRouter();
const authStore = useAuthStore();

// 当前步骤
const currentStep = ref(1);

// 原始简历文本
const rawResumeText = ref('');

// 解析后的简历数据
const parsedResume = ref<Resume>({
  id: '',
  name: '',
  title: '',
  contact: {
    email: '',
    phone: '',
    location: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: []
});

// 模板选择
const selectedTemplate = ref(1);

// AI解析简历文本
const parseResume = () => {
  if (!rawResumeText.value.trim()) {
    ElMessage.error('请输入简历内容');
    return;
  }

  // 模拟AI解析（实际应调用AI API）
  const text = rawResumeText.value;
  
  // 简单的解析逻辑（示例）
  parsedResume.value = {
    id: 'resume_' + Date.now(),
    name: authStore.user?.type === 'candidate' ? authStore.user.name : '张三',
    title: '高级自动驾驶算法工程师',
    contact: {
      email: authStore.user?.email || 'zhangsan@email.com',
      phone: authStore.user?.phone || '13800138000',
      location: '上海市'
    },
    summary: text.substring(0, Math.min(200, text.length)) + '...',
    experience: [
      {
        id: '1',
        company: '某知名自动驾驶公司',
        position: '高级算法工程师',
        startDate: '2020-06',
        endDate: '至今',
        description: '负责自动驾驶感知算法开发',
        achievements: [
          '领导开发了新一代目标检测算法，准确率提升15%',
          '优化模型推理速度，降低延迟30%'
        ]
      }
    ],
    education: [
      {
        id: '1',
        school: '清华大学',
        degree: '硕士',
        major: '计算机科学与技术',
        startDate: '2018-09',
        endDate: '2020-06'
      }
    ],
    skills: ['Python', 'C++', 'TensorFlow', 'PyTorch', 'ROS', '计算机视觉', '深度学习'],
    projects: [
      {
        id: '1',
        name: '自动驾驶感知系统',
        description: '开发了一套完整的自动驾驶感知系统',
        role: '核心开发者',
        technologies: ['Python', 'TensorFlow', 'OpenCV']
      }
    ]
  };

  currentStep.value = 2;
  ElMessage.success('简历解析成功！');
};

// 保存简历
const saveResume = () => {
  ElMessage.success('简历已保存！');
  if (authStore.user && authStore.user.type === 'candidate') {
    authStore.updateUser({
      ...authStore.user,
      resume: parsedResume.value
    });
  }
  router.push('/');
};

// 下载简历为PDF
const downloadPDF = () => {
  ElMessage.info('PDF下载功能开发中...');
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- 标题 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-black text-slate-900 mb-4">
          ✨ 智能简历生成器
        </h1>
        <p class="text-xl text-slate-600">
          复制粘贴您的简历内容，AI自动生成精美简历
        </p>
      </div>

      <!-- 步骤指示器 -->
      <div class="flex items-center justify-center mb-12">
        <div class="flex items-center space-x-4">
          <div :class="['flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all', currentStep >= 1 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'bg-slate-200 text-slate-500']">
            1
          </div>
          <div :class="['w-24 h-1 transition-all', currentStep >= 2 ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-slate-200']"></div>
          <div :class="['flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all', currentStep >= 2 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'bg-slate-200 text-slate-500']">
            2
          </div>
          <div :class="['w-24 h-1 transition-all', currentStep >= 3 ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-slate-200']"></div>
          <div :class="['flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all', currentStep >= 3 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'bg-slate-200 text-slate-500']">
            3
          </div>
        </div>
      </div>

      <!-- 步骤1: 输入原始简历 -->
      <div v-if="currentStep === 1" class="bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <h2 class="text-3xl font-bold text-slate-900 mb-6">📝 粘贴您的简历内容</h2>
        <p class="text-slate-600 mb-6">支持从Word、PDF或任何文本格式复制内容</p>
        
        <textarea
          v-model="rawResumeText"
          rows="20"
          class="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm"
          placeholder="请在此粘贴您的简历内容...

示例格式：
姓名：张三
邮箱：zhangsan@email.com
电话：13800138000

工作经历：
2020.06 - 至今  某自动驾驶公司  高级算法工程师
- 负责感知算法开发
- 提升模型准确率15%

教育背景：
2018.09 - 2020.06  清华大学  计算机科学与技术  硕士

技能：Python, C++, TensorFlow, PyTorch, 计算机视觉
"
        ></textarea>

        <div class="flex justify-end mt-8">
          <button
            @click="parseResume"
            class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            🚀 AI智能解析
          </button>
        </div>
      </div>

      <!-- 步骤2: 编辑和预览 -->
      <div v-if="currentStep === 2" class="space-y-8">
        <!-- 模板选择 -->
        <div class="bg-white rounded-3xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-slate-900 mb-6">🎨 选择简历模板</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              v-for="template in [1, 2, 3]" 
              :key="template"
              @click="selectedTemplate = template"
              :class="['cursor-pointer border-4 rounded-2xl p-6 transition-all hover:shadow-lg', selectedTemplate === template ? 'border-blue-600 shadow-lg' : 'border-slate-200']"
            >
              <div class="aspect-[1/1.4] bg-gradient-to-br from-slate-100 to-blue-50 rounded-xl flex items-center justify-center">
                <span class="text-4xl">📄</span>
              </div>
              <p class="text-center mt-4 font-bold text-slate-900">模板 {{ template }}</p>
            </div>
          </div>
        </div>

        <!-- 简历预览和编辑 -->
        <div class="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 class="text-2xl font-bold text-slate-900 mb-8">✏️ 编辑简历内容</h2>
          
          <!-- 基本信息 -->
          <div class="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">姓名</label>
                <input 
                  v-model="parsedResume.name"
                  type="text"
                  class="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">职位</label>
                <input 
                  v-model="parsedResume.title"
                  type="text"
                  class="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">邮箱</label>
                <input 
                  v-model="parsedResume.contact.email"
                  type="email"
                  class="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">电话</label>
                <input 
                  v-model="parsedResume.contact.phone"
                  type="tel"
                  class="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          <!-- 个人简介 -->
          <div class="mb-8">
            <h3 class="text-xl font-bold text-slate-900 mb-4">📋 个人简介</h3>
            <textarea
              v-model="parsedResume.summary"
              rows="4"
              class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
            ></textarea>
          </div>

          <!-- 工作经历 -->
          <div class="mb-8">
            <h3 class="text-xl font-bold text-slate-900 mb-4">💼 工作经历</h3>
            <div v-for="(exp, _) in parsedResume.experience" :key="exp.id" class="mb-4 p-4 bg-slate-50 rounded-xl">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <input v-model="exp.company" placeholder="公司名称" class="px-3 py-2 bg-white border-2 border-slate-200 rounded-lg" />
                <input v-model="exp.position" placeholder="职位" class="px-3 py-2 bg-white border-2 border-slate-200 rounded-lg" />
                <input v-model="exp.startDate" placeholder="开始日期" class="px-3 py-2 bg-white border-2 border-slate-200 rounded-lg" />
                <input v-model="exp.endDate" placeholder="结束日期" class="px-3 py-2 bg-white border-2 border-slate-200 rounded-lg" />
              </div>
              <textarea v-model="exp.description" rows="2" placeholder="工作描述" class="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-lg mb-2"></textarea>
              <div v-for="(_, aIndex) in exp.achievements" :key="aIndex" class="mb-2">
                <input v-model="exp.achievements[aIndex]" placeholder="成就" class="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-lg" />
              </div>
            </div>
          </div>

          <!-- 教育背景 -->
          <div class="mb-8">
            <h3 class="text-xl font-bold text-slate-900 mb-4">🎓 教育背景</h3>
            <div v-for="edu in parsedResume.education" :key="edu.id" class="mb-4 p-4 bg-slate-50 rounded-xl">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input v-model="edu.school" placeholder="学校" class="px-3 py-2 bg-white border-2 border-slate-200 rounded-lg" />
                <input v-model="edu.degree" placeholder="学位" class="px-3 py-2 bg-white border-2 border-slate-200 rounded-lg" />
                <input v-model="edu.major" placeholder="专业" class="px-3 py-2 bg-white border-2 border-slate-200 rounded-lg" />
                <input v-model="edu.startDate" placeholder="入学时间" class="px-3 py-2 bg-white border-2 border-slate-200 rounded-lg" />
              </div>
            </div>
          </div>

          <!-- 技能 -->
          <div class="mb-8">
            <h3 class="text-xl font-bold text-slate-900 mb-4">🔧 专业技能</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="(skill, _) in parsedResume.skills" :key="_" class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">
                {{ skill }}
              </span>
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
                @click="downloadPDF"
                class="px-6 py-3 bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
              >
                📥 下载PDF
              </button>
              <button
                @click="saveResume"
                class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                💾 保存简历
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
