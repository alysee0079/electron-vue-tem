<template>
  <div>
    <div class="bg-white margin-b-10 padding-20">
      <h3>工作台</h3>
      <div class="flex-start padding-t-20">
        <img :src="avater" style="width: 29px; height: 29px; border-radius: 50%" class="" alt="" />
        <div class="margin-l-10">
          <p class="padding-b-10 padding-t-5">高级客服</p>
          <p>{{ hoursTip }}！时尚顾问-{{ userInfo.nickname }}，祝你开心每一天</p>
        </div>
      </div>
    </div>
    <div class="flex-start padding-l-10">
      <div class="" style="flex: 18">
        <div class="bg-white margin-b-10 padding-20" v-for="(item, index) in workItem" :key="index">
          <h3>{{ item.title }}</h3>
          <ul class="flex-wrap flex-start-center">
            <li
              class="flex-col-center padding-t-20"
              style="margin-right: 35px"
              v-for="(item2, index2) in item.childres"
              :key="index2"
              @click="jumpPage(item2)"
            >
              <img :src="item2.image || avater" class="work-item-img" />
              <div class="font-12 color-gray margin-t-10">
                {{ item2.title }}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div style="flex: 6" class="padding-l-10">
        <div class="bg-white padding-10 border-r-5">
          <div class="font-bold margin-b-10">日程</div>
          <datePicker
            :options="calendarArr"
            class="calendar"
            @handleClickDay="handleClickDay"
            @handlePrevMonth="handlePrevMonth"
            @handleNextMonth="handleNextMonth"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { workItem } from './confing'
import datePicker from './components/dataPicker/date-picker'
export default {
  name: 'workbench',
  components: { datePicker },
  computed: {
    ...mapGetters(['userInfo'])
  },
  data() {
    return {
      avater: require('@/assets/images/logo.png'),
      workItem,
      calendarArr: {
        type: 'combination',
        headStyle: {
          todayBtn: 'right',
          combination: 'center',
          checkBtn: 'right'
        },
        viewStyle: {
          day: 'right'
        },
        calendarData: [],
        hoursTip: '上午好'
      }
    }
  },
  created() {
    this.getCountHours()
  },
  methods: {
    getCountHours() {
      let self = this
      let date = new Date()
      if (date.getHours() >= 0 && date.getHours() < 12) {
        self.hoursTip = '上午好'
      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        self.hoursTip = '下午好'
      } else {
        self.hoursTip = '晚上好'
      }
    },
    handleClickDay() {},
    handlePrevMonth() {},
    handleNextMonth() {},
    jumpPage(page) {
      if (page.title == '手机预览') {
        this.$openModal({
          route: 'webView',
          query: { page: '/home' },
          options: { title: '分享', width: 380, height: 697, resizable: false, maximizable: false }
        })
      }
      if (page.title == '物流查询') {
        this.$openModal({
          route: 'logistic',
          query: { delivery: '' },
          options: { title: '物流查询', width: 380, height: 697, resizable: false, maximizable: false }
        })
      } else if (page.name) {
        this.$router.push(page.name, page.query)
      }
    }
  }
}
</script>
<style scoped>
.work-item-img {
  width: 42px;
  height: 42px;
}
</style>
