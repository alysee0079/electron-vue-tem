<template>
  <div class="padding-10">
    <el-input placeholder="部门/微信号/昵称" size="small" suffix-icon="el-icon-search" class="padding-tb-10" v-model="filterText"></el-input>
    <el-checkbox class="margin-l-10" v-model="allChecked">全选</el-checkbox>
    <el-tree :props="props" :load="loadNode" lazy show-checkbox class="scroll-y" @check-change="handleCheckChange"></el-tree>
    <div class="footer">
      <el-button size="small">取消</el-button>
      <el-button size="small" type="primary">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'weChatUserList',
  data() {
    return {
      filterText: '',
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1,
      allChecked: false
    }
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    handleNodeClick(data) {
      console.log(data)
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region1' }, { name: 'region2' }])
      }
      if (node.level > 3) return resolve([])

      var hasChild
      if (node.data.name === 'region1') {
        hasChild = true
      } else if (node.data.name === 'region2') {
        hasChild = false
      } else {
        hasChild = Math.random() > 0.5
      }

      setTimeout(() => {
        var data
        if (hasChild) {
          data = [
            {
              name: 'zone' + this.count++
            },
            {
              name: 'zone' + this.count++
            }
          ]
        } else {
          data = []
        }
        resolve(data)
      }, 500)
    }
  }
}
</script>
<style>
.footer {
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>
