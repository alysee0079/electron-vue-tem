<template>
  <div class="height-100 flex-col-center" style="justify-content: center">
    <video style="width: 100%" controls="controls" autoplay="autoplay">
      <source :src="url" type="video/mp4" />
    </video>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      url: ''
    }
  },
  created() {
    let { url } = this.$route.query
    this.url = url
  }
}
</script>

<style scoped></style>
