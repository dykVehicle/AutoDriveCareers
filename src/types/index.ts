export interface Job {
  id: number;
  title: string; // 例如："决策规划算法专家"
  company: string;
  salary: string; // 例如："30-50K·16薪"
  location: string; // 例如："上海，重庆，武汉"
  requirements: {
    experience: string; // 例如："3-5年"
    education: string; // 例如："本科及以上"
  };
  tags: string[]; // 例如：["L4", "规控", "量产经验", "Apollo"]
  description: string; // 职位描述
  responsibilities: string[]; // 岗位职责列表
  qualifications: string[]; // 任职要求列表
}

export interface Company {
  id: number;
  name: string;
  logo: string;
  description: string;
  location: string;
  size: string;
  domain: string; // e.g. "自动驾驶", "智能座舱"
}

// 用户类型
export type UserType = 'candidate' | 'company';

// 候选人用户
export interface CandidateUser {
  id: string;
  type: 'candidate';
  email: string;
  phone?: string;
  name: string;
  avatar?: string;
  resume?: Resume;
}

// 企业用户
export interface CompanyUser {
  id: string;
  type: 'company';
  email: string;
  phone?: string;
  companyName: string;
  logo?: string;
  description?: string;
  location?: string;
  size?: string;
  domain?: string;
}

// 用户联合类型
export type User = CandidateUser | CompanyUser;

// 简历接口
export interface Resume {
  id: string;
  name: string;
  title: string;
  contact: {
    email: string;
    phone: string;
    location?: string;
  };
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  projects?: Project[];
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  role: string;
  technologies: string[];
}
