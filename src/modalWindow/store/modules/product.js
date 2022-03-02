// import { joinParams } from '../../../plugins/utils'
const state = {}
const getters = {}
const actions = {
  searchGoods(payload) {
    return $http.post('/api/mobile/Goods/search', payload).then(res => {
      return res.data
    })
  }
}
const mutations = {}
export default {
  state,
  actions,
  getters,
  mutations
}
