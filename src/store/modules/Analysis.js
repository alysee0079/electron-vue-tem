/* eslint-disable */
import * as types from '../mutationType'
const state = {}
const getters = {}
const actions = {
  //获取品牌ID
  getGoodsBrandList({ commit }, payload) {
    return $http.post('/api/goods/brand', payload).then(response => {
      return response.data
    })
  },
  //获取商品分类
  goodsCatList({ commit }, payload) {
    return $http.get('/api/goods/cats', payload).then(response => {
      return response.data
    })
  },
  //商品消费趋势分析
  goodsSalesTrends({ commit }, payload) {
    return $http.post('/api/goodsAnalysis/goodsSalesTrends', payload).then(response => {
      return response.data
    })
  },
  dateSalesTrends({ commit }, payload) {
    return $http.post('/api/goodsAnalysis/dateSalesTrends', payload).then(res => {
      return res
    })
  },
  searchKeywordTrends({ commit }, payload) {
    return $http.post('/api/goodsAnalysis/searchKeywordTrends', payload).then(res => {
      return res
    })
  },
  currentSaleTrends({ commit }, payload) {
    return $http.post('/api/goodsAnalysis/currentSaleTrends', payload).then(res => {
      return res
    })
  }
}
const mutations = {}
export default {
  state,
  getters,
  mutations,
  actions
}
