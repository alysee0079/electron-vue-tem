import { BrowserWindow, ipcMain, globalShortcut, screen } from 'electron'
const os = require('os')
const path = require('path')
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let captureWins = []

export const captureScreen = () => {
  if (captureWins.length) {
    return
  }

  let displays = screen.getAllDisplays()
  captureWins = displays.map(display => {
    let captureWin = new BrowserWindow({
      // window 使用 fullscreen,  mac 设置为 undefined, 不可为 false
      fullscreen: os.platform() === 'win32' || undefined,
      width: display.bounds.width,
      height: display.bounds.height,
      x: display.bounds.x,
      y: display.bounds.y,
      transparent: true,
      frame: false,
      skipTaskbar: true,
      autoHideMenuBar: true,
      movable: false,
      resizable: false,
      enableLargerThanScreen: true,
      hasShadow: false,
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        webviewTag: false,
        devTools: process.env.NODE_ENV === 'development'
      }
    })
    captureWin.setAlwaysOnTop(true, 'screen-saver')
    captureWin.setVisibleOnAllWorkspaces(true)
    captureWin.setFullScreenable(false)

    let url = process.env.NODE_ENV === 'development' ? `http://localhost:9080/capture.html` : `file://${__dirname}/capture.html`
    captureWin.loadURL(url)

    // 调试用
    // captureWin.openDevTools()

    let { x, y } = screen.getCursorScreenPoint()
    if (
      x >= display.bounds.x &&
      x <= display.bounds.x + display.bounds.width &&
      y >= display.bounds.y &&
      y <= display.bounds.y + display.bounds.height
    ) {
      captureWin.focus()
    } else {
      captureWin.blur()
    }

    captureWin.on('closed', () => {
      let index = captureWins.indexOf(captureWin)
      if (index !== -1) {
        captureWins.splice(index, 1)
      }
      captureWins.forEach(win => win.close())
    })
    return captureWin
  })
}

export const regCapture = () => {
  globalShortcut.register('CommandOrControl+Shift+A', captureScreen)
  globalShortcut.register('CommandOrControl+Shift+Z', () => {
    if (captureWins) {
      captureWins.forEach(win => win.close())
      captureWins = []
    }
  })

  ipcMain.on('capture-screen', (e, { type = 'start', screenId } = {}) => {
    if (type === 'start') {
      captureScreen()
    } else if (type === 'complete') {
      // nothing
    } else if (type === 'select') {
      captureWins.forEach(win => win.webContents.send('capture-screen', { type: 'select', screenId }))
    }
  })
}
