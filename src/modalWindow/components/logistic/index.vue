<template>
  <iframe v-if="src" :src="src" class="width-100 height-100" style="margin: 0; padding: 0; overflow: hidden"></iframe>
  <!-- <webview
    v-if="src"
    :src="src"
    useragent="Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
    class="width-100 height-100"
  ></webview> -->
</template>

<script>
export default {
  name: 'logistic',
  data() {
    return {
      src: ''
    }
  },
  created() {
    let baseUrl = 'https://m.kuaidi100.com/result.jsp?nu='
    let query = this.$route.query
    this.src = `${baseUrl}${query.delivery || ''}`
  },
  mounted() {
    // const webview = document.querySelector('webview');
    // webview.addEventListener('dom-ready', e => {
    //   webview.insertCSS(`
    //     ::-webkit-scrollbar{width: 5px;height: 5px;border-radius:5px;background-color: transparent;}
    //     ::-webkit-scrollbar-thumb{background-color: #ccc;border-radius:5px;}
    //     .download-nav,#m_result_banner,.m_result_banner {
    //       display: none!important;
    //     }
    //   `);
    // })
  }
}
</script>

<style>
#app {
  overflow: hidden;
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
