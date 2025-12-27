export interface ResumeBasics {
  name?: string;
  title?: string;
  city?: string;
  email?: string;
  phone?: string;
  links?: string[];
}

export interface ResumeEntry {
  title?: string; // company/school/project title line
  time?: string;
  location?: string;
  bullets: string[];
  summary?: string;
}

export interface ResumeDoc {
  basics: ResumeBasics;
  summary: string[];
  skills: string[];
  experience: ResumeEntry[];
  projects: ResumeEntry[];
  education: ResumeEntry[];
  certifications: string[];
  awards: string[];
  extra: string[];
}

const EMAIL_RE = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
const PHONE_RE = /(1[3-9]\d{9})/g;
const URL_RE = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;

const SECTION_ALIASES: Record<string, keyof ResumeDoc | 'basics'> = {
  '个人信息': 'basics',
  '基本信息': 'basics',
  '联系方式': 'basics',
  '个人简介': 'summary',
  '自我介绍': 'summary',
  '自我评价': 'summary',
  '个人总结': 'summary',
  '技能': 'skills',
  '技能栈': 'skills',
  '核心技能': 'skills',
  '工作经历': 'experience',
  '工作经验': 'experience',
  '实习经历': 'experience',
  '项目经历': 'projects',
  '项目经验': 'projects',
  '教育经历': 'education',
  '教育背景': 'education',
  '证书': 'certifications',
  '资格证书': 'certifications',
  '奖项': 'awards',
  '荣誉奖项': 'awards'
};

function normalizeLine(s: string) {
  return s
    .replace(/\u00A0/g, ' ')
    .replace(/[•·●◦▪■]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function isSectionHeader(line: string): keyof ResumeDoc | 'basics' | null {
  const raw = line.replace(/[:：\-\s]/g, '').trim();
  if (!raw) return null;
  return SECTION_ALIASES[raw] ?? null;
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

function extractBasics(rawText: string): ResumeBasics {
  const basics: ResumeBasics = {};
  const emails = rawText.match(EMAIL_RE) ?? [];
  const phones = rawText.match(PHONE_RE) ?? [];
  const urls = rawText.match(URL_RE) ?? [];
  basics.email = emails[0];
  basics.phone = phones[0];
  basics.links = Array.from(new Set(urls.map((u) => (u.startsWith('www.') ? `https://${u}` : u))));

  // name heuristics: first non-empty line (short) or line starting with 姓名
  const lines = rawText.split('\n').map(normalizeLine).filter(Boolean);
  const nameLine = lines.find((l) => /^姓名[:：]/.test(l)) ?? lines.find((l) => l.length <= 12 && !EMAIL_RE.test(l) && !PHONE_RE.test(l));
  if (nameLine) {
    basics.name = nameLine.replace(/^姓名[:：]\s*/, '').trim();
  }

  const titleLine = lines.find((l) => /^求职意向[:：]/.test(l) || /^目标岗位[:：]/.test(l) || /^期望职位[:：]/.test(l));
  if (titleLine) basics.title = titleLine.replace(/^(求职意向|目标岗位|期望职位)[:：]\s*/, '').trim();

  const cityLine = lines.find((l) => /^现居地[:：]/.test(l) || /^所在地[:：]/.test(l) || /^城市[:：]/.test(l));
  if (cityLine) basics.city = cityLine.replace(/^(现居地|所在地|城市)[:：]\s*/, '').trim();

  return basics;
}

function parseEntryBlocks(blockLines: string[]): ResumeEntry[] {
  // naive: treat blank lines as entry separators; first line is title+time
  const entries: ResumeEntry[] = [];
  const groups: string[][] = [];
  let buf: string[] = [];
  for (const l of blockLines) {
    const line = normalizeLine(l);
    if (!line) {
      if (buf.length) groups.push(buf), (buf = []);
      continue;
    }
    buf.push(line);
  }
  if (buf.length) groups.push(buf);

  for (const g of groups) {
    const head = g[0] ?? '';
    const rest = g.slice(1);
    const entry: ResumeEntry = { bullets: [] };

    // time range extraction
    const timeMatch = head.match(/(\d{4}[./-]\d{1,2}|\d{4})\s*(?:[-~—至]\s*(\d{4}[./-]\d{1,2}|\d{4}|至今))?/);
    if (timeMatch) entry.time = timeMatch[0];

    // split title vs time
    if (entry.time) {
      entry.title = head.replace(entry.time, '').replace(/[|｜•·]/g, ' ').trim() || head.trim();
    } else {
      entry.title = head.trim();
    }

    const bullets = splitBullets(rest.length ? rest : []);
    entry.bullets = bullets;
    entries.push(entry);
  }

  // If no separators, fallback to single entry with all lines as bullets
  if (entries.length === 0 && blockLines.length) {
    entries.push({ title: undefined, time: undefined, bullets: splitBullets(blockLines) });
  }

  return entries;
}

export function parseResumeText(text: string): ResumeDoc {
  const raw = text.replace(/\r\n/g, '\n').trim();
  const doc: ResumeDoc = {
    basics: extractBasics(raw),
    summary: [],
    skills: [],
    experience: [],
    projects: [],
    education: [],
    certifications: [],
    awards: [],
    extra: []
  };

  const lines = raw.split('\n');
  let current: keyof ResumeDoc | 'basics' | null = null;
  const buckets: Record<string, string[]> = {};

  for (const lineRaw of lines) {
    const line = lineRaw.trim();
    const header = isSectionHeader(line);
    if (header) {
      current = header;
      buckets[current] = buckets[current] ?? [];
      continue;
    }
    const key = current ?? 'extra';
    buckets[key] = buckets[key] ?? [];
    buckets[key].push(lineRaw);
  }

  // summary
  doc.summary = splitBullets(buckets.summary ?? []).slice(0, 8);

  // skills: split by commas / separators
  const skillsRaw = splitBullets(buckets.skills ?? []).join(' ');
  doc.skills = Array.from(
    new Set(
      skillsRaw
        .split(/[,，/｜|、\s]+/)
        .map((s) => s.trim())
        .filter((s) => s.length >= 2 && s.length <= 24)
    )
  ).slice(0, 30);

  // experience/projects/education
  doc.experience = parseEntryBlocks(buckets.experience ?? []);
  doc.projects = parseEntryBlocks(buckets.projects ?? []);
  doc.education = parseEntryBlocks(buckets.education ?? []);

  doc.certifications = splitBullets(buckets.certifications ?? []).slice(0, 20);
  doc.awards = splitBullets(buckets.awards ?? []).slice(0, 20);

  // if summary empty, synthesize from top lines
  if (doc.summary.length === 0) {
    const top = raw.split('\n').map(normalizeLine).filter(Boolean).slice(0, 4);
    doc.summary = top.filter((l) => !EMAIL_RE.test(l) && !PHONE_RE.test(l)).slice(0, 3);
  }

  // extra
  doc.extra = splitBullets(buckets.extra ?? []).slice(0, 30);
  return doc;
}

export function resumeToMarkdown(doc: ResumeDoc): string {
  const b = doc.basics;
  const lines: string[] = [];
  lines.push(`# ${b.name ?? '候选人'}`);
  const meta: string[] = [];
  if (b.title) meta.push(b.title);
  if (b.city) meta.push(b.city);
  if (b.email) meta.push(b.email);
  if (b.phone) meta.push(b.phone);
  if (b.links?.length) meta.push(...b.links);
  if (meta.length) lines.push(meta.join(' · '));
  lines.push('');

  if (doc.summary.length) {
    lines.push('## 个人简介');
    for (const s of doc.summary) lines.push(`- ${s}`);
    lines.push('');
  }
  if (doc.skills.length) {
    lines.push('## 技能');
    lines.push(doc.skills.join('、'));
    lines.push('');
  }
  if (doc.experience.length) {
    lines.push('## 工作经历');
    for (const e of doc.experience) {
      lines.push(`### ${[e.title, e.time].filter(Boolean).join(' | ')}`);
      for (const b of e.bullets) lines.push(`- ${b}`);
      lines.push('');
    }
  }
  if (doc.projects.length) {
    lines.push('## 项目经历');
    for (const p of doc.projects) {
      lines.push(`### ${[p.title, p.time].filter(Boolean).join(' | ')}`);
      for (const b of p.bullets) lines.push(`- ${b}`);
      lines.push('');
    }
  }
  if (doc.education.length) {
    lines.push('## 教育经历');
    for (const ed of doc.education) {
      lines.push(`### ${[ed.title, ed.time].filter(Boolean).join(' | ')}`);
      for (const b of ed.bullets) lines.push(`- ${b}`);
      lines.push('');
    }
  }
  if (doc.certifications.length) {
    lines.push('## 证书');
    for (const c of doc.certifications) lines.push(`- ${c}`);
    lines.push('');
  }
  if (doc.awards.length) {
    lines.push('## 奖项');
    for (const a of doc.awards) lines.push(`- ${a}`);
    lines.push('');
  }
  return lines.join('\n').trim() + '\n';
}

