<style lang="css"></style>

<template>
  <div class="width-100 padding-10">
    <!-- 趋势图 -->
    <slot></slot>
    <p>{{ tendencyData.name }}</p>
    <div class="flex-space-between">
      <slot name="left"></slot>
      <slot name="right"></slot>
    </div>
    <div :id="tendencyData.id"></div>
  </div>
</template>

<script>
import DataSet from '@antv/data-set'
export default {
  name: 'cardTendencyChart',
  props: {
    tendencyData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    valueFormatter: {
      type: Function,
      default: v => {
        return v
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
      let vm = this
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
      var ds = new DataSet()
      var dv = ds.createView().source(chartData)
      dv.transform({
        type: 'map',
        callback(row) {
          var times = row.day.split(' ')
          row.date = times[0]
          row.time = times[1]
          return row
        }
      })
      chart.axis('time', {
        label: {
          textStyle: {
            fill: '#aaaaaa'
          }
        }
      })
      chart.axis('value', {
        label: {
          textStyle: {
            fill: '#aaaaaa'
          }
        },
        formatter(text) {
          return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
        }
      })
      chart.tooltip({
        crosshairs: false //关闭辅助线
      })
      chart.legend({
        position: 'top-center'
      })
      chart.source(dv, {
        time: {
          tickCount: 12
        },
        date: {
          type: 'cat'
        },
        value: {
          formatter: v => vm.valueFormatter(v)
        }
      })
      chart.line().position('time*value').shape('smooth').color('date', ['#d9d9d9', '#1890ff'])
      chart.render()
    }
  }
}
</script>
