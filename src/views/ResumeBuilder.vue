<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { useAuthStore } from '../stores/auth';
import { copyText } from '../services/clipboard';
import { parseResumeText, resumeToMarkdown, type ResumeDoc } from '../services/resume';

const auth = useAuthStore();

const rawText = ref('');
const theme = ref<'modern' | 'gradient'>('gradient');
const parsed = ref<ResumeDoc | null>(null);

const example = `姓名：张三
现居地：上海
邮箱：zhangsan@example.com
手机号：13800000000
求职意向：自动驾驶感知算法工程师

个人简介
- 3年自动驾驶视觉感知经验，熟悉2D/3D检测、分割、跟踪
- 负责模型端到端训练、TensorRT部署与性能优化
- 关注数据闭环与长尾问题，推动指标提升与落地

技能
Python, C++, PyTorch, CUDA, TensorRT, OpenCV, Linux, Git, 目标检测, BEV, 多目标跟踪

工作经历
2022.07-至今  AutoDrive Tech | 视觉感知算法工程师
- 负责车端视觉检测模型迭代，mAP +5.2
- 将推理延迟从 28ms 降至 16ms（TensorRT + INT8）
- 构建数据挖掘与困难样本回流，减少长尾误检

项目经历
2023.03-2023.10  城市场景 BEV 感知
- 设计 BEV 特征融合结构，提升遮挡场景召回
- 训练策略：蒸馏 + EMA + 多尺度增强

教育经历
2018-2022  XX大学 | 计算机科学与技术 | 本科
`;

const generate = () => {
  if (!rawText.value.trim()) {
    ElMessage.warning('请先粘贴简历文字');
    return;
  }
  parsed.value = parseResumeText(rawText.value);
  ElMessage.success('已生成精美简历预览');
};

const fillExample = () => {
  rawText.value = example;
  ElMessage.success('已填入示例简历');
};

const md = computed(() => (parsed.value ? resumeToMarkdown(parsed.value) : ''));

const copyMd = async () => {
  if (!parsed.value) return ElMessage.warning('请先生成简历');
  await copyText(md.value);
  ElMessage.success('已复制 Markdown 简历');
};

const printResume = () => {
  if (!parsed.value) return ElMessage.warning('请先生成简历');
  window.print();
};

const headerTitle = computed(() => {
  const b = parsed.value?.basics;
  return b?.name ? `${b.name} · 简历` : '简历预览';
});

onMounted(() => {
  if (!auth.isAuthed || auth.role !== 'candidate') return;
  // nice default
  rawText.value = '';
});

watch(rawText, () => {
  // if user edits after generated, keep preview but do not auto-regenerate to avoid jitter
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left: input -->
        <div class="lg:w-2/5 space-y-6 no-print">
          <div class="bg-white rounded-3xl shadow-xl border border-slate-100 p-7">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-bold">
                  ✨ 精美简历生成器
                </div>
                <h1 class="text-3xl font-black text-slate-900 mt-4">粘贴 → 自动排版</h1>
                <p class="text-slate-600 mt-2">
                  把你原来的简历文字复制进来，我们会自动识别“技能/经历/项目/教育”等板块并生成精美模板。
                </p>
              </div>
            </div>

            <div class="mt-6 space-y-4">
              <div class="flex gap-3">
                <button class="btn btn-secondary flex-1" @click="fillExample">一键填入示例</button>
                <button class="btn btn-primary flex-1" @click="generate">生成预览</button>
              </div>

              <div class="flex gap-3">
                <button class="btn btn-secondary flex-1" @click="copyMd">复制 Markdown</button>
                <button class="btn btn-secondary flex-1" @click="printResume">打印 / 导出PDF</button>
              </div>

              <div class="flex items-center gap-3">
                <span class="text-sm font-bold text-slate-700">模板风格</span>
                <button
                  class="px-4 py-2 rounded-xl font-bold text-sm border-2 transition-all"
                  :class="theme === 'gradient' ? 'border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-600/30' : 'border-slate-200 text-slate-700 hover:border-blue-300'"
                  @click="theme = 'gradient'"
                >
                  科技渐变
                </button>
                <button
                  class="px-4 py-2 rounded-xl font-bold text-sm border-2 transition-all"
                  :class="theme === 'modern' ? 'border-transparent text-white bg-gradient-to-r from-slate-900 to-blue-900 shadow-lg shadow-slate-900/20' : 'border-slate-200 text-slate-700 hover:border-blue-300'"
                  @click="theme = 'modern'"
                >
                  极简现代
                </button>
              </div>

              <textarea
                v-model="rawText"
                class="w-full h-[420px] rounded-3xl border-2 border-slate-200 bg-slate-50 p-5 font-medium text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="把你的简历文字粘贴在这里（支持常见标题：个人简介/技能/工作经历/项目经历/教育经历/证书/奖项）"
              ></textarea>
              <p class="text-xs text-slate-500 leading-relaxed">
                温馨提示：当前版本为纯前端解析，适合快速生成展示版简历；如需更强的结构化与 PDF 导出，可后续对接后端/LLM。
              </p>
            </div>
          </div>
        </div>

        <!-- Right: preview -->
        <div class="lg:w-3/5">
          <div
            class="rounded-[2.5rem] shadow-2xl border overflow-hidden bg-white"
            :class="theme === 'gradient' ? 'border-blue-100' : 'border-slate-200'"
          >
            <div
              class="px-10 py-10"
              :class="theme === 'gradient' ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white' : 'bg-slate-900 text-white'"
            >
              <div class="flex items-start justify-between gap-6">
                <div>
                  <div class="text-4xl font-black tracking-tight">
                    {{ parsed?.basics.name || auth.user?.displayName || '候选人' }}
                  </div>
                  <div class="mt-2 text-white/80 font-bold">
                    {{ parsed?.basics.title || '候选人简历（自动生成）' }}
                    <span v-if="parsed?.basics.city"> · {{ parsed?.basics.city }}</span>
                  </div>
                </div>
                <div class="text-right text-sm font-semibold text-white/80 space-y-1">
                  <div v-if="parsed?.basics.email">{{ parsed?.basics.email }}</div>
                  <div v-if="parsed?.basics.phone">{{ parsed?.basics.phone }}</div>
                  <div v-if="parsed?.basics.links?.length" class="max-w-[260px] break-all">
                    {{ parsed?.basics.links?.[0] }}
                  </div>
                </div>
              </div>
            </div>

            <div class="px-10 py-10">
              <div v-if="!parsed" class="text-center py-24">
                <div class="text-7xl mb-4">📝</div>
                <div class="text-2xl font-black text-slate-900">还没有预览</div>
                <p class="text-slate-600 mt-2">左侧粘贴简历文字，然后点击“生成预览”。</p>
              </div>

              <div v-else class="space-y-10">
                <!-- Summary -->
                <div v-if="parsed.summary.length">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-2 h-10 rounded-full" :class="theme === 'gradient' ? 'bg-gradient-to-b from-blue-600 to-purple-600' : 'bg-blue-600'"></div>
                    <h2 class="text-xl font-black text-slate-900">个人简介</h2>
                  </div>
                  <ul class="space-y-3">
                    <li v-for="(s, i) in parsed.summary" :key="i" class="flex items-start gap-3">
                      <span class="w-2.5 h-2.5 mt-2 rounded-full" :class="theme === 'gradient' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-blue-600'"></span>
                      <span class="text-slate-700 font-medium leading-relaxed">{{ s }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Skills -->
                <div v-if="parsed.skills.length">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-2 h-10 rounded-full" :class="theme === 'gradient' ? 'bg-gradient-to-b from-purple-600 to-pink-600' : 'bg-purple-600'"></div>
                    <h2 class="text-xl font-black text-slate-900">技能</h2>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(sk, i) in parsed.skills"
                      :key="i"
                      class="px-4 py-2 rounded-2xl text-xs font-bold border"
                      :class="theme === 'gradient' ? 'bg-gradient-to-r from-slate-50 to-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-700'"
                    >
                      {{ sk }}
                    </span>
                  </div>
                </div>

                <!-- Experience -->
                <div v-if="parsed.experience.length">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-2 h-10 rounded-full" :class="theme === 'gradient' ? 'bg-gradient-to-b from-blue-600 to-cyan-500' : 'bg-cyan-600'"></div>
                    <h2 class="text-xl font-black text-slate-900">工作经历</h2>
                  </div>
                  <div class="space-y-6">
                    <div v-for="(e, idx) in parsed.experience" :key="idx" class="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
                      <div class="flex flex-wrap items-end justify-between gap-3">
                        <div class="text-lg font-black text-slate-900">{{ e.title || '经历' }}</div>
                        <div class="text-sm font-bold text-slate-600" v-if="e.time">{{ e.time }}</div>
                      </div>
                      <ul class="mt-4 space-y-2">
                        <li v-for="(b, i) in e.bullets" :key="i" class="flex items-start gap-3">
                          <span class="w-2 h-2 mt-2 rounded-full" :class="theme === 'gradient' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-slate-900'"></span>
                          <span class="text-slate-700 font-medium leading-relaxed">{{ b }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Projects -->
                <div v-if="parsed.projects.length">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-2 h-10 rounded-full" :class="theme === 'gradient' ? 'bg-gradient-to-b from-purple-600 to-pink-600' : 'bg-pink-600'"></div>
                    <h2 class="text-xl font-black text-slate-900">项目经历</h2>
                  </div>
                  <div class="space-y-6">
                    <div v-for="(p, idx) in parsed.projects" :key="idx" class="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
                      <div class="flex flex-wrap items-end justify-between gap-3">
                        <div class="text-lg font-black text-slate-900">{{ p.title || '项目' }}</div>
                        <div class="text-sm font-bold text-slate-600" v-if="p.time">{{ p.time }}</div>
                      </div>
                      <ul class="mt-4 space-y-2">
                        <li v-for="(b, i) in p.bullets" :key="i" class="flex items-start gap-3">
                          <span class="w-2 h-2 mt-2 rounded-full" :class="theme === 'gradient' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-slate-900'"></span>
                          <span class="text-slate-700 font-medium leading-relaxed">{{ b }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Education -->
                <div v-if="parsed.education.length">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-2 h-10 rounded-full" :class="theme === 'gradient' ? 'bg-gradient-to-b from-cyan-500 to-blue-600' : 'bg-blue-600'"></div>
                    <h2 class="text-xl font-black text-slate-900">教育经历</h2>
                  </div>
                  <div class="space-y-6">
                    <div v-for="(ed, idx) in parsed.education" :key="idx" class="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
                      <div class="flex flex-wrap items-end justify-between gap-3">
                        <div class="text-lg font-black text-slate-900">{{ ed.title || '教育' }}</div>
                        <div class="text-sm font-bold text-slate-600" v-if="ed.time">{{ ed.time }}</div>
                      </div>
                      <ul class="mt-4 space-y-2">
                        <li v-for="(b, i) in ed.bullets" :key="i" class="flex items-start gap-3">
                          <span class="w-2 h-2 mt-2 rounded-full" :class="theme === 'gradient' ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-slate-900'"></span>
                          <span class="text-slate-700 font-medium leading-relaxed">{{ b }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div v-if="parsed.certifications.length || parsed.awards.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div v-if="parsed.certifications.length" class="p-6 rounded-3xl border border-slate-200 bg-slate-50">
                    <div class="text-lg font-black text-slate-900 mb-3">证书</div>
                    <ul class="space-y-2">
                      <li v-for="(c, i) in parsed.certifications" :key="i" class="text-slate-700 font-medium">- {{ c }}</li>
                    </ul>
                  </div>
                  <div v-if="parsed.awards.length" class="p-6 rounded-3xl border border-slate-200 bg-slate-50">
                    <div class="text-lg font-black text-slate-900 mb-3">奖项</div>
                    <ul class="space-y-2">
                      <li v-for="(a, i) in parsed.awards" :key="i" class="text-slate-700 font-medium">- {{ a }}</li>
                    </ul>
                  </div>
                </div>

                <div class="pt-6 border-t border-slate-200 text-sm text-slate-500">
                  <span class="font-bold">生成说明：</span>该预览适合投递展示/链接分享；打印时将自动隐藏左侧编辑区。
                </div>
              </div>
            </div>
          </div>
          <div class="sr-only">{{ headerTitle }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

