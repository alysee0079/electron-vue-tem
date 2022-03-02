<template>
  <img v-if="img_src" @click="cellClick" :src="img_src" :style="{ width: size + 'px', height: size + 'px' }" class="pointer img-fit-contain" />
  <Button v-else @click="cellClick" type="primary" size="small">{{ button_text || id }}</Button>
</template>

<script>
// 一般情况下用于表格中的会员头像和商品图片和物流单号，点击跳转到对应详情，
// 传img_src则显示图片，否则显示文本button
export default {
  name: 'xTableCell',
  props: {
    type: {
      // 类型，goods,点击跳转到商品详情弹窗；user 点击跳转到会员详情弹窗;logistic物流； 默认商品
      type: String,
      default: 'goods'
    },
    id: {
      // 商品id或会员ID
      type: [String, Number],
      default: ''
    },
    query: {
      // 会员详情可能需要tab_index
      type: Object,
      default: () => {
        return {}
      }
    },
    size: {
      type: Number,
      default: 40
    },
    img_src: {
      type: String,
      default: ''
    },
    button_text: {
      type: String,
      default: ''
    }
  },
  methods: {
    cellClick() {
      this.$emit('cellClick')
      if (this.type == 'goods') {
        this.$openModal({
          route: 'webView',
          query: { page: `detailView?goods_id=${this.id}` },
          options: { title: '商品详情', width: 380, height: 697, resizable: false, maximizable: false }
        })
      } else if (this.type == 'user') {
        this.$openModal({
          route: 'memberDetail',
          query: { ...this.query, avatar: this.img_src, member_id: this.id },
          options: { title: '会员详情' }
        })
      } else if (this.type == 'logistic') {
        this.$openModal({
          route: 'logistic',
          query: { delivery: this.id },
          options: { title: '物流查询', width: 380, height: 697, resizable: false, maximizable: false }
        })
      }
    }
  }
}
</script>

<style></style>
