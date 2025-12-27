import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, UserType } from '../types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const token = ref<string | null>(null)

  // 从localStorage恢复认证状态
  const initAuth = () => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user')
    
    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
      isAuthenticated.value = true
    }
  }

  // 登录
  const login = async (credentials: {
    email?: string
    phone?: string
    password: string
    userType: UserType
  }) => {
    // 模拟API调用
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // 模拟生成token和用户数据
        const mockToken = 'mock_token_' + Date.now()
        let mockUser: User
        
        if (credentials.userType === 'candidate') {
          mockUser = {
            id: 'user_' + Date.now(),
            type: 'candidate',
            email: credentials.email || '',
            phone: credentials.phone,
            name: '候选人用户',
            avatar: undefined,
          }
        } else {
          mockUser = {
            id: 'company_' + Date.now(),
            type: 'company',
            email: credentials.email || '',
            phone: credentials.phone,
            companyName: '示例企业',
            logo: undefined,
          }
        }
        
        token.value = mockToken
        user.value = mockUser
        isAuthenticated.value = true
        
        // 保存到localStorage
        localStorage.setItem('auth_token', mockToken)
        localStorage.setItem('auth_user', JSON.stringify(mockUser))
        
        resolve()
      }, 1000)
    })
  }

  // 注册
  const register = async (data: {
    email?: string
    phone?: string
    password: string
    userType: UserType
    name?: string
    companyName?: string
    verificationCode?: string
  }) => {
    // 模拟API调用
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // 模拟注册后自动登录
        const mockToken = 'mock_token_' + Date.now()
        let mockUser: User
        
        if (data.userType === 'candidate') {
          mockUser = {
            id: 'user_' + Date.now(),
            type: 'candidate',
            email: data.email || '',
            phone: data.phone,
            name: data.name || '新用户',
            avatar: undefined,
          }
        } else {
          mockUser = {
            id: 'company_' + Date.now(),
            type: 'company',
            email: data.email || '',
            phone: data.phone,
            companyName: data.companyName || '新企业',
            logo: undefined,
          }
        }
        
        token.value = mockToken
        user.value = mockUser
        isAuthenticated.value = true
        
        // 保存到localStorage
        localStorage.setItem('auth_token', mockToken)
        localStorage.setItem('auth_user', JSON.stringify(mockUser))
        
        resolve()
      }, 1000)
    })
  }

  // 发送验证码
  const sendVerificationCode = async (email: string) => {
    // 模拟发送验证码
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('验证码已发送至:', email)
        resolve()
      }, 500)
    })
  }

  // 登出
  const logout = () => {
    user.value = null
    token.value = null
    isAuthenticated.value = false
    
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  // 更新用户信息
  const updateUser = (userData: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...userData } as User
      localStorage.setItem('auth_user', JSON.stringify(user.value))
    }
  }

  return {
    user,
    isAuthenticated,
    token,
    initAuth,
    login,
    register,
    sendVerificationCode,
    logout,
    updateUser
  }
})
