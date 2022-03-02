const state = {
  socketStatus: 0, // 0正在链接中,1已经链接并且可以通讯,2连接正在关闭,3连接已关闭或者没有链接成功
  currentChatUserId: 0, // 当前对话者id
  chatRoomType: 'IM', //聊天入口 IM 在线客服 weChat智能客服
  chatType: 'only', //only 个人聊天 group 群聊
  chatUserList: {
    5049: {
      id: '5049', // 匿名状态下为session
      userType: 2, // 0未知 1，IM系统/智能客服 2 用户 3 业务方 4 临时用户,
      nickname: '5049', //
      avatar: 'http://mall.yingerfashion.com/public/images/f0/91/a8/163ead433ca2148c621a79d56931e0a0faa55533.jpg', // guest为匿名
      chatType: 0, // 0 单聊， 1 群聊
      unreadMsgCount: 1, // 未读消息数目
      unsendMessage: '', // 草稿，未发送的消息
      unsendMessageListLabel: '', // 用于在列表显示的内容
      lastMessage: '新消息新消息新消息新消息新消息新消息新消息新消息新消息新消息', // 最新一条读消息内容
      lastMessageTime: 1569579943946 // 最近聊天时间戳
    }
  },
  chatMessageList: {
    5049: [
      // 消息列表
      {
        dbId: 0, // 数据库行id
        type: 1, //  0 未知默认为空 1 文本；2，图片；2，表情；
        content: 'hello everybody', // 消息内容
        timestamp: 1641265391069, // 时间戳
        sendUserId: '', // 消息发送者的id
        status: 0, // 消息状态 0成功，1发送中，2失败
        localUrl: 0, // 图片或视频本地地址
        remoteUrl: 0 // 图片或视频远程地址
      }
    ]
  },
  // 用户信息，侧边栏显示的，最快5分钟更新一次
  userInfoList: {
    5049: {
      lastUpdateTime: 157768789, //上次更新的时间
      avatar: 'http://mall.yingerfashion.com/public/images/f0/91/a8/163ead433ca2148c621a79d56931e0a0faa55533.jpg', // guest为匿名
      data: {}
    }
  },
  starList: { page: 1, size: 50, last: true, count: 0, list: [] },
  recentlyList: { page: 1, size: 50, last: true, count: 0, list: [] }
}
const getters = {
  currentChatUser: state => (state.currentChatUserId ? state.chatUserList[state.currentChatUserId] || {} : {}),
  currentChatUserId: state => state.currentChatUserId,
  socketStatus: state => state.socketStatus,
  chatUserList: state => state.chatUserList,
  chatMessageList: state => state.chatMessageList,
  chatUserListArr: state =>
    Object.values(state.chatUserList)
      .sort((a, b) => b.lastMessageTime - a.lastMessageTime)
      .sort((a, b) => b.star - a.star),
  recentlyList: state => state.recentlyList || [],
  currentUserInfo: state => (state.currentChatUserId ? state.userInfoList[state.currentChatUserId] || {} : {}),
  starList: state => state.starList || [],
  chatRoomType: state => state.chatRoomType,
  chatType: state => state.chatType
}
const actions = {
  async set_current_user_id({ commit }, id) {
    commit('setCurrentUserId', id)
  },
  send_a_message() {
    //更新消息状态
  }
}
const mutations = {
  updateUserList(state, newData) {
    let { id, count } = newData
    if (state.chatUserList[id]) state.chatUserList[id].unreadMsgCount = count
  },
  async setCurrentUserId(state, id) {
    let chatMessageList = state.chatMessageList
    let oldChatId = state.currentChatUserId
    if (oldChatId && chatMessageList[oldChatId] && chatMessageList[oldChatId].length > 20)
      chatMessageList[oldChatId] = chatMessageList[oldChatId].slice(-20) // 上一个用户的信息保留最后20条，释放内存
    // let localUserList = await $$db.getUserList();
    // if (id && localUserList && !state.chatUserList[id].unreadMsgCount) state.chatUserList[id].unreadMsgCount = 0;
    state.currentChatUserId = id
  },
  upDateChatRoomType(state, data) {
    state.chatRoomType = data
  },
  upDateChatType(state, data) {
    state.chatType = data
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
