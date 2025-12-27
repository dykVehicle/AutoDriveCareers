export interface JobPostDoc {
  title?: string;
  company?: string;
  location?: string;
  salary?: string;
  employmentType?: string;
  intro: string[];
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  extra: string[];
  tags: string[];
}

const SALARY_RE = /(\d{1,2}\s*[-~—]\s*\d{1,2}\s*[kK]|(\d{1,2}\s*[kK]\s*[-~—]\s*\d{1,2}\s*[kK])|(\d{1,3}\s*万\s*[-~—]\s*\d{1,3}\s*万))/;
const CITY_RE = /(上海|北京|深圳|广州|杭州|苏州|武汉|成都|南京|西安|重庆|天津)/;

type BucketKey = 'intro' | 'responsibilities' | 'requirements' | 'benefits' | 'extra';

function normalizeLine(s: string) {
  return s
    .replace(/\u00A0/g, ' ')
    .replace(/[•·●◦▪■]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function isHeader(line: string) {
  const raw = line.replace(/[:：\-\s]/g, '').trim();
  if (!raw) return null;
  if (/(岗位职责|工作职责|你将负责|工作内容)/.test(raw)) return 'responsibilities';
  if (/(任职要求|职位要求|你需要|要求)/.test(raw)) return 'requirements';
  if (/(福利|我们提供|你将获得|薪酬福利)/.test(raw)) return 'benefits';
  if (/(职位描述|岗位介绍|关于我们|团队介绍)/.test(raw)) return 'intro';
  return null;
}

function splitBullets(lines: string[]): string[] {
  const out: string[] = [];
  for (const l of lines) {
    const line = normalizeLine(l);
    if (!line) continue;
    if (/^[-*]\s+/.test(line)) out.push(line.replace(/^[-*]\s+/, '').trim());
    else out.push(line);
  }
  return out;
}

export function parseJobText(text: string): JobPostDoc {
  const raw = text.replace(/\r\n/g, '\n').trim();
  const doc: JobPostDoc = {
    title: undefined,
    company: undefined,
    location: undefined,
    salary: undefined,
    employmentType: undefined,
    intro: [],
    responsibilities: [],
    requirements: [],
    benefits: [],
    extra: [],
    tags: []
  };

  const lines = raw.split('\n').map((l) => l.trimEnd());

  // quick meta extraction from full text
  const salary = raw.match(SALARY_RE)?.[0];
  if (salary) doc.salary = salary.replace(/\s+/g, '');

  const city = raw.match(CITY_RE)?.[0];
  if (city) doc.location = city;

  // title: first meaningful line
  const firstLine = lines.map(normalizeLine).find(Boolean);
  if (firstLine) {
    doc.title = firstLine
      .replace(/^(招聘|急聘|岗位|职位)[:：]?\s*/g, '')
      .replace(/(岗位职责|任职要求|职位描述).*$/g, '')
      .trim();
  }

  // company line
  const companyLine = lines.map(normalizeLine).find((l) => /^公司[:：]/.test(l) || /^公司名称[:：]/.test(l));
  if (companyLine) doc.company = companyLine.replace(/^公司(名称)?[:：]\s*/, '').trim();

  // buckets by headers
  let current: BucketKey = 'extra';
  const buckets: Record<BucketKey, string[]> = {
    intro: [],
    responsibilities: [],
    requirements: [],
    benefits: [],
    extra: []
  };
  for (const lineRaw of lines) {
    const l = normalizeLine(lineRaw);
    const h = isHeader(l);
    if (h) {
      current = h as any;
      continue;
    }
    buckets[current].push(lineRaw);
  }

  doc.intro = splitBullets(buckets.intro).slice(0, 10);
  doc.responsibilities = splitBullets(buckets.responsibilities).slice(0, 20);
  doc.requirements = splitBullets(buckets.requirements).slice(0, 20);
  doc.benefits = splitBullets(buckets.benefits).slice(0, 20);
  doc.extra = splitBullets(buckets.extra).slice(0, 30);

  // tags heuristic
  const tagSeed = `${doc.title ?? ''} ${doc.requirements.join(' ')} ${doc.responsibilities.join(' ')}`;
  const tags = new Set<string>();
  for (const t of ['自动驾驶', '感知', '规划', '控制', 'SLAM', 'LiDAR', 'BEV', 'Transformer', 'C++', 'Python', 'CUDA', 'TensorRT', 'ROS', '多传感器融合']) {
    if (tagSeed.toLowerCase().includes(t.toLowerCase())) tags.add(t);
  }
  doc.tags = Array.from(tags).slice(0, 10);

  // fallback if headers not found
  if (!doc.responsibilities.length && !doc.requirements.length) {
    doc.intro = splitBullets(lines).slice(0, 12);
  }

  return doc;
}

export function jobToMarkdown(doc: JobPostDoc): string {
  const lines: string[] = [];
  lines.push(`# ${doc.title ?? '岗位名称'}`);
  const meta: string[] = [];
  if (doc.company) meta.push(doc.company);
  if (doc.location) meta.push(doc.location);
  if (doc.salary) meta.push(doc.salary);
  if (doc.employmentType) meta.push(doc.employmentType);
  if (meta.length) lines.push(meta.join(' · '));
  if (doc.tags.length) lines.push(`标签：${doc.tags.join('、')}`);
  lines.push('');

  if (doc.intro.length) {
    lines.push('## 职位介绍');
    for (const s of doc.intro) lines.push(`- ${s}`);
    lines.push('');
  }
  if (doc.responsibilities.length) {
    lines.push('## 岗位职责');
    for (const s of doc.responsibilities) lines.push(`- ${s}`);
    lines.push('');
  }
  if (doc.requirements.length) {
    lines.push('## 任职要求');
    for (const s of doc.requirements) lines.push(`- ${s}`);
    lines.push('');
  }
  if (doc.benefits.length) {
    lines.push('## 薪酬福利');
    for (const s of doc.benefits) lines.push(`- ${s}`);
    lines.push('');
  }
  return lines.join('\n').trim() + '\n';
}

