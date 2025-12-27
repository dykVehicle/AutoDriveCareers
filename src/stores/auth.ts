import { defineStore } from 'pinia';
import type { AuthRole, AuthMethod, StoredUser, AuthSession } from '../services/auth';
import {
  clearSession,
  createSession,
  getUserById,
  loadSession,
  login,
  registerUser,
  sendEmailCode
} from '../services/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    session: null as AuthSession | null,
    user: null as StoredUser | null
  }),
  getters: {
    isAuthed: (state) => Boolean(state.session && state.user),
    role: (state) => state.session?.role ?? null
  },
  actions: {
    bootstrap() {
      const session = loadSession();
      if (!session) {
        this.session = null;
        this.user = null;
        return;
      }
      const user = getUserById(session.userId);
      if (!user) {
        clearSession();
        this.session = null;
        this.user = null;
        return;
      }
      this.session = session;
      this.user = user;
    },

    logout() {
      clearSession();
      this.session = null;
      this.user = null;
    },

    sendCandidateEmailCode(email: string) {
      return sendEmailCode(email);
    },

    async register(params: {
      role: AuthRole;
      method: AuthMethod;
      email?: string;
      phone?: string;
      password: string;
      emailCode?: string;
      displayName?: string;
      companyName?: string;
      contactName?: string;
    }) {
      const user = await registerUser(params);
      const session = createSession(user);
      this.user = user;
      this.session = session;
    },

    async login(params: { role: AuthRole; email?: string; phone?: string; password: string }) {
      const user = await login({
        role: params.role,
        identifier: { email: params.email, phone: params.phone },
        password: params.password
      });
      const session = createSession(user);
      this.user = user;
      this.session = session;
    }
  }
});

