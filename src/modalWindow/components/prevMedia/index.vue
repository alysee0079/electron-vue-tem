<template>
  <div id="media-prev relative">
    <viewer :options="options" :images="images" @inited="inited" class="viewer" ref="viewer">
      <img v-for="src in images" style="display: none" :src="src" :key="src" />
    </viewer>
    <Button
      v-if="showDownload"
      @click="saveImage"
      :loading="saveLoading"
      :style="{ bottom: bottom + 'px' }"
      class="pointer prev-download color-white text-center"
      title="保存图片"
      icon="ios-download-outline"
      type="text"
      shape="circle"
    ></Button>
  </div>
</template>

<script>
import { remote } from 'electron'
import fs from 'fs'
import path from 'path'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer/src/component.vue'
import streamDownload from '../../../plugins/download'
export default {
  name: 'prevMedia',
  components: { Viewer },
  data() {
    return {
      images: [],
      options: {
        container: '#media-prev',
        backdrop: false,
        button: false,
        toolbar: {
          zoomIn: true,
          zoomOut: true,
          oneToOne: true,
          reset: true,
          prev: true,
          play: false,
          next: true,
          rotateLeft: true,
          rotateRight: true,
          flipHorizontal: true,
          flipVertical: true
        },
        inline: false,
        fullscreen: true,
        title: false,
        loop: true,
        navbar: false,
        initialViewIndex: 0,
        view: this.viewImage
      },
      activeIndex: 0,
      saveLoading: false,
      showDownload: true
    }
  },
  computed: {
    bottom: function () {
      return this.options.navbar ? 64 : 12
    }
  },
  created() {
    let { url, isList = 0, showToolbar = 1, showNavbar = 1, showDownload = 1 } = this.$route.query
    this.showDownload = showDownload == 1
    if (isList == 1) {
      let list = localStorage.getItem(`modal_prev_images_list`)
      this.isList = isList
      this.images = JSON.parse(list)
      let activeIndex = this.images.findIndex(v => v == url)
      this.options.initialViewIndex = activeIndex
      this.activeIndex = activeIndex
      this.options.navbar = showNavbar == 1
    } else {
      this.images.push(url)
      if (showToolbar == 1) {
        this.options.toolbar.prev = false
        this.options.toolbar.next = false
      } else {
        this.options.toolbar = false
      }
      this.options.navbar = false
    }
  },
  beforeDestroy() {
    if (this.isList) localStorage.removeItem(`modal_prev_images_list`)
  },
  methods: {
    inited(viewer) {
      this.$viewer = viewer
      viewer.show()
    },
    viewImage(e) {
      this.activeIndex = e.detail.index
    },
    saveImage() {
      let image_url = this.images[this.activeIndex]
      let random_str = `yinger_${Math.random().toString(36).substr(2, 10)}_${Date.now()}` // 随机字符串，避免重名
      remote.dialog.showSaveDialog({ defaultPath: random_str, filters: [{ name: 'Images', extensions: ['png', 'jpg', 'gif'] }] }, dist_path => {
        if (dist_path) {
          this.saveLoading = true
          let path_obj = path.parse(dist_path)
          if (image_url.indexOf('http') == 0) {
            streamDownload.downloadFile(image_url, path_obj.base, path_obj.dir, (status, precent) => {
              if (status == 'finished') {
                if (precent < 100) return this.$Message.error('图片下载失败')
                this.$Message.success('图片保存成功')
                this.saveLoading = false
              }
            })
          } else if (image_url.indexOf('file:///') == 0) {
            image_url = decodeURI(image_url)
            const image_url_path = image_url.slice(remote.process.platform == 'win32' ? 8 : 7)
            fs.copyFile(image_url_path, dist_path, err => {
              if (err) return this.$Message.error('图片保存失败')
              this.$Message.success('图片保存成功')
              this.saveLoading = false
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.prev-download {
  position: absolute;
  height: 36px;
  width: 36px;
  right: 8px;
  bottom: 64px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  border-radius: 50%;
  font-size: 20px;
}
</style>
