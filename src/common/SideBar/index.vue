<template>
  <div class="flex-col-center el-menu padding-t-20" style="width: 128px">
    <!-- 左侧栏目 -->
    <div class="link-img padding-tb-10" style="display: table">
      <img
        class="av"
        src="https://tfmall-test.oss-cn-shenzhen.aliyuncs.com/storage/images/image/tanfeizanweitu/8220359a06bb5a34a114a54d74a9b9e3.png"
        alt=""
      />
    </div>
    <el-menu
      class="el-menu-vertical-demo height-100 width-100 menu"
      @select="handleSelect"
      :default-active="this.$route.path"
      :default-openeds="['1']"
      router
    >
      <div v-for="(item, index) in items" :key="index">
        <el-menu-item v-if="!item.children" :index="item.name">
          <i class="iconfont" v-html="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
        <el-submenu v-else index="1">
          <template slot="title">
            <i class="iconfont" v-html="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <el-menu-item v-for="(item2, index2) in item.children" :key="index2" :index="item2.name" @click="handleClick(index2)">
            {{ item2.title }}
          </el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'sidebar',
  data() {
    return {
      theme: 'light',
      currentRouterTitle: '工作台',
      items: [
        {
          icon: '&#xe62c;',
          title: '工作台',
          name: '/workbench'
        },
        {
          icon: '&#xe642;',
          title: '首页',
          name: '/homePage'
        },
        {
          icon: '&#xe640;',
          title: '沟通',
          children: [
            {
              icon: '',
              title: '在线客服',
              name: '/chat'
            },
            {
              icon: '',
              title: '智能客服',
              name: '/chat'
            }
          ]
        },
        {
          icon: '&#xe63f;',
          title: '会员',
          name: '/customer'
        },
        {
          icon: '&#xe629;',
          title: '商品',
          name: '/goods'
        },
        {
          icon: '&#xe641;',
          title: '订单',
          name: '/order'
        },
        {
          icon: '&#xe63e;',
          title: '售后',
          name: '/aftersale'
        },
        {
          icon: '&#xe631;',
          title: '朋友圈',
          name: '/friends'
        }
        // {
        //   icon: "&#xe654;",
        //   title: "业绩",
        //   to: { name: "achievement" }
        // },
        // {
        //   icon: "&#xe605;",
        //   title: "分析",
        //   to: { name: "dataAnalysis" }
        // }
      ]
    }
  },
  methods: {
    ...mapMutations(['upDateChatRoomType']),
    handleSelect(key, keyPath) {
      console.log('handleSelect', key, keyPath)
    },
    handleClick(index) {
      console.log('handleClick', index)
      let type = 'IM'
      if (index == 1) type = 'weChat'
      this.upDateChatRoomType(type)
    }
  }
}
</script>
<style lang="scss" scoped>
.av {
  width: 52px;
  height: 52px;
  border-radius: 50%;
}
.menu ::v-deep .el-submenu .el-menu-item {
  width: 128px !important;
  min-width: 120px !important;
}
.menu ::v-deep .el-submenu__icon-arrow {
  display: none;
}
.menu ::v-deep .el-submenu__title:hover {
  background: #0c172d;
}
</style>
