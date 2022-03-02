<template>
  <div class="flex-start relative bg-white width-100">
    <split-pane
      :style="{ height: '100%', width: '100%' }"
      right
      min="200px"
      :max="65"
      @on-trigger-moving="handleMoving"
      direction="horizontal"
      v-model="triggerOffset"
    >
      <chat-list slot="left" v-if="chatRoomType == 'IM'"></chat-list>
      <weChat-list slot="left" v-else></weChat-list>
      <div class="split-pane-right-con split-content align-items-stretch flex-start" slot="right">
        <div class="flex-col-start flex-item">
          <!-- <div v-if="socketStatus !== 1" class="width-100 padding-rl-20 padding-tb-10">
            <Alert
              show-icon
              banner
              type="error"
              style="align-self: flex-start;"
              class="text-center font-16 color-gray"
            >{{socketStatus == 0 ? '通讯正在连接...' : (socketStatus == 2 ? '通讯正在关闭' : socketStatus == 4 ? '请检查是否为最新版本!':'通讯连接中...')}}</Alert>
          </div> -->

          <router-view class="flex-item" v-show="currentChatUserId"></router-view>
        </div>
      </div>
    </split-pane>
  </div>
</template>
<script>
import splitPane from './components/splitPanel/index'
import { mapGetters } from 'vuex'
import ChatList from './list.vue'
import WeChatList from './weChatList.vue'
import { ipcRenderer } from 'electron'
export default {
  name: 'chatRoom',
  components: { splitPane, ChatList, WeChatList },
  data() {
    return {
      socket: null,
      triggerOffset: 75,
      triggerOffsetV: 70,
      triggerOffsetMin: 40,
      atMax: false,
      atMin: false
    }
  },
  computed: {
    ...mapGetters(['socketStatus', 'currentChatUserId', 'chatRoomType'])
  },
  beforeRouteEnter(to, from, next) {
    ipcRenderer.send('chatMessageChange', { flash: false, pageHidden: false })
    next()
  },
  methods: {
    handleMousedown(e) {
      this.$refs.pane.handleMousedown(e)
    },
    handleMoving(e) {
      this.atMax = e.atMax
      this.atMin = e.atMin
    }
  }
}
</script>

<style scoped>
.split-content {
  height: 100%;
}
</style>
