import { defineStore } from 'pinia';
import type { Job } from '../types';

export const useJobStore = defineStore('jobs', {
  state: () => ({
    jobs: [
      {
        id: 1,
        title: '决策规划算法专家',
        company: 'AutoDrive Tech',
        salary: '40-70K·15薪',
        location: '上海',
        requirements: {
          experience: '3-5年',
          education: '硕士及以上'
        },
        tags: ['L4', '规控', 'C++', 'Python'],
        description: '负责自动驾驶决策规划算法的研发与落地。',
        responsibilities: [
          '负责自动驾驶车辆在复杂场景下的行为决策与轨迹规划算法开发',
          '优化算法性能，确保实车运行的安全性和舒适性',
          '参与算法架构设计与代码评审'
        ],
        qualifications: [
          '计算机、自动化、车辆工程等相关专业硕士及以上学历',
          '熟练掌握 C++/Python，有良好的编程习惯',
          '熟悉常见规划算法（A*, RRT, Lattice, EM Planner等）',
          '有 L4 级自动驾驶量产项目经验者优先'
        ]
      },
      {
        id: 2,
        title: '感知算法工程师',
        company: 'Future Mobility',
        salary: '30-60K·16薪',
        location: '北京',
        requirements: {
          experience: '1-3年',
          education: '硕士'
        },
        tags: ['视觉', 'LiDAR', '深度学习', 'PyTorch'],
        description: '参与多传感器融合感知算法的研发。',
        responsibilities: [
          '负责视觉、激光雷达等传感器的目标检测、跟踪算法研发',
          '负责多传感器融合算法的开发与优化',
          '跟进前沿深度学习技术在自动驾驶感知领域的应用'
        ],
        qualifications: [
          '扎实的计算机视觉与深度学习基础',
          '熟练掌握 PyTorch/TensorFlow 等框架',
          '熟悉 PointPillars, CenterPoint 等 3D 检测算法'
        ]
      },
      {
        id: 3,
        title: '自动驾驶仿真测试工程师',
        company: 'SimuDrive',
        salary: '25-45K·14薪',
        location: '深圳',
        requirements: {
          experience: '2-4年',
          education: '本科'
        },
        tags: ['CarSim', 'Carla', 'Python', 'CI/CD'],
        description: '搭建自动驾驶仿真测试平台，构建测试场景。',
        responsibilities: [
          '负责自动驾驶仿真场景库的建设',
          '开发自动化测试工具与脚本',
          '分析仿真测试结果，协助算法团队定位问题'
        ],
        qualifications: [
          '熟练掌握至少一种仿真软件（Carla, VTD, CarSim等）',
          '熟悉 Python 脚本开发',
          '了解自动驾驶系统基本架构'
        ]
      }
    ] as Job[]
  }),
  getters: {
    getJobById: (state) => (id: number) => {
      return state.jobs.find(job => job.id === id);
    },
    filterJobs: (state) => (query: string) => {
      if (!query) return state.jobs;
      const lowerQuery = query.toLowerCase();
      return state.jobs.filter(job => 
        job.title.toLowerCase().includes(lowerQuery) || 
        job.company.toLowerCase().includes(lowerQuery) ||
        job.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }
  }
});
