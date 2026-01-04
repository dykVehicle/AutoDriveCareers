import axios from 'axios';
import type { StoredUser } from './auth';

// API基础配置
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器 - 添加token
apiClient.interceptors.request.use(
  (config) => {
    const session = localStorage.getItem('adc_session_v1');
    if (session) {
      try {
        const sessionData = JSON.parse(session);
        if (sessionData?.token) {
          config.headers.Authorization = `Bearer ${sessionData.token}`;
        }
      } catch (e) {
        // 忽略解析错误
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token过期或无效，清除本地session
      localStorage.removeItem('adc_session_v1');
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 用户认证相关API
export const authApi = {
  // 注册用户
  register: async (params: {
    role: 'candidate' | 'company';
    email?: string;
    phone?: string;
    password: string;
    displayName?: string;
    companyName?: string;
    contactName?: string;
    emailCode?: string;
  }): Promise<ApiResponse<{ user: StoredUser; token: string }>> => {
    try {
      const response = await apiClient.post('/auth/register', params);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || '注册失败'
      };
    }
  },

  // 登录
  login: async (params: {
    role: 'candidate' | 'company';
    email?: string;
    phone?: string;
    password: string;
  }): Promise<ApiResponse<{ user: StoredUser; token: string }>> => {
    try {
      const response = await apiClient.post('/auth/login', params);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || '登录失败'
      };
    }
  },

  // 发送邮箱验证码
  sendEmailCode: async (email: string): Promise<ApiResponse<{ code: string }>> => {
    try {
      const response = await apiClient.post('/auth/send-code', { email });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || '发送验证码失败'
      };
    }
  },

  // 获取当前用户信息
  getCurrentUser: async (): Promise<ApiResponse<StoredUser>> => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || '获取用户信息失败'
      };
    }
  },

  // 登出
  logout: async (): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post('/auth/logout');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || '登出失败'
      };
    }
  }
};

// 判断是否使用服务器端存储
export function useServerStorage(): boolean {
  // 如果配置了API地址，则使用服务器端存储
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  return Boolean(apiUrl && apiUrl !== 'false' && apiUrl !== 'disabled');
}

export default apiClient;
