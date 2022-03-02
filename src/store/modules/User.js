import Jwt from '../../plugins/jwt'
import * as types from '../mutationType'

const state = {
  login_status: false,
  token: '',
  userInfo: {},
  login_account: '', //登录账号
  errorModal: {
    type: 'warning',
    message: '出错了',
    duration: 0
  }
}
const getters = {
  errorModal: state => state.errorModal,
  login_status: state => state.userInfo && state.userInfo.member_id,
  userInfo: state => state.userInfo
}

const actions = {
  applyLogin({ commit, dispatch }, payload, autoLogin = true) {
    return $http
      .post('/api/mobile/login', payload)
      .then(response => {
        let { pa_token, expires_in, user_info } = response.data
        localStorage.expires_at = new Date().getTime() + expires_in * 1000
        let login_account = payload.username
        if (autoLogin) {
          localStorage.setItem('user_info', JSON.stringify(user_info))
          localStorage.setItem('login_account', login_account)
          Jwt.setToken(pa_token)
          dispatch('getStoreInform') //获取微店基础信息
        }
        commit({ type: types.SET_AUTH_USER, userInfo: user_info, login_account: login_account })
        return response
      })
      .catch(error => {
        return error
      })
  },
  applyLogout({ commit }) {
    console.log('applyLogout++++')
    return new Promise(resolve => {
      commit(types.LOGIN_OUT)
      resolve()
    })
  },
  getStoreInform({ commit }) {
    return $http.get('/api/store_inform', {}).then(res => {
      if (res.data.status == 'success') {
        localStorage.setItem('vstore_info', JSON.stringify(res.data.data))
        commit({
          type: types.SET_VSTORE_INFO,
          vstore: res.data.data.name
        })
      }
      return res.data
    })
  },

  pushErrorMsg({ commit }, data) {
    commit('pushErrorMsg', data)
  }
}

const mutations = {
  [types.SET_AUTH_USER](state, payload) {
    state.userInfo = payload.userInfo
    state.login_account = payload.login_account
  },
  [types.SET_VSTORE_INFO](state, payload) {
    state.vstoreName = payload.vstore
  },
  [types.LOGIN_OUT](state) {
    state.userInfo = {}
    state.token = ''
    state.login_account = ''
    localStorage.removeItem('userInfo')
    localStorage.removeItem('login_account')
  },
  pushErrorMsg(state, payload) {
    state.errorModal = payload
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
