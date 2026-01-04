import { loadFromStorage, saveToStorage } from './storage';

export interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  savedAt: number;
}

// 获取收藏的职位
export function getSavedJobs(userId: string): SavedJob[] {
  const key = `saved_jobs_${userId}`;
  return loadFromStorage<SavedJob[]>(key, []);
}

// 保存职位
export function saveJob(userId: string, job: Omit<SavedJob, 'savedAt'>): void {
  const jobs = getSavedJobs(userId);
  
  // 检查是否已经收藏
  const exists = jobs.find(j => j.id === job.id);
  if (exists) {
    return; // 已收藏，不重复添加
  }

  // 添加收藏
  jobs.unshift({
    ...job,
    savedAt: Date.now()
  });

  // 最多保存100个
  if (jobs.length > 100) {
    jobs.length = 100;
  }

  const key = `saved_jobs_${userId}`;
  saveToStorage(key, jobs);
}

// 取消收藏职位
export function unsaveJob(userId: string, jobId: string): void {
  const jobs = getSavedJobs(userId);
  const filtered = jobs.filter(j => j.id !== jobId);
  const key = `saved_jobs_${userId}`;
  saveToStorage(key, filtered);
}

// 检查职位是否已收藏
export function isJobSaved(userId: string, jobId: string): boolean {
  const jobs = getSavedJobs(userId);
  return jobs.some(j => j.id === jobId);
}

// 保存简历
export function saveResume(userId: string, resume: any): void {
  const key = `resume_${userId}`;
  saveToStorage(key, resume);
}

// 获取简历
export function getResume(userId: string): any | null {
  const key = `resume_${userId}`;
  return loadFromStorage(key, null);
}
