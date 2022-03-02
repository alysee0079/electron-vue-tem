import { hideString, joinParams } from './utils'
import md5 from 'md5'

function plugin(Vue) {
  Vue.prototype.$jump = function (name, query) {
    this.$router.push({ name: name, query: query })
  }
  Vue.prototype.$hideString = hideString
  Vue.prototype.$joinParams = joinParams
  Vue.prototype.$imageCompose = function (id, base, comp, x, y, fontConfig) {
    return new Promise((resolve, reject) => {
      try {
        /**
         * 如果传进来的base||comp的url属性 是 base64编码,请确保已经加载完成,不然有以下异常
         * Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The HTMLImageElement provided is in the 'broken' state.
         * 原因异常里说的很清楚,img标签未加载完成处于broken状态
         * 同时,请确保当前域名与要加载的图片地址在同一域名内,不然会有以下异常
         * Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.
         * 该异常请自行百度寻找说明
         */
        const ctx = document.getElementById(id).getContext('2d')

        const img1 = new Image()
        img1.src = base.url
        const img2 = new Image()
        img2.src = comp.url

        img1.onload = function () {
          ctx.drawImage(img1, 0, 0, base.width, base.height)
          ctx.drawImage(img2, x, y, comp.width, comp.height)
          ctx.font = fontConfig.font || '18px bold 黑体'
          ctx.fillStyle = fontConfig.fillStyle || '#ff0'
          ctx.fillText(fontConfig.text, fontConfig.x, fontConfig.y)
          resolve(document.getElementById(id).toDataURL('image/png'))
        }
      } catch (error) {
        reject('Sorry, something look wrong!')
      }
    })
  }
  Vue.prototype.$ossUrlTest = function (url) {
    const reg = /aliyuncs\.com/gi
    const reg2 = /^\/storage/
    const reg3 = /public\//
    const reg4 = /^http/
    let _url = ''
    if (reg.test(url) || reg4.test(url)) {
      _url = url
    } else if (reg2.test(url)) {
      _url = 'http://zone.yingerfashion.com' + url
    } else if (reg3.test(url)) {
      if (/^\/public\//.test(url)) {
        _url = 'http://mall.yingerfashion.com' + url
      } else {
        _url = 'http://mall.yingerfashion.com/' + url
      }
    }
    return _url
  }
  Vue.prototype.$testPlatform = function () {
    var u = navigator.userAgent
    // app = navigator.appVersion
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    if (isAndroid) return { platform: 'isAndroid' }
    if (isIOS) return { platform: 'isIOS' }
  }

  Vue.prototype.$time_formate = function (time, format = 'yyyy/MM/dd hh:mm:ss') {
    var date = new Date()
    var reg = /^[1-9]\d{3}[-|\/](0[1-9]|1[0-2])[-|\/](0[1-9]|[1-2][0-9]|3[0-1])([\s+](20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d)?$/i
    if (/^\d{10}$/.test(time)) {
      // 1592531554 s
      date = new Date(time * 1000)
    } else if (/^\d{13}$/.test(time)) {
      // ms
      date = new Date(time - 0)
    } else if (reg.test(time)) {
      // 2020-09-09 | 2020/09/09 | 2020-09-09 12:12:12 | 2020/09/09 12:12:12
      date = new Date(time.replace(/-/g, '/')) // IOS兼容
    } else if (!isNaN(+new Date(time))) {
      // 其他情况，包括 2020-02-07T03:56:17.000Z, Wed Jul 01 2020 14:46:51 GMT+0800,
      // 强制转换一下, 验证是否为合法时间字符串
      date = new Date(time)
    } else {
      console.error('时间格式不正确', time)
    }
    if (format == 'seconds') return parseInt(date.getTime() / 1000)
    if (format == 'milliseconds') return date.getTime()
    var o = {
      'M+': date.getMonth() + 1, //month
      'd+': date.getDate(), //day
      'h+': date.getHours(), //hour
      'm+': date.getMinutes(), //minute
      's+': date.getSeconds(), //second
      'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
      S: date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return format
  }
  Vue.prototype.$arrayJump = function (arr, index, type) {
    //数组跳序
    let _item = arr.splice(index, 1)
    if (type == 1) {
      arr.splice(index - 1, 0, _item[0])
    } else if (type == -1) {
      arr.splice(index + 1, 0, _item[0])
    }
    return arr
  }
  Vue.prototype.$toTree = function (arr, parent_key, key, aliasLabel, originLabel, aliasVal, originVal) {
    //递归遍历生成树形
    let _tree = []
    let map = {}
    arr.forEach(item => {
      item.expand = true
      if (aliasLabel) {
        item[aliasLabel] = item[originLabel]
      }
      if (aliasVal) {
        item[aliasVal] = item[originVal]
      }

      map[item[key]] = item
    })
    //检查当前节点是否存在子节点
    arr.forEach(item => {
      var parent = map[item[parent_key]]
      if (parent) {
        ;(parent.children || (parent.children = [])).push(item)
      } else {
        _tree.push(item)
      }
    })
    //产生一级嵌套数组
    return _tree
  }
  Vue.prototype.$calcTime = function (time_stamp) {
    var vm = this
    var t = time_stamp / 1000
    var day = Math.floor(t / (24 * 3600))
    var hour = Math.floor((t - day * 24 * 60 * 60) / 3600)
    var minute = Math.floor((t - day * 24 * 60 * 60 - hour * 60 * 60) / 60)
    var second = Math.floor(t - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60)
    if (vm.showHours) hour = day * 24 + hour
    return {
      day,
      hour,
      minute,
      second
    }
  }
  Vue.prototype.$validateUrl = function (url) {
    var reg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
    return reg.test(url)
  }
  Vue.prototype.$validatePhoneNo = function (phoneNo) {
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    return reg.test(phoneNo)
  }

  Vue.prototype.$get_url_parms_obj = function (url) {
    var params = {}
    //检测是否存在?   decode解析中文字符串
    url = decodeURI(url)
    if (url.indexOf('?') != -1) {
      url = url.split('?')[1]
    } else {
      return params
    }
    var arr = url.split('&')
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        var arr_ = arr[i].split('=')
        var parm_key = arr_[0]
        var parm_value = arr_[1]
        params[parm_key] = parm_value
      }
    }
    return params
  }

  Vue.prototype.$mobileAuth = function (another_phone) {
    return /^1[3|4|5|6|7|8|9]\d{9}$/.test(another_phone) ? true : false
  }
  Vue.prototype.$api_auth = function (config, app_config) {
    //api 签名加密服务
    let timestamp = parseInt(Date.now() / 1000)
    let { url, method, data } = config
    let form = {
      timestamp,
      appkey: app_config.appkey
    }
    if (method == 'get') {
      let sign_url = auth_get(url, form, app_config)
      config.url = sign_url
    } else if (method == 'post') {
      if (data.constructor == FormData) {
        config.data = data
      } else {
        let body = auth_post(data, form, app_config)
        let arr = Object.keys(body)
        arr.sort()
        let obj = {}
        arr.forEach(item => {
          obj[item] = body[item]
        })
        config.data = obj
      }
    } else if (method == 'delete') {
      let sign_url = auth_get(url, form, app_config)
      config.url = sign_url
    } else if (method == 'put') {
      let body = auth_post(data, form, app_config)
      let arr = Object.keys(body)
      arr.sort()
      let obj = {}
      arr.forEach(item => {
        obj[item] = body[item]
      })
      config.data = obj
    }
    return config
  }
  Vue.prototype.$eventBus = new Vue()

  function auth_get(api, form, app_config) {
    let params = Vue.prototype.$get_url_parms_obj(api)
    let _route = api.split('?')[0]
    params = Object.assign({}, params, form)
    let str_data = jsonSort(params) + app_config.secret
    var sign = md5(str_data)
    params.sign = sign.toUpperCase()
    let str_params = Vue.prototype.$joinParams(params)
    let sign_url = _route + '?' + str_params
    return sign_url
  }

  function auth_post(params, form, app_config) {
    params = Object.assign({}, params, form)
    let str_data = jsonSort(params) + app_config.secret
    var sign = md5(str_data)
    params.sign = sign.toUpperCase()
    return params
  }
  function jsonSort(jsonObj) {
    let str = ''
    let arr = Object.keys(jsonObj)
    arr.sort()
    arr.forEach(item => {
      str += item
      // str += item + jsonObj[item];
    })
    console.log('sign', str)
    return str
  }
}

export default plugin
