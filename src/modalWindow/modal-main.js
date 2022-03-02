import { BrowserWindow } from 'electron'
// const path = require('path')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
// if (process.env.NODE_ENV !== 'development') {
//   global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
// }
const joinParams = function (params) {
  var str = ''
  for (var key in params) {
    str += key + '=' + encodeURIComponent(params[key]) + '&'
  }
  str = str.slice(0, -1)
  return str
}
// const icon_path = path.join(__static, './images/logo.png')
const icon_path = 'src/assets/images/logo.png'

let modalWindowsMap = {}
let modalUrl
/**
 *
 * @param {route} route 根据modal窗口类型确定的route,对应modal的路由
 * @param {query} query 页面路由参数
 * @param {options} options 新建窗口参数
 */
export const createModal = ({ route = '', query = {}, options = {} }) => {
  /**
   * Initial window options
   */
  let modalWindow
  let queryStr = joinParams(query)
  modalUrl =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:8080/modal.html#/${route}?${queryStr}`
      : `file://${__dirname}/modal.html#/${route}?${queryStr}`
  if (modalWindowsMap[route]) {
    modalWindow = modalWindowsMap[route]
    modalWindow.show()
  } else {
    const defaultOptions = {
      width: process.platform === 'win32' ? 960 : 800,
      height: process.platform === 'win32' ? 800 : 600,
      minWidth: 375,
      minHeight: 667,
      useContentSize: true,
      fullscreen: false,
      frame: true,
      transparent: false,
      // titleBarStyle: 'hidden',
      title: 'Modal',
      autoHideMenuBar: true,
      alwaysOnTop: false,
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        contextIsolation: false,
        // webviewTag: true,
        devTools: true //process.env.NODE_ENV === 'development',
      },
      show: true,
      icon: icon_path
    }
    const finalOptions = Object.assign({}, defaultOptions, options)
    modalWindow = new BrowserWindow(finalOptions)
    modalWindowsMap[route] = modalWindow
  }
  modalWindow.webContents.openDevTools()
  modalWindow.loadURL(modalUrl)
  modalWindow.isMaximized() && modalWindow.unmaximize()
  modalWindow.isMinimized() && modalWindow.restore()
  modalWindow.moveTop()
  modalWindow.center()
  modalWindow.isVisible() && modalWindow.show()

  // 窗口已经关闭
  modalWindow.on('close', () => {
    console.log(79)
    modalWindow.hide()
  })
  // 窗口已经关闭
  modalWindow.on('closed', () => {
    console.log(83)
    modalWindow = null
    modalWindowsMap[route] = null
  })
}
export const destroyModal = () => {
  for (const key in modalWindowsMap) {
    if (Object.hasOwnProperty.call(modalWindowsMap, key)) {
      const window = modalWindowsMap[key]
      if (window) {
        window.close()
        modalWindowsMap[key] = null
      }
    }
  }
}
