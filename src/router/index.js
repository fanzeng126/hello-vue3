import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import study from '../set-up/study.vue'
import parent from '../set-up/emit/parent.vue'
import layout from '../set-up/layout/index.vue'
import home from '../package/home.vue'
import provide from '../provied-inject/provide.vue'
import ref from '../ref/rev.vue'
import focus from '../directive/auto-focus.vue'
import table from '../table/index.vue'
import checkSelect from '../check-select/index.vue'

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
  },
  {
    path: '/provide',
    name: 'provide',
    component: provide
  },
  {
    path: '/ref',
    name: 'ref',
    component: ref
  },
  {
    path: '/focus',
    name: 'focus',
    component: focus
  },
  {
    path: '/table',
    name: 'table',
    component: table
  },
  {
    path: '/select',
    name: 'checkSelect',
    component: checkSelect
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
