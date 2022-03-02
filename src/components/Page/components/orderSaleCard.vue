<template>
  <div>
    <div class="flex-space-between">
      <div class="font-16">{{ tendencyData.name }}</div>
      <slot name="right"></slot>
    </div>
    <div :id="tendencyData.id"></div>
  </div>
</template>
<script>
import DataSet from '@antv/data-set'
export default {
  name: 'orderSaleCard',
  props: {
    tendencyData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  watch: {
    tendencyData: {
      handler: function () {
        this.$nextTick(() => {
          if (this.pageShow) this.drawChart()
        })
      },
      deep: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  created() {
    this.pageShow = true
  },
  activated() {
    this.pageShow = true
    this.drawChart()
  },
  deactivated() {
    this.pageShow = false
  },
  methods: {
    drawChart() {
      let chartId = this.tendencyData.id
      let chartData = this.tendencyData.data
      this.chart && this.chart.destroy()
      var chart = new G2.Chart({
        container: chartId,
        forceFit: true,
        height: 400,
        padding: 'auto'
      })
      this.chart = chart
      chart.axis('days', {
        label: {
          textStyle: {
            fill: '#aaaaaa'
          }
        }
      })
      chart.axis('total_amount', {
        label: {
          textStyle: {
            fill: '#aaaaaa'
          }
        },
        line: {
          stroke: '#d9d9d9', // 网格线的颜色
          lineWidth: 1 // 网格线的宽度
        }
      })
      chart.axis('total_order_num', {
        tickLine: {
          lineWidth: 1, // 刻度线宽
          stroke: '#ccc', // 刻度线的颜色
          value: 5 // 刻度线的长度
        },
        line: {
          stroke: '#d9d9d9', // 网格线的颜色
          lineWidth: 1 // 网格线的宽度
        }
      })
      var ds = new DataSet()
      var dv = ds.createView().source(chartData)
      dv.transform({
        type: 'map',
        callback(row) {
          row.days = row.days.substring(5, 10).replace('-', '/')
          return row
        }
      })
      chart.legend({
        position: 'top-center',
        formatter: function (val) {
          return val
        }
      })
      let total_amount_max = chartData.length
        ? Math.max(
            ...chartData.map(v => {
              return v.total_amount
            })
          )
        : 1
      chart.source(dv, {
        total_order_num: {
          min: 0,
          alias: '订单数',
          formatter: function (val) {
            return val + '件'
          }
        },
        refund_amount: {
          min: 0,
          max: total_amount_max, // 定义refund_amount最大值为total_amount
          alias: '退款额',
          formatter: function (val) {
            return `￥${val.toFixed(2)}`
          }
        },
        total_amount: {
          min: 0,
          alias: '销售额',
          formatter: function (val) {
            return `￥${val.toFixed(2)}`
          }
        },
        days: {
          tickCount: 12,
          type: 'cat'
        }
      })
      chart.axis('refund_amount', false)
      chart.tooltip({
        crosshairs: false
      })
      chart.line().position('days*total_amount').color('#1890ff').shape('smooth')
      chart.line().position('days*refund_amount').color('#e91e63').shape('smooth')
      chart.line().position('days*total_order_num').color('#2fc25b').shape('smooth')
      chart.render()
    }
  }
}
</script>
