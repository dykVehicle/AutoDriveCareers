<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { loadFromStorage, saveToStorage } from '../services/storage';
import type { ResumeDoc } from '../services/resume';
import { exportResumeToPDF, exportResumeToWord } from '../services/export';

const auth = useAuthStore();
const router = useRouter();

// 个人信息
const userInfo = computed(() => auth.user);

// 简历信息
const savedResume = ref<ResumeDoc | null>(null);
const hasResume = computed(() => savedResume.value !== null);

// 收藏的职位
interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  savedAt: number;
}

const savedJobs = ref<SavedJob[]>([]);

// 加载数据
onMounted(() => {
  if (!auth.isAuthed || auth.role !== 'candidate') {
    router.push('/auth/candidate');
    return;
  }

  // 加载保存的简历
  const resumeKey = `resume_${auth.user?.id}`;
  savedResume.value = loadFromStorage<ResumeDoc | null>(resumeKey, null);

  // 加载收藏的职位
  const jobsKey = `saved_jobs_${auth.user?.id}`;
  savedJobs.value = loadFromStorage<SavedJob[]>(jobsKey, []);
});

// 导出简历
const exportPDF = async () => {
  if (!savedResume.value) {
    ElMessage.warning('您还没有保存简历');
    return;
  }
  try {
    await exportResumeToPDF(savedResume.value);
    ElMessage.success('PDF 导出成功');
  } catch (error) {
    ElMessage.error('PDF 导出失败');
  }
};

const exportWord = async () => {
  if (!savedResume.value) {
    ElMessage.warning('您还没有保存简历');
    return;
  }
  try {
    await exportResumeToWord(savedResume.value);
    ElMessage.success('Word 文档导出成功');
  } catch (error) {
    ElMessage.error('Word 导出失败');
  }
};

// 取消收藏职位
const unsaveJob = (jobId: string) => {
  savedJobs.value = savedJobs.value.filter(j => j.id !== jobId);
  const jobsKey = `saved_jobs_${auth.user?.id}`;
  saveToStorage(jobsKey, savedJobs.value);
  ElMessage.success('已取消收藏');
};

// 查看职位详情
const viewJob = (jobId: string) => {
  router.push(`/jobs/${jobId}`);
};

// 跳转到简历生成器
const goToResumeBuilder = () => {
  router.push('/resume-builder');
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="mb-12">
        <h1 class="text-5xl font-black text-slate-900 mb-4">
          个人中心
        </h1>
        <p class="text-xl text-slate-600 font-medium">
          管理您的简历和收藏的职位
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 左侧：个人信息 -->
        <div class="lg:col-span-1 space-y-6">
          <!-- 个人信息卡片 -->
          <div class="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <div class="text-center">
              <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-blue-600/30">
                {{ (userInfo?.displayName || userInfo?.email || '用户').charAt(0).toUpperCase() }}
              </div>
              <h2 class="text-2xl font-black text-slate-900 mb-2">
                {{ userInfo?.displayName || '候选人' }}
              </h2>
              <p class="text-slate-600 font-medium mb-6">
                {{ userInfo?.email || userInfo?.phone }}
              </p>
              <div class="space-y-3">
                <div class="px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                  <div class="text-xs font-bold text-slate-600 mb-1">账户类型</div>
                  <div class="text-sm font-bold text-blue-700">候选人账户</div>
                </div>
                <div class="px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                  <div class="text-xs font-bold text-slate-600 mb-1">注册时间</div>
                  <div class="text-sm font-bold text-purple-700">
                    {{ userInfo ? new Date(userInfo.createdAt || 0).toLocaleDateString('zh-CN') : '--' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 快捷操作 -->
          <div class="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
            <h3 class="text-lg font-black text-slate-900 mb-4">快捷操作</h3>
            <div class="space-y-3">
              <button
                @click="goToResumeBuilder"
                class="w-full px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                ✨ 制作简历
              </button>
              <button
                @click="$router.push('/jobs')"
                class="w-full px-5 py-3 bg-gradient-to-r from-slate-100 to-blue-50 text-slate-700 rounded-xl font-bold text-sm border-2 border-slate-200 hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-300"
              >
                💼 浏览职位
              </button>
            </div>
          </div>
        </div>

        <!-- 右侧：简历和收藏 -->
        <div class="lg:col-span-2 space-y-8">
          <!-- 我的简历 -->
          <div class="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-black text-slate-900">我的简历</h2>
              <div class="flex gap-3">
                <button
                  v-if="hasResume"
                  @click="exportPDF"
                  class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  📄 导出 PDF
                </button>
                <button
                  v-if="hasResume"
                  @click="exportWord"
                  class="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-purple-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  📝 导出 Word
                </button>
              </div>
            </div>

            <div v-if="hasResume" class="space-y-6">
              <!-- 基本信息 -->
              <div class="p-6 rounded-2xl border-2 border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                <h3 class="text-lg font-black text-slate-900 mb-3">
                  {{ savedResume?.basics.name || '候选人' }}
                </h3>
                <div class="space-y-2 text-sm text-slate-600 font-medium">
                  <div v-if="savedResume?.basics.title">
                    <span class="font-bold text-slate-700">职位期望：</span>
                    {{ savedResume.basics.title }}
                  </div>
                  <div v-if="savedResume?.basics.email">
                    <span class="font-bold text-slate-700">邮箱：</span>
                    {{ savedResume.basics.email }}
                  </div>
                  <div v-if="savedResume?.basics.phone">
                    <span class="font-bold text-slate-700">电话：</span>
                    {{ savedResume.basics.phone }}
                  </div>
                  <div v-if="savedResume?.basics.city">
                    <span class="font-bold text-slate-700">城市：</span>
                    {{ savedResume.basics.city }}
                  </div>
                </div>
              </div>

              <!-- 技能 -->
              <div v-if="savedResume?.skills.length">
                <h4 class="text-md font-black text-slate-900 mb-3">核心技能</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(skill, idx) in savedResume.skills.slice(0, 10)"
                    :key="idx"
                    class="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-blue-700"
                  >
                    {{ skill }}
                  </span>
                  <span
                    v-if="savedResume.skills.length > 10"
                    class="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500"
                  >
                    +{{ savedResume.skills.length - 10 }} 更多
                  </span>
                </div>
              </div>

              <button
                @click="goToResumeBuilder"
                class="w-full px-5 py-3 bg-gradient-to-r from-slate-100 to-blue-50 text-slate-700 rounded-xl font-bold text-sm border-2 border-slate-200 hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-300"
              >
                📝 编辑简历
              </button>
            </div>

            <div v-else class="text-center py-16">
              <div class="text-7xl mb-6">📄</div>
              <h3 class="text-2xl font-black text-slate-900 mb-3">还没有简历</h3>
              <p class="text-slate-600 mb-6">使用简历生成器快速创建一份精美简历</p>
              <button
                @click="goToResumeBuilder"
                class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                立即创建简历
              </button>
            </div>
          </div>

          <!-- 收藏的职位 -->
          <div class="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-black text-slate-900">收藏的职位</h2>
              <span class="px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-bold">
                {{ savedJobs.length }} 个职位
              </span>
            </div>

            <div v-if="savedJobs.length > 0" class="space-y-4">
              <div
                v-for="job in savedJobs"
                :key="job.id"
                class="p-6 rounded-2xl border-2 border-slate-200 hover:border-blue-300 bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <h3 class="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {{ job.title }}
                    </h3>
                    <div class="space-y-1 text-sm text-slate-600 font-medium">
                      <div>🏢 {{ job.company }}</div>
                      <div>📍 {{ job.location }}</div>
                      <div>💰 {{ job.salary }}</div>
                      <div class="text-xs text-slate-400">
                        收藏于 {{ new Date(job.savedAt).toLocaleDateString('zh-CN') }}
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <button
                      @click="viewJob(job.id)"
                      class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                    >
                      查看详情
                    </button>
                    <button
                      @click="unsaveJob(job.id)"
                      class="px-4 py-2 bg-gradient-to-r from-slate-100 to-red-50 text-red-600 rounded-xl font-bold text-xs border border-red-200 hover:border-red-300 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      取消收藏
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-16">
              <div class="text-7xl mb-6">⭐</div>
              <h3 class="text-2xl font-black text-slate-900 mb-3">还没有收藏职位</h3>
              <p class="text-slate-600 mb-6">浏览职位列表，收藏感兴趣的工作机会</p>
              <button
                @click="$router.push('/jobs')"
                class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                浏览职位
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
