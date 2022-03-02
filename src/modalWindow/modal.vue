<template>
  <div id="app" :class="topPaddingClass" class="height-100 width-100 scroll-y modal">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'tf-modal',
  data() {
    return {
      topPaddingClass: process.platform == 'darwin' ? 'padding-t-10' : ''
    }
  },
  mounted() {}
}
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
}
</style>
