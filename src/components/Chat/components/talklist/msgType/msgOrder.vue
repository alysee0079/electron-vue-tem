<template>
  <!-- 订单 -->
  <div class="font-normal">
    <div v-for="(item, index) in JSON.parse(item.content)" :key="index" class="pointer talk-order flex-start-center bg-gray padding-10 border-r-5">
      <div class="link-img img-fit-contain flex-shrink-0" style="height: 60px; width: 60px">
        <img :src="$ossUrlTest(item1.MUrl)" />
      </div>
      <div class="padding-rl-10 font-12">
        <p>订单编号：{{ item1.OrderId }}</p>
        <p class="padding-tb-5">共{{ item1.Nums }}件商品</p>
        <p>商品合计：￥{{ item1.FinalAmount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'msgOrder',
  methods: {
    openGoodsModal(goods_id) {
      this.$openModal({
        route: 'webView',
        query: { page: `/detailView?goods_id=${goods_id}` },
        options: { title: '商品详情', width: 380, height: 697, resizable: false, maximizable: false }
      })
    }
  }
}
</script>

<style scoped></style>
