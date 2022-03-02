const { getCurrentScreen } = require('./utils')
import { desktopCapturer } from 'electron'
import os from 'os'

const curScreen = getCurrentScreen()

function getScreen(callback) {
  this.callback = callback

  // document.body.style.opacity = '0'
  document.documentElement.style.opacity = '0'
  let oldCursor = document.body.style.cursor
  document.body.style.cursor = 'none'

  this.handleStream = stream => {
    document.body.style.cursor = oldCursor
    document.documentElement.style.opacity = '1'

    let video = document.createElement('video')
    video.autoplay = true
    video.addEventListener('play', () => {
      video.pause()
      video.style.height = video.videoHeight + 'px'
      video.style.width = video.videoWidth + 'px'
      let canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      let ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      if (this.callback) {
        this.callback(canvas.toDataURL('image/png'))
      }
      video.remove()
      try {
        stream.getTracks()[0].stop()
      } catch (e) {
        //
      }
    })

    video.srcObject = stream
  }

  this.handleError = e => {
    console.log(e)
  }

  if (os.platform() === 'win32') {
    desktopCapturer.getSources(
      {
        types: ['screen'],
        thumbnailSize: { width: 0, height: 0 }
      },
      (e, sources) => {
        // let selectSource = sources.filter(source => source.display_id + '' === curScreen.id + '')[0]
        navigator.getUserMedia(
          {
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: sources[0].id + '',
                minWidth: 1280,
                minHeight: 720,
                maxWidth: 8000,
                maxHeight: 8000
              }
            }
          },
          e => {
            this.handleStream(e)
          },
          this.handleError
        )
      }
    )
  } else {
    navigator.getUserMedia(
      {
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: `screen:${curScreen.id}`,
            minWidth: 1280,
            minHeight: 720,
            maxWidth: 8000,
            maxHeight: 8000
          }
        }
      },
      e => {
        this.handleStream(e)
      },
      this.handleError
    )
  }
}

exports.getScreenSources = callback => {
  getScreen(callback)
}
