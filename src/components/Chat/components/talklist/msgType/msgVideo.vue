<template>
  <div @click="openVideo(item.content)" style="height: 60px; background: #cce4fc" class="flex-start-center padding-5 border-r-5">
    <i style="color: #cba971; font-size: 30px" class="iconfont padding-rl-10 font-5x">&#xe61f;</i>
    <div style="align-items: start" class="flex-col-center padding-rl-15">
      <p class="padding-b-5">视频</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'msgVideo',
  methods: {
    openVideo(content) {
      let url = typeof content == 'object' ? content.url : content
      this.$openModal({ route: 'showVideo', query: { url: url }, options: { title: '视频' } })
    }
  }
}
</script>

<style scoped></style>
