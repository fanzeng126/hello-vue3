import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import study from '../set-up/study.vue'
import parent from '../set-up/emit/parent.vue'
import layout from '../set-up/layout/index.vue'
import home from '../package/home.vue'

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
  },
  {
    path: '/parent',
    name: 'parent',
    component: parent
  },
  {
    path: '/layout',
    name: 'layout',
    component: layout
  },
  {
    path: '/package',
    name: 'package',
    component: home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
