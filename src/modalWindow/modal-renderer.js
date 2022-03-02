import Vue from 'vue'
import App from './modal.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Plugin from '../plugins'
import G2 from '@antv/g2'
import { http } from '../plugins/axios'
import '../styles/common.scss'
import '../styles/reset.css'
import '../assets/theme/index.css' //主题色
import { remote, ipcRenderer } from 'electron'
Vue.use(ElementUI)
Vue.use(Plugin)
Vue.use(G2)
console.log('=======================modal============================')
Vue.prototype.$setTop = function () {
  let win = remote.getCurrentWindow()
  win.setAlwaysOnTop(!win.isAlwaysOnTop())
  return win.isAlwaysOnTop()
}
Vue.prototype.$openModal = ({ route = '', query = {}, options = {} }) => {
  !!route &&
    ipcRenderer.send('showModal', {
      route,
      query,
      options
    })
}
Vue.prototype.$http = http
window.$http = http

Vue.config.productionTip = false

// 初始化登录状态
if (localStorage.userInfo) {
  let userInfo = JSON.parse(localStorage.userInfo)
  store.commit('LOGIN_IN', {
    userInfo,
    login_account: localStorage.login_account
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
