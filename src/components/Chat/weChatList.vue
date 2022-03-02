<template>
  <div class="flex-col-start relative height-100">
    <div class="padding-tb-10 padding-rl-20 flex-space-between bg-gray">
      <div class="color-dark">智能社交</div>
    </div>
    <div class="flex-item flex-content padding-b-10 height-100">
      <div class="padding-tb-10 padding-rl-20">
        <el-input v-model="search" placeholder="查询用户名或ID" clearable @input="searchUserInput" size="small" ref="input"></el-input>
      </div>
      <div class="flex-start cursor-hand">
        <div class="left flex-col-start">
          <div class="flex-col-center">
            <span class="iconfont color-success font-32">&#xe648;</span>
            <div class="font-10 color-dark text-center">微信号({{ weChatList.length }}/5)</div>
          </div>
          <ul class="weChat-list" v-if="weChatList.length">
            <li class="flex-col-center padding-tb-10" v-for="(item, index) in weChatList" :key="index">
              <img :src="item.avatar" alt="" class="weChat-img" />
              <div class="font-10 padding-t-5 color-dark">{{ item.nickname }}</div>
            </li>
          </ul>
        </div>
        <div class="right">
          <el-tabs :stretch="true">
            <el-tab-pane label="消息列表" name="0">
              <div class="flex-center height-100 color-gray" v-if="!weChatUserList.length">列表为空</div>
              <div class="user-list-item border-1px-b flex-start padding-20" v-for="item in weChatUserList" :key="item.id">
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
                    <p v-else class="color-gray font-14 line-ellispsis-1">{{ item.lastMessage }}</p>
                    <!-- <p class="msg-time color-gray margin-l-10 font-12">{{ item.lastMessageTime | timeFormat }}
                                <i :class="[item.star ? 'el-icon-share-on':'el-icon-star-off']"  @click.stop="updateUserStar(item)"></i>
                            </p> -->
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="通讯录" name="1">
              <div class="groupChat">
                <div class="flex-start-center padding-rl-20 padding-tb-10">
                  <span class="iconfont color-success font-32 padding-r-10">&#xe649;</span>
                  <div class="flex-space-between width-100">
                    <span class="font-14 color-dark">群聊</span>
                    <span class="color-blue font-12" @click="addGroupItem">添加</span>
                  </div>
                </div>
                <ul class="padding-rl-20">
                  <li
                    v-for="(item, index) in groupChatList"
                    @click="toChatRoom(item.groupId)"
                    class="flex-start-center border-1px-b group-item"
                    :key="index"
                  >
                    <div class="link-img chat-avatar2">
                      <img :src="item.groupAvatar" alt="" />
                    </div>
                    <div class="padding-l-10">{{ item.groupName }}</div>
                  </li>
                </ul>
              </div>
              <div class="addrBooks">
                <div class="flex-start-center padding-rl-20">
                  <span class="iconfont color-blue font-32 padding-r-10">&#xe64a;</span>
                  <span class="font-14 color-dark">通讯录(0)</span>
                </div>
                <ul class="padding-rl-20">
                  <li
                    v-for="(item, index) in weChatBookList"
                    @click="toChatRoom(item.id)"
                    class="flex-start-center border-1px-b group-item"
                    :key="index"
                  >
                    <div class="link-img chat-avatar2">
                      <img :src="item.avatar" alt="" />
                    </div>
                    <div class="padding-l-10">{{ item.nickname }}</div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="添加朋友" name="2">
              <div class="flex-center height-100 color-gray" v-if="!newFriendList.length">列表为空</div>
              <div class="user-list-item border-1px-b flex-space-between padding-20" v-for="(item, index) in newFriendList" :key="index">
                <img class="chat-avatar2" :src="item.avatar" />
                <div class="width-100 flex-space-between">
                  <span class="padding-rl-10 font-14">{{ item.nickname }}</span>
                  <span :class="[item.status == 0 ? 'color-blue' : 'color-gray']" @click="item.status == 0 ? addFriends(item) : ''" class="font-12">
                    {{ item.status == 0 ? '同意' : '已添加' }}
                  </span>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { server_config } from '../../config/common'
export default {
  name: 'weChatList',
  data() {
    return {
      search: '',
      vipIcon: server_config.vipIcon
    }
  },
  computed: {
    ...mapGetters(['weChatList', 'weChatUserList', 'newFriendList', 'groupChatList', 'weChatBookList'])
  },
  methods: {
    searchUserInput() {},
    addFriends() {
      //添加新朋友
      console.log('addFriends+++++')
    },
    addGroupItem() {
      //添加群聊
      this.$openModal({
        route: 'chartMemberView',
        query: {},
        options: { title: '添加群聊', width: 508, height: 448, resizable: false, maximizable: false }
      })
    },
    toChatRoom(id) {
      console.log('toChatRoom+++', id)
      //判断是否群聊ID
      let path = `/chat/room/${id}`
      if (/^g/.test(id)) {
        path += '/group'
      } else {
        path += '/only'
      }
      if (this.$route.path != `/chat/room/${id}`) this.$router.push({ path })
    }
  }
}
</script>
<style scoped lang="scss">
.weChat-img {
  border-radius: 50%;
  width: 32px;
  height: 32px;
}
.left {
  height: 692px;
  padding: 0 15px;
  background: #ffffff;
  box-shadow: 3px 3px 6px rgba(19, 37, 71, 0.1);
  opacity: 1;
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
.chat-avatar2 {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #e7e9ec;
}
.right ::v-deep .el-tabs__item {
  padding: 0 8px !important;
}
.group-item {
  height: 44px;
  margin-bottom: 13px;
}
</style>
