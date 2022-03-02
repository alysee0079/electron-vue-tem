<template>
  <div class="padding-tb-10 padding-rl-20">
    <div class="flex-start-center padding-b-10 padding-rl-10">
      <img :src="avatar" class="link-img img-fit-cover border-1px" style="width: 60px; height: 60px; border-radius: 50%" />
      <p class="padding-rl-20 font-24">{{ nickname || '谭飞会员' }}</p>
    </div>
    <el-tabs size="small" name="member-detail" v-model="active_tab">
      <el-tab-pane label="会员订单" tab="member-detail" name="memberOrder">
        <order-list v-if="active_tab == 'memberOrder' || tabShow['memberOrder'] == true" :listParams="{ guideCode: uid, memberId: member_id }">
          <template slot="header-left">订单列表</template>
        </order-list>
      </el-tab-pane>
      <el-tab-pane label="会员商品" tab="member-detail" name="memberGoods">
        <member-goods-list v-if="active_tab == 'memberGoods' || tabShow['memberGoods'] == true" :listParams="{ member_id }"></member-goods-list>
      </el-tab-pane>
      <!-- <el-tab-pane label="加购商品" name="cartGoods">
        <cart-goods v-if="active_tab == 'cartGoods' || tabShow[active_tab] == true" :member_id="member_id"></cart-goods>
      </el-tab-pane>
      <el-tab-pane label="收藏商品" name="favGoods">
        <fav-goods v-if="active_tab == 'favGoods' || tabShow[active_tab] == true" :member_id="member_id"></fav-goods>
      </el-tab-pane> -->
      <el-tab-pane label="会员足迹" tab="member-detail" name="footerHistory">
        <foot-pointer v-if="active_tab == 'footerHistory' || tabShow['footerHistory'] == true" :member_id="member_id" />
      </el-tab-pane>
      <el-tab-pane label="售后单" tab="member-detail" name="aftersaleOrder">
        <aftersale-list
          v-if="active_tab == 'aftersaleOrder' || tabShow['aftersaleOrder'] == true"
          :listParams="{ guideCode: uid, memberId: member_id }"
        >
          <template slot="header-left">售后单列表</template>
        </aftersale-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import memberGoodsList from '../../../components/goods/components/memberGoodsList'
// import cartGoods from './cartGoods';
// import favGoods from './favGoods';
import footPointer from './footPointer'
import orderList from '../../../components/order/components/orderList'
import aftersaleList from '../../../components/aftersale/components/aftersaleList'
import { mapGetters } from 'vuex'
import { server_config } from '../../../config/yinger'
export default {
  name: 'memberDetail',
  components: { memberGoodsList, orderList, aftersaleList, footPointer },
  data() {
    return {
      avatar: '',
      nickname: '',
      member_id: '',
      active_tab: '',
      tabShow: {} // 控制首次只加载当前tab
    }
  },
  computed: {
    ...mapGetters(['uid'])
  },
  watch: {
    active_tab: function (v) {
      this.tabShow[v] = true
    }
  },
  created() {
    let { avatar = server_config.def_avatar, nickname = '谭飞会员', member_id, active_tab = 'memberOrder' } = this.$route.query
    this.member_id = member_id
    this.active_tab = active_tab
    this.avatar = avatar
    this.nickname = nickname
  },
  methods: {}
}
</script>

<style scoped></style>
