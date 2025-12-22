import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import JobList from '../views/JobList.vue'
import JobDetail from '../views/JobDetail.vue'
import Login from '../views/Login.vue'

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

export default router
