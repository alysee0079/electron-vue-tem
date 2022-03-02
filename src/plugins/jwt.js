export default {
  setToken(token) {
    window.localStorage.setItem('pa_token', token)
  },
  getToken() {
    window.localStorage.getItem('pa_token')
  },
  removeToken() {
    window.localStorage.removeItem('pa_token')
  }
}
