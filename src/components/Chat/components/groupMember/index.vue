<template>
  <div class="flex-col-start groupMember border-1px-t cursor-hand" style="width: 280px">
    <div class="margin-b-10 font-16 pointer" v-if="!showInput" @dblclick="handleDBClick('showInput')">
      {{ groupName }}
    </div>
    <el-input v-else v-model="groupName" ref="showInput" class="margin-b-10" focus @blur="handleBlur('showInput')" size="small"></el-input>
    <div class="flex-space-between font-14">
      <span>群公告</span>
      <span class="iconfont font-12">&#xe639;</span>
    </div>
    <div class="padding-tb-10" v-if="!showTextarea" @dblclick="handleDBClick('showTextarea')">
      {{ groupInfo }}
    </div>
    <el-input
      v-else
      v-model="groupInfo"
      ref="showTextarea"
      type="textarea"
      class="margin-b-10"
      focus
      :max="100"
      @blur="handleBlur('showTextarea')"
      :rows="5"
    ></el-input>
    <div class="border-1px-t groupMember-list">
      <div class="flex-space-between">
        <div class="font-14">群成员（0）</div>
        <span class="iconfont font-12">&#xe639;</span>
      </div>
      <ul class="scroll-y" style="max-height: 550px">
        <li class="flex-start-center padding-t-5 pointer" v-for="item in 20" :key="item">
          <el-popover placement="right-start" width="240" trigger="hover">
            <div class="flex-col-start width-100 padding-10">
              <div class="flex-space-between width-100 padding-b-20 border-1px-b">
                <div>
                  <div class="margin-b-10">
                    时尚顾问-卡娜
                    <span class="iconfont font-12" :class="[0 ? 'color-blue' : 'color-warning']">{{ 0 ? '&#xe64b;' : '&#xe64c;' }}</span>
                  </div>
                  <div>微信号：wx123456</div>
                </div>
                <img src="http://mall.yingerfashion.com/public/images/f0/91/a8/163ead433ca2148c621a79d56931e0a0faa55533.jpg" class="avatar" alt="" />
              </div>
              <div class="group-info-item">
                <div class="flex-start-center margin-tb-10">
                  <span class="title">备注</span>
                  <span>卡娜</span>
                </div>
                <div class="flex-start-center margin-tb-10">
                  <span class="title">地区</span>
                  <span>卡娜</span>
                </div>
                <div class="flex-start-center margin-tb-10">
                  <span class="title">来源</span>
                  <span>卡娜</span>
                </div>
                <div class="flex-start-center">
                  <span class="title">标签</span>
                  <span>卡娜</span>
                </div>
              </div>
            </div>
            <div slot="reference">
              <span class="iconfont" :class="[0 ? 'color-blue' : 'color-warning']">{{ 0 ? '&#xe64b;' : '&#xe64c;' }}</span>
              <!-- 0 妹子 1 汉子 -->
              <span class="padding-l-10 font-14">时尚顾问-卡娜</span>
            </div>
          </el-popover>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'groupMember',
  data() {
    return {
      showInput: false,
      showTextarea: false,
      groupName: '欧莎万能大群',
      groupInfo: '群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告群公告'
    }
  },
  methods: {
    handleDBClick(type) {
      if (type == 'showTextarea') {
        this.showTextarea = true
        this.$nextTick(() => {
          this.$refs.showTextarea.focus()
        })
      } else {
        this.showInput = true
        this.$nextTick(() => {
          this.$refs.showInput.focus()
        })
      }
    },
    handleBlur(type) {
      if (type == 'showTextarea') {
        this.showTextarea = false
      } else {
        this.showInput = false
      }
      //调用接口修改信息
    }
  }
}
</script>
<style scoped>
.groupMember {
  padding: 16px;
}
.groupMember-list {
  padding: 20px 0;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 4px;
}
.group-info-item .title {
  color: rgb(153, 153, 153);
  margin-right: 8px;
  letter-spacing: 5px;
}
</style>
