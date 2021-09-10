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
import realMould from '../real-cascade/mould.vue'
import setArray from '../set-up-array/index.vue'
import vSwitch from '../switch/index.vue'
import slotParent from '../v-slot/parent.vue'
import button from '../button/index.vue'
import input from '../input/index.vue'
import resize from '../resize-box/index.vue'
import multiple from '../cascade-editor/multiple.vue'

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
    path: '/cascade',
    name: 'cascadeEditor',
    component: cascadeEditor
  },
  {
    path: '/real',
    name: 'realMould',
    component: realMould
  },
  {
    path: '/array',
    name: 'setArray',
    component: setArray
  },
  {
    path: '/switch',
    name: 'vSwitch',
    component: vSwitch
  },
  {
    path: '/slot-parent',
    name: 'slotParent',
    component: slotParent
  },
  {
    path: '/button',
    name: 'button',
    component: button
  },
  {
    path: '/input',
    name: 'input',
    component: input
  },
  {
    path: '/resize',
    name: 'resize',
    component: resize
  },
  {
    path: '/multiple',
    name: 'multiple',
    component: multiple
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
