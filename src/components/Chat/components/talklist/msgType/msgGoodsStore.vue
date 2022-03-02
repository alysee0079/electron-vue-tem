<template>
  <!--   库存-->
  <div v-if="!!item.content" class="storage flex-col-start-center padding-10 border-r-5">
    <div class="padding-b-10">以下是您查询的商品库存信息：</div>
    <table>
      <tr style="background-color: #f5f5f5">
        <th class="padding-tb-5" style="font-size: 16px; font-weight: normal">货号</th>
        <th class="padding-tb-5" style="font-size: 16px; font-weight: normal">规格值</th>
        <th class="padding-tb-5" style="font-size: 16px; font-weight: normal">库存</th>
      </tr>

      <tr v-for="(item1, index) in item.content.StockList" :key="index">
        <td class="padding-tb-5 padding-rl-10" style="font-size: 14px; font-weight: normal">{{ item1.GoodsNo }}</td>
        <td class="padding-tb-5 padding-rl-10" style="font-size: 14px; font-weight: normal">颜色:{{ item1.ColorDesc }}、尺码:{{ item1.SizeDesc }}</td>
        <td class="padding-tb-5 padding-rl-15" style="font-size: 14px; font-weight: normal">{{ item1.Qty }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'msgGoodsStore'
}
</script>

<style scoped>
table {
  cellspacing: 0;
  border-collapse: collapse;
  text-align: center;
}
th {
  font-size: 20px;
  color: #222222;
  border: 0.1px solid #000;
}
td {
  font-size: 18px;
  color: #383838;
  border: 0.1px solid #000;
}
colgroup {
  background: transparent;
}
col {
  width: 225px;
  height: 40px;
}
.storage {
  background-color: #cce4fc;
}
</style>
