<template>
  <div class="flex-col-start">
    <div class="bg-white padding-rl-20 margin-b-10">
      <div class="flex-space-between padding-tb-10">
        <p class="font-20">数据总览</p>
        <el-select
          :value="summarizingSaleTime"
          :disabled="loadingSummarizing"
          style="width: 100px"
          size="small"
          @on-change="summarizingSaleTimeChange"
        >
          <el-option value="now_day" label="当天"></el-option>
          <el-option value="now_week" label="本周"></el-option>
          <el-option value="now_month" label="本月"></el-option>
          <el-option value="now_year" label="本年"></el-option>
        </el-select>
      </div>
      <!-- 环比 -->
      <ul class="card-list flex-space-between scroll-x flex-shrink-0">
        <li v-for="(item, index) in cardItems" :key="index" class="card-item">
          <el-card class="aminiation-padding">
            <div class="flex-space-between color-dark">
              <div>
                <div class="font-14">{{ item.title }}</div>

                <div class="font-bold font-17vw">{{ item.value }}</div>
                <div class="flex-start-center font-10" :class="[item.status == 'up' ? 'color-success' : 'color-danger']">
                  <span class="color-dark">环比上期</span>
                  <span class="margin-rl-5">{{ item.count }}%</span>
                  <span class="iconfont" :class="[item.status == 'up' ? 'color-success' : 'color-danger']">
                    {{ item.status == 'up' ? '&#xe626;' : '&#xe625;' }}
                  </span>
                  <!-- <Icon :type="item.status == 'up' ? 'md-trending-up' : 'md-trending-down'"/> -->
                </div>
              </div>
              <div class="link-img img-fit-contain card-img-item">
                <img :src="item.image" />
              </div>
            </div>
          </el-card>
        </li>
      </ul>
    </div>
    <!-- 销售趋势 -->
    <div class="padding-rl-10">
      <el-card>
        <OrderSaleCard :tendencyData="orderSaleChartData">
          <div slot="right">
            <el-select v-model="orderSaleTime" :disabled="loadingSalesTrend" style="width: 100px" @on-change="orderSaleTimeChange" size="small">
              <el-option v-for="(item, index) in times" :value="item.value" :key="index" :label="item.label"></el-option>
            </el-select>
          </div>
        </OrderSaleCard>
      </el-card>
    </div>
    <!-- 商品排行 -->
    <el-card class="flex-shrink-0 margin-tb-10 margin-rl-10">
      <p class="margin-b-10 font-16">商品销售TOP10</p>
      <div class="flex-space-between margin-b-10">
        <div class="flex-start-center">
          <el-select :disabled="loadingGoodsList" v-model="brand_id" style="width: 100px" class="margin-r-10" size="small">
            <el-option v-for="(item, index) in brandList" :value="item.value" :key="index" :label="item.label" placeholder="请选择品牌"></el-option>
          </el-select>
          <el-cascader
            v-model="selectGoodsType"
            :disabled="loadingGoodsList"
            :data="goodsTypes"
            style="width: 120px"
            class="margin-r-10"
            size="small"
            :render-format="format"
            :clearable="true"
            placeholder="请选择分类"
            @on-change="changeGoodsType"
          ></el-cascader>
          <el-select
            v-model="goodsListSortKey"
            :disabled="loadingGoodsList"
            size="small"
            style="width: 120px"
            class="margin-r-10"
            placeholder="请选择排序"
          >
            <el-option value="sell_num" label="销量"></el-option>
            <el-option value="sell_money" label="销售额"></el-option>
            <el-option value="browse_num" label="浏览量"></el-option>
            <el-option value="return_num" label="退货量"></el-option>
            <el-option value="return_money" label="退货额"></el-option>
            <el-option value="share_num" label="分享量"></el-option>
            <el-option value="add_cart_num" label="加购量"></el-option>
            <el-option value="collect_num" label="收藏量"></el-option>
          </el-select>
          <!-- <el-radio-group v-model="goodsListSortValue" @on-change="getGoodsListTop" type="button">
            <el-radio :disabled="loadingGoodsList" label="desc">
              <span>倒序</span>
            </el-radio>
            <el-radio :disabled="loadingGoodsList" label="asc">
              <span>升序</span>
            </el-radio>
          </el-radio-group> -->
          <el-input
            v-model="goodsTopBn"
            :disabled="loadingGoodsList"
            clearable
            placeholder="请输入商品bn"
            size="small"
            style="width: 160px; margin: 0 10px"
          ></el-input>
          <el-date-picker
            v-model="goodsTopListDateArr"
            :timestamp="false"
            size="small"
            style="width: 160px"
            :disabled="loadingGoodsList"
            placeholder="请选择日期"
          ></el-date-picker>
        </div>
        <el-button @click="getGoodsListTop" :loading="loadingGoodsList" type="primary" size="small">查询</el-button>
      </div>
      <el-table :columns="columns" :data="goodsData" :loading="loadingGoodsList"></el-table>
    </el-card>
  </div>
</template>
<script>
import OrderSaleCard from './components/orderSaleCard'
import { mapActions } from 'vuex'
export default {
  name: 'home',
  components: { OrderSaleCard },
  data() {
    return {
      summarizingSaleTime: 'now_day',
      loadingSummarizing: false,
      loadingSalesTrend: false,
      loadingGoodsList: false,
      times: [
        {
          label: '本周',
          value: 'now_week'
        },
        {
          label: '一个月',
          value: 'now_month'
        },
        {
          label: '三个月',
          value: 'three_months'
        }
      ],
      orderSaleChartData: {
        name: '订单销售趋势',
        data: [],
        id: 'v2'
      },
      orderSaleTime: 'now_week',
      cardItems: [
        {
          title: '新增客户(人)',
          count: 0,
          value: 0,
          image: require('@/assets/blueLine.png'),
          status: 'up'
        },
        {
          title: '销售商品(件)',
          count: 0,
          value: 0,
          image: require('@/assets/goldLine.png'),
          status: 'up'
        },
        {
          title: '总销售额(元)',
          count: 0,
          value: 0,
          image: require('@/assets/redLine.png'),
          status: 'down'
        },
        {
          title: '净销售额(元)',
          count: 0,
          value: 0,
          image: require('@/assets/greenLine.png'),
          status: 'down'
        },
        {
          title: '退款额(元)',
          count: 0,
          value: 0,
          image: require('@/assets/lightBlueLine.png'),
          status: 'up'
        }
      ],
      brandList: [
        {
          label: '所有品牌',
          value: '0'
        }
      ],
      columns: [
        {
          title: 'TOP 10',
          type: 'index',
          align: 'center',
          width: 80,
          fixed: 'left'
        },
        {
          title: '预览',
          key: 'default_image',
          width: 76,
          fixed: 'left',
          render: (h, params) => {
            return h('span', {
              props: {
                type: 'goods',
                id: params.row.goods_id,
                img_src: this.$ossUrlTest(params.row.default_image)
              }
            })
          }
        },
        {
          title: '商品名称',
          key: 'name',
          minWidth: 240,
          sortable: false
        },
        {
          title: '商品BN',
          key: 'bn',
          width: 120,
          sortable: true
        },
        {
          title: '商品价格',
          key: 'price',
          width: 120,
          sortable: true,
          className: 'table-price-yuan'
        },
        {
          title: '销售量',
          key: 'sell_num',
          minWidth: 120,
          sortable: true
        },
        {
          title: '销售金额',
          key: 'sell_money',
          minWidth: 120,
          sortable: true,
          className: 'table-price-yuan'
        },
        {
          title: '退货率',
          key: 'return_ratio',
          minWidth: 100,
          sortable: true,
          className: 'table-precent'
        },
        {
          title: '库存',
          key: 'store',
          width: 100,
          sortable: true
        },
        {
          title: '浏览量',
          key: 'browse_num',
          minWidth: 100,
          sortable: true
        },
        {
          title: '加购量',
          key: 'add_cart_num',
          minWidth: 120,
          sortable: true
        },
        {
          title: '收藏人数',
          key: 'collect_num',
          minWidth: 120,
          sortable: true
        },
        {
          title: '分享量',
          key: 'share_num',
          minWidth: 100,
          sortable: true
        },
        {
          title: '分享打开量',
          key: 'share_open_num',
          minWidth: 120,
          sortable: true
        },
        {
          title: '转发率',
          key: 'share_ratio',
          minWidth: 100,
          sortable: true,
          className: 'table-precent'
        },
        {
          title: '销售转化率',
          key: 'sell_ratio',
          minWidth: 120,
          sortable: true,
          className: 'table-precent'
        },
        {
          title: '退款数量',
          key: 'return_num',
          minWidth: 120,
          sortable: true
        },
        {
          title: '退款金额',
          key: 'return_money',
          minWidth: 120,
          sortable: true,
          className: 'table-price-yuan'
        },
        {
          title: '商品ID',
          key: 'goods_id',
          sortable: true,
          width: 100
        }
      ],
      goodsData: [],
      brand_id: '0',
      goodsTypes: [], //分类
      goodsListSortKey: '',
      goodsListSortValue: 'desc',
      goodsTopBn: '',
      goodsTopListDateArr: [],
      selectGoodsType: []
    }
  },
  methods: {
    ...mapActions(['guideOrderSalesTrend', 'goodsListTop', 'totalSaleroom', 'performanceSummarizing', 'getGoodsBrandList', 'goodsCatList']),
    refreshPage() {
      this.summarizingSaleTime = 'now_day'
      this.buttonSize = 'now_day'
      this.orderSaleTime = 'now_week'
      this.tendencyChartSelectDate = ''
      this.getGuideOrderSalesTrend()
      this.getGoodsListTop()
      this.getTotalSaleroom()
      this.getPerformanceSummarizing()
    },
    orderSaleTimeChange(value) {
      this.orderSaleTime = value
      this.getGuideOrderSalesTrend()
    },
    summarizingSaleTimeChange(value) {
      this.summarizingSaleTime = value
      this.getPerformanceSummarizing(value)
    },
    buttonSizeChange(value) {
      this.buttonSize = value
      this.tendencyChartSelectDate = ''
      this.getTotalSaleroom()
    },
    tendencyChartSelectDateChange(date) {
      this.buttonSize = ''
      this.tendencyChartSelectDate = date
      this.getTotalSaleroom()
    },
    getGuideOrderSalesTrend() {
      let params = {
        member_id: this.uid,
        time_conditions: this.orderSaleTime //查询时间 ,now_week本周, now_month本月,three_months 三个月
      }
      this.loadingSalesTrend = true
      this.guideOrderSalesTrend(params).then(res => {
        this.loadingSalesTrend = false
        if (res.status == 'success') {
          this.orderSaleChartData.data = res.data
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
      this.selectGoodsCatId = value[2] || value[1] || value[0]
      // this.getGoodsListTop();
    },
    format(labels, selectedData) {
      const index = labels.length - 1
      const data = selectedData[index] || false
      if (data && data.cat_id) {
        return labels[index]
      }
      return labels[index]
    },
    getBrandList() {
      let list = localStorage['brandList'] ? JSON.parse(localStorage['brandList']) : null
      if (list && Date.now() - list.time < 6 * 3600 * 100) {
        this.brandList = [{ label: '所有品牌', value: '0' }, ...list.data]
        return
      }
      this.getGoodsBrandList().then(res => {
        if (res.status == 'success') {
          let _data = res.data
          let brandList = []
          _data.map(item => {
            item.value = String(item.brand_id)
            item.label = item.brand_name
            brandList.push(item)
          })
          this.brandList = [{ label: '所有品牌', value: '0' }, ...brandList]
          // 缓存
          localStorage['brandList'] = JSON.stringify({
            time: Date.now(),
            data: brandList
          })
        }
      })
    },
    getGoodsListTop() {
      let params = {}
      let { goodsTopListDateArr, brand_id, selectGoodsCatId, goodsListSortKey, goodsListSortValue, goodsTopBn } = this
      if (goodsTopListDateArr.length == 2) {
        params.s_time = goodsTopListDateArr[0] + ' 00:00:00'
        params.e_time = goodsTopListDateArr[1] + ' 23:59:59'
      }
      if (brand_id > 0) params.brand_id = brand_id
      if (selectGoodsCatId > 0) params.cat_id = selectGoodsCatId
      if (goodsListSortKey) params.sortKey = goodsListSortKey
      if (goodsListSortValue) params.sortValue = goodsListSortValue
      if (goodsTopBn) params.goods_bn = goodsTopBn
      this.loadingGoodsList = true
      this.goodsListTop(params).then(res => {
        this.loadingGoodsList = false
        if (res.status == 'success') {
          this.goodsData = res.data
        }
      })
    },
    getTotalSaleroom() {
      let time_conditions = this.buttonSize
      let params = {
        member_id: this.uid,
        time_conditions
      }
      if (time_conditions) params.time_conditions = time_conditions
      if (this.tendencyChartSelectDate) params.time_date = this.tendencyChartSelectDate
      this.loadingSaleroom = true
      this.totalSaleroom(params).then(res => {
        this.loadingSaleroom = false
        if (res.status == 'success') {
          let { now_time, last_time } = res.data
          /**
           * 双折线图，组装数据, 格式如下
           * { x轴: '周一', 折现1的值: 7.0, 折现2的值: 3.9 },
           * 如： { datetime: '周一', now_time: 7.0, last_time: 3.9 },
           * 以last_time字段数据长度为准
           */
          let fields = ['当日', '前一日']
          let chart_arr = []
          if (time_conditions == 'now_week') {
            fields = ['本周', '上周']
            let weekStr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            last_time.map((item, index) => {
              chart_arr.push({
                datetime: weekStr[index],
                [fields[0]]: now_time[index] ? now_time[index].total_amount || 0 : 0,
                [fields[1]]: item.total_amount
              })
            })
          } else if (time_conditions == 'now_month') {
            fields = ['本月', '上月']
            let max = Math.max(last_time.length, now_time.length)
            for (let i = 0; i < max; i++) {
              let datetime = `${i + 1}号`
              chart_arr.push({
                datetime,
                [fields[0]]: now_time[i] ? now_time[i].total_amount || 0 : 0,
                [fields[1]]: last_time[i] ? last_time[i].total_amount || 0 : 0
              })
            }
          } else {
            last_time.map((item, index) => {
              let datetime = `${index < 10 ? '0' + index : index}:00`
              chart_arr.push({
                datetime,
                [fields[0]]: now_time[index] ? now_time[index].total_amount || 0 : 0,
                [fields[1]]: item.total_amount
              })
            })
          }
          this.tendencyChartData.fields = fields
          this.tendencyChartData.data = chart_arr
        }
      })
    },
    getPerformanceSummarizing(date = 'now_day') {
      this.loadingSummarizing = true
      this.performanceSummarizing({ member_id: this.uid, time_conditions: date }).then(res => {
        this.loadingSummarizing = false
        if (res.status == 'success') {
          let {
            now_members = 0, //本周新增会员数
            last_members = 0, //上周新增会员数
            link_index = 0, //新增会员数环比上周百分比

            now_total_amount = 0, //本周订单销售总额
            last_total_amount = 0, //上周订单销售总额
            amount_link_index = 0, //销售额环比上周百分比

            now_total_goodsNums = 0, //本周销售商品数量
            last_total_goodsNums = 0, //上周销售商品数量
            goodsNums_link_index = 0, //销量环比上周百分比

            now_refund_amount = 0, //本周退款金额
            last_refund_amount = 0, //上周退款金额
            refund_amount_link_index = 0, //退款环比上周百分比

            now_actual_amount = 0, //本周净销售额
            last_actual_amount = 0, //上周净销售额
            actual_amount_link_index = 0 //净销售额环比上周百分比
          } = res.data
          this.cardItems[0].count = link_index
          this.cardItems[0].value = now_members
          this.cardItems[0].status = now_members - last_members >= 0 ? 'up' : 'down'

          this.cardItems[1].count = goodsNums_link_index
          this.cardItems[1].value = now_total_goodsNums
          this.cardItems[1].status = now_total_goodsNums - last_total_goodsNums >= 0 ? 'up' : 'down'

          this.cardItems[2].count = amount_link_index
          this.cardItems[2].value = `￥${now_total_amount.toFixed(2)}`
          this.cardItems[2].status = now_total_amount - last_total_amount >= 0 ? 'up' : 'down'

          this.cardItems[3].count = actual_amount_link_index
          this.cardItems[3].value = `￥${now_actual_amount.toFixed(2)}`
          this.cardItems[3].status = now_actual_amount - last_actual_amount >= 0 ? 'up' : 'down'

          this.cardItems[4].count = refund_amount_link_index
          this.cardItems[4].value = `￥${now_refund_amount.toFixed(2)}`
          this.cardItems[4].status = now_refund_amount - last_refund_amount >= 0 ? 'up' : 'down'
        }
      })
    }
  }
}
</script>
<style scoped>
.card-list li:not(:first-child) {
  padding-left: 20px;
}
.card-item {
  width: 20%;
  min-width: 240px;
  flex-shrink: 0;
}
.aminiation-padding {
  transition: all 0.3s;
}
@media screen and (min-width: 1600px) {
  .aminiation-padding {
    padding: 0 20px;
  }
}
.card-img-item {
  width: 80px;
  height: 54px;
}
</style>
