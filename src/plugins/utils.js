const A_WEEK = 6 * 24 * 3600 * 1000 // 按6天算, 否则最早的聊天时间会和今天相同,比如上周一的聊天在本周一显示的时间为星期一,容易误解
const A_DAY = 24 * 3600 * 1000
const HALF_A_DAY = 12 * 3600 * 1000
const AN_HOUR = 3600 * 1000
const HALF_AN_HOUR = 1800 * 1000
const A_MINUTE = 60 * 1000
const WEEK_ARR = ['日', '一', '二', '三', '四', '五', '六']
export const timeFormat = (time = '', fullType = false) => {
  if (!time) return '很久以前'
  let now = Date.now()
  let inputDate = new Date(time)
  let inputDateStr = inputDate.toLocaleDateString()
  let inputDateTimeStr = inputDate.toLocaleTimeString('zh', { hour12: false })
  let diff = now - time
  if (fullType) {
    return `${inputDateStr} ${inputDateTimeStr}`
  }
  if (diff > A_WEEK) {
    return inputDateStr
  } else if (diff > A_DAY) {
    return `星期${WEEK_ARR[inputDate.getDay()]}`
  } else if (diff > HALF_A_DAY) {
    return `昨天`
  } else if (diff > AN_HOUR) {
    return `${parseInt(diff / AN_HOUR)}小时前`
  } else if (diff > HALF_AN_HOUR) {
    return `半小时前`
  } else if (diff > A_MINUTE) {
    return `${parseInt(diff / A_MINUTE)}分钟前`
  } else {
    return '刚刚' //parseInt(diff / 1000) > 10 ? `${Math.floor(diff / 5000) * 5}秒前`: '刚刚';
  }
}

export const hideString = function (string, start = 0, end = 999, dotLength = 0, hideDot = '*') {
  string = string + ''
  if (!string) return ''
  let str = string.slice(start, end)
  let dot = hideDot.repeat(dotLength || str.length)
  let result = string.length <= 2 ? `${string[0]}${dot}${string[1] || string[0]}` : string.replace(str, dot)
  return result
}

export const joinParams = function (params) {
  var str = ''
  for (var key in params) {
    str += key + '=' + encodeURI(params[key]) + '&'
  }
  str = str.slice(0, -1)
  return str
}
export function encode_str(str, solt = 'FAPw9srn9HXDXSaBt3WyDfSoQG0m4oZ7VTtklUew') {
  let padStart = Math.random().toString(36).substr(2, 8)
  let padEnd = Math.random().toString(36).substr(2, 6)
  return padEnd + btoa(`${padStart}${btoa(solt + encodeURIComponent(JSON.stringify(str)))}${padEnd}`)
}
export function decode_str(str, solt = 'FAPw9srn9HXDXSaBt3WyDfSoQG0m4oZ7VTtklUew') {
  let result = null
  let reg = new RegExp('^' + solt)
  try {
    result = decodeURIComponent(atob(atob(str.slice(6)).slice(8, -6)).replace(reg, ''))
    result = JSON.parse(result)
  } catch (error) {
    result = null
  }
  return result
}

export const shortcuts = [
  {
    text: '一天',
    value() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24)
      return [start, end]
    }
  },
  {
    text: '一周',
    value() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '一个月',
    value() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: '三个月',
    value() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]
