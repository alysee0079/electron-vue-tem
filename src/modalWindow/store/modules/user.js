// import api from '@/config/api';

const state = {
  login_account: '',
  userInfo: {}
}

const getters = {
  uid: state => state.userInfo.member_id,
  userInfo: state => state.userInfo,
  login_status: state => state.userInfo && state.userInfo.member_id,
  login_account: state => state.login_account
}

const mutations = {
  LOGIN_IN(state, payload) {
    state.userInfo = payload.userInfo
    state.login_account = payload.login_account
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
