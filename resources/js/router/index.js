// resources/js/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Import your components or pages
import LayoutComponent from '@/components/layout/LayoutComponent.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import LoginPage from '@/pages/LoginPage.vue'


const routes = [
  {
    path: '/',
    component: LayoutComponent,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardPage,
        meta: { title: 'Dashboard' }
      },
      {
        path: 'login',
        name: 'login',
        component: LoginPage,
        meta: { title: 'Login' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
