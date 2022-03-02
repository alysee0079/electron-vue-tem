<template>
  <el-row>
    <el-col :span="24" :xl="12" class="margin-b-10">
      <card-doublet-item :analysisData="goodsBrandChartData" class="flex-item padding-rl-10">
        <div class="flex-start flex-warp width-100" slot="left">
          <el-select size="small" v-model="goodsBrandFrom.brand_id" style="width: 90px" class="margin-r-10">
            <el-option v-for="item in brandList" :value="item.value" :key="item.value" :label="item.brand_name"></el-option>
          </el-select>
          <el-select size="small" v-model="goodsBrandFrom.beforeDate" style="width: 100px">
            <el-option v-for="item in timeRange" :value="item.value" :key="item.value" :label="item.label"></el-option>
          </el-select>
        </div>
        <el-button slot="right" @click="getGoodsSalesTrendsData" icon="el-icon-refresh" size="small" type="text"></el-button>
        <el-table :data="goodsBrandChartData.goodsData" :columns="columns" size="small"></el-table>
      </card-doublet-item>
    </el-col>
    <el-col :span="24" :xl="12" class="margin-b-10">
      <card-doublet-item :analysisData="goodsTypeChartData" class="flex-item padding-rl-10">
        <div class="flex-start flex-warp width-100" slot="left">
          <el-cascader
            size="small"
            v-model="selectGoodsType"
            :options="goodsTypes"
            style="width: 100px"
            :render-format="format"
            :clearable="false"
            @on-change="changeGoodsType"
            class="margin-r-10"
          ></el-cascader>
          <el-select size="small" v-model="goodsTypeFrom.beforeDate" style="width: 100px" class="margin-r-10">
            <el-option v-for="item in timeRange" :value="item.value" :key="item.value" :label="item.label"></el-option>
          </el-select>
          <el-select size="small" v-model="goodsTypeFrom.sortKey" style="width: 100px" class="margin-r-10">
            <el-option value="browse_num" label="浏览量"></el-option>
            <el-option value="sell_num" label="销量"></el-option>
          </el-select>
          <el-radio-group size="small" v-model="goodsTypeFrom.sortValue">
            <el-radio label="desc">倒序</el-radio>
            <el-radio label="asc">升序</el-radio>
          </el-radio-group>
        </div>
        <el-button size="small" slot="right" @click="getGoodsSalesTrendsData" icon="el-icon-refresh" type="text"></el-button>
        <el-table :data="goodsTypeChartData.goodsData" :columns="columns" size="small"></el-table>
      </card-doublet-item>
    </el-col>
  </el-row>
</template>

<script>
import CardDoubletItem from './components/cardDoubletChart'
import { mapActions } from 'vuex'
import xTableCell from './components/x-table-cell.vue'
let brandTimer = null
let typeTimer = null
export default {
  name: 'classAnalysis',
  components: { CardDoubletItem },
  data() {
    return {
      brandList: [], //品牌
      goodsTypes: [], //品类
      selectGoodsType: [85, 88, 95], //选中的品类
      timeRange: [
        {
          value: '7',
          label: '最近一周'
        },
        {
          value: '30',
          label: '最近一个月'
        },
        {
          value: '90',
          label: '最近三个月'
        }
      ],
      goodsBrandFrom: {
        brand_id: 1,
        beforeDate: '7',
        sortKey: 'browse_num',
        sortValue: 'desc'
      },
      goodsBrandChartData: {
        id: 'goodsBrandChartData-v1',
        data: [],
        bgcolor: '#f9efff',
        title: '消费趋势分析',
        loading: true,
        alias: '销量',
        goodsData: []
      },
      goodsTypeFrom: {
        cat_id: 95,
        beforeDate: '7',
        sortKey: 'browse_num',
        sortValue: 'desc'
      },
      goodsTypeChartData: {
        id: 'goodsTypeChartData-v2',
        data: [],
        bgcolor: '#f0f5ff',
        title: '消费品类趋势分析',
        loading: true,
        alias: '销量',
        goodsData: []
      },
      columns: [
        {
          type: 'index',
          width: 80,
          align: 'center',
          title: 'TOP 10'
        },
        {
          title: '操作',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h(xTableCell, {
              props: {
                type: 'goods',
                id: params.row.goods_id,
                button_text: '查看'
              }
            })
          }
        },
        {
          key: 'name',
          title: '商品名称',
          minWidth: 300
        },
        {
          key: 'browse_num',
          title: '浏览量',
          sortable: true,
          width: 100,
          align: 'center'
        },
        {
          key: 'sell_num',
          title: '销量',
          sortable: true,
          width: 100,
          align: 'center'
        }
      ]
    }
  },
  watch: {
    goodsTypeFrom: {
      handler: function () {
        if (typeTimer) {
          clearTimeout(typeTimer)
          typeTimer = null
        }
        typeTimer = setTimeout(() => {
          this.getGoodsSalesTrendsData('type')
          clearTimeout(typeTimer)
          typeTimer = null
        }, 1000)
      },
      deep: true
    },
    goodsBrandFrom: {
      handler: function () {
        if (brandTimer) {
          clearTimeout(brandTimer)
          brandTimer = null
        }
        brandTimer = setTimeout(() => {
          this.getGoodsSalesTrendsData('brand')
          clearTimeout(brandTimer)
          brandTimer = null
        }, 1000)
      },
      deep: true
    }
  },
  created() {
    this.getBrandList()
    this.getGoodsCatList()
    this.getGoodsSalesTrendsData('brand')
    this.getGoodsSalesTrendsData('type')
  },
  methods: {
    ...mapActions(['getGoodsBrandList', 'goodsCatList', 'goodsSalesTrends']),
    getGoodsSalesTrendsData(type) {
      let params = this.goodsBrandFrom
      let chartData = this.goodsBrandChartData
      if (type == 'type') {
        params = this.goodsTypeFrom
        chartData = this.goodsTypeChartData
      }
      chartData.loading = true
      this.goodsSalesTrends(params).then(res => {
        chartData.loading = false
        if (res.status == 'success') {
          let { sell_list, goods_list } = res.data
          chartData.data = sell_list
          chartData.goodsData = goods_list
        }
      })
    },
    getBrandList() {
      let list = localStorage['brandList'] ? JSON.parse(localStorage['brandList']) : null
      if (list && Date.now() - list.time < 6 * 3600 * 100) {
        this.brandList = []
        list.data.map(v => {
          if (v.brand_id) this.brandList.push(v)
        })
        return
      }
      console.log('getGoodsBrandList+++')
      this.getGoodsBrandList().then(res => {
        if (res.status == 'success') {
          let _data = res.data
          let brandList = []
          _data.map(item => {
            item.value = String(item.brand_id)
            item.label = item.brand_name
            brandList.push(item)
          })
          this.brandList = brandList
          // 缓存
          localStorage['brandList'] = JSON.stringify({
            time: Date.now(),
            data: brandList
          })
        }
      })
    },
    getGoodsCatList() {
      let vm = this
      vm.goodsCatList().then(res => {
        if (res.status == 'success') {
          let { goodsCats } = res.data
          goodsCats.map(item => {
            item.label = item.cat_name
            item.value = item.cat_id
            if (item.children && item.children.length) {
              item.children.map(item2 => {
                item2.label = item2.cat_name
                item2.value = item2.cat_id
                if (item2.children && item2.children.length) {
                  item2.children.map(item3 => {
                    item3.label = item3.cat_name
                    item3.value = item3.cat_id
                  })
                }
              })
            }
            vm.goodsTypes.push(item)
          })
        }
      })
    },
    changeGoodsType(value) {
      this.goodsTypeFrom.cat_id = value[2] || value[1] || value[0]
    },
    format(labels, selectedData) {
      const index = labels.length - 1
      const data = selectedData[index] || false
      if (data && data.cat_id) {
        return labels[index]
      }
      return labels[index]
    }
  }
}
</script>

<style></style>
