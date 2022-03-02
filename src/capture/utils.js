import electron from 'electron'
const remote = electron.remote

let currentWindow = remote.getCurrentWindow()

const getCurrentScreen = () => {
  let { x, y } = currentWindow.getBounds()
  return remote.screen.getAllDisplays().filter(d => d.bounds.x === x && d.bounds.y === y)[0]
}

const isCursorInCurrentWindow = () => {
  let { x, y } = remote.screen.getCursorScreenPoint()
  let { x: winX, y: winY, width, height } = currentWindow.getBounds()
  return x >= winX && x <= winX + width && y >= winY && y <= winY + height
}

exports.getCurrentScreen = getCurrentScreen
exports.isCursorInCurrentWindow = isCursorInCurrentWindow
