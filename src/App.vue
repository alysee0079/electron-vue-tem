<template>
  <div id="app">
    <el-button type="primary" @click="handleChangeTheme">btn</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      dialogVisible: true,
      theme: 'black-theme'
    }
  },
  methods: {
    handleChangeTheme() {
      document.body.className = this.theme = this.theme === 'black-theme' ? 'blue-theme' : 'black-theme'
      this.dialogVisible = !this.dialogVisible
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
