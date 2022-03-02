<template>
  <div>
    <div @click="openGoodsModal(entity.goods_id)" class="pointer flex-start padding-rl-10 padding-tb-5 goodsItem">
      <img class="photo flex-shrink-0" :src="$ossUrlTest(entity[map.img || 'img'])" />
      <div class="flex-1 padding-l-10 flex-col-space-between padding-tb-5">
        <p class="font-12 line-ellispsis-1 line-12">{{ entity[map.name || 'name'] }}</p>
        <p class="color-gray font-14 flex-space-between">
          <span class="color-dark">￥{{ entity[map.price || 'price'] }}</span>
          <span v-if="entity[map.nums || 'nums']" class="font-12">× {{ entity[map.nums || 'nums'] }}</span>
        </p>
      </div>
    </div>
    <div v-if="showAddress && entity.ship_area" class="padding-rl-10 padding-tb-5 font-12 line-12">
      <div>收货地址:</div>
      <div>{{ entity.ship_area }}&nbsp;{{ entity.ship_addr }}</div>
      <div v-if="entity.logi_no">物流单号:&nbsp;{{ entity.logi_no }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsItem',
  props: {
    entity: {
      type: Object,
      default: () => {}
    },
    map: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showAddress: {
      type: Boolean,
      default: false
    }
  },
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

<style scoped>
.photo {
  width: 48px;
  height: 48px;
}
.goodsItem {
  height: 64px;
  border: 1px solid #e7e9ec;
  opacity: 1;
  border-radius: 4px;
  margin: 0 10px;
}
</style>
