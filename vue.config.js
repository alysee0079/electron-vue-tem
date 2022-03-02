module.exports = {
  publicPath: './',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    },
    modal: {
      entry: 'src/modalWindow/modal-renderer.js',
      template: 'public/index.html',
      filename: 'modal.html'
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      contextIsolation: false,
      customFileProtocol: './'
    }
  }
}
