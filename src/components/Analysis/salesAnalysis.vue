<template>
  <el-card class="relative margin-rl-10">
    <!-- <Spin size="large" fix v-if="loading"></Spin> -->
    <div class="flex-space-between">
      <el-date-picker
        size="small"
        type="date"
        style="width: 200px"
        :value="salesFrom.dateTime"
        @on-change="changeTime"
        format="yyyy-MM-dd"
      ></el-date-picker>
      <el-button size="small" @click="getDateSalesTrends" icon="el-icon-refresh" type="text"></el-button>
    </div>
    <el-row>
      <el-col v-for="(item, index) in tendencyChartData" :key="index" :span="24" :xl="12" class="margin-b-10">
        <card-tendency-chart :tendencyData="item" :valueFormatter="item.valueFormatter"></card-tendency-chart>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import cardTendencyChart from './components/cardTendencyChart'
import { mapActions } from 'vuex'
export default {
  name: 'salesAnalysis',
  components: { cardTendencyChart },
  data() {
    return {
      tendencyChartData: [
        {
          name: '24小时销售趋势',
          data: [],
          id: 'v3',
          valueFormatter: v => {
            return `${v}件`
          }
        },
        {
          name: '累积销售额',
          data: [],
          id: 'v4',
          valueFormatter: v => {
            return `￥${v.toFixed(2)}`
          }
        }
      ],
      salesFrom: {
        dateTime: new Date().toLocaleDateString().replace(/\//g, '-')
      },
      loading: true
    }
  },
  created() {
    this.getDateSalesTrends()
  },
  methods: {
    ...mapActions(['dateSalesTrends']),
    getDateSalesTrends() {
      this.loading = true
      this.dateSalesTrends(Object.assign(this.salesFrom)).then(res => {
        this.loading = false
        if (res.status == 'success') {
          let { sell_num, sell_money } = res.data
          this.tendencyChartData[0].data = sell_num
          this.tendencyChartData[1].data = sell_money
        } else {
          this.tendencyChartData[0].data = []
          this.tendencyChartData[1].data = []
        }
      })
    },
    changeTime(value) {
      this.salesFrom.dateTime = value
      this.getDateSalesTrends()
    }
  }
}
</script>

<style></style>
