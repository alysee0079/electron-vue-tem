<template>
  <img
    @dragstart="dragStart('image', item, $event)"
    @click="openImageModal(item.localUrl ? cache_path + item.localUrl : item.remoteUrl)"
    class="talk-photo drag pointer border-r-5"
    :src="item.localUrl ? cache_path + item.localUrl : item.remoteUrl"
  />
</template>

<script>
export default {
  name: 'msgImage',
  props: {
    currentChatMessageList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      cache_path: `file:///${$$path.cache_path}`
    }
  },
  methods: {
    dragStart(type, item, e) {
      e.dataTransfer.setData('ListDragType', type)
      if (type == 'image') {
        let ListDragContent = JSON.stringify({ localUrl: item.localUrl, remoteUrl: item.remoteUrl })
        e.dataTransfer.setData('ListDragContent', ListDragContent)
      }
    },
    openImageModal(url) {
      // let list = [];
      // this.currentChatMessageList.map(item => {
      //   if (item.type == 1) {
      //     list.push(item.localUrl ? this.cache_path + item.localUrl : item.remoteUrl);
      //   }
      // })
      // localStorage.setItem(`modal_prev_images_list`, JSON.stringify(list));
      this.$openModal({ route: 'prevMedia', query: { url }, options: { title: '图片预览' } })
    }
  }
}
</script>

<style scoped>
.talk-photo {
  max-width: 100px;
  border: 1px #ccc solid;
}
</style>
