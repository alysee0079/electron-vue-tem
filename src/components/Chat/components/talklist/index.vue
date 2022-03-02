<template>
  <div class="flex-item clear-float height-100 relative">
    <div class="talklist padding-rl-10 height-100" ref="talk-list" @scroll.passive="talkListScroll">
      <ul ref="talklist-ul" id="talklist-ul" class="list-ul relative padding-b-10">
        <template v-for="(item, index) in currentChatMessageList">
          <!-- 居中显示的系统性消息 -->
          <li :key="index" v-if="[14, 16].includes(item.type)" class="flex-center">
            <p class="bg-gray margin-tb-10 color-light font-mini padding-rl-10 border-r-5">
              {{ item.content }}
              <!-- <span class="color-blue pointer">查看对话记录</span> -->
            </p>
          </li>
          <li v-else class="item flex-start-center padding-t-10" :class="item.sendUserId != currentChatUserId ? 'right' : ''" :key="index">
            <div class="link-img avatar chat-robot">
              <!--本地头像-->
              <img
                v-if="item.sendUserId != currentChatUserId"
                :src="item.SenderImgurl ? item.SenderImgurl : item.MsgId ? server_config.chat_robot : userInfo.avatar"
              />
              <!--客户头像-->
              <img
                v-else
                :src="item.sendUserId.indexOf('temp') > -1 ? server_config.new_user : item.SenderImgurl || item.avatar || server_config.vipIcon"
              />
            </div>
            <div :style="{ 'text-align': item.sendUserId != currentChatUserId ? 'right' : '' }" class="talk-text-box border-r-5">
              <p class="margin-b-5 font-12 no-wrap" style="color: #aeaeae" :class="item.sendUserId != currentChatUserId ? 'flex-end' : ''">
                <span class="margin-r-5" style="order: 2">
                  <span v-if="item.sendUserId != currentChatUserId">
                    {{ item.SenderNickname ? item.SenderNickname : item.MsgId ? '谭飞机器人' : userInfo.nickname }}
                  </span>
                  <span v-else>
                    {{ item.sendUserId.indexOf('temp') > -1 ? '匿名用户' : item.SenderNickname || item.nickname || '谭飞会员' }}
                  </span>
                </span>
                <span class="margin-r-5" style="order: 1">
                  {{ item.timestamp | timeFilter }}
                </span>
              </p>
              <div
                :class="item.type == 1 ? (item.sendUserId != currentChatUserId ? 'padding-5 talk-bg-blue' : 'padding-5 talk-bg-gray') : ''"
                class="border-r-5 margi-t-15"
                style="display: inline-block"
              >
                <component
                  style="text-align: left"
                  :is="msgComponentType[item.type]"
                  :currentChatMessageList="currentChatMessageList"
                  :item="item"
                  :index="index"
                ></component>
              </div>
            </div>
            <div v-if="item.status > 0" class="padding-rl-10">
              <div v-if="item.status == 1" class="relative message-loading">
                <span class="iconfont color-gray font-20">&#xe609;</span>
                <div class="message-loading-bg"></div>
              </div>
              <span v-if="item.status == 2" @click="resend(item, index)" class="iconfont color-danger font-24" title="发送失败，点击重新发送">
                &#xe72f;
              </span>
            </div>
          </li>
        </template>
        <li ref="talk-list-bottom" class="width-100 padding-tb-5 talk-list-bottom"></li>
      </ul>
    </div>
    <div v-if="showBackBottom" @click="scrollToBottom" class="cursor-hand back-bottom padding-tb-5 padding-rl-20">
      <i class="iconfont font-12">&#xe696;</i>
      {{ newComedMessage == 0 ? '回到最新位置' : ` ${newComedMessage} 条新消息` }}
    </div>
  </div>
</template>
<script>
const MESSAGE_COMPONENT_TYPE = {
  0: '', // 未知默认为空
  1: 'msg-text', // 文本
  2: 'msg-face', // 表情
  3: 'msg-voice',
  4: 'msg-image',
  5: 'msg-video',
  6: 'msg-location',
  7: 'msg-goods',
  8: 'msg-order',
  9: '', // 指令 不显示
  // 10: 'msg-activity',
  11: 'msg-logistics', // 物流 不显示
  // 12: 'msg-history', // 聊天记录
  13: 'msg-goods-store', // 库存 不显示 前端不会发此类型给后端，后端会返回此类型给前端
  19: 'msg-goods-ask',
  23: 'msg-order-ask',
  24: 'msg-card'
}
import { server_config } from '../../../../config/common'
import msgType from './msgType'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'talklist',
  components: { ...msgType },
  data() {
    return {
      server_config: server_config,
      cache_path: '', //`file:///${$$path.cache_path}`,
      showBackBottom: false,
      newComedMessage: 0,
      historyMessageFetchStatus: 0,
      topMessageFetchStatus: false, // 正在加载
      showUserListModal: false,
      msgComponentType: MESSAGE_COMPONENT_TYPE
    }
  },
  methods: {
    ...mapActions(['resend_a_message', 'fetchHistoryList', 'delete_one_msg', 'send_a_message']),
    talkListScroll() {
      //
    },
    closeChat() {
      this.send_a_message({ type: 16, content: '', id: this.currentChatUserId })
    }
  },
  computed: {
    ...mapGetters(['localUserId', 'socketStatus', 'chatMessageList', 'currentChatUser', 'currentChatUserId', 'userInfo']),
    currentChatMessageList() {
      let id = this.currentChatUserId
      let messageList = id && this.chatMessageList[id] ? this.chatMessageList[id] : []
      this.currentMessageListLength = messageList.length
      return messageList
    }
  },
  filters: {
    timeFilter: function (value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let M = date.getMonth() + 1
      M = M < 10 ? '0' + M : M
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let min = date.getMinutes()
      let s = date.getSeconds()
      s = s < 10 ? '0' + s : s
      min = min < 10 ? '0' + min : min
      return `${y}.${M}.${d} ${h}:${min}:${s}`
    }
  }
}
</script>
<style scoped>
.talklist {
  overflow-y: scroll;
  overflow-x: hidden;
}
.list-ul {
  min-height: 100%;
}
.talk-list-bottom {
  position: absolute;
  bottom: 0;
}
.right {
  flex-direction: row-reverse;
}
.avatar {
  margin: 0 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  align-self: flex-start;
}
.item {
  margin: 10px;
}
.talk-text-box {
  line-height: 1;
  font-size: 16px;
  max-width: 40%;
}

.talk-photo {
  max-width: 100px;
  border: 1px #ccc solid;
}
.talk-share {
  max-width: 300px;
}
.talk-bg-gray {
  background-color: #dee0e3;
}
.talk-bg-blue {
  background-color: #cce4fc;
}
.top-more-bar {
  height: 36px;
  line-height: 36px;
}
.back-bottom {
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  color: #666;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
}
.message-loading-bg {
  position: absolute;
  top: 10px;
  left: 0px;
  height: 20px;
  width: 10px;
  background-color: rgba(255, 255, 255, 0.63);
}
.message-loading {
  color: #333;
  animation: loading-data-v-36bc97b8 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
table {
  cellspacing: 0;
  border-collapse: collapse;
  text-align: center;
}
th {
  font-size: 20px;
  color: #222222;
  border: 0.1px solid #000;
}
td {
  font-size: 18px;
  color: #383838;
  border: 0.1px solid #000;
}
colgroup {
  background: transparent;
}
.chat-robot {
  box-shadow: 2px 2px 8px rgba(166, 131, 84, 0.5);
}
col {
  width: 225px;
  height: 40px;
}
.no-wrap {
  white-space: nowrap;
}
</style>
