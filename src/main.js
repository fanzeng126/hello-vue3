import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vtIcon from './svg/vt-icon.vue'
import popper from './dropdown-teleport/popper.vue'
import resizeBox from './resize-box/resize-box.vue'
import input from './input/input.vue'
import cascadePopper from './cascade-editor/cascade-popper.vue'
import cascade from './cascade-editor/cascade.vue'
import cascadeMultiple from './cascade-editor/cascade-multiple.vue'
import button from './button/button.vue'
import editor from './check-select/editor.vue'
import modal from './modal/modal.vue'
import dialog from './modal/dialog.vue'
import drawer from './drawer/drawer.vue'
import drawerModel from './drawer/drawer-model.vue'
import '../static/css/index'
import './resetFont'

const app = createApp(App)
app.use(store).use(router).mount('#app')
app.component('vt-icon', vtIcon)
app.component('vt-popper', popper)
app.component('vt-resize', resizeBox)
app.component('vt-input', input)
app.component('vt-cascade-popper', cascadePopper)
app.component('vt-cascade', cascade)
app.component('vt-cascade-multiple', cascadeMultiple)
app.component('vt-button', button)
app.component('vt-check', editor)
app.component('vt-modal', modal)
app.component('vt-dialog', dialog)
app.component('vt-drawer', drawer)
app.component('vt-drawer-model', drawerModel)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)

app.config.globalProperties.$htmlFontSize = () => {
  const htmlDom = document.documentElement
  return parseInt(htmlDom.style.fontSize, 10)
}
