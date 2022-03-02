<template>
  <div class="taglist flex-col-start">
    <div class="flex-col-start manualLabel">
      <div class="flex-space-between width-100">
        <span class="color-dark">手动标签</span>
        <div class="flex-space-between">
          <span class="color-blue margin-r-5">新增</span>
          <span class="color-blue">完成</span>
        </div>
      </div>
      <ul class="flex-start-center flex-wrap margin-t-10">
        <li class="tagItem relative" v-for="(item, index) in taglist" :key="index">
          {{ item.value }}
          <span class="iconfont delIcon color-light-danger" @click="delLabel">&#xe635;</span>
        </li>
      </ul>
    </div>
    <div class="flex-col-start autoLabel margin-t-10">
      <div class="flex-space-between width-100 color-dark">
        <span>自动标签</span>
      </div>
      <ul class="flex-start-center flex-wrap margin-t-10">
        <li class="tagItemGray tagItem" v-for="(item, index) in taglist" :key="index">
          {{ item.value }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tagList',
  data() {
    return {
      taglist: [
        {
          value: '高消费'
        },
        {
          value: '活跃'
        },
        {
          value: '轻熟'
        }
      ]
    }
  },
  methods: {
    delLabel() {}
  }
}
</script>
<style>
.tagItem {
  padding: 0px 8px;
  height: 22px;
  line-height: 20px;
  border: 1px solid #000;
  margin-right: 10px;
  border-radius: 3px;
}
.tagItemGray {
  background: #e7e9ec;
  color: #666666;
  border: transparent;
}
.delIcon {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #fff;
}
</style>
