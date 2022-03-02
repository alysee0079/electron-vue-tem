<template>
  <el-card>
    <!-- <Spin size="large" fix v-if="loading"></Spin> -->
    <div class="flex-space-between padding-b-10">
      <p>热搜关键词</p>
      <el-button size="small" @click="getSearchKeywordTrends" icon="el-icon-refresh" type="text"></el-button>
    </div>
    <div id="keywords"></div>
  </el-card>
</template>

<script>
import DataSet from '@antv/data-set'
import { mapActions } from 'vuex'
export default {
  name: 'hotKeywords',
  data() {
    return {
      loading: false,
      chart: null,
      keywordsData: {
        name: 'root',
        children: []
      }
    }
  },
  created() {
    this.pageShow = true
    this.getSearchKeywordTrends()
  },
  activated() {
    this.pageShow = true
    this.drawChart()
  },
  deactivated() {
    this.pageShow = false
  },
  methods: {
    ...mapActions(['searchKeywordTrends']),
    getSearchKeywordTrends() {
      this.loading = true
      this.searchKeywordTrends({ limit: 20 }).then(res => {
        this.loading = false
        if (res.status == 'success') {
          this.keywordsData.children = res.data
          if (this.pageShow) this.drawChart()
        }
      })
    },
    drawChart() {
      var dv = new DataSet.DataView()
      var data = this.keywordsData
      dv.source(data, {
        type: 'hierarchy'
      }).transform({
        field: 'num',
        type: 'hierarchy.treemap',
        tile: 'treemapResquarify',
        as: ['x', 'y']
      })
      var nodes = dv.getAllNodes()
      nodes.map(function (node) {
        node.keyword = node.data.keyword
        node.num = node.data.num
        return node
      })
      this.chart && this.chart.destroy()
      var chart = new G2.Chart({
        container: 'keywords',
        forceFit: true,
        height: 500,
        padding: 'auto'
      })
      this.chart = chart
      chart.source(nodes)
      chart.scale({
        num: {
          nice: false
        }
      })
      chart.axis(false)
      chart.legend(false)
      chart.tooltip({
        showTitle: false,
        itemTpl:
          '<li data-index={index}>' +
          '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
          '{keyword}<br/>' +
          '<span style="padding-left: 16px">浏览次数：{count}</span><br/>' +
          '</li>'
      })
      chart
        .polygon()
        .position('x*y')
        .color('keyword')
        .tooltip('keyword*num', function (keyword, count) {
          return {
            keyword: keyword,
            count: count
          }
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })
        .label('keyword', {
          offset: 0,
          textStyle: {
            textBaseline: 'middle'
          },
          formatter: function formatter(val) {
            if (val !== 'root') {
              return val
            }
          }
        })
      chart.render()
    }
  }
}
</script>

<style></style>
