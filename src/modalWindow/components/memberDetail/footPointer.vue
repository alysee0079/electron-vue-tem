<template>
  <x-table action="footPrint" :params="{ member_id }" :data="data" :columns="columns" :total="total" @handleData="handleData"></x-table>
</template>

<script>
import xTable from '../../../common/x-table'
import xTableCell from '../../../common/x-table-cell'
export default {
  name: 'footPointer',
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
          key: 'price',
          title: '商品价格',
          width: 100,
          className: 'table-price-yuan'
        },
        {
          key: 'date_custom',
          title: '浏览时间',
          width: 100
        }
      ]
    }
  },
  methods: {
    handleData(res) {
      if (res.status == 'success') {
        let list = res.data.data
        list.map(item => {
          item.img = item.images ? item.images.m_url || '' : ''
        })
        this.data = list
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
