<template>
  <div class>
    <!-- 双线图 -->
    <el-card class :style="{ background: analysisData.bgcolor }">
      <!-- <Spin size="large" fix v-if="analysisData.loading"></Spin> -->
      <div v-if="analysisData.title" class="font-bold font-14">
        <span class="color-dark">{{ analysisData.title }}</span>
      </div>
      <div class="flex-space-between padding-t-10">
        <div><slot name="left"></slot></div>
        <div><slot name="right"></slot></div>
      </div>
      <div :id="analysisData.id" class="margin-tb-10"></div>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
import DataSet from '@antv/data-set'
export default {
  name: 'cardItem',
  components: {},
  props: {
    analysisData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    analysisData: {
      handler: function () {
        this.$nextTick(() => {
          if (this.pageShow) {
            this.drawChart()
          }
        })
      },
      deep: true
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
      let chartId = this.analysisData.id
      let chartData = this.analysisData.data
      // Step 1: 创建 Chart 对象
      this.chart && this.chart.destroy()
      let chart = new G2.Chart({
        container: chartId,
        height: 300, // 指定图表高度
        forceFit: true,
        padding: 'auto',
        background: {
          fill: 'white'
        }
      })
      let ds = new DataSet()
      let dv = ds.createView().source(chartData)
      // Step 2: 载入数据源,定义列信息
      chart.source(dv, {
        day: {
          tickCount: 12
        },
        date: {
          type: 'cat'
        },
        value: {
          alias: this.analysisData.alias
        }
      })
      chart.axis('day', {
        label: {
          textStyle: {
            fill: '#aaaaaa'
          }
        }
      })
      chart.axis('value', {
        label: {
          formatter(val) {
            return val
          }
        },
        min: 0
      })

      chart.line().position('day*value').shape('smooth')
      chart.point().position('day*value').size(4).shape('circle').style({
        stroke: '#fff',
        lineWidth: 1
      })

      chart.render()
      this.chart = chart
    }
  }
}
</script>
<style lang="css" scoped></style>
