<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useAuthStore } from '../stores/auth';
import { copyText } from '../services/clipboard';
import { parseJobText, jobToMarkdown, type JobPostDoc } from '../services/jobPost';

const auth = useAuthStore();

const rawText = ref('');
const theme = ref<'dark' | 'light'>('dark');
const parsed = ref<JobPostDoc | null>(null);

const example = `招聘：多传感器融合算法工程师
公司：AutoDrive Tech
地点：上海
薪资：40-70K

岗位介绍
我们致力于打造下一代 L4 自动驾驶系统，团队拥有丰富量产经验与数据闭环能力。

岗位职责
- 设计多传感器（Camera/LiDAR/Radar）融合框架与时空同步策略
- 研发多目标跟踪/融合定位/数据关联算法，提升复杂场景鲁棒性
- 与感知/规控/平台团队协作，推动指标提升与落地

任职要求
- 熟悉概率统计与矩阵理论，理解 Kalman/UKF/粒子滤波等方法
- 熟悉多目标跟踪（MHT/JPDA/Tracklet）或数据关联方法
- 熟悉 C++，具备良好的工程能力；有 ROS/CyberRT 经验加分

我们提供
- 16薪 + 年终奖 + 期权
- 弹性工作 + 高配开发环境
- 技术分享与论文/专利支持
`;

const generate = () => {
  if (!rawText.value.trim()) {
    ElMessage.warning('请先粘贴岗位描述（JD）');
    return;
  }
  parsed.value = parseJobText(rawText.value);
  // set company fallback from account
  if (!parsed.value.company) parsed.value.company = auth.user?.companyName;
  ElMessage.success('已生成精美岗位展示预览');
};

const fillExample = () => {
  rawText.value = example;
  ElMessage.success('已填入示例 JD');
};

const md = computed(() => (parsed.value ? jobToMarkdown(parsed.value) : ''));

const copyMd = async () => {
  if (!parsed.value) return ElMessage.warning('请先生成岗位展示');
  await copyText(md.value);
  ElMessage.success('已复制 Markdown JD');
};

const copyPreviewText = async () => {
  if (!parsed.value) return ElMessage.warning('请先生成岗位展示');
  const text = [
    parsed.value.title,
    [parsed.value.company, parsed.value.location, parsed.value.salary].filter(Boolean).join(' · '),
    '',
    '【岗位职责】',
    ...parsed.value.responsibilities.map((x) => `- ${x}`),
    '',
    '【任职要求】',
    ...parsed.value.requirements.map((x) => `- ${x}`),
    '',
    '【我们提供】',
    ...parsed.value.benefits.map((x) => `- ${x}`)
  ]
    .filter(Boolean)
    .join('\n');
  await copyText(text);
  ElMessage.success('已复制纯文本版本');
};

const printJob = () => {
  if (!parsed.value) return ElMessage.warning('请先生成岗位展示');
  window.print();
};

onMounted(() => {
  if (!auth.isAuthed || auth.role !== 'company') return;
  rawText.value = '';
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left: input -->
        <div class="lg:w-2/5 space-y-6 no-print">
          <div class="bg-white rounded-3xl shadow-xl border border-slate-100 p-7">
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-blue-100 text-slate-800 text-sm font-bold">
              🏢 精美岗位展示生成器
            </div>
            <h1 class="text-3xl font-black text-slate-900 mt-4">粘贴 JD → 自动成稿</h1>
            <p class="text-slate-600 mt-2">
              把企业岗位描述直接复制粘贴进来，自动识别“岗位职责/任职要求/福利”等结构并生成精美展示页。
            </p>

            <div class="mt-6 space-y-4">
              <div class="flex gap-3">
                <button class="btn btn-secondary flex-1" @click="fillExample">一键填入示例</button>
                <button class="btn btn-primary flex-1" @click="generate">生成预览</button>
              </div>
              <div class="flex gap-3">
                <button class="btn btn-secondary flex-1" @click="copyMd">复制 Markdown</button>
                <button class="btn btn-secondary flex-1" @click="copyPreviewText">复制纯文本</button>
              </div>
              <div class="flex gap-3">
                <button class="btn btn-secondary flex-1" @click="printJob">打印 / 导出PDF</button>
                <button
                  class="btn btn-secondary flex-1"
                  @click="theme = theme === 'dark' ? 'light' : 'dark'"
                >
                  切换风格：{{ theme === 'dark' ? '深色科技' : '明亮清爽' }}
                </button>
              </div>

              <textarea
                v-model="rawText"
                class="w-full h-[420px] rounded-3xl border-2 border-slate-200 bg-slate-50 p-5 font-medium text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="把岗位描述（JD）粘贴在这里（支持标题：岗位职责/任职要求/我们提供/福利/职位描述等）"
              ></textarea>
              <p class="text-xs text-slate-500 leading-relaxed">
                提示：当前为纯前端解析；如需“更懂语义”的生成，可后续对接后端/LLM。
              </p>
            </div>
          </div>
        </div>

        <!-- Right: preview -->
        <div class="lg:w-3/5">
          <div class="rounded-[2.5rem] shadow-2xl border overflow-hidden bg-white" :class="theme === 'dark' ? 'border-slate-200' : 'border-blue-100'">
            <div
              class="px-10 py-10"
              :class="theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white' : 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white'"
            >
              <div class="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <div class="text-4xl font-black tracking-tight">
                    {{ parsed?.title || '岗位展示预览（自动生成）' }}
                  </div>
                  <div class="mt-3 flex flex-wrap items-center gap-3 text-sm font-bold text-white/90">
                    <span class="px-4 py-2 rounded-xl bg-white/15 backdrop-blur border border-white/20">
                      {{ parsed?.company || auth.user?.companyName || '企业' }}
                    </span>
                    <span v-if="parsed?.location" class="px-4 py-2 rounded-xl bg-white/15 backdrop-blur border border-white/20">
                      📍 {{ parsed.location }}
                    </span>
                    <span v-if="parsed?.salary" class="px-4 py-2 rounded-xl bg-white/15 backdrop-blur border border-white/20">
                      💰 {{ parsed.salary }}
                    </span>
                  </div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span v-for="(t, i) in (parsed?.tags || [])" :key="i" class="px-4 py-2 rounded-2xl bg-white/15 backdrop-blur border border-white/20 text-xs font-black">
                    {{ t }}
                  </span>
                </div>
              </div>
            </div>

            <div class="px-10 py-10">
              <div v-if="!parsed" class="text-center py-24">
                <div class="text-7xl mb-4">📄</div>
                <div class="text-2xl font-black text-slate-900">还没有预览</div>
                <p class="text-slate-600 mt-2">左侧粘贴岗位描述，然后点击“生成预览”。</p>
              </div>

              <div v-else class="space-y-10">
                <div v-if="parsed.intro.length">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-2 h-10 rounded-full" :class="theme === 'dark' ? 'bg-gradient-to-b from-blue-600 to-cyan-500' : 'bg-white/0 bg-gradient-to-b from-blue-600 to-purple-600'"></div>
                    <h2 class="text-xl font-black text-slate-900">职位介绍</h2>
                  </div>
                  <div class="p-6 rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                    <ul class="space-y-3">
                      <li v-for="(s, i) in parsed.intro" :key="i" class="flex items-start gap-3">
                        <span class="w-2.5 h-2.5 mt-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></span>
                        <span class="text-slate-700 font-medium leading-relaxed">{{ s }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div v-if="parsed.responsibilities.length">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-2 h-10 rounded-full bg-gradient-to-b from-purple-600 to-pink-600"></div>
                    <h2 class="text-xl font-black text-slate-900">岗位职责</h2>
                  </div>
                  <div class="p-6 rounded-3xl border border-slate-200 bg-white">
                    <ul class="space-y-3">
                      <li v-for="(s, i) in parsed.responsibilities" :key="i" class="flex items-start gap-3">
                        <span class="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></span>
                        <span class="text-slate-700 font-medium leading-relaxed">{{ s }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div v-if="parsed.requirements.length">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-2 h-10 rounded-full bg-gradient-to-b from-blue-600 to-indigo-600"></div>
                    <h2 class="text-xl font-black text-slate-900">任职要求</h2>
                  </div>
                  <div class="p-6 rounded-3xl border border-slate-200 bg-white">
                    <ul class="space-y-3">
                      <li v-for="(s, i) in parsed.requirements" :key="i" class="flex items-start gap-3">
                        <span class="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></span>
                        <span class="text-slate-700 font-medium leading-relaxed">{{ s }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div v-if="parsed.benefits.length">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-2 h-10 rounded-full bg-gradient-to-b from-emerald-600 to-cyan-600"></div>
                    <h2 class="text-xl font-black text-slate-900">我们提供</h2>
                  </div>
                  <div class="p-6 rounded-3xl border border-slate-200 bg-gradient-to-r from-emerald-50 to-cyan-50">
                    <ul class="space-y-3">
                      <li v-for="(s, i) in parsed.benefits" :key="i" class="flex items-start gap-3">
                        <span class="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600"></span>
                        <span class="text-slate-700 font-medium leading-relaxed">{{ s }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="pt-6 border-t border-slate-200 text-sm text-slate-500">
                  <span class="font-bold">发布建议：</span>复制 Markdown（适合公众号/Notion/飞书/知乎），或复制纯文本（适合 Boss/拉勾/内部群）。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

