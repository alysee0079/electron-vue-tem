<template>
  <div class="talkarea relative padding-rl-10 flex-col-start padding-b-10" :style="{ height: h + 'px' }">
    <div class="border" ref="line"></div>
    <!-- 表情包 -->
    <CompositeBar></CompositeBar>
    <div
      ref="chat-input"
      autofocus="autofocus"
      @keyup="inputkeyup"
      @keydown.enter.exact.prevent="send"
      @keydown.ctrl.enter="newLine"
      @paste="inputPaste"
      @drop="inputDrop"
      @click.right="showContextMenu"
      class="flex-item input-box flex-content"
      :class="plainOnly ? 'read-write-plaintext-only' : 'read-write'"
    >
      <div><br /></div>
    </div>
    <div class="flex-end">
      <el-tooltip placement="top" content="不能发送空白信息" :disabled="!err">
        <el-button :disabled="socketStatus !== 1" type="text" size="small" class="padding-rl-15" @click="send">发送(S)</el-button>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import CompositeBar from '../compositeBar/index'
export default {
  name: 'talkArea',
  components: { CompositeBar },
  data() {
    return {
      h: 160,
      err: false,
      msg_template: {
        type: 1,
        content: ''
        // user_id: '',
        // to_session: '',
      },
      plainOnly: true, // 动态切换属性
      forbidWords: '/wx|微信|加v|V信|\+v|vx|\+w|加w/i', //用于校验规则
      sendWords: '',
      socketStatus: 0
    }
  },
  methods: {
    inputkeyup() {},
    inputPaste() {},
    inputDrop() {},
    showContextMenu() {},
    send() {}
  }
}
</script>
<style scoped>
.talkarea {
  min-height: 120px;
  height: 160px;
  max-height: 300px;
}
.input-box {
  outline: none;
  word-break: break-all;
}
.input-box img {
  width: 100px;
}
.border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  border-top: 1px solid #e6e6e6;
}
.border:hover {
  cursor: n-resize;
}
.read-write {
  -webkit-user-modify: read-write;
}
.read-write-plaintext-only {
  -webkit-user-modify: read-write-plaintext-only;
}
</style>
