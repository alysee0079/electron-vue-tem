<template>
  <div class="sales-box border-r-5" :style="{ 'border-top': `4px solid ${salesOptions.style.color}` }">
    <div class="sales-header flex-space-between width-100">
      <div class="font-28" :style="salesOptions.style">
        {{ salesOptions.title }}
      </div>
      <div class="flex-start-center">
        <el-select class="firstSelect select-width" size="small" v-model="salesOptions.firstDefVal" placeholder="请选择">
          <el-option v-for="item in salesOptions.firstSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select class="secondSelect select-width margin-l-10" size="small" v-model="salesOptions.secondDefVal" placeholder="请选择">
          <el-option v-for="item in salesOptions.secondSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
    </div>
    <div class="sales-columns flex-wrap flex-space-between padding-tb-20">
      <div class="" v-for="(item, index) in salesOptions.columns" :key="index">{{ item.title }}</div>
    </div>
    <div class="sales-body">
      <ul v-for="(item, index) in salesOptions.salesData" :key="index">
        <li class="flex-wrap flex-space-between margin-b-20">
          <img :src="sortImg[index]" class="sortImg" v-if="index <= 2" alt="" />
          <div v-else class="text-center sortImg">{{ index + 1 }}</div>
          <div>{{ item.bn }}</div>
          <div class="font-16" :style="index <= 2 ? salesOptions.style : {}">{{ item.salesNum }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'salesModules',
  props: {
    innerWidth: window.innerWidth,
    salesOptions: {
      type: Object,
      default() {
        return {
          title: '总榜',
          style: { color: '#1890FF' },
          firstSelect: [], //select需要的参数
          secondSelect: [],
          columns: [],
          salesData: [] //显示的数据
        }
      }
    }
  },
  data() {
    return {
      sortImg: {
        0: require('@/assets/first.png'),
        1: require('@/assets/second.png'),
        2: require('@/assets/third.png')
      }
    }
  }
}
</script>
<style scoped>
.select-width {
  width: 100px;
}
.sales-box {
  width: 100%;
  height: 666px;
  background: #ffffff;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 5px;
  padding: 20px 16px 32px 20px;
}
.sortImg {
  width: 24px;
  height: 24px;
  color: #333333;
}
</style>
