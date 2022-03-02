<template>
  <x-table action="collectGoods" :params="{ member_id }" :data="data" :columns="columns" :total="total" @handleData="handleData"></x-table>
</template>

<script>
import xTable from '../../../common/x-table'
import xTableCell from '../../../common/x-table-cell'
export default {
  name: 'favGoods',
  components: { xTable },
  props: {
    member_id: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      data: [],
      total: 0,
      columns: [
        {
          type: 'index',
          title: '#',
          width: 40,
          align: 'center'
        },
        {
          key: 'img',
          title: '图片',
          width: 76,
          align: 'center',
          render: (h, params) => {
            return h(xTableCell, {
              props: {
                type: 'goods',
                id: params.row.goods_id,
                img_src: this.$ossUrlTest(params.row.img)
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
          key: 'brand_name',
          title: '品牌',
          width: 100
        },
        {
          key: 'price',
          title: '商品价格',
          width: 100,
          className: 'table-price-yuan'
        },
        {
          key: 'mktprice',
          title: '市场价',
          width: 100,
          className: 'table-price-yuan'
        }
      ]
    }
  },
  methods: {
    handleData(res) {
      if (res.status == 'success') {
        let list = res.data.data
        let result = []
        list.map(item => {
          if (item.goods) {
            let obj = Object.assign({}, item, item.goods)
            obj.img = obj.images ? obj.images.url || '' : ''
            obj.brand_name = obj.goods_brands ? obj.goods_brands.brand_name || '' : ''
            delete obj.goods
            delete obj.images
            delete obj.goods_brands
            result.push(obj)
          }
        })
        this.data = result
        this.total = res.data.total || 0
      } else {
        this.data = []
        this.total = 0
      }
    }
  }
}
</script>

<style></style>
