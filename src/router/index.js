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
import model from '../check-select/model.vue'
import postcss from '../postcss/index.vue'
import cascadeEditor from '../cascade-editor/mould.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/postcss',
    name: 'postcss',
    component: postcss
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
    component: model
  },
  {
    path: '/many',
    name: 'cascadeEditor',
    component: cascadeEditor
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
