<template>
  <div class="flex-col-start-center font-normal bg-white border-r-5">
    <div class="bg-gray border-r-5 order-w margin-t-5 padding-10">
      <div class="flex-start">
        <p class="color-text color-zong margin-b-5 margin-r-5">订单号：{{ item.content.order_id }}</p>
      </div>
      <div class="flex-start">
        <div class="link-img img-fit-contain flex-shrink-0" style="height: 70px; width: 70px">
          <!--                      <img :src="'http://mall.yingerfashion.com/'+item1.SUrl" alt="">-->
          <img :src="$ossUrlTest(item.content.goods[0].image_url)" />
        </div>
        <div class="padding-l-10 width-100">
          <p class="line-ellispsis-2 line-h-20 line-height-normal">{{ item.content.goods[0].name }}</p>
          <div class="flex-end padding-tb-5 font-mini">
            <p>x{{ item.content.goods[0].nums }}</p>
          </div>
          <p class="font-mini">
            商品合计：￥
            <span class="font-big color-dark">{{ item.content.goods[0].price }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'msgOrderAsk'
}
</script>

<style scoped>
.order-w {
  width: 350px;
}
.line-h-20 {
  line-height: 20px;
}
</style>
