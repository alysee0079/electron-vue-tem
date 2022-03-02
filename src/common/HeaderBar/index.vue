<template>
  <el-header class="flex-space-between padding-rl-10 padding-tb-10 el pointer" style="height: 44px; -webkit-app-region: drag">
    <div>谭飞智能客服系统</div>
    <div class="flex-center">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link flex-start-center">
          <div class="link-img">
            <img class="av" :src="userInfo.avatar || avater" alt="" />
          </div>
          <span class="padding-rl-5">时尚顾问-{{ userInfo.nickname }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) in options" :key="index" @click.native="handleDropdownItem(item)">
            <i class="iconfont font-14" v-html="item.icon"></i>
            {{ item.title }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <i class="iconfont header-icon" @click="minimizeWin">&#xe645;</i>
      <i class="iconfont header-icon" @click="maximizeWin">&#xe646;</i>
      <i class="iconfont header-icon" @click="closeWin">&#xe623;</i>
    </div>
  </el-header>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { ipcRenderer } from 'electron'
export default {
  name: 'headerBar',
  computed: {
    ...mapGetters(['userInfo'])
  },
  data() {
    return {
      avater: require('@/assets/images/logo.png'),
      options: [
        {
          title: '设置',
          icon: '&#xe628;',
          to: { name: 'syset' }
        },
        {
          title: '登录日志',
          icon: '&#xe621;',
          to: { name: 'loginLog' }
        },
        {
          title: '退出登录',
          icon: '&#xe62a;',
          fn: 'logout',
          to: false
        }
      ]
    }
  },
  methods: {
    ...mapActions(['applyLogout']),
    handleDropdownItem(item) {
      let { to, fn } = item
      if (this.$route.name == to.name) return
      if (to) {
        this.$router.push(to)
      } else if (fn) {
        switch (fn) {
          case 'logout':
            this.logout()
            break
        }
      }
    },
    logout() {
      this.applyLogout().then(() => {
        this.$router.replace({ path: '/login' })
      })
    },
    minimizeWin() {
      ipcRenderer.send('window-min')
    },
    maximizeWin() {
      ipcRenderer.send('window-max')
    },
    closeWin() {
      ipcRenderer.send('window-close')
    }
  }
}
</script>
<style scoped>
.av {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
.header-icon {
  font-size: 14px;
  margin-left: 20px;
  display: inline-block;
  -webkit-app-region: no-drag;
}
</style>
