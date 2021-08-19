import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import study from '../set-up/study.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/study',
    name: 'study',
    component: study
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
