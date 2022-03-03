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
      customFileProtocol: './',
      productName: '谭飞',
      appId: 'com.example.yourapp',
      // directories: {
      //   output: 'build'
      // },
      // files: ['dist/electron/**/*'],
      publish: [
        {
          provider: 'yanhaichao',
          url: 'https://malltest.osa.com/electron/'
        }
      ],
      dmg: {
        contents: [
          {
            x: 410,
            y: 150,
            type: 'link',
            path: '/Applications'
          },
          {
            x: 130,
            y: 150,
            type: 'file'
          }
        ]
      },
      mac: {
        icon: 'build/icons/icon.icns'
      },
      win: {
        icon: 'build/icons/icon.ico'
      },
      linux: {
        icon: 'build/icons'
      }
    }
  }
}
