// 窗口事件注册
export function injectWinEvents(win, tray) {
  // 窗口隐藏
  win.on('show', () => {
    win.webContents.send('main-process-messages', 'windowShow', true)
  })
  // 窗口显示
  win.on('hide', () => {
    win.webContents.send('main-process-messages', 'windowShow', false)
  })
  // 窗口聚焦
  win.on('focus', () => {
    win.webContents.send('main-process-messages', 'windowFocus', true)
    // !isDarwin && flashTray(false);
  })
  // 窗口失焦
  win.on('blur', () => {
    win.webContents.send('main-process-messages', 'windowFocus', false)
  })
  // 窗口关闭
  win.on('close', () => {
    tray.destroy()
    win.destroy()
  })
}
