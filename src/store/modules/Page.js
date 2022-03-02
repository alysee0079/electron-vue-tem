/* eslint-disable */
// import * as types from '../mutationType'
import { joinParams } from '../../plugins/utils'
const state = {}
const getters = {}
const actions = {
  guideOrderSalesTrend({}, payload) {
    let str = joinParams(payload)
    return $http.get(`/api/mobile/im/homeIndex/guideOrderSalesTrend?${str}`).then(data => {
      return data
    })
  },
  goodsListTop({ state }, payload) {
    let str = joinParams(payload)
    return $http.get(`/api/mobile/im/homeIndex/goodsListTop?${str}`).then(data => {
      return data
    })
  },
  totalSaleroom({ state }, payload) {
    let str = joinParams(payload)
    return $http.get(`/api/mobile/im/homeIndex/totalSaleroom?${str}`).then(data => {
      return data
    })
  },
  performanceSummarizing({ state }, payload) {
    let str = joinParams(payload)
    return $http.get(`/api/mobile/im/homeIndex/performanceSummarizing?${str}`).then(data => {
      return data
    })
  }
}
const mutations = {}
export default {
  state,
  getters,
  actions,
  mutations
}
