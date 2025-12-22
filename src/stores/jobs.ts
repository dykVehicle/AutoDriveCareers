import { defineStore } from 'pinia';
import type { Job } from '../types';

// Helper to generate random integer
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper to pick random item from array
const pick = <T>(arr: T[]): T => {
  const item = arr[randomInt(0, arr.length - 1)];
  if (item === undefined) {
    throw new Error('Array is empty');
  }
  return item;
};

// Constants for generation
const COMPANIES = [
  { name: 'AutoDrive Tech', logo: '', size: 'D轮及以上', location: '上海' },
  { name: 'Future Mobility', logo: '', size: '上市公司', location: '北京' },
  { name: 'SimuDrive', logo: '', size: 'B轮', location: '深圳' },
  { name: 'NextGen AI', logo: '', size: 'A轮', location: '杭州' },
  { name: 'RoboTruck Inc.', logo: '', size: 'C轮', location: '苏州' },
  { name: 'Global OEMs', logo: '', size: '上市公司', location: '广州' },
  { name: 'Smart Cabin Ltd.', logo: '', size: 'B轮', location: '武汉' },
  { name: 'ChipSilicon', logo: '', size: '上市公司', location: '上海' },
];

const LOCATIONS = ['上海', '北京', '深圳', '杭州', '苏州', '广州', '武汉', '成都'];

const SALARY_RANGES = ['25-45K', '30-60K', '40-70K', '50-80K', '60-100K'];
const MONTHS = ['14薪', '15薪', '16薪', '18薪'];

// Templates for different directions
const TEMPLATES = {
  '感知算法': [
    {
      title: '高级视觉感知算法工程师',
      tags: ['计算机视觉', 'Deep Learning', 'PyTorch', 'TensorRT'],
      desc: '负责自动驾驶视觉感知算法的研发，包括目标检测、分割、车道线检测等。',
      resps: ['设计并优化基于深度学习的视觉感知模型', '负责模型在嵌入式平台的部署与加速', '解决复杂场景下的感知长尾问题'],
      reqs: ['计算机相关专业硕士及以上学历', '熟悉 PyTorch/TensorFlow', '有 2D/3D 检测项目经验']
    },
    {
      title: 'LiDAR 点云感知专家',
      tags: ['LiDAR', '点云处理', 'C++', 'PCL'],
      desc: '负责激光雷达点云处理算法研发，包括聚类、检测、跟踪等。',
      resps: ['开发高性能的点云预处理和物体检测算法', '优化多雷达融合感知的效果', '参与感知系统架构设计'],
      reqs: ['精通 C++ 编程', '熟悉 PointNet, VoxelNet 等算法', '有 L4 级自动驾驶项目经验优先']
    },
    {
      title: '多传感器融合算法工程师',
      tags: ['Fusion', 'Kalman Filter', 'L4'],
      desc: '负责多传感器（Camera, LiDAR, Radar）融合算法的研发。',
      resps: ['设计多源异构数据的融合框架', '开发基于卡尔曼滤波或深度学习的融合跟踪算法', '提升系统在恶劣天气下的鲁棒性'],
      reqs: ['扎实的数学基础（概率论、矩阵论）', '熟悉多目标跟踪算法', '熟悉传感器时空同步机制']
    },
    {
      title: 'SLAM 算法工程师',
      tags: ['SLAM', 'Localization', 'C++'],
      desc: '负责高精地图构建与高精定位算法研发。',
      resps: ['研发基于视觉或激光雷达的 SLAM 算法', '实现厘米级高精定位系统', '优化闭环检测与后端优化模块'],
      reqs: ['熟悉 VINS, ORB-SLAM, LOAM 等开源框架', '熟悉图优化理论 (g2o, ceres)', '有大规模建图经验者优先']
    },
    {
      title: '感知模型部署优化工程师',
      tags: ['CUDA', 'TensorRT', '嵌入式'],
      desc: '负责感知深度学习模型在车端芯片上的移植与优化。',
      resps: ['负责模型量化、剪枝与压缩', '基于 TensorRT/CUDA 进行算子开发与优化', '提升模型推理速度与降低资源占用'],
      reqs: ['精通 CUDA 编程', '熟悉计算机体系结构', '有 Orin/Xavier 平台开发经验']
    }
  ],
  '决策规划': [
    {
      title: '自动驾驶规划算法专家',
      tags: ['Planning', 'C++', 'PNC'],
      desc: '负责 L4 级自动驾驶车辆路径规划与行为决策算法研发。',
      resps: ['开发基于搜索或采样的路径规划算法', '设计复杂路口博弈与交互策略', '优化轨迹生成的平滑性与舒适性'],
      reqs: ['精通 C++ 与常用数据结构', '熟悉 A*, Lattice, EM Planner', '有 Apollo/Autoware 经验者优先']
    },
    {
      title: '控制算法工程师',
      tags: ['Control', 'MPC', 'LQR'],
      desc: '负责自动驾驶车辆横纵向控制算法研发。',
      resps: ['设计并实现 MPC/LQR/PID 控制器', '负责车辆动力学建模与参数辨识', '解决高速与大曲率弯道的控制稳定性问题'],
      reqs: ['车辆工程或自动化专业背景', '熟悉车辆动力学', '有实车调试经验']
    },
    {
      title: '预测算法工程师',
      tags: ['Prediction', 'Deep Learning', 'LSTM/Transformer'],
      desc: '负责交通参与者行为预测算法研发。',
      resps: ['挖掘海量路测数据，构建行为预测模型', '预测障碍物未来几秒的轨迹与意图', '优化预测模型在端上的实时性'],
      reqs: ['熟悉深度学习在时序预测中的应用', '熟悉 Transformer/GNN 网络结构', '有大规模数据处理经验']
    },
    {
      title: '规控系统架构师',
      tags: ['Architecture', 'System', 'Safety'],
      desc: '负责规划控制模块的软件架构设计与系统稳定性保障。',
      resps: ['设计高可靠、低延迟的软件架构', '负责模块间的接口定义与通信优化', '参与功能安全 (ISO 26262) 相关的设计与落地'],
      reqs: ['5年以上自动驾驶开发经验', '精通 ROS/CyberRT 等中间件', '有量产项目架构设计经验']
    },
    {
      title: '决策规划算法实习生',
      tags: ['Intern', 'C++', 'Math'],
      desc: '参与决策规划算法的开发与测试（面向优秀在校生）。',
      resps: ['协助 Mentor 开发与调试规划算法', '负责仿真场景的搭建与算法验证', '分析路测数据并撰写报告'],
      reqs: ['计算机或车辆相关专业在读', 'C++ 基础扎实', '每周实习 4 天以上']
    }
  ],
  '嵌入式': [
    {
      title: '自动驾驶中间件开发工程师',
      tags: ['Middleware', 'C++', '通信'],
      desc: '研发高性能自动驾驶中间件与基础软件平台。',
      resps: ['设计高吞吐、低延迟的消息通信机制', '开发进程管理、调度与监控模块', '适配不同操作系统（Linux, QNX）'],
      reqs: ['精通 Linux 系统编程', '熟悉 DDS/SOMEIP 等通信协议', '熟悉操作系统原理']
    },
    {
      title: '嵌入式软件工程师 (BSP)',
      tags: ['BSP', 'Driver', 'Linux/QNX'],
      desc: '负责自动驾驶计算平台的底层驱动开发与系统移植。',
      resps: ['负责 SOC 芯片的 BSP 裁剪与驱动开发', '调试 Sensor（Camera, LiDAR）驱动', '优化系统启动速度与实时性'],
      reqs: ['精通 C 语言', '熟悉 ARM 架构与常用总线 (PCIe, MIPI, CAN)', '有 QNX/VxWorks 开发经验优先']
    },
    {
      title: '系统性能优化工程师',
      tags: ['Optimization', 'Profiling', 'Kernel'],
      desc: '负责自动驾驶系统的整体性能分析与优化。',
      resps: ['分析系统瓶颈（CPU, Memory, Bandwidth）', '优化调度策略与资源分配', '解决偶发的系统卡顿与延迟抖动问题'],
      reqs: ['精通 Linux 内核机制', '熟练使用 Perf, eBPF 等分析工具', '有大型嵌入式系统优化经验']
    },
    {
      title: '车载以太网开发工程师',
      tags: ['Ethernet', 'Switch', 'TSN'],
      desc: '负责车载高速网络架构设计与协议栈开发。',
      resps: ['配置与调试车载以太网交换机', '开发基于 TSN 的时间敏感网络应用', '保障数据传输的高可靠与低延迟'],
      reqs: ['熟悉 TCP/IP 协议栈', '了解 SOME/IP, DoIP 协议', '有车载网络开发经验']
    },
    {
      title: '功能安全工程师',
      tags: ['ISO26262', 'Safety', 'System'],
      desc: '负责自动驾驶系统的功能安全设计与分析。',
      resps: ['进行 HARA 分析与 ASIL 等级分解', '制定功能安全需求与技术安全概念', '指导研发团队进行安全机制的实现'],
      reqs: ['熟悉 ISO 26262 标准', '有功能安全认证项目经验', '逻辑思维严密']
    }
  ],
  '仿真与测试': [
    {
      title: '仿真平台开发工程师',
      tags: ['Simulation', 'UE/Unity', 'C++'],
      desc: '研发高保真自动驾驶仿真测试平台。',
      resps: ['基于 UE/Unity 开发传感器仿真与动力学模型', '搭建大规模云端并发仿真系统', '实现 Sim-to-Real 的一致性验证'],
      reqs: ['精通 C++ 或 C#', '熟悉图形学渲染原理', '有游戏引擎开发经验优先']
    },
    {
      title: '自动驾驶测试开发工程师',
      tags: ['Test', 'Python', 'CI/CD'],
      desc: '负责自动化测试工具链与测试体系建设。',
      resps: ['开发自动化测试脚本与管理平台', '搭建 HIL (Hardware-in-Loop) 测试环境', '分析测试覆盖率与缺陷追踪'],
      reqs: ['熟练掌握 Python', '熟悉 Jenkins/GitLab CI', '有 HIL 测试经验']
    },
    {
      title: '场景库算法工程师',
      tags: ['Scene', 'Data Mining', 'Python'],
      desc: '负责自动驾驶测试场景的挖掘与生成。',
      resps: ['从海量路测数据中挖掘高价值 Corner Case', '基于规则或生成式模型自动生成测试场景', '构建场景评价体系'],
      reqs: ['熟悉数据挖掘算法', '了解 OpenSCENARIO 标准', '具备良好的数学基础']
    },
    {
      title: '整车测试工程师',
      tags: ['Vehicle Test', 'Debug', 'Calibration'],
      desc: '负责自动驾驶实车功能测试与标定。',
      resps: ['制定实车测试计划与用例', '在封闭场地与公开道路进行功能验证', '采集数据并协助算法工程师定位问题'],
      reqs: ['持有驾照且驾驶技术娴熟', '熟悉 CANoe 等测试工具', '能适应出差']
    },
    {
      title: '数据平台开发工程师',
      tags: ['Big Data', 'Backend', 'Go/Java'],
      desc: '搭建自动驾驶海量数据闭环平台。',
      resps: ['开发数据采集、存储、检索与可视化平台', '设计高效的数据标注流程与工具', '保障数据平台的安全性与稳定性'],
      reqs: ['熟悉分布式存储与计算 (Hadoop, Spark)', '熟练掌握 Go 或 Java', '有全栈开发能力优先']
    }
  ],
  '云平台与工具': [
    {
      title: '云原生开发工程师',
      tags: ['Kubernetes', 'Docker', 'Go'],
      desc: '负责自动驾驶云端基础设施的建设。',
      resps: ['维护大规模 Kubernetes 集群', '开发云端调度系统以支持大规模仿真与训练', '优化容器化应用的性能与稳定性'],
      reqs: ['精通 K8s 架构与插件开发', '熟悉 Docker 容器技术', '有公有云/私有云落地经验']
    },
    {
      title: '前端可视化专家',
      tags: ['WebGL', 'Three.js', 'React/Vue'],
      desc: '研发自动驾驶数据可视化与调试工具。',
      resps: ['开发基于 Web 的 3D 点云/场景可视化工具', '设计直观的人机交互界面', '优化 WebGL 渲染性能以支持海量数据展示'],
      reqs: ['精通 WebGL/Three.js', '熟悉前端主流框架', '有 GIS 或 3D 可视化经验']
    },
     {
      title: 'AI 训练平台工程师',
      tags: ['AI Infra', 'GPU', 'Python'],
      desc: '搭建高效的深度学习模型训练平台。',
      resps: ['管理 GPU 集群资源与作业调度', '优化分布式训练框架 (DDP, Horovod)', '加速模型训练与迭代效率'],
      reqs: ['熟悉 AI 训练流程', '了解 GPU 硬件架构', '熟悉 Slurm/K8s 调度']
    },
     {
      title: '高精地图算法工程师',
      tags: ['HD Map', 'Geometry', 'C++'],
      desc: '负责高精地图的数据生产与自动化更新。',
      resps: ['处理激光点云与视觉数据生成矢量地图', '研发地图自动化更新与变更检测算法', '构建高精地图众包更新体系'],
      reqs: ['熟悉计算几何', '有 GIS 相关背景', 'C++ 编程能力强']
    }
  ]
};

const generateJobs = (): Job[] => {
  const jobs: Job[] = [];
  let idCounter = 1;

  Object.entries(TEMPLATES).forEach(([category, templates]) => {
    // For each category, ensure we generate at least 30 jobs
    // We have ~4-5 templates per category, so loop ~6-7 times
    const categoryTarget = 32; 
    
    for (let i = 0; i < categoryTarget; i++) {
      const template = pick(templates);
      const company = pick(COMPANIES);
      const isSenior = i % 3 === 0; // Simulate some senior roles
      
      const salary = pick(SALARY_RANGES);
      const months = pick(MONTHS);
      
      jobs.push({
        id: idCounter++,
        title: isSenior && !template.title.includes('专家') ? `资深${template.title}` : template.title,
        company: company.name,
        salary: `${salary}·${months}`,
        location: isSenior ? '上海' : pick(LOCATIONS), // Seniors often in HQ
        requirements: {
          experience: isSenior ? '5-10年' : pick(['1-3年', '3-5年', '应届']),
          education: pick(['本科', '硕士', '硕士及以上', '博士'])
        },
        tags: [...template.tags, category], // Add category as a tag for easier filtering
        description: template.desc,
        responsibilities: template.resps,
        qualifications: template.reqs
      });
    }
  });

  return jobs.sort(() => Math.random() - 0.5); // Shuffle
};

export const useJobStore = defineStore('jobs', {
  state: () => ({
    jobs: generateJobs()
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
