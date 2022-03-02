const files = require.context('.', false, /\.vue$/)
const msgType = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  files(key).default.props = files(key).default.props || {}
  files(key).default.props.item = { type: Object }
  files(key).default.props.index = { type: Number }
  msgType[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})
export default msgType
