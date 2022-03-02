<template>
  <div class="flex-col-start relative height-100">
    <div class="padding-tb-10 padding-rl-20 flex-space-between bg-gray">
      <div class="color-dark">联系人( {{ chatUserListArr.length }} )</div>
      <queue-status></queue-status>
    </div>
    <div ref="chat-user-list" class="flex-item flex-content padding-b-10">
      <div class="padding-tb-10 padding-rl-20">
        <el-input v-model="search" placeholder="查询用户名或ID" clearable @input="searchUserInput" size="small" ref="input"></el-input>
      </div>
      <el-tabs class="padding-rl-20" v-model="chatListTab" @on-click="chatTabChang">
        <el-tab-pane label="消息列表" name="0">
          <div v-if="chatUserListArr.length == 0" class="flex-center height-100 color-gray">列表为空</div>
          <div
            class="user-list-item border-1px-b flex-start padding-tb-20 padding-rl-20"
            :class="currentChatUserId == item.id ? '' : ''"
            v-for="item in chatUserListArr"
            :key="item.id"
            @click="toChatRoom(item.id)"
            @click.right="showContextMenu(item.id)"
            active-class="active"
          >
            <el-badge :hidden="item.unreadMsgCount == 0" :value="item.unreadMsgCount" :max="99" class="item">
              <img class="chat-avatar" :src="item.userType == 2 ? item.avatar || vipIcon : def_avatar" />
            </el-badge>
            <div class="flex-item flex-col-space-between padding-l-10">
              <div class="flex-space-between">
                <p class="font-16 line-12">{{ item.userType == 2 ? item.nickname || '谭飞会员' : '匿名用户' }}</p>
              </div>
              <div class="flex-space-between">
                <p v-if="item.unsendMessageListLabel" class="color-gray font-12 line-ellispsis-1">
                  <span class="color-danger margin-r-5">[草稿]</span>
                  {{ item.unsendMessageListLabel }}
                </p>
                <p v-else class="color-gray font-12 line-ellispsis-1">{{ item.lastMessage }}</p>
                <p class="msg-time color-gray margin-l-10 font-12">
                  {{ item.lastMessageTime | timeFormat }}
                  <i :class="[item.star ? 'el-icon-share-on' : 'el-icon-star-off']" @click.stop="updateUserStar(item)"></i>
                </p>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="分组列表" name="1">
          <el-menu width="100%" background-color="#fff" active-text-color="#ffd04b" text-color="#333333">
            <el-submenu index="0">
              <template slot="title">最近星标({{ starList.count || 0 }})</template>
              <div v-if="starList.list.length == 0" class="flex-center height-100 color-gray">列表为空</div>
              <div
                class="user-list-item border-1px-b flex-start padding-tb-20 padding-rl-10"
                :class="currentChatUserId == item.id ? 'bg-dark-gray' : ''"
                v-for="item in starList.list"
                :key="item.id"
                @click="toChatRoom(item.id)"
                @click.right="showContextMenu(item.id)"
                active-class="active"
              >
                <img class="chat-avatar" :src="item.userType == 2 ? item.avatar || vipIcon : def_avatar" />
                <div class="flex-item flex-col-space-between padding-l-10">
                  <div class="flex-space-between">
                    <p class="font-12 line-12">{{ item.userType == 2 ? item.nickname || '谭飞会员' : '匿名用户' }}</p>
                    <p class="msg-time color-gray margin-l-10 font-12">
                      {{ item.lastMessageTime | timeFormat }}
                      <i :class="[item.star ? 'el-icon-share-on' : 'el-icon-star-off']" @click.stop="toUserStar(item)"></i>
                    </p>
                  </div>
                  <div class="flex-space-between">
                    <p v-if="item.unsendMessageListLabel" class="color-gray font-12 line-ellispsis-1">
                      <span class="color-danger margin-r-5">[草稿]</span>
                      {{ item.unsendMessageListLabel }}
                    </p>
                    <p v-else class="color-gray font-12 line-ellispsis-1">{{ item.lastMessage }}</p>
                    <p v-if="item.unreadMsgCount > 0" class="unread-msg-count text-center color-white font-10">
                      {{ item.unreadMsgCount > 99 ? '99+' : item.unreadMsgCount }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="load-more" v-show="!starList.last" @click="starGroup()">加载更多</div>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">最近联系({{ recentlyList.count || 0 }})</template>
              <div v-if="recentlyList.list.length == 0" class="flex-center height-100 color-gray">列表为空</div>
              <div
                class="user-list-item border-1px-b flex-start padding-tb-5 padding-rl-10"
                :class="currentChatUserId == item.id ? 'bg-dark-gray' : ''"
                v-for="item in recentlyList.list"
                :key="item.id"
                @click="toChatRoom(item.id)"
                @click.right="showContextMenu(item.id)"
                active-class="active"
              >
                <img class="chat-avatar" :src="item.userType == 2 ? item.avatar || vipIcon : def_avatar" />
                <div class="flex-item flex-col-space-between padding-l-10">
                  <div class="flex-space-between">
                    <p class="font-12 line-12">{{ item.userType == 2 ? item.nickname || '谭飞会员' : '匿名用户' }}</p>
                    <p class="msg-time color-gray margin-l-10 font-12">
                      {{ item.lastMessageTime | timeFormat }}
                      <i :class="[item.star ? 'el-icon-share-on' : 'el-icon-star-off']" @click.stop="toUserStar(item)"></i>
                    </p>
                  </div>
                  <div class="flex-space-between">
                    <p v-if="item.unsendMessageListLabel" class="color-gray font-12 line-ellispsis-1">
                      <span class="color-danger margin-r-5">[草稿]</span>
                      {{ item.unsendMessageListLabel }}
                    </p>
                    <p v-else class="color-gray font-12 line-ellispsis-1">{{ item.lastMessage }}</p>
                    <p v-if="item.unreadMsgCount > 0" class="unread-msg-count text-center color-white font-10">
                      {{ item.unreadMsgCount > 99 ? '99+' : item.unreadMsgCount }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="load-more" v-show="!recentlyList.last" @click="recentlyGroup()">加载更多</div>
            </el-submenu>
          </el-menu>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { server_config } from '../../config/common'
import { mapGetters, mapMutations } from 'vuex'
import { timeFormat } from '../../plugins/utils'
import queueStatus from './components/queueStatus.vue'
export default {
  name: 'chatlist',
  components: { queueStatus },
  data() {
    return {
      def_avatar: server_config.def_avatar,
      vipIcon: server_config.vipIcon,
      search: '',
      inputTime: 0,
      chatListTab: '0',
      starPage: { page: 0, size: 100, last: true, count: 0 },
      recentlyPage: { page: 0, size: 100, last: true, count: 0 }
    }
  },
  filters: { timeFormat },
  computed: {
    ...mapGetters(['chatUserListArr', 'chatUserList', 'chatMessageList', 'socketStatus', 'currentChatUserId', 'uid', 'starList', 'recentlyList'])
  },
  methods: {
    ...mapMutations(['updateUserList']),
    searchUserInput() {},
    chatTabChang() {},
    toChatRoom(id) {
      // 如果是匿名用户，直接设置成已读
      // 如果是匿名用户，直接设置成已读
      if (id.indexOf('temp') > -1) {
        this.updateUserList({ id, count: 0 })
      }
      if (this.$route.path != `/chat/room/${id}`) this.$router.push({ path: `/chat/room/${id}/only` })
    }
  }
}
</script>
<style scoped>
.chatlist {
  height: 100%;
  background-color: #e6e8eb;
}
.user-list-item {
  cursor: default;
  user-select: none;
}
.chat-avatar {
  width: 55px;
  height: 55px;
  border-radius: 4px;
  border: 1px solid #e7e9ec;
}
.active {
  background-color: #dee0e3;
}
.msg-time {
  flex-shrink: 0;
}
.unread-msg-count {
  height: 16px;
  line-height: 16px;
  min-width: 16px;
  padding: 0 5px;
  background-color: #f4511e;
  border-radius: 8px;
}
.chat-star-icon {
  font-size: 16px;
  cursor: pointer;
  transform: translateY(-2px);
}
.ivu-icon-ios-star {
  color: gold;
}
.load-more {
  text-align: center;
  color: #2d8cf0;
  cursor: pointer;
  padding: 6px;
}
</style>
