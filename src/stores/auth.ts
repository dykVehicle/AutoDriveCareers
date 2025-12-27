import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export type UserRole = 'candidate' | 'company';

export interface User {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  role: UserRole;
  avatar?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);
  const userRole = computed(() => user.value?.role);

  // Mock login action
  const login = async (payload: any) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (payload.role === 'company') {
            user.value = {
                id: '1',
                email: payload.email,
                name: 'Tech Corp',
                role: 'company',
                avatar: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=374&q=80'
            };
        } else {
             user.value = {
                id: '2',
                email: payload.email || 'candidate@example.com',
                phone: payload.phone,
                name: 'John Doe',
                role: 'candidate',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1700&q=80'
            };
        }
        resolve();
      }, 1000);
    });
  };

  const register = async (payload: any) => {
      return login(payload);
  };

  const logout = () => {
    user.value = null;
  };

  return {
    user,
    isAuthenticated,
    userRole,
    login,
    logout,
    register
  };
});
