<template>
  <!--  物流-->
  <div v-if="!!item.content" style="background-color: #cce4fc" class="talk-order flex-col-start-center padding-10 border-r-5">
    <p v-for="item1 in item.content.Traces" style="line-height: 20px; font-size: 14px" :key="item1">
      <span class="font-3x" style="color: #caac84">●</span>
      {{ item1.Location }}：{{ item1.AcceptStation }}{{ item1.AcceptTime }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'msgLogistics'
}
</script>

<style scoped></style>
