<template>
  <div class="chatroom flex-start width-100 height-100">
    <div class="flex-item flex-start height-100">
      <div class="flex-col-start flex-item chat-box border-1px clear-float">
        <div class="flex-space-between padding-rl-10 padding-tb-10 border-1px-b">
          <div class="flex-start-center">
            <img class="chat-avatar" :src="currentChatUser.avatar || def_avatar" />
            <span class="font-16 margin-l-10">{{ currentChatUser.userType == 2 ? currentChatUser.nickname || '谭飞会员' : '匿名用户' }}</span>
          </div>
          <span @click="closeTalk" class="flex-start-center color-gray close-btn font-14">结束对话</span>
        </div>
        <!-- 内容列表 -->
        <talk-list ref="chat"></talk-list>
        <!-- 内容发布区域 -->
        <talk-area></talk-area>
      </div>
      <!-- 功能列表 -->
      <cusinfo ref="cusinfo" v-if="chatType == 'only' && currentChatUser.id && currentChatUser.userType == 2"></cusinfo>
      <!-- 群聊成员 -->
      <groupMember v-if="chatType == 'group'"></groupMember>
    </div>
  </div>
</template>

<script>
import Cusinfo from '../components/cusinfo'
import GroupMember from '../components/groupMember'
import TalkList from '../components/talklist'
import TalkArea from '../components/talkArea'
import { server_config } from '../../../config/common'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'chatroom',
  components: { TalkList, Cusinfo, TalkArea, GroupMember },
  data() {
    return {
      def_avatar: server_config.def_avatar
    }
  },
  computed: {
    ...mapGetters(['chatUserList', 'currentChatUser', 'chatType'])
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.id) {
      let id = to.params.id
      next(vm => {
        setTimeout(() => {
          // 消息列表虽然移除了用户，但是最近联系人里还有，找不到用户时不再跳回/chat
          // if (vm.chatUserList[id] && vm.chatUserList[id].id) {
          vm.set_current_user_id(id)
          // } else {
          //   vm.$router.replace('/chat');
          // }
        }, 300)
      })
    } else {
      next({ path: '/chat' })
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate+++', to)
    if (to.params.id) {
      let id = to.params.id
      this.set_current_user_id(id)
      next()
    } else {
      next({ path: '/chat' })
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave+++', to)
    this.set_current_user_id('')
    next()
  },
  methods: {
    ...mapActions(['set_current_user_id', 'send_a_message']),
    ...mapMutations(['upDateChatType']),
    closeTalk() {
      this.$refs.chat.closeChat()
      this.set_current_user_id('')
      this.$router.replace({ path: '/chat' })
    }
  },
  mounted() {
    this.upDateChatType(this.$route.params.chatType)
  }
}
</script>

<style scoped>
.chat-avatar {
  width: 55px;
  height: 55px;
  flex: 0 0 40px;
}
.close-btn {
  cursor: pointer;
}
.close-btn:hover {
  color: red;
}
</style>
