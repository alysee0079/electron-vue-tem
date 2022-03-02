<template>
  <div class="relative height-100">
    <!-- <canvas style="position: absolute;top: 0; right: 0; bottom: 0; left: 0;z-index: 1;"></canvas> -->
    <div class="flex-center height-100 relative" style="z-index: 2">
      <el-card class="login padding-20">
        <div class="flex-center">
          <img
            style="width: 100px; height: 100px; border-radius: 50%"
            src="https://tfmall-test.oss-cn-shenzhen.aliyuncs.com/storage/images/image/tanfeizanweitu/5bc8c0242dd5cbd476e94a029e245641.png"
          />
        </div>
        <div class="margin-tb-20">
          <el-input v-model="username" @on-focus="inputFocus" size="medium" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>

          <!-- <el-dropdown class="width-100 relative" trigger="custom" @on-click="userListClick" @on-clickoutside="showUserList = false" :visible="showUserList && Object.keys(userListFilter).length > 0">
                        <el-dropdown-menu slot="list" style="max-height: 200px; overflow-y: scroll">
                            <el-dropdown-item v-for="(item, key) in userListFilter" :key="key" :name="key" class="flex-space-between">
                                <div class="flex-start-center">
                                    <Icon type="md-person" color="#ccc" size="24" />
                                    <div class="padding-rl-10 font-normal">
                                        <p>{{key}}</p>
                                        <p class="color-gray">********</p>
                                    </div>
                                </div>
                                <Icon @click.stop="delUserHistory(key)" type="ios-close" size="20" />
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
        </div>
        <el-input
          v-model="password"
          type="password"
          show-password
          size="medium"
          class="margin-b-20"
          prefix-icon="el-icon-edit"
          placeholder="请输入密码"
        ></el-input>
        <el-button @click="login" type="primary" class="width-100" :loading="loading">登录</el-button>
        <div class="flex-start-center margin-t-10">
          <el-switch v-model="autoLogin" @on-change="changeAutoLogin" size="small"></el-switch>
          <span class="padding-l-10 font-12" style="color: #666">记住密码</span>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { encode_str, decode_str } from '../../plugins/utils'
export default {
  name: 'login',
  computed: {
    userListFilter() {
      let { username, userList } = this
      let result = {}
      for (let key in userList) {
        if (key.indexOf(username) > -1) result[key] = userList[key]
      }
      if (username.length == 11 && !!result[username]) {
        this.password = decode_str(result[username])
        result = {}
      }
      return result
    }
  },
  created() {
    try {
      let storage_list = JSON.parse(localStorage.userList) || {}
      this.userList = storage_list
    } catch (error) {
      //
    }
  },
  data() {
    return {
      loading: false,
      username: '13640339837',
      password: 'yan123456',
      autoLogin: true,
      showUserList: false,
      itvid: null,
      userList: {}
    }
  },
  methods: {
    ...mapActions(['applyLogin']),
    userListClick(key) {
      if (this.userList[key]) {
        this.username = key
        this.password = this.userList[key]
      } else {
        this.delUserHistory(key)
      }
      this.showUserList = false
    },
    inputFocus() {
      this.showUserList = Object.keys(this.userList).length > 0
    },
    addUserHistory(item) {
      this.userList[item.username] = encode_str(item.password)
      localStorage.userList = JSON.stringify(this.userList)
    },
    delUserHistory() {
      // this.$delete(this.userList, key);
      localStorage.userList = JSON.stringify(this.userList)
      this.showUserList = Object.keys(this.userList).length > 0
    },
    changeAutoLogin(value) {
      localStorage.autoLogin = value
    },
    login() {
      if (!this.username) {
        this.$message({
          message: '账号不能为空!',
          type: 'warning'
        })
        return
      }
      if (!this.password) {
        this.$message({
          message: '密码不能为空!',
          type: 'warning'
        })
        return
      }
      let params = {
        username: this.username,
        password: this.password
      }
      this.loading = true
      this.applyLogin(params, this.autoLogin).then(res => {
        this.loading = false
        console.log(res, 5555555)
        if (res.status == 200 && res.data) {
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>
