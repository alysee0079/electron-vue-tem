<template>
  <div class="flex-start overflow-hidden height-100 widht-100 align-items-stretch">
    <SideBar></SideBar>
    <div class="flex-col-start align-items-stretch overflow-hidden height-100 width-100 flex-col-start bg-gray">
      <HeaderBar></HeaderBar>
      <RouterTabs></RouterTabs>
      <transition name="fade" mode="out-in" appear>
        <keep-alive :max="10" :include="include">
          <router-view class="flex-item scroll-y align-items-stretch"></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<script>
import SideBar from '@/common/SideBar'
import RouterTabs from '@/common/RouterTabs'
import HeaderBar from '@/common/HeaderBar'
export default {
  components: { SideBar, RouterTabs, HeaderBar },
  data() {
    return {
      include: ['']
    }
  }
}
</script>
<style></style>
