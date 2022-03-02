// 主进程监听事件
import { ipcMain } from 'electron'
const { createModal } = require('../modalWindow/modal-main.js')

export function injectIpcMainEvents(win) {
  // 监听事件调起弹窗
  ipcMain.on('showModal', (event, args) => {
    console.log('监听事件调起弹窗', args)
    createModal({
      route: args.route || '',
      query: args.query || {},
      options: args.options || {}
    })
  })
  //窗口最小化
  ipcMain.on('window-min', function () {
    win.minimize()
  })
  //登录窗口最大化
  ipcMain.on('window-max', function () {
    if (win.isMaximized()) {
      win.restore()
    } else {
      win.maximize()
    }
  })
  ipcMain.on('window-close', function () {
    win.close()
  })
}
