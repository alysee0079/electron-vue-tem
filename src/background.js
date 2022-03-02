import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
const { regCapture } = require('./capture/capture-main.js')
import { initTray } from './electron/tray'
import { injectWinEvents } from './electron/winEvents'
import { injectPowerEvents } from './electron/powerEvents'

const isDevelopment = process.env.NODE_ENV !== 'production'
const isDarwin = process.platform === 'darwin'
const icon_path = isDevelopment ? './public/static/img/logo.png' : path.join(__dirname, '/static/img/logo.png')
const { createModal } = require('./modalWindow/modal-main.js')

let tray = null // 系统托盘
let trayTimer = null // 系统托盘提示器
let win // 主窗口

async function createWindow() {
  win = new BrowserWindow({
    width: process.platform === 'win32' ? 1200 : 1400,
    height: 900,
    minWidth: isDarwin ? 800 : 1200,
    minHeight: isDarwin ? 650 : 760,
    useContentSize: true,
    fullscreen: false,
    frame: false /*去掉顶部导航 去掉关闭按钮 最大化最小化按钮*/,
    transparent: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: isDevelopment
    },
    show: true,
    icon: icon_path
  })
  // 初始化系统托盘
  tray = initTray(win, trayTimer)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    // Load the index.html when not in development
    win.loadURL(`file://${__dirname}/index.html`)
  }
  // 注册截图服务
  regCapture()
  win.setMenu(null) //隐藏顶部菜单
  global.mainWindowId = win.id
  // 注册窗口事件
  injectWinEvents(win, tray)

  // 注册电源事件
  injectPowerEvents(win)

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

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    clearInterval(trayTimer)
    trayTimer = null
    tray.destroy()
    tray = null
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// function flashTray(flash) {
//   let _icon_path = path.join(__static, './image/logo_dog_transparent.png')
//   if (flash) {
//     mainWindow.flashFrame(true)
//     if (trayTimer) return
//     let i = 0
//     trayTimer = setInterval(() => {
//       i += 1
//       tray.setImage(i % 2 == 0 ? icon_path : _icon_path)
//     }, 400)
//   } else {
//     mainWindow.flashFrame(false)
//     clearInterval(trayTimer)
//     trayTimer = null
//     tray.setImage(icon_path)
//   }
// }
