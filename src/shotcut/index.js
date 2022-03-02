var Mousetrap = require('mousetrap')

function shotcutPlugin(Vue) {
  Vue.prototype.$shotcutInit = function () {
    let vm = this
    Mousetrap.bind(['command+k', 'ctrl+k'], function () {
      vm.$router.push({ name: 'logistic' })
      return false
    })
    Mousetrap.bind(['command+g', 'ctrl+g'], function () {
      vm.$router.push({ name: 'goodsSearch' })
      return false
    })
    Mousetrap.bind(['command+h', 'ctrl+h'], function () {
      vm.$router.push({ name: 'workbench' })
      return false
    })
  }
}
export default shotcutPlugin
