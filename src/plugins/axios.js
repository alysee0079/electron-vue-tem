import axios from 'axios'
import router from '../router/index'
require('https').globalAgent.options.rejectUnauthorized = false
import store from '../store'
import Vue from 'vue'
// import { Message } from 'element-ui'
import { server_config } from '../config/common.js'

window.axios = axios
const production_env = false //process.env.NODE_ENV === 'production';

const log_on = !production_env || localStorage['mmsghgn'] == 1984 // 测试环境下打印日志

const app_config = production_env
  ? {
      appkey: 'mmGdRIvDvY7E1hxX',
      secret: 'FAPw9srn9HXDXSaBt3WyDfSoQG0m4oZ7VTtklUew'
    }
  : {
      appkey: '1224283400',
      secret: 'qazwsxedcrfv'
    }

/*** 全局拦截器 ***/
const http = axios.create({
  baseURL: production_env ? 'productionUrl' : 'https://malltest.osa.com', // 'https://malltest.osa.com/'
  timeout: 30000
})

http.interceptors.request.use(
  function (config) {
    console.log('request++', config)
    //检查本地过期时间
    let expires_at = localStorage.expires_at
    let _now = new Date().getTime()
    if (!expires_at || _now > expires_at) {
      // let desc = '请先登录'
      // if (_now > expires_at) {
      //   //不存在过期时间或已过期, 未登录,判断是否为登录接口, 非登录接口都拦截掉
      //   desc = '授权已过期, 请重新登录'
      // }
      if (config.url.indexOf('/api/mobile/login') == -1) {
        //跳转至登录
        store.dispatch('loginCallback', location.pathname + location.search)
        router.replace({
          name: 'login'
        })
        store.dispatch('pushErrorMsg', { type: 'warning', message: '请重新登录', code: 401, duration: 5000 })
        return Promise.reject({})
      }
    }
    log_on && console.log(config)
    //调用 api 签名加密服务
    config = Vue.prototype.$api_auth(config, app_config)
    if (window.localStorage.getItem('pa_token')) {
      config.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('pa_token')
    }
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  response => {
    console.log('response++', response)
    if (log_on) {
      console.group('http request success:', response.config.baseURL)
      console.info('path: ', response.config.url.substring(response.config.baseURL.length))
      ;(response.config.method == 'post' || response.config.method == 'put') && console.info('request data:', JSON.parse(response.config.data))
      console.info('response: ', response.data)
      console.groupEnd()
      if (response.data.status == 'error') {
        store.dispatch('pushErrorMsg', { type: 'error', message: response.data.message.msg, code: 401, duration: 5000 })
      }
    }
    return response
  },
  error => {
    if (error.response) {
      console.error('http request error:', error.response)
      return Promise.reject(error.response.data)
    } else {
      console.error('http request error:', error)
      return Promise.reject(error)
    }
  }
)

const solr_server_search = function (params, sortArr = []) {
  params.rows = params.rows || params.limit
  delete params.limit
  //首页查询商品数据使用
  const username = server_config.server_host == 'https://tfeimall.com' ? 'admin' : 'solradmin'
  const password = server_config.server_host == 'https://tfeimall.com' ? 'TWduo6TjBx0PGTJA' : 'tf@Solr2021'
  const credentials = btoa(`${username}:${password}`)
  let search_host = {
    'https://tfeimall.com': 'solr.tfeimall.com',
    'https://malltest.osa.com': 'searchmalltest.osa.com',
    default: 'searchmall.osa.com'
  }
  let params_str = Vue.prototype.$joinParams(params)
  let _host = search_host[location.origin] || search_host.default
  return axios
    .post(`https://${_host}/solr/tf_mall/select`, params_str, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: 'Basic ' + credentials
      }
    })
    .then(res => {
      if (res.status == 200) {
        let sortObj = null
        if (sortArr.length) {
          sortObj = {}
          sortArr.map((item, index) => {
            sortObj[item] = index
          })
        }
        let data = res.data.response.docs
        data.forEach(item => {
          item.goods_id = item.id
        })
        if (sortObj) data.sort((a, b) => sortObj[a.goods_id] - sortObj[b.goods_id])
        return {
          data,
          status: res.status,
          code: res.status
        }
      }
    })
}
//ws 接口
const chat_post = axios.create({
  baseURL: production_env ? 'productionUrl' : 'https://ws.osa.com', // 'https://malltest.osa.com/'
  timeout: 30000
})
export { http, chat_post, solr_server_search }
