import { powerMonitor } from 'electron'
// 电源事件注册
export function injectPowerEvents(win) {
  // 系统挂起
  powerMonitor.on('suspend', () => {
    win.webContents.send('main-process-messages', 'systemSuspend', true)
  })
  // 系统挂起恢复
  powerMonitor.on('resume', () => {
    win.webContents.send('main-process-messages', 'systemSuspend', false)
  })
  // 系统锁屏
  powerMonitor.on('lock-screen', () => {
    win.webContents.send('main-process-messages', 'systemLockScreen', true)
  })
  // 系统解锁
  powerMonitor.on('unlock-screen', () => {
    // doAutoUpdate(false, win); // 每次解锁检查更新
    win.webContents.send('main-process-messages', 'systemLockScreen', false)
  })
  // 系统关机 MAC,LINUX
  //当系统即将重启或关机时出发 如果事件调用e.preventDefault(), Electron 将会尝试延迟系统关机，以便 app 完全退出。 如果e.preventDefault()被调用，在调用类似 app.quit() 后，app 会很快地退出。
  powerMonitor.on('shutdown', () => {
    win.webContents.send('main-process-messages', 'systemShutdown', true)
  })
}
