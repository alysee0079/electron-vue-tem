// 系统托盘配置
import { app, Tray, Menu } from 'electron'
import path from 'path'
const isDarwin = process.platform === 'darwin'
const icon_path = path.join(__static, './static/img/logo.png')

function initTray(win, trayTimer) {
  let tray = null // 系统托盘
  if (isDarwin) {
    app.dock.setIcon(icon_path)
  } else {
    tray = new Tray(icon_path)
    const contextMenu = Menu.buildFromTemplate([
      { label: '显示主窗口', type: 'normal', click: () => win.show() },
      {
        label: '退出',
        type: 'normal',
        click: () => {
          win.hide()
          win.close()
          tray.destroy()
          tray = null
          app.exit()
        }
      }
    ])
    tray.setToolTip('谭飞商城')
    tray.setContextMenu(contextMenu)
    tray.on('click', () => {
      if (!isDarwin && trayTimer) {
        win.isMinimized() && win.restore()
        win.show()
        win.moveTop()
        win.focus()
        win.flashFrame(false)
        win.webContents.send('main-process-messages', 'pathToRoute', '/chat')
      } else {
        // win.webContents.send('main-process-messages', 'log', {
        //   isMin: win.isMinimized(),
        //   isVisible: win.isVisible(),
        // })
        win.isVisible() ? win.hide() : win.show()
      }
    })
  }
  return tray
}

export { initTray }
