import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import JobList from '../views/JobList.vue'
import JobDetail from '../views/JobDetail.vue'
import Login from '../views/Login.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobList
    },
    {
      path: '/jobs/:id',
      name: 'job-detail',
      component: JobDetail
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/auth/candidate',
      name: 'candidate-auth',
      component: () => import('../views/CandidateAuth.vue')
    },
    {
      path: '/auth/company',
      name: 'company-auth',
      component: () => import('../views/CompanyAuth.vue')
    },
    {
      path: '/resume-builder',
      name: 'resume-builder',
      component: () => import('../views/ResumeBuilder.vue'),
      meta: { requiresAuth: true, role: 'candidate' }
    },
    {
      path: '/job-builder',
      name: 'job-builder',
      component: () => import('../views/JobBuilder.vue'),
      meta: { requiresAuth: true, role: 'company' }
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to) => {
  // Backward compatibility: old login entry
  if (to.path === '/login') {
    return { path: '/auth/candidate', query: to.query };
  }

  const auth = useAuthStore();
  // In case user lands directly on a guarded route with fresh reload
  if (!auth.session && !auth.user) auth.bootstrap();

  const requiresAuth = Boolean(to.meta.requiresAuth);
  if (!requiresAuth) return true;

  if (!auth.isAuthed) {
    return { path: '/auth/candidate', query: { redirect: to.fullPath } };
  }

  const requiredRole = (to.meta.role as string | undefined) ?? undefined;
  if (requiredRole && auth.role !== requiredRole) {
    return auth.role === 'company' ? { path: '/job-builder' } : { path: '/resume-builder' };
  }

  return true;
});

export default router
