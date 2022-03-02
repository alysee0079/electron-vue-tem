<template>
  <el-card>
    <!-- <Spin size="large" fix v-if="loading"></Spin> -->
    <div class="flex-space-between padding-b-10">
      <p>热卖速报</p>
      <el-button size="small" @click="getCurrentSaleTrends" icon="el-icon-refresh" type="text"></el-button>
    </div>
    <div class="flex-start-center flex-warp padding-b-10">
      <el-select size="small" v-model="saleTrendsFrom.hour" style="width: 100px" class="margin-r-10">
        <el-option v-for="item in timeRanger" :value="item.value" :key="item.value" :label="item.label"></el-option>
      </el-select>
      <el-select size="small" v-model="saleTrendsFrom.sortKey" style="width: 100px" class="margin-r-10">
        <el-option v-for="item in sortKeyValue" :value="item.value" :key="item.value" :label="item.label"></el-option>
      </el-select>
      <el-radio-group size="small" v-model="saleTrendsFrom.sortValue">
        <el-radio label="desc">
          <span>倒序</span>
        </el-radio>
        <el-radio label="asc">
          <span>升序</span>
        </el-radio>
      </el-radio-group>
    </div>
    <el-table :data="tableData" :columns="columns" size="small"></el-table>
  </el-card>
</template>

<script>
import { mapActions } from 'vuex'
import xTableCell from './components/x-table-cell.vue'
let timer = null
export default {
  name: 'hotProductsInfo',
  data() {
    return {
      loading: true,
      timeRanger: [
        {
          value: 1,
          label: '1小时'
        },
        {
          value: 2,
          label: '2小时'
        }
      ],
      selectTime: '30',
      sortKeyValue: [
        {
          label: '浏览量',
          value: 'browse_num'
        },
        {
          label: '销量',
          value: 'sell_num'
        }
      ],
      saleTrendsFrom: {
        hour: 1,
        sortKey: 'browse_num',
        sortValue: 'desc'
      },
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center',
          title: '序号'
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
          align: 'center',
          width: 100
        },
        {
          key: 'share_num',
          title: '转发量',
          sortable: true,
          align: 'center',
          width: 90
        },
        {
          key: 'sell_num',
          title: '销量',
          sortable: true,
          align: 'center',
          width: 80
        },
        {
          key: 'sell_trend',
          title: '趋势',
          sortable: true,
          align: 'center',
          width: 80,
          render: (h, params) => {
            let sell_trend = params.row.sell_trend
            return h(
              'span',
              {
                class: [sell_trend > 0 ? 'color-success' : 'color-danger']
              },
              sell_trend > 0 ? `+${sell_trend}` : sell_trend
            )
          }
        }
      ],
      tableData: []
    }
  },
  watch: {
    saleTrendsFrom: {
      handler: function () {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        timer = setTimeout(() => {
          this.getCurrentSaleTrends()
          clearTimeout(timer)
          timer = null
        }, 1000)
      },
      deep: true
    }
  },
  mounted() {
    this.getCurrentSaleTrends()
  },
  methods: {
    ...mapActions(['currentSaleTrends']),
    getCurrentSaleTrends() {
      this.loading = true
      this.currentSaleTrends(this.saleTrendsFrom).then(res => {
        this.loading = false
        if (res.status == 'success') {
          this.tableData = res.data
        } else {
          this.tableData = []
        }
      })
    }
  }
}
</script>

<style></style>
