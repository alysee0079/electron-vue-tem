<template>
  <div class="padding-20">
    <div class="font-16 color-dark">商品库</div>
    <div class="content margin-t-16">
      <el-input
        placeholder="请输入内容"
        v-model.trim="search_params.q"
        class="input-with-select"
        size="small"
        @keyup.enter.native="onSubmit"
        suffix-icon="el-icon-search"
      ></el-input>
      <filter-popup :facet_counts="facet_counts" :fq="search_popup_fq" @filterDone="filterDone" @filterChange="filterChange" />
      <div class="font-14 margin-tb-10 color-dark" v-if="goodsList.length">共{{ goodsList.length }}件商品</div>
      <div class="goodslist flex-wrap flex-start" v-if="goodsList.length">
        <div v-for="(item, index) in goodsList" :key="index" class="flex-col-start flex-col-6 goodslist-item">
          <div class="product-img link-img">
            <img :src="item.image_default" alt="" />
          </div>
          <div class="line-ellispsis-1 color-dark margin-tb-5">{{ item.name }}</div>
          <div class="flex-space-between">
            <div class="font-10">¥{{ item.price }}</div>
            <div class="iconfont color-bule font-14 color-blue">&#xe647;</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import FilterPopup from './filterPopup.vue'
export default {
  components: { FilterPopup },
  name: 'productView',
  data() {
    return {
      inputValue: '',
      facet_counts: {},
      search_popup_fq: '',
      goodsList: [],
      search_params: {
        q: '',
        sort: '',
        fq: '',
        limit: 10,
        offset: 0
      }
    }
  },
  methods: {
    ...mapActions(['searchGoods']),
    filterDone() {},
    filterChange(fq_str) {
      console.log('filterChange', fq_str)
      this.search_params.fq = fq_str.join(',')
      this.initSearch()
    },
    onSubmit() {
      this.initSearch()
    },
    initSearch() {
      let self = this
      let obj = this.search_params
      self.goodsList = []
      this.searchGoods(obj).then(res => {
        if (res.code == 200) {
          let { facet_counts, data } = res
          console.log('facet_counts11111', facet_counts)
          self.facet_counts = facet_counts
          self.goodsList = data.map(item => item)
        }
      })
    }
  },
  created() {
    this.initSearch()
  }
}
</script>
<style scoped>
.product-img {
  width: 108px;
  height: 108px;
  border-radius: 2px;
}
.goodslist-item {
  padding: 0 12px 12px 0;
}
</style>
