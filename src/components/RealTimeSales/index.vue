<template>
  <div class="flex-col-start bg-white padding-20">
    <div class="font-20 margin-b-20">实时销售</div>
    <el-row>
      <el-col :span="8" class="flex-col-center padding-r-12">
        <SalesModules :salesOptions="salesOptions"></SalesModules>
      </el-col>
      <el-col :span="8" class="flex-col-center padding-rl-12">
        <SalesModules :salesOptions="group"></SalesModules>
      </el-col>
      <el-col :span="8" class="flex-col-center padding-l-12 padding-r-10">
        <SalesModules :salesOptions="personal"></SalesModules>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SalesModules from './components/salesModules.vue'
export default {
  name: 'realTimeSales',
  components: { SalesModules },
  data() {
    return {
      salesOptions: {
        title: '总榜',
        style: { color: '#1890FF' },
        firstSelect: [
          {
            label: '年度',
            value: 'year'
          }
        ], //select需要的参数
        firstDefVal: 'year',
        secondSelect: [
          {
            label: '销量爆款榜',
            value: 'sales'
          },
          {
            label: '销爆',
            value: 'sales1'
          }
        ],
        secondDefVal: 'sales',
        columns: [
          {
            title: '排名'
          },
          {
            title: '款号'
          },
          {
            title: '销量'
          }
        ],
        salesData: [
          {
            bn: '40000058655',
            salesNum: 704
          },
          {
            bn: '40000058655',
            salesNum: 601
          },
          {
            bn: '40000058655',
            salesNum: 516
          },
          {
            bn: '40000058655',
            salesNum: 510
          }
        ] //显示的数据
      },
      group: {
        title: '团体',
        style: { color: '#FF4D4F' },
        firstSelect: [], //select需要的参数
        secondSelect: [],
        columns: [],
        salesData: [] //显示的数据
      },
      personal: {
        title: '个人',
        style: { color: '#FAAD14' },
        firstSelect: [], //select需要的参数
        secondSelect: [],
        columns: [],
        salesData: [] //显示的数据
      }
    }
  }
}
</script>
<style scoped>
.padding-l-12 {
  padding-left: 12px;
}
.padding-r-12 {
  padding-right: 12px;
}
.padding-rl-12 {
  padding-left: 12px;
  padding-right: 12px;
}
</style>
