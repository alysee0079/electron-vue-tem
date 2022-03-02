<template>
  <!-- 商品 -->
  <div style="background: #cce4fc" class="talk-order pointer flex-col-start-center padding-10 border-r-5">
    <div class="flex-start margin-t-10" v-for="(item1, index) in JSON.parse(item.content)" :key="index">
      <div class="link-img border-r-5 img-fit-contain flex-shrink-0" style="height: 76px; width: 76px">
        <img :src="$ossUrlTest(item1.image_default)" />
      </div>
      <div class="padding-rl-10 flex-col-space-between font-mini">
        <p class="font-bold line-h-20">{{ Array.isArray(item1.brand) ? item1.brand[0] : item1.brand }}</p>
        <p class="margin-tb-5 font-normal line-ellispsis-2 line-h-20">{{ item1.name }}</p>
        <p class="font-mini">
          ￥
          <span class="font-big color-dark">{{ item1.price }}</span>
        </p>
      </div>
    </div>
    <div class="flex-space-between color-gray padding-rl-8 padding-t-10 margin-t-10 border-t-gray">
      <p>查看更多</p>
      <span class="iconfont guide-icon font-mini">></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'msgGoods',
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
.right {
  flex-direction: row-reverse;
}
.border-t-gray {
  border-top: 1px solid #9a9a9a;
}
.top-more-bar {
  height: 36px;
  line-height: 36px;
}
.back-bottom {
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  color: #666;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
}
.message-loading-bg {
  position: absolute;
  top: 10px;
  left: 0px;
  height: 20px;
  width: 10px;
  background-color: rgba(255, 255, 255, 0.63);
}
.message-loading {
  color: #333;
  animation: loading-data-v-36bc97b8 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
.line-h-20 {
  line-height: 20px;
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
