import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/webView',
      name: 'webView',
      component: require('../components/webView').default
    },
    {
      path: '/productView',
      name: 'productView',
      component: require('../components/productView').default
    },
    {
      path: '/chartMemberView',
      name: 'chartMemberView',
      component: require('../components/chartMemberView').default
    },
    {
      path: '/weChatUserList',
      name: 'weChatUserList',
      component: require('../components/weChatUserList').default
    }
  ]
})
