<template>
  <div class="flex-space-between padding-rl-20 padding-t-10 overflow-hidden bg-white">
    <ul class="flex-start-center scroll-x">
      <li v-for="(item, index) in routerTabs" :key="index" class="tabs-item padding-tb-5 padding-rl-5 flex-start-center">
        <router-link :to="item.fullPath" class="font-12 color-gray">{{ item.title }}</router-link>
        <i class="el-icon-close font-18" v-if="item.title != '工作台'" @click="delRouterTabs(index)"></i>
      </li>
    </ul>
    <i class="el-icon-refresh margin-b-10 margin-l-20 pointer font-normal" @click="refresh">刷新</i>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'routerTabs',
  computed: {
    ...mapGetters(['routerTabs', 'theme', 'currentRouterTitle'])
  },
  methods: {
    ...mapActions(['delRouterTabs']),
    refresh() {
      // 加个loading, 不然没感觉
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.6)'
      })
      setTimeout(() => {
        loading.close()
        this.$router.replace({ path: '/refresh' })
      }, 300)
    }
  }
}
</script>
<style scoped>
.tabs-item {
  margin-right: 6px;
  flex-shrink: 0;
  border: 1px solid #ddd;
  color: #ddd;
}
.refresh-icon {
  color: #aaa;
}
.refresh-icon:hover {
  color: #666;
}
</style>
