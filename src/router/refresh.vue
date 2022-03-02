<script>
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$router.replace(from.fullPath)
    })
  },
  render: function (h) {
    return h()
  }
}
</script>
