<template>
  <div>
    <div class="width-100 flex-end">
      <el-button v-if="InQueue" @click="askExit" size="small">下班</el-button>
      <el-button v-else @click="joinQueue" type="primary" size="small">上线</el-button>
    </div>
  </div>
</template>

<script>
import { chat_post } from '../../../plugins/axios'
import { mapActions } from 'vuex'
export default {
  name: 'queueStatus',
  data() {
    return {
      queueData: {},
      userData: {},
      timer: null,
      initScreen: true,
      member_id: '',
      InQueue: false
    }
  },
  created() {
    // setTimeout(() => {
    //   this.queueInfo();
    // }, 500);
    // this.member_id = JSON.parse(localStorage['userInfo']).member_id;
  },
  watch: {
    InQueue: {
      handler(newValue) {
        if (newValue) {
          this.timer = setInterval(() => {
            this.queueInfo()
          }, 3000)
        } else {
          clearInterval(this.timer)
        }
      }
    }
  },
  methods: {
    ...mapActions(['chatAuth']),
    queueInfo() {
      let vm = this
      chat_post(`/web/GetOneFromQueueInfo?memberId=${this.member_id}`, {}, res => {
        if (res.status == 200) {
          // 处理token过期的情况
          if (res.data.status == -1) {
            localStorage.removeItem('chat_token')
            this.chatAuth(this.member_id)
            setTimeout(() => {
              vm.queueInfo()
            }, 300)
            return
          }
          this.initScreen = false
          this.InQueue = res.data.MessageContentAlmighty.InQueue
          this.queueData = res.data.MessageContentAlmighty
          this.userData = res.data.MessageContentAlmighty.Data
        }
      })
    },
    joinQueue() {
      let vm = this
      chat_post(`/web/AddOneFromQueue?memberId=${this.member_id}`, {}, res => {
        // 处理token过期的情况
        if (res.data.status == -1) {
          localStorage.removeItem('chat_token')
          this.chatAuth(this.member_id)
          setTimeout(() => {
            vm.joinQueue()
          }, 300)
          return
        }
        if (res.status == 200 && res.data.MessageContentAlmighty == 'OK') {
          this.$Message.success('请求成功！')
          this.queueInfo()
        } else {
          this.$Message.error(res.data.MessageContent)
        }
      })
    },
    askExit() {
      this.$Modal.confirm({
        title: `确定取消排队吗？`,
        onOk: () => {
          this.exitQueue()
        }
      })
    },
    exitQueue() {
      let vm = this
      chat_post(`/web/DelOneFromQueue?memberId=${this.member_id}`, {}, res => {
        if (res.data.status == -1) {
          localStorage.removeItem('chat_token')
          this.chatAuth(this.member_id)
          setTimeout(() => {
            vm.exitQueue()
          }, 300)

          return
        }
        if (res.status == 200 && res.data.MessageContentAlmighty == 'OK') {
          this.$Message.success('请求成功！')
          this.queueInfo()
        } else {
          this.$Message.error(res.data.MessageContent)
        }
      })
    }
  }
}
</script>

<style scoped>
.bg-g {
  background: #f3f4f5;
}
.color-green {
  color: #34be66;
}
.color-b {
  color: #60afff;
}
.font-18 {
  font-size: 18px;
}
.color-orange {
  color: #fd8900;
}
</style>
