const state = {
  //微信号信息
  weChatList: [
    {
      nickname: '芙露比',
      lastUpdateTime: 157768789, //上次更新的时间
      avatar: 'http://mall.yingerfashion.com/public/images/f0/91/a8/163ead433ca2148c621a79d56931e0a0faa55533.jpg', // guest为匿名
      data: {}
    },
    {
      nickname: '芙露比2',
      lastUpdateTime: 157768789, //上次更新的时间
      avatar: 'http://mall.yingerfashion.com/public/images/f0/91/a8/163ead433ca2148c621a79d56931e0a0faa55533.jpg', // guest为匿名
      data: {} //
    }
  ],
  //在聊的消息列表
  weChatUserList: {
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
  newFriendList: [
    {
      nickname: 'token',
      avatar: 'http://mall.yingerfashion.com/public/images/f0/91/a8/163ead433ca2148c621a79d56931e0a0faa55533.jpg', // guest为匿名
      status: 0
    },
    {
      nickname: 'charles',
      avatar: 'http://mall.yingerfashion.com/public/images/f0/91/a8/163ead433ca2148c621a79d56931e0a0faa55533.jpg', // guest为匿名
      status: 1
    }
  ],
  //当前微信号的群聊列表
  groupChatList: [
    {
      groupName: '连衣群爱好群',
      groupAvatar: 'http://mall.yingerfashion.com/public/images/f0/91/a8/163ead433ca2148c621a79d56931e0a0faa55533.jpg',
      groupId: 'g123',
      gruopMember: [
        {
          nickname: 'token',
          avatar: 'http://mall.yingerfashion.com/public/images/f0/91/a8/163ead433ca2148c621a79d56931e0a0faa55533.jpg' // guest为匿名
        },
        {
          nickname: 'charles',
          avatar: 'http://mall.yingerfashion.com/public/images/f0/91/a8/163ead433ca2148c621a79d56931e0a0faa55533.jpg' // guest为匿名
        },
        {
          nickname: 'jiemi',
          avatar: 'http://mall.yingerfashion.com/public/images/f0/91/a8/163ead433ca2148c621a79d56931e0a0faa55533.jpg' // guest为匿名
        }
      ]
    }
  ],
  //当前微信号的用户列表
  weChatBookList: [
    {
      id: '123',
      nickname: 'token',
      avatar: 'http://mall.yingerfashion.com/public/images/f0/91/a8/163ead433ca2148c621a79d56931e0a0faa55533.jpg' // guest为匿名
    },
    {
      id: '456',
      nickname: 'charles',
      avatar: 'http://mall.yingerfashion.com/public/images/f0/91/a8/163ead433ca2148c621a79d56931e0a0faa55533.jpg' // guest为匿名
    },
    {
      id: '789',
      nickname: 'jiemi',
      avatar: 'http://mall.yingerfashion.com/public/images/f0/91/a8/163ead433ca2148c621a79d56931e0a0faa55533.jpg' // guest为匿名
    }
  ]
}
const getters = {
  weChatList: state => state.weChatList || [],
  weChatUserList: state =>
    Object.values(state.weChatUserList)
      .sort((a, b) => b.lastMessageTime - a.lastMessageTime)
      .sort((a, b) => b.star - a.star),
  newFriendList: state => state.newFriendList || [],
  groupChatList: state => state.groupChatList || [],
  weChatBookList: state => state.weChatBookList || []
}
const mutations = {}
const actions = {}
export default {
  state,
  getters,
  actions,
  mutations
}
