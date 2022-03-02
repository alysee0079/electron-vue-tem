<template>
  <div>
    <pre class="talk-text font-14 margin-b-5 padding-rl-5">{{ item.content }}</pre>
    <pre v-if="item.knowledge" class="talk-text flex-col-start font-14 padding-rl-5">
      <span v-for="(item1, index) in item.knowledge" :key="index">{{item1.title}}</span>
    </pre>
  </div>
</template>

<script>
export default {
  name: 'msgText'
}
</script>

<style scoped>
.talk-text {
  font-family: inherit;
  word-break: break-word;
  white-space: pre-wrap;
  overflow: hidden;
  line-height: 1.5;
}
</style>
