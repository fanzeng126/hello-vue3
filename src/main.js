import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vtIcon from './svg/vt-icon.vue'
import vtTeleport from './dropdown-teleport/check-editor.vue'
import '../static/css/index'
import './resetFont'

const app = createApp(App)
app.use(store).use(router).mount('#app')
app.component('vt-icon', vtIcon)
app.component('vt-teleport', vtTeleport)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
