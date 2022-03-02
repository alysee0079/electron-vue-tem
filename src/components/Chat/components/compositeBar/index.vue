<template>
  <div class="flex-space-between select-none">
    <div class="flex-start-center">
      <el-popover v-model="emojiPop" placement="top" width="400">
        <div slot="reference" class="icon iconfont color-gray" title="发送表情">&#xe61b;</div>
        <div>
          <el-carousel
            v-model="value1"
            dots="outside"
            class="padding-tb-10"
            style="width: 360px; height: 340px"
            height="300"
            trigger="click"
            indicator-position="none"
            :autoplay="false"
          >
            <el-carousel-item v-for="(item, index) in emojiData" :key="index" class="flex-start flex-wrap" style="width: 360px; height: 300px">
              <div
                v-for="(item2, index2) in item"
                :key="index2"
                class="flex-center text-center"
                :style="{ width: 360 / 9 + 'px' }"
                style="display: inline-block; cursor: pointer"
              >
                <span v-for="item3 in item2" :key="item3" v-html="item3" class="font-18" @click="selectEmojiItem(item3)"></span>
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="padding-tb-10 border-1px-t scroll-x" style="width: 360px">
            <span class="font-18 padding-rl-10 addEm-item" @click="selectEmojiItem(item)" v-for="item in recentEmjoi" :key="item">{{ item }}</span>
          </div>
        </div>
      </el-popover>
      <i class="icon iconfont color-gray" title="发送图片" @click="startMsg">&#xe637;</i>
      <input ref="file" type="file" accept="image/*" style="display: none" @change="readFile" multiple />
      <i class="icon iconfont color-gray font-10" title="Ctrl+Alt+A" @click="capture()">&#xe63a;</i>
      <i class="icon iconfont color-gray font-10" title="分享" @click="openSharePage()">&#xe62b;</i>
      <!-- <i class="icon iconfont color-gray font-10" title="转换客服" @click="showTranslate(true)">&#xe62e;</i> -->
      <!-- <i class="icon iconfont color-gray font-10" title="发送企业微信" @click="sendMyWeChat" >&#xe6af;</i> -->
    </div>
    <div @click="openMessageHistory">
      <i class="icon iconfont">&#xe63d;</i>
    </div>
    <el-dialog title="提示" :visible.sync="showHistoryList" class="modail" width="50%">
      <div class="border-1px-b padding-b-10">
        <div class="flex-space-between" style="width: 300px; margin: 0 auto">
          <p
            v-for="(item, index) in listTabs"
            :key="index"
            @click="changeMessageType(item.type, index)"
            :class="activeTabIndex == index ? 'color-primary font-bold' : ''"
            class="pointer font-16"
          >
            {{ item.label }}
          </p>
        </div>
      </div>
      <div v-if="messageHostory.length == 0" class="flex-center color-gray font-24" style="height: 480px">无结果</div>
      <div v-show="messageHostory.length" @scroll="scrollFetchHistoryList" ref="historyList" class="flex-content" style="height: 480px">
        <p class="cursor-none top-more-bar text-center color-gray">
          {{ historyMessageFetchStatus == 0 ? '点击查看更多记录' : historyMessageFetchStatus == 1 ? '正在加载...' : '没有更多了' }}
        </p>
        <div class="border-1px-b padding-tb-10" v-for="(item, index) in messageHostory" :key="index">
          <div class="flex-start align-items-stretch">
            <div class="link-img img-fit-contain flex-shrink-0" style="height: 40px; width: 40px">
              <img :src="item.sendUserId == currentChatUser.id ? currentChatUser.avatar : userInfo.avatar" alt="" />
            </div>
            <div class="flex-item padding-rl-10">
              <div class="flex-space-between color-gray margin-b-5">
                <p class="font-14">{{ item.sendUserId == currentChatUser.id ? currentChatUser.nickname || '谭飞会员' : '我' }}</p>
                <p>{{ item.timestamp | timeFormat(true) }}</p>
              </div>
              <div>
                <pre v-if="item.type == 0" class="talk-item font-14 color-dark">{{ item.content }}</pre>
                <img
                  v-else-if="item.type == 1"
                  class="pointer talk-photo"
                  @click="openImageModal(item.localUrl ? cache_path + item.localUrl : item.remoteUrl)"
                  :src="item.localUrl ? cache_path + item.localUrl : item.remoteUrl"
                />
                <img v-else-if="item.type == 2" class="pointer talk-video" :src="item.content" />
                <div
                  v-else-if="item.type == 3"
                  @click="openGoodsModal(item.content.goods_id)"
                  class="pointer talk-goods flex-col-start padding-10 bg-gray border-r-5"
                  style="width: 180px"
                >
                  <div class="link-img img-fit-contain flex-shrink-0" style="height: 160px; width: 160px">
                    <img :src="$ossUrlTest(item.content.image_url)" />
                  </div>
                  <div class="padding-t-10 line-15">
                    <p class="line-ellispsis-2 font-12 line-12" :title="item.content.name">{{ item.content.name }}</p>
                    <p class="font-10">
                      ￥
                      <span class="font-14 color-dark">{{ item.content.price }}</span>
                    </p>
                  </div>
                </div>
                <div v-else-if="item.type == 4" class="pointer talk-order flex-start-center bg-gray padding-10 border-r-5">
                  <div class="link-img img-fit-contain flex-shrink-0" style="height: 60px; width: 60px">
                    <img :src="$ossUrlTest(item.content.goods[0].image_url)" />
                  </div>
                  <div class="padding-rl-10 font-12">
                    <p>订单编号：{{ item.content.order_id }}</p>
                    <p class="padding-tb-5">共{{ item.content.order_status.total_goods }}件商品</p>
                    <p>商品合计：￥{{ item.content.origin_amount }}</p>
                  </div>
                </div>
                <!-- 页面链接分享 -->
                <div
                  v-else-if="item.type == 5"
                  @click="openSharePage(item.content.link)"
                  class="pointer talk-share flex-start-center bg-gray padding-10 border-r-5"
                >
                  <div class="link-img img-fit-contain flex-shrink-0" style="height: 60px; width: 60px">
                    <img :src="$ossUrlTest(item.content.imgUrl)" />
                  </div>
                  <div class="padding-rl-10 font-12">
                    <p class="font-14 line-ellispsis-2">{{ item.content.title }}</p>
                    <p class="margin-t-5 line-ellispsis-2 color-gray line-12">{{ item.content.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="width-100 padding-tb-10" ref="listBottom"></p>
      </div>
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
  </div>
</template>
<script>
// import {chat_post} from "../../../plugins/axios";
import { ipcRenderer } from 'electron'
import * as emoji from './emoji.js'
import { mapGetters } from 'vuex'
export default {
  name: 'compositeBar',
  data() {
    return {
      // cache_path: `file:///${$$path.cache_path}`,
      emojiData: {},
      value1: 0,
      emojiPop: false,
      recentEmjoi: [],
      showHistoryList: false,
      messageHostory: [],
      listTabs: [
        { label: '全部', type: -1 },
        { label: '图片', type: 1 },
        { label: '视频', type: 2 },
        { label: '商品', type: 3 },
        { label: '订单', type: 4 },
        { label: '分享', type: 5 }
      ],
      activeTabIndex: 0,
      historyMessageFetchStatus: 0
    }
  },
  created() {
    let _emoji = emoji.default
    // let def = {}
    let arr = []
    for (var i in _emoji) {
      for (var key in _emoji[i]) {
        let obj = {}
        obj[key] = _emoji[i][key]
        arr.push(obj)
      }
    }
    this.emojiData = this.chunk(arr, 72)

    let storageEmjoi = localStorage[`talk_emjoi_${this.localUserId}`]
    if (storageEmjoi) this.recentEmjoi = JSON.parse(storageEmjoi)
  },
  computed: {
    ...mapGetters(['localUserId', 'currentChatUser', 'userInfo', 'currentChatUserId'])
  },
  methods: {
    chunk(array, size) {
      let arrLength = array.length
      if (!arrLength || !size || size < 1) {
        return []
      }
      let index = 0 //用来表示切割元素的范围start
      let resIndex = 0 //用来递增表示输出数组的下标
      let result = new Array(Math.ceil(arrLength / size))

      //进行循环
      while (index < arrLength) {
        //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
        result[resIndex++] = array.slice(index, (index += size))
      }
      //输出新数组
      return result
    },
    selectEmojiItem(item) {
      this.emojiPop = false
      this.$emit('inputEmjoi', item)
      setTimeout(() => {
        let arr = [item, ...this.recentEmjoi]
        let set = new Set(arr)
        let result = [...set].slice(0, 8)
        this.recentEmjoi = result
        localStorage[`talk_emjoi_${this.localUserId}`] = JSON.stringify(result)
      }, 1000)
    },
    startMsg() {
      this.$refs.file.click()
    },
    openMessageHistory() {
      //浏览历史记录
      this.showHistoryList = true
      setTimeout(() => {
        this.historyListRef = this.$refs['historyList']
        this.listBottom = this.$refs['listBottom']
        this.historyMessageFetchStatus = 1
        // this.fetchHistoryList({
        //   chatId: this.currentChatUser.id,
        //   offset: 0,
        //   type: -1,
        // }).then(list => {
        //   this.historyMessageFetchStatus = list.length < 20 ? 2 : 0;
        //   this.messageHostory.push(...list.reverse());
        //   this.scrollToBottom();
        // })
      }, 300)
    },
    scrollFetchHistoryList(e) {
      let element = e.target
      let scrollTop = element.scrollTop
      // let lastHeight = element.scrollHeight
      if (this.historyMessageFetchStatus == 0 && scrollTop == 0) {
        this.historyMessageFetchStatus = 1
        let type = this.listTabs[this.activeTabIndex].type
        this.fetchHistoryList({
          chatId: this.currentChatUser.id,
          offset: this.messageHostory.length,
          type
        }).then(list => {
          console.log(list)
          // this.historyMessageFetchStatus = list.length < 20 ? 2 : 0;
          // this.messageHostory = [...list.reverse(), ...this.messageHostory];
          // this.$nextTick(() => {
          //   element.scrollTop = element.scrollHeight - lastHeight - 100;
          // })
        })
      }
    },
    scrollToBottom() {
      setTimeout(() => {
        this.listBottom.scrollIntoView({
          behavior: 'instant',
          block: 'end',
          inline: 'nearest'
        })
      }, 100)
    },
    capture() {
      ipcRenderer.send('capture-screen')
    },
    changeMessageType(type, index) {
      this.messageHostory = []
      this.activeTabIndex = index
      this.historyMessageFetchStatus = 1
      // this.fetchHistoryList({
      //   chatId: this.currentChatUser.id,
      //   offset: 0,
      //   type
      // }).then(list => {
      //   this.historyMessageFetchStatus = list.length < 20 ? 2 : 0;
      //   this.messageHostory.push(...list.reverse());
      //   this.scrollToBottom();
      // })
    },
    readFile() {},
    sendMyWeChat() {},
    openSharePage() {
      //打开分享框
      this.$openModal({
        route: 'productView',
        query: {},
        options: { title: '商品库', width: 508, height: 651, resizable: false, maximizable: false }
      })
    },
    showTranslate() {}
  }
}
</script>
<style lang="scss" scoped>
.icon {
  padding: 16px 0 0 16px;
  font-size: 20px;
}
.demo-carousel {
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #506b9e;
}
.talk-item {
  font-family: inherit;
  word-break: break-all;
  white-space: pre-wrap;
  overflow: hidden;
}
.talk-photo {
  width: 100px;
  height: 100%;
}
.talk-share {
  width: 300px;
}
.top-more-bar {
  height: 36px;
  line-height: 36px;
}
.modail ::v-deep .el-dialog__body {
  padding: 0 !important;
}
</style>
