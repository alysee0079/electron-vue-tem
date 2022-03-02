import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/refresh',
          name: 'refresh',
          component: require('./refresh.vue').default
        },
        {
          path: '/',
          name: 'workbench',
          component: require('@/components/Workbench/index').default,
          meta: {
            title: '工作台'
          }
        },
        {
          path: '/homePage',
          name: 'homePage',
          component: require('@/components/Page/index').default,
          meta: {
            title: '首页'
          }
        },
        {
          path: '/chat',
          name: 'chat',
          component: require('@/components/Chat/index').default,
          meta: {
            title: '沟通'
          },
          children: [
            {
              path: 'room/:id/:chatType',
              name: 'chatroom',
              component: require('@/components/Chat/room/chatroom').default,
              meta: {
                title: '在线客服'
              }
            }
          ]
        },
        {
          path: '/customer',
          name: 'customer',
          component: require('@/components/Customer/index').default,
          meta: {
            title: '我的会员'
          }
        },
        {
          path: '/goods',
          name: 'goods',
          component: require('@/components/Goods/index').default,
          meta: {
            title: '商品'
          }
        },
        {
          path: '/order',
          name: 'order',
          component: require('@/components/Order/index').default,
          meta: {
            title: '订单'
          }
        },
        {
          path: '/aftersale',
          name: 'aftersale',
          component: require('@/components/Aftersale/index').default,
          meta: {
            title: '售后'
          }
        },
        {
          path: '/friends',
          name: 'friends',
          component: require('@/components/Friends/index').default,
          meta: {
            title: '朋友圈'
          }
        },
        {
          path: '/realTimeSales',
          name: 'realTimeSales',
          component: require('@/components/RealTimeSales/index').default,
          meta: {
            title: '实时销售'
          }
        },
        {
          path: '/system',
          name: 'system',
          component: require('@/components/System/index').default,
          meta: {
            title: '设置'
          }
        },
        {
          path: '/loginLog',
          name: 'loginLog',
          component: require('@/components/LoginLog/index').default,
          meta: {
            title: '登录日志'
          }
        },
        {
          path: '/syset',
          name: 'syset',
          component: require('@/components/Syset/index').default,
          meta: {
            title: '设置'
          }
        },
        {
          path: '/analysis',
          name: 'analysis',
          component: require('@/components/Analysis/index').default,
          meta: {
            title: '爆款参谋'
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log('to', to, from)
  if (store.getters.login_status) {
    next()
    if (to.matched[0].path == '/home' && to.name != 'refresh') store.dispatch('updateRouterTabs', to)
  } else if (to.name != 'login') {
    next({ path: '/login', replace: true, query: { redirect: to.fullPath } })
  } else {
    next()
  }
})
//获取原型对象上的push函数
// const originalPush = Router.prototype.push
// //修改原型对象中的push方法
// Router.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
// }
export default router
