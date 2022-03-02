<template>
  <div class="flex-col-start height-100 relative">
    <div class="flex-start">
      <div class="left flex-col-start flex-item height-100 border-1px-r">
        <el-input size="small" placeholder="微信号 / 昵称" suffix-icon="el-icon-search"></el-input>
        <div class="margin-t-20">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="font-14">全选</el-checkbox>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" class="flex-col-start">
            <el-checkbox class="font-14 margin-t-10 flex-start-center" v-for="city in cities" :label="city" :key="city">
              <div class="flex-start-center">
                <img
                  src="http://mall.yingerfashion.com/public/images/f0/91/a8/163ead433ca2148c621a79d56931e0a0faa55533.jpg"
                  class="chartMember-avater"
                  alt=""
                />
                <div class="margin-l-10">{{ city }}</div>
              </div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="right flex-item padding-10">
        <div class="color-gray">请选择需要添加的联系人</div>
        <ul class="chartMember-list">
          <li class="flex-space-between margin-tb-10" v-for="(item, index) in checkedCities" :key="index">
            <div class="flex-start-center link-img">
              <img
                src="http://mall.yingerfashion.com/public/images/f0/91/a8/163ead433ca2148c621a79d56931e0a0faa55533.jpg"
                class="chartMember-avater margin-l-10"
                alt=""
              />
              <div class="margin-l-5 font-14">{{ item }}</div>
            </div>
            <span class="iconfont font-12 color-gray" @click="delChartMember(index)">&#xe61d;</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer flex-end padding-t-10 padding-r-20">
      <el-button size="small">取消</el-button>
      <el-button size="small" type="primary">确定</el-button>
    </div>
  </div>
</template>
<script>
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  name: 'chartMemberView',
  data() {
    return {
      checkAll: false,
      checkedCities: ['上海', '北京', '广州', '深圳', '上海', '北京', '广州', '深圳', '上海', '北京', '广州', '深圳', '上海'],
      cities: cityOptions,
      isIndeterminate: true
    }
  },
  created() {
    console.log('11111111', this.$route)
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    delChartMember() {}
  }
}
</script>
<style scoped>
.left {
  padding: 10px 20px 0 15px;
}
.footer {
  position: fixed;
  bottom: 10px;
  box-shadow: 0px -2px 6px rgba(19, 37, 71, 0.05);
  width: 100%;
}
.chartMember-avater {
  width: 20px;
  height: 20px;
  border-radius: 2px;
  border: 1px solid #e7e0ec;
}
.chartMember-list {
  max-height: 600px;
  overflow: scroll;
}
</style>
