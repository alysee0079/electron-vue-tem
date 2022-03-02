<template>
  <div class="cusinfo flex-col-start height-100 relative border-1px-t" :style="{ width: w + 'px' }">
    <!-- <div class="border" ref="line" @mousedown="down"></div> -->
    <div class="el-collapse-item flex-start-end width-100 padding-tb-10">
      <div class="flex-col-8 flex-center">
        <div @click="openMemberDetailModal('memberOrder')" class="pointer flex-col-center text-center">
          <img class="avatar border-1px" :src="currentUserInfo.avatar" />
        </div>
      </div>
      <div class="flex-col-16 flex-col-start font-12">
        <p class="pointer padding-r-20 font-16 line-ellispsis-1 margin-b-5">{{ currentUserInfo.nickname || '谭飞会员' }}</p>
        <p class="pointer padding-r-20 font-14 line-ellispsis-1 color-gray">ID: {{ currentChatUserId }}</p>
        <p class="font-14 color-gray">推荐人: {{ currentUserInfo.share_member || '无' }}</p>
        <div class="font-14 color-gray">注册时间: {{ currentUserInfo.reg_time }}</div>
        <div class="font-14 color-gray">
          消费能力:
          <span class="color-success">{{ currentUserInfo.level }}</span>
        </div>
      </div>
    </div>
    <div class="flex-center padding-b-10 padding-rl-20">
      <el-button @click="openMemberDetailModal('memberOrder')" type="primary" long size="small" class="width-100">会员详情</el-button>
    </div>
    <el-collapse v-model="activeCollapse" accordion @change="changeCollapse">
      <el-collapse-item name="consume" title="消费分析">
        <div class="padding-rl-20 padding-b-10">
          <p class="color-gray">消费总额：￥{{ currentUserInfo.total_pay ? currentUserInfo.total_pay.toFixed(2) : '0.00' }}</p>
          <p class="color-gray">消费次数：{{ currentUserInfo.pay_count || 0 }}</p>
          <p class="color-gray">每单平均：￥{{ currentUserInfo.per_pay ? currentUserInfo.per_pay.toFixed(2) : '0.00' }}</p>
          <p class="color-gray">上次消费时间：{{ currentUserInfo.recent_pay ? currentUserInfo.recent_pay.substring(0, 10) : '无' }}</p>
        </div>
      </el-collapse-item>
      <el-collapse-item name="memberTag" title="会员标签">
        <div class="padding-rl-20 padding-b-10">
          <tag-list :loaded.sync="memberTag.loaded" />
        </div>
      </el-collapse-item>
      <el-collapse-item name="cartGoods" title="加购商品" v-loading="cartGoods.loaded">
        <div>
          <div v-if="cartGoods.data.length == 0" style="height: 120px" class="flex-center padding-tb-20 relative">
            <div v-if="cartGoods.loaded" class="color-gray text-center">暂无内容</div>
            <!-- <Spin v-else></Spin> -->
          </div>
          <template v-else><goods-item v-for="(goods, index) in cartGoods.data" :key="index" :entity="goods"></goods-item></template>
          <div v-if="cartGoods.data.length == 5" class="flex-center margin-tb-10">
            <el-button @click="openMemberDetailModal('memberGoods')" type="primary" size="small">查看更多</el-button>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="favGoods" title="收藏商品" v-loading="favGoods.loaded">
        <div>
          <div v-if="favGoods.data.length == 0" style="height: 120px" class="flex-center padding-tb-20 relative">
            <div v-if="favGoods.loaded" class="color-gray text-center">暂无内容</div>
          </div>
          <template v-else><goods-item v-for="(goods, index) in favGoods.data" :key="index" :entity="goods"></goods-item></template>
          <div v-if="favGoods.data.length == 5" class="flex-center margin-tb-10">
            <el-button @click="openMemberDetailModal('memberGoods')" type="primary" size="small">查看更多</el-button>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="recentOrder" title="近期订单" v-loading="recentOrder.loaded">
        <template>
          <div v-if="Object.keys(recentOrder.data).length == 0" style="height: 120px" class="flex-center padding-tb-20 relative">
            <div v-if="recentOrder.loaded" class="color-gray text-center">暂无内容</div>
          </div>
          <el-collapse v-else simple accordion class="padding-rl-10">
            <el-collapse-item v-for="(item, key, index) in recentOrder.data" :key="index" :name="index + ''" :title="key">
              <div>
                {{ item }}
                <template v-if="Array.isArray(item)">
                  <goods-item v-for="(goods, index) in item" :key="index" :map="{ img: 'm_url' }" :entity="goods" :showAddress="true"></goods-item>
                </template>
                <template v-if="item.deliver">
                  <template v-for="item2 in item.deliver">
                    <goods-item v-for="(goods, index) in item2" :key="index" :map="{ img: 'm_url' }" :entity="goods" :showAddress="true"></goods-item>
                  </template>
                </template>
                <template v-if="item.ready">
                  <template v-for="item2 in item.ready">
                    <goods-item v-for="(goods, index) in item2" :key="index" :map="{ img: 'm_url' }" :entity="goods" :showAddress="true"></goods-item>
                  </template>
                </template>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div v-if="Object.keys(recentOrder.data).length < recentOrder.total_results" class="flex-center margin-tb-10">
            <el-button @click="changeCollapse(['recentOrder'])" type="primary" size="small">查看更多</el-button>
          </div>
        </template>
      </el-collapse-item>
      <el-collapse-item name="footerHistory" title="最近足迹" v-loading="footerHistory.loaded">
        <div>
          <div v-if="footerHistory.data.length == 0" style="height: 120px" class="flex-center padding-tb-20 relative">
            <div v-if="footerHistory.loaded" class="color-gray text-center">暂无内容</div>
          </div>
          <template v-else><goods-item v-for="(goods, index) in footerHistory.data" :key="index" :entity="goods"></goods-item></template>
          <div v-if="footerHistory.data.length == 5" class="flex-center margin-tb-10">
            <el-button @click="openMemberDetailModal('footerHistory')" type="primary" size="small">查看更多</el-button>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="padding-rl-20">
      <div class="flex-space-between margin-t-20 margin-b-12">
        <span class="font-16">话术设置</span>
        <el-button size="small" type="text" @click="addWords">添加</el-button>
      </div>
      <el-input prefix-icon="el-icon-search" class="margin-b-12" size="small" placeholder="请输入内容"></el-input>
      <div class="flex-start margin-b-12" v-for="(item, index) in wordsSet.data" :key="index">
        <el-input size="small" type="textarea" maxlength="100" :disabled="!item.isEdit" v-model="item.value" rows="4"></el-input>
        <div class="flex-col-start margin-l-12">
          <el-button size="small" type="primary" class="color-blue border-blue" plain @click="saveWords(item)">
            {{ item.isEdit ? '保存' : '设置' }}
          </el-button>
          <div class="margin-t-10">
            <el-button size="small" type="danger" class="margin-0" plain @click="delWords(index)">删除</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 
    <Spin fix v-if="!currentUserInfo.lastUpdateTime" key="loading"></Spin>
    <Spin fix v-if="currentUserInfo.lastUpdateTime == -1" key="error">
      <div @click="reloadUserInfo" style="width: 140px" class="pointer">加载失败，点击重试！</div>
    </Spin> -->
    <!-- <quick-reply /> -->
  </div>
</template>
<script>
import GoodsItem from './goodsItem.vue'
import TagList from './tagList.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'cusinfo',
  components: { GoodsItem, TagList },
  computed: {
    ...mapGetters(['currentUserInfo', 'currentChatUserId', 'uid'])
  },
  data() {
    return {
      w: 280,
      activeCollapse: 'consume',
      memberTag: {
        loaded: false,
        data: []
      },
      cartGoods: {
        loaded: false,
        data: [
          {
            goods_id: 1,
            name: '【好运开衫】【100%美丽诺羊毛】高贵红 本命红 小香风开衫 W121D16005',
            img: 'https://tf-mall-test.oss-cn-shenzhen.aliyuncs.com/storage/images/goods/list/f954aa55e58e499aafbc26382d6dfa12.jpeg?x-oss-process=image/resize,w_165',
            m_url:
              'https://tf-mall-test.oss-cn-shenzhen.aliyuncs.com/storage/images/goods/list/f954aa55e58e499aafbc26382d6dfa12.jpeg?x-oss-process=image/resize,w_165',
            ship_area: '广东省',
            ship_addr: '深圳市',
            price: '100',
            nums: 2,
            logi_no: 'sf10000010'
          }
        ]
      },
      favGoods: {
        loaded: false,
        data: [
          {
            goods_id: 1,
            name: '【好运开衫】【100%美丽诺羊毛】高贵红 本命红 小香风开衫 W121D16005',
            img: 'https://tf-mall-test.oss-cn-shenzhen.aliyuncs.com/storage/images/goods/list/f954aa55e58e499aafbc26382d6dfa12.jpeg?x-oss-process=image/resize,w_165',
            m_url:
              'https://tf-mall-test.oss-cn-shenzhen.aliyuncs.com/storage/images/goods/list/f954aa55e58e499aafbc26382d6dfa12.jpeg?x-oss-process=image/resize,w_165',
            ship_area: '广东省',
            ship_addr: '深圳市',
            price: '100',
            nums: 2,
            logi_no: 'sf10000010'
          }
        ]
      },
      recentOrder: {
        loaded: false,
        total_results: 0,
        page: 0,
        data: {}
      },
      footerHistory: {
        loaded: false,
        data: [
          {
            goods_id: 1,
            name: '【好运开衫】【100%美丽诺羊毛】高贵红 本命红 小香风开衫 W121D16005',
            img: 'https://tf-mall-test.oss-cn-shenzhen.aliyuncs.com/storage/images/goods/list/f954aa55e58e499aafbc26382d6dfa12.jpeg?x-oss-process=image/resize,w_165',
            m_url:
              'https://tf-mall-test.oss-cn-shenzhen.aliyuncs.com/storage/images/goods/list/f954aa55e58e499aafbc26382d6dfa12.jpeg?x-oss-process=image/resize,w_165',
            ship_area: '广东省',
            ship_addr: '深圳市',
            price: '100',
            nums: 2,
            logi_no: 'sf10000010'
          }
        ]
      },
      fullscreenLoading: false,
      wordsSet: {
        loaded: false,
        data: [
          {
            value: '新年快乐，大家好，才是真的好',
            isEdit: false
          },
          {
            value: '新年快乐，大家好，才是真的好',
            isEdit: false
          }
        ]
      }
    }
  },
  methods: {
    down() {
      let self = this
      let el = this.$refs.line
      el.setCapture
        ? (el.setCapture(),
          (el.onmousemove = function (ev) {
            self.mouseMove(ev)
          }),
          (el.onmouseup = this.mouseUp))
        : (document.addEventListener('mousemove', this.mouseMove), document.addEventListener('mouseup', this.mouseUp))
    },
    mouseMove(e) {
      let clientWidth = document.documentElement.clientWidth
      this.w = clientWidth - e.pageX
    },
    openMemberDetailModal() {},
    changeCollapse(value) {
      let key = value[0]
      let params = {
        member_id: this.currentChatUserId
      }
      switch (key) {
        case 'memberTag':
          this.memberTag.loaded = true
          break
        case 'cartGoods':
          params.page = 1
          params.limit = 5
          return
        // !this.cartGoods.loaded &&
        //   this.fetchCartGoods(params)
        //     .then(res => {
        //       if (res.status == 'success') {
        //         this.cartGoods.data = this.formatListData(res.data.data)
        //       } else {
        //         this.cartGoods.data = []
        //       }
        //       this.cartGoods.loaded = true
        //     })
        //     .catch(e => {
        //       this.cartGoods.loaded = true
        //     })
        // break
        case 'favGoods':
          params.page = 1
          params.limit = 5
          return
        // !this.favGoods.loaded &&
        //   this.collectGoods(params)
        //     .then(res => {
        //       if (res.status == 'success') {
        //         this.favGoods.data = this.formatListData(res.data.data)
        //       } else {
        //         this.favGoods.data = []
        //       }
        //       this.favGoods.loaded = true
        //     })
        //     .catch(e => {
        //       this.favGoods.loaded = true
        //     })
        // break
        case 'recentOrder':
          params.page = ++this.recentOrder.page
          params.limit = 5
          params.type = 6
          //   this.getMemberDetailData('mobileapi.order.getUserOrderList', params, this.recentOrder, key);
          break
        case 'footerHistory':
          params.page = 1
          params.limit = 5
          return
        // !this.footerHistory.loaded &&
        //   this.footPrint(params)
        //     .then(res => {
        //       if (res.status == 'success') {
        //         let data = res.data.data
        //         data.map(item => {
        //           item.img = item.images ? item.images.m_url || '' : ''
        //         })
        //         this.footerHistory.data = data
        //       } else {
        //         this.footerHistory.data = []
        //       }
        //       this.footerHistory.loaded = true
        //     })
        //     .catch(e => {
        //       this.footerHistory.loaded = true
        //     })
        // break
        default:
          break
      }
    },
    addWords() {
      this.wordsSet.data.unshift({
        value: '',
        isEdit: true
      })
    },
    saveWords(item) {
      console.log('item+++', item.isEdit)
      if (!item.isEdit) {
        item.isEdit = true
        return
      }
      console.log('saveWords++++')
      if (item.id) {
        //
      } //有ID就是更新，没有就是新增
    },
    delWords(index) {
      this.wordsSet.data.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.cusinfo {
  min-width: 200px;
  width: 240px;
  max-width: 300px;
  overflow-y: scroll;
}
.border {
  position: absolute;
  left: 0;
  width: 3px;
  height: 100%;
  border-left: 1px solid #e6e6e6;
}
.border:hover {
  cursor: w-resize;
}

.avatar {
  width: 55px;
  height: 55px;
  border-radius: 5px;
}

.cusinfo::-webkit-scrollbar {
  display: none;
}
.icon-box {
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
}
.tag {
  min-width: 80px;
  border-radius: 24px;
}
::v-deep .el-collapse-item__header {
  padding: 0 17px 0 20px;
}
</style>
