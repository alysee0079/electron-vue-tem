<template>
  <div class="flex-col align-items-stretch height-100 width-100">
    <div class="flex-space-between border-1px-b webview-header padding-rl-10">
      <div class="flex-start">
        <i class="el-icon-arrow-left padding-rl-10 pointer" title="后退" :style="{ color: canGoBack ? '#666' : '#ddd' }" @click="goback"></i>
        <i class="el-icon-refresh padding-rl-10 pointer" title="刷新" :style="{ color: '#666' }" @click="refresh"></i>
        <i class="el-icon-link padding-rl-10 pointer" title="复制链接" :style="{ color: '#666' }" @click="copyLink"></i>
        <i class="el-icon-monitor padding-rl-10 pointer" title="默认浏览器打开" :style="{ color: '#666' }" @click="openBySystemBrower"></i>
        <i class="el-icon-place padding-rl-10 pointer" title="置顶窗口" :style="{ color: '#666' }" @click="topFixedWindow"></i>
      </div>
      <div>
        <i class="el-icon-connection padding-rl-10 pointer" title="复制分享链接" :style="{ color: '#888' }" @click="copyShareLink"></i>
        <i class="el-icon-share padding-rl-10 pointer" title="分享" :style="{ color: '#888' }" @click="showUserListModal = true"></i>
      </div>
    </div>
    <webview
      v-if="src"
      :src="src"
      :preload="preloadUrl"
      useragent="Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1 YingerFashion/1.0"
      class="width-100 webview-box"
    ></webview>
    <!-- 我的会员列表 -->
    <!-- <user-list-modal v-model="showUserListModal" @selectOk="selectOk"></user-list-modal> -->
  </div>
</template>

<script>
import { clipboard, remote, shell } from 'electron'
import { encode_str } from '../../../plugins/utils'
import path from 'path'

export default {
  name: 'web-view',
  data() {
    return {
      src: '',
      canGoBack: false,
      showUserListModal: false,
      preloadUrl: process.env.NODE_ENV !== 'development' ? 'static/yingerShare.js' : path.join(__static, './yingerShare.js'),
      alwaysOnTop: false
    }
  },
  created() {
    let baseUrl = 'https://malltest.osa.com/mobile/index.html#'
    // let baseUrl = 'http://localhost:8080/#'
    let query = this.$route.query
    this.src = `${baseUrl}${query.page}`
    this.firstLoad = true
  },
  mounted() {
    const webview = document.querySelector('webview')
    this.webview = webview
    let user_info = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null
    webview.addEventListener('load-commit', () => {
      if (this.firstLoad) {
        this.firstLoad = false
        if (user_info) {
          let member_id = user_info.member_id
          let user_info_str = encode_str(user_info)
          webview.executeJavaScript(`
            localStorage.user_info = '${user_info_str}';
            sessionStorage.store_id = '${member_id}';
          `)
        }
      }
      // webview.openDevTools();
      this.canGoBack = webview.canGoBack()
    })
    webview.addEventListener('dom-ready', () => {
      webview.insertCSS(`
        ::-webkit-scrollbar{width: 5px;height: 5px;border-radius:5px;background-color: transparent;}
        ::-webkit-scrollbar-thumb{background-color: #ccc;border-radius:5px;}
      `)
    })
  },
  methods: {
    goback() {
      if (!this.canGoBack) return
      this.webview.goBack()
    },
    refresh() {
      this.webview.reloadIgnoringCache()
    },
    copyLink() {
      clipboard.writeText(this.webview.src)
      this.$Message.success('复制成功')
    },
    copyShareLink() {
      this.webview
        .executeJavaScript('window.getTfShareConfig()')
        .then(config => {
          clipboard.writeText(config.link)
          this.$Message.success('复制成功')
        })
        .catch(() => {
          this.$Message.error('复制失败')
        })
    },
    selectOk(list) {
      this.webview
        .executeJavaScript('window.getTfShareConfig()')
        .then(config => {
          remote.BrowserWindow.fromId(remote.getGlobal('mainWindowId')).webContents.send('modal-process-messages', 'sharePage', {
            userList: list,
            shareConfig: config
          })
          this.$Message.success('分享成功')
        })
        .catch(() => {
          this.$Message.error('分享失败')
        })
    },
    openBySystemBrower() {
      shell.openExternal(this.webview.src)
    },
    topFixedWindow() {
      this.alwaysOnTop = this.$setTop()
    }
  }
}
</script>

<style scoped>
.webview-header {
  height: 36px;
}
.webview-box {
  height: calc(100% - 36px);
}
</style>
