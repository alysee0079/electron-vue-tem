<template>
  <Modal v-model="showUserListModal" width="600" footer-hide :styles="{ top: '36px' }">
    <p slot="header">{{ selectUserList.length > 0 ? `已选 (${selectUserList.length})` : '请选择' }}</p>
    <div v-if="userList.length > 0" class="modal-box flex-start overflow-hidden" style="height: 500px">
      <ul class="flex-item height-100 scroll-y">
        <li v-for="item in userList" :key="item.id" @click="item._checked = !item._checked" class="user-item pointer flex-start-center margin-b-10">
          <div class="link-img img-fit-contain" style="height: 40px; width: 40px; border-radius: 20px">
            <img :src="item.userType == 2 ? item.avatar || vipIcon : def_avatar" alt />
          </div>
          <p class="flex-item padding-rl-10 line-ellispsis-1">
            {{ item.userType == 2 ? item.nickname || '谭飞会员' : '匿名用户' }}
          </p>
          <Radio :value="item._checked"></Radio>
        </li>
      </ul>
      <div class="modal-box-right flex-item flex-col-start padding-l-15 border-1px-l">
        <ul class="modal-box-selected flex-item height-100 scroll-y">
          <li v-for="item in selectUserList" :key="item.id" class="cursor-none flex-start-center margin-b-10">
            <div class="link-img img-fit-contain" style="height: 40px; width: 40px; border-radius: 20px">
              <img :src="item.avatar || def_avatar" alt />
            </div>
            <p class="flex-item padding-rl-10 line-ellispsis-1">{{ item }}</p>
            <Icon @click="item._checked = false" class="pointer" size="24" color="#ccc" type="ios-close-circle-outline" />
          </li>
        </ul>
        <div class="flex-space-between padding-tb-10">
          <div @click.capture.prevent="selectAll">
            <Radio :disabled="userList.length == 0" :value="selectUserList.length == userList.length">
              {{ selectUserList.length == userList.length ? '全不选' : '全选' }}
            </Radio>
          </div>
          <div>
            <Button @click="showUserListModal = false">取消</Button>
            <Button :disabled="selectUserList.length == 0" @click="selectOk" type="success">确定</Button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center color-gray font-16 padding-tb-20 margin-tb-20">聊天列表为空</div>
  </Modal>
</template>

<script>
import { server_config } from '../../../config/common'
import { checkDir } from '../../../plugins/checkDir'
import $$db from '../../../plugins/sqlite3'
export default {
  name: 'userListModal',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      def_avatar: server_config.def_avatar,
      vipIcon: server_config.vipIcon,
      userList: []
    }
  },
  computed: {
    selectUserList() {
      return this.userList.filter(item => item._checked == true)
    },
    showUserListModal: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },
  watch: {
    showUserListModal(v) {
      if (v) {
        this.getUserList()
      } else {
        setTimeout(() => {
          this.userList = []
        }, 200)
      }
    }
  },
  methods: {
    selectCancel() {
      this.$emit('selectCancel')
    },
    selectOk() {
      this.$emit('selectOk', [...this.selectUserList])
      this.showUserListModal = false
    },
    selectAll() {
      let checked = this.selectUserList.length == this.userList.length
      this.userList.map(item => (item._checked = !checked))
    },
    getUserList() {
      let vm = this
      let userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null
      if (userInfo && userInfo.member_id) {
        // 检查个人文件夹
        window.$$path = checkDir(userInfo.member_id)
        // 连接sqlite数据库
        $$db.open($$path.data_path).then(() => {
          // 获取用户列表
          $$db.getUserList().then(([err, list = []]) => {
            console.log(err)
            list.map(item => (item._checked = false))
            vm.userList = list
          })
        })
      }
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .modal-box {
    flex-direction: column;
  }
  .modal-box-right {
    padding: 0;
    flex: 0;
    border: none;
  }
  .modal-box-selected {
    display: none;
  }
}
.user-item:hover {
  color: #9e9e9e;
}
</style>
