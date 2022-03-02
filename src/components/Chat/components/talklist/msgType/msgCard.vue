<template>
  <div style="overflow: hidden" class="flex-col-start-center border-1px border-r-5 font-normal">
    <div class="img-card color-white font-20 flex-col-center" style="justify-content: flex-end">
      <p class="margin-b-20 font-bold">{{ item.content.Nickname }}</p>
    </div>
    <div style="max-width: 400px" class="flex-start padding-b-10 padding-r-10 margin-t-5">
      <div class="padding-rl-10 flex-col-start" style="justify-content: center">
        <p class="font-bold color-gold font-16 line-h-20 margin-b-10">微信端识别可添加企业成员</p>
      </div>
      <div class="link-img border-r-5 img-fit-contain flex-shrink-0" style="height: 76px; width: 76px">
        <img :src="item.content.CodeUrl" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'msgCard'
}
</script>

<style scoped>
.line-h-20 {
  line-height: 20px;
}
.img-card {
  height: 100px;
  background: url('http://zone-yingerfashion.oss-cn-shenzhen.aliyuncs.com/storage/images/system-image/2c9ef9c3b660a9e54104b794428ecb1c.png') 100% 100%
    no-repeat;
  background-position: 0 0;
}
.color-gold {
  color: #caac84;
}
</style>
