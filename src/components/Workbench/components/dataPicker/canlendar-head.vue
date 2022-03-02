<template>
  <div class="calendar-header clear">
    <div class="calendar-box" v-if="this.headOptions.type == 'combination'">
      <div class="flex-space-between" :style="{ 'text-align': this.headStyle.combination }">
        <i class="el-icon-arrow-left font-20 calendar-prev" @click="handlePrevMonth"></i>
        <span class="calendar-headDate">{{ this.headOptions.date }}</span>
        <i class="el-icon-arrow-right font-20 calendar-prev" @click="handleNextMonth"></i>
      </div>
      <span class="calendar-today" v-if="this.headOptions.showTodateBtn" @click="handleToday()">今天</span>
    </div>
    <div class="calendar-box" v-else>
      <span class="calendar-headDate">{{ this.headOptions.date }}</span>
      <span
        class="calendar-today dispersion-today"
        v-if="this.headOptions.showTodateBtn"
        :style="{ float: this.headStyle.todayBtn }"
        @click="handleToday()"
      >
        今天
      </span>
      <div class="calendar-content dispersion" :style="{ float: this.headStyle.checkBtn }">
        <i class="el-icon-arrow-left font-20 calendar-prev" @click="handlePrevMonth"></i>
        <i class="el-icon-arrow-right font-20 calendar-prev" @click="handleNextMonth"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headOptions: Object
  },
  data() {
    return {
      headStyle: ''
    }
  },
  mounted() {
    this.headStyle = this.headOptions.style
  },
  methods: {
    // 上一个月
    handlePrevMonth() {
      this.$emit('handlePrevMonth')
    },
    // 下一个月
    handleNextMonth() {
      this.$emit('handleNextMonth')
    },
    // 回到今天
    handleToday() {
      this.$emit('handleToday')
    }
  }
}
</script>

<style lang="scss">
.calendar-header {
  margin-bottom: 23px;
  width: 100%;
  .calendar-box {
    position: relative;
    height: 32px;
    line-height: 32px;
    .calendar-content {
      width: 100%;
      .calendar-prev,
      .calendar-next {
        cursor: pointer;
      }
    }
    .dispersion {
      width: initial;
      display: inline;
    }
    .calendar-headDate {
      vertical-align: middle;
      margin: 0 12px;
      font-size: 14px;
      color: #000000;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .calendar-today {
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border: 1px solid #2061ff;
      border-radius: 4px;
      font-size: 14px;
      color: #2061ff;
      cursor: pointer;
    }
    .dispersion-today {
      position: inherit;
    }
    .calendar-center {
      margin: 0 auto;
    }
    .calendar-left {
      float: left;
    }
    .calendar-right {
      float: right;
    }
  }
}
</style>
