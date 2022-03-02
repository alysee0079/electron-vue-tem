import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Plugin from './plugins'
import { http, solr_server_search } from './plugins/axios'
import G2 from '@antv/g2'
import ElementUI from 'element-ui' // 新添加
import ShotcutPlugin from './shotcut'
import './plugins/element.js'

import { ipcRenderer } from 'electron'
import './styles/common.css'
import './styles/reset.css'
import './assets/theme/index.css' //主题色
console.log(1666666666666666666666)
Vue.use(Plugin)
Vue.use(ElementUI)

Vue.use(G2)
Vue.use(ShotcutPlugin)

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
Vue.prototype.$solr_server_search = solr_server_search
window.$solr_server_search = solr_server_search
window.$toString = e => {
  return e instanceof Object ? JSON.stringify(e) : e
}
Vue.config.productionTip = false

// 初始化登录状态
if (localStorage.user_info) {
  let userInfo = JSON.parse(localStorage.user_info)
  console.log('初始化登录状态', userInfo)
  store.commit('SET_AUTH_USER', {
    userInfo,
    login_account: localStorage.login_account
  })
}
// store.commit('setTheme', localStorage.theme || 'default');

if (localStorage.sys) {
  store.commit('setRouterTabs', JSON.parse(localStorage.sys))
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
