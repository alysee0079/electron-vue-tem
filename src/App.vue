<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['errorModal', 'login_account'])
  },
  watch: {
    errorModal: function (val) {
      let { type, message, duration } = val
      duration = duration || 0
      if (typeof message == 'object') {
        message = JSON.stringify(message, null, 4)
      }
      // let {host}=location;
      // let reg=/dev|test/ig;
      // if(!reg.test(host)&&code!=401){
      //   message=`此服务可能出错, 请联系开发人员,错误码:${code||'unknown'}`;
      // }
      let config = { message, duration, type }
      this.$message(config)
    }
  },
  created() {
    window.addEventListener('windowFocus', this.windowFocus)
  },
  beforeDestroy() {
    window.removeEventListener('windowFocus', this.windowFocus)
  },
  methods: {
    windowFocus() {
      console.log('windowFocus+++')
    }
  }
}
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
