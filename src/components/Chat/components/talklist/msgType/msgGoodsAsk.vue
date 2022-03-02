<template>
  <div
    @click="lookGoods(item.content)"
    style="background: #cce4fc"
    class="talk-order pointer flex-col-start-center padding-10 border-r-5 font-normal"
  >
    <div style="max-width: 400px" class="flex-start margin-t-5">
      <div class="link-img border-r-5 img-fit-contain flex-shrink-0" style="height: 76px; width: 76px">
        <img :src="$ossUrlTest(item.content.imgUrl)" />
      </div>
      <div style="align-items: start" class="padding-rl-10 flex-col-center font-mini">
        <p class="font-bold font-normal line-ellispsis-2 line-h-18 margin-b-10">{{ item.content.title }}</p>
        <p v-if="item.content.price" class="font-mini">
          ￥
          <span class="font-big color-dark">{{ item.content.price }}</span>
        </p>
        <p v-if="item.content.desc" class="line-ellispsis-2 font-normal line-h-18">
          {{ item.content.desc }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'msgGoodsAsk',
  methods: {
    lookGoods(item) {
      let page = item.goods_id ? `/detailView?goods_id=${item.goods_id}` : item.link.split('#')[1]
      this.$openModal({
        route: 'webView',
        query: { page },
        options: { title: '商品详情', width: 380, height: 697, resizable: false, maximizable: false }
      })
    }
  }
}
</script>

<style scoped>
.line-h-18 {
  line-height: 18px;
}
</style>
