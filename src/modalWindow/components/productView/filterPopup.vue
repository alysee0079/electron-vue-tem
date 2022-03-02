<template>
  <div class="flex-col-start height-100 width-100 bg-white padding-t-20 align-items-stretch">
    <div class="flex-item content">
      <div v-for="(item, key) in fields" :key="key" class="flex-start-end">
        <div class="fade flex-space-between padding-t-5 font-normal font-bold" style="flex: 1">
          <p class="font-14">
            {{ item.label }}
            <!-- <span v-if="selectedItems[key]" class="padding-rl-10 color-primary font-mini fade">{{selectedItems[key]['label']}}</span> -->
          </p>
          <!-- <p v-if="Object.keys(item.list).length > 3" @click="toggleList(item)">
            <i class="iconfont color-gray font-mini" v-html="item.show ? '&#xe6c8;' : '&#xe6da;'"></i>
          </p> -->
        </div>
        <div class="fade" style="flex: 12">
          <div v-if="key == 'act_price'" class="width-100">
            <!-- <div class="flex-start-center color-gray">
                <input placeholder="最低价" class="price-input font-normal input" type="number" @input="inputChange" v-model.number="price1">
                <p class="padding-rl-5">-</p>
                <input placeholder="最高价" class="price-input font-normal" type="number" @input="inputChange" v-model.number="price2">
                <div @click="priceInputQuery" class="item-border-radius text-center padding-rl-10 padding-tb-5 margin-l-5 font-mini bg-primary">查询</div>
                <div @click="clearPriceInput" v-if="price1 || price2" class="item-border-radius text-center padding-rl-10 padding-tb-5 margin-l-5 font-mini">清除</div>
            </div> -->
            <transition-group name="label-fade" tag="ul">
              <li
                v-for="(item1, key1, index1) in item.list"
                @click="clickItem(key, key1, item1)"
                :key="key1 + '1'"
                class="list-item line-ellispsis-1 item-border-radius text-center"
                :class="item1.selected ? 'list-item-active' : ''"
                v-show="item.show || index1 < 3"
              >
                <p>{{ item1.label }}</p>
                <!-- <p class="font-mini">{{item1.subLabel}}</p> -->
              </li>
              <li style="width: 30%; height: 0" key="hjkhjklkj"></li>
              <li style="width: 30%; height: 0" key="wqewrr34545"></li>
            </transition-group>
          </div>
          <transition-group name="label-fade" tag="ul" v-else>
            <li
              v-for="(item1, key1, index1) in item.list"
              @click="clickItem(key, key1, item1)"
              :key="key1 + '1'"
              class="list-item line-ellispsis-1 item-border-radius text-center font-12"
              :class="item1.selected ? 'list-item-active' : ''"
              v-show="item.show || index1 < 3"
            >
              {{ item1.label }}
            </li>
            <!-- <li style="width: 30%;height: 0" key="hjksdagfdhhjklkj"></li>
            <li style="width: 30%;height: 0" key="hhdfdserer3453sdf"></li> -->
          </transition-group>
        </div>
      </div>
    </div>
    <div class="flex-space-between" v-if="Object.keys(selectedItems).length">
      <div class="flex-wrap flex-start-center">
        <div v-for="(item, key, index) in selectedItems" :key="index" class="margin-r-10">
          <el-tag closable effect="plain" :hit="true" @close="handleClose(key)" size="small">{{ item.label }}</el-tag>
        </div>
      </div>
      <div @click="filterDone(false)" class="margin-r-5 color-gray font-12">清空筛选</div>
    </div>
    <!-- <div class="flex-space-around padding-tb-10 padding-rl-5 text-center font-normal">
      <div @click="filterDone(false)" class="flex-item margin-r-5 border-r-5 border-1px padding-tb-10 bg-white border-r-20">重置</div>
      <div @click="filterDone(true)" class="flex-item border-r-20 padding-tb-10 color-white bg-primary">确定<span v-show="false"> ({{minCount}} 个结果)</span></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'filterPopup',
  components: {},
  props: {
    facet_counts: {
      type: Object,
      default: () => {}
    },
    fq: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      minCount: 0,
      price1: '',
      price2: '',
      selectedItems: {},
      fields: {},
      label: {
        brand: { name: '品牌:', order: 0 },
        goods_cat: { name: '品类:', order: 1 },
        price: { name: '价格:', order: 2 },
        act_price: { name: '价格:', order: 2 },
        spec_color: { name: '颜色:', order: 4 },
        spec_size: { name: '尺码:', order: 5 },
        year_season: { name: '年份:', order: 6 },
        apply_age: { name: '适用年龄:', order: 7 },
        apply_sex: { name: '适用性别:', order: 8 },
        fashion_element: { name: '流行元素:', order: 9 },
        material: { name: '材质成分:', order: 10 },
        neck_style: { name: '领型:', order: 11 },
        style: { name: '风格:', order: 12 },
        type: { name: '款式:', order: 13 },
        swaist_style: { name: '腰型:', order: 14 },
        sleeve_style: { name: '袖型:', order: 15 },
        model: { name: '版型:', order: 16 },
        sleeve_length: { name: '袖长:', order: 17 },
        clothes_length: { name: '衣长:', order: 18 },
        profile: { name: '廓形:', order: 19 },
        commuting: { name: '通勤:', order: 20 },
        thickness: { name: '厚薄:', order: 21 },
        elastic_force: { name: '弹力:', order: 22 },
        skirt_type: { name: '裙型:', order: 23 },
        skirt_length: { name: '裙长:', order: 24 },
        clothes_placket: { name: '衣门襟:', order: 25 },
        combining_form: { name: '组合形式:', order: 26 },
        pattern: { name: '图案:', order: 27 }
      },
      fq_obj: {}
    }
  },
  watch: {
    fq: function (v) {
      this.fq_obj = {}
      if (v) {
        v.split(',').map(item => {
          let arr = item.split(':')
          this.fq_obj[arr[0]] = arr[1]
        })
      }
    },
    facet_counts: function (v) {
      this.fields = {}
      this.temp_fields_arr = []
      let query = this.fq_obj
      this.formatPriceObj(v.facet_ranges.act_price)
      let fields_obj = v.facet_fields
      for (let key in fields_obj) {
        let item = fields_obj[key]
        let list = {}
        if (Array.isArray(item)) continue
        for (let k in item) {
          if (!k) continue
          let label = k
          let value = k
          if (key == 'spec_size' && k == '00') label = '均码'
          list[value] = {
            label,
            value: k,
            selected: query[key] == k
          }
          if (query[key] == k) {
            this.selectedItems[key] = { key: `${key}:${k}`, count: item[k], label }
          }
        }
        if (Object.values(list).length > 0) {
          this.temp_fields_arr.push({
            key,
            label: this.label[key].name,
            order: this.label[key].order,
            list,
            show: true
          })
        }
      }
      this.temp_fields_arr
        .sort((a, b) => {
          return a.order - b.order
        })
        .map(item => {
          item.show = true
          this.$set(this.fields, item.key, item)
        })
    }
  },
  methods: {
    clickItem(key, key1, item1) {
      let facet_queries_key = `${key}:${item1.value}`
      let count = this.facet_counts.facet_queries[facet_queries_key]
      if (item1.selected) {
        item1.selected = !item1.selected
        delete this.selectedItems[key]
      } else {
        if (key == 'act_price') {
          this.price1 = ''
          this.price2 = ''
        }
        let list = this.fields[key].list
        for (let i in list) {
          const v = list[i]
          v.selected = i == key1
        }
        this.selectedItems[key] = { key: facet_queries_key, count, label: item1.label }
      }
      this.computeCount()
    },
    handleClose(key) {
      let _selectedItems = JSON.parse(JSON.stringify(this.selectedItems))
      delete _selectedItems[key]
      this.selectedItems = _selectedItems
      this.computeCount()
    },
    inputChange() {
      if (this.selectedItems['act_price']) {
        delete this.selectedItems['act_price']
        let list = this.fields['act_price'].list
        for (let i in list) {
          const v = list[i]
          v.selected = false
        }
      }
    },
    clearPriceInput() {
      this.price1 = ''
      this.price2 = ''
      if (this.selectedItems['act_price']) {
        delete this.selectedItems['act_price']
        this.computeCount()
      }
    },
    priceInputQuery() {
      const { price1, price2 } = this
      if (!price1 && !price2) {
        this.$vux.toast.show({
          text: '请输入价格',
          type: 'text',
          position: 'middle',
          width: '10em'
        })
      } else {
        let min = Math.min(price1, price2)
        let max = Math.max(price1, price2)
        let key = `act_price:[${min} TO ${max}]`
        this.selectedItems.act_price = {}
        this.selectedItems.act_price = { key, count: 0, label: `${min}~${max}` }
        this.computeCount()
      }
    },
    formatPriceObj(ranges) {
      console.log('formatPriceObj=====', ranges)
      this.price1 = ''
      this.price2 = ''
      let { between, counts, gap } = ranges
      let price = {
        key: 'act_price',
        label: this.label['act_price'].name,
        order: this.label['act_price'].order,
        list: {},
        show: true
      }
      let keys = Object.keys(counts) //counts 这个为空数组会导致价格区间不显示
      let length = keys.length
      if (length == 0 && this.fq_obj.act_price) {
        let price_arr = this.fq_obj.act_price.slice(1, -1).split(' TO ')
        this.price1 = price_arr[0]
        this.price2 = price_arr[1]
      }
      let now_total_percent = 0
      for (let i = 0; i < length; i++) {
        const value = parseInt(keys[i])
        // {label: '500元以下', value: '[* TO 500]', selected: false},
        let obj = {
          label: '',
          subLabel: '',
          value: '',
          selected: false
        }
        if (i > 9) break
        if (this.fq_obj.act_price) {
          let price_arr = this.fq_obj.act_price.slice(1, -1).split(' TO ')
          if (price_arr[0] == value && (price_arr[1] == value - 0 + gap || price_arr[1] == '*')) {
            let price_arr_1 = isNaN(parseInt(price_arr[1])) ? '*' : parseInt(price_arr[1])
            obj.label = price_arr_1 == '*' ? `${value}以上` : `${value} ~ ${price_arr_1}`
            obj.value = `[${value} TO ${price_arr_1}]`
            obj.subLabel = '已选择'
            price.list[obj.value] = obj
            obj.selected = true
            if (price_arr_1 == '*') {
              break
            } else {
              continue
            }
          } else {
            this.price1 = price_arr[0]
            this.price2 = price_arr[1]
          }
        }
        if (i == 9) {
          obj.label = `${value}元以上`
          obj.value = `[${value} TO *]`
          obj.subLabel = `${(100 - now_total_percent).toFixed(1)}%已选择`
        } else {
          obj.label = `${value} ~ ${value - 0 + gap}`
          obj.value = `[${value} TO ${value - 0 + gap}]`
          let count = counts[keys[i]]
          let percent = parseInt((count / between) * 1000) / 10
          now_total_percent += percent
          obj.subLabel = `${percent}%的选择`
        }
        price.list[obj.value] = obj
      }
      this.temp_fields_arr.push(price)
    },
    toggleList(item) {
      item.show = !item.show
    },
    computeCount() {
      let values = Object.values(this.selectedItems)
      let counts = []
      let params = []
      values.forEach(item => {
        params.push(item.key)
      })
      this.minCount = counts.length ? Math.min(...counts) : 0
      this.$emit('filterChange', params)
    },
    filterDone(state) {
      if (!state) {
        this.price1 = ''
        this.price2 = ''
        this.selectedItems = {}
        for (let i in this.fields) {
          let item = this.fields[i]
          for (let k in item.list) {
            let ele = item.list[k]
            ele.selected = false
          }
        }
        this.computeCount()
      } else {
        this.$emit('filterDone', state)
      }
    }
  }
}
</script>

<style scoped>
.list-item {
  display: inline-block;
  /* width: 30%; */
  height: 28px;
  line-height: 28px;
  padding: 0 20px;
  margin: 0 10px 10px 0;
}

.list-item-active {
  color: #1890ff !important;
}
.price-input {
  width: 70px;
  background-color: #f4f4f4;
  border-radius: 4px;
  padding: 5px 7px;
}
.item-border-radius {
  color: #333333;
}
.price-input:focus {
  outline: none;
}
.label-fade-enter,
.label-fade-leave-to {
  opacity: 0;
}
.label-fade-move,
.fade {
  transition: all 0.3s;
}
</style>
