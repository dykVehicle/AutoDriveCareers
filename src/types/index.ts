export interface Job {
  id: number;
  title: string; // 例如：“决策规划算法专家”
  company: string;
  salary: string; // 例如：“30-50K·16薪”
  location: string; // 例如：“上海，重庆，武汉”
  requirements: {
    experience: string; // 例如：“3-5年”
    education: string; // 例如：“本科及以上”
  };
  tags: string[]; // 例如：[“L4”, “规控”, “量产经验”, “Apollo”]
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
