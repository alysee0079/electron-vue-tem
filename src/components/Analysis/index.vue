<template>
  <div class="analysis">
    <ClassAnalysis />
    <SalesAnalysis />
    <el-row>
      <el-col :span="24" :xl="12">
        <div class="padding-rl-10 margin-tb-10"><HotKeywords /></div>
      </el-col>
      <el-col :span="24" :xl="12">
        <div class="padding-rl-10 margin-tb-10"><HotProductsInfo /></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ClassAnalysis from './classAnalysis'
import SalesAnalysis from './salesAnalysis'
import HotKeywords from './hotKeywords'
import HotProductsInfo from './hotProductsInfo'
export default {
  name: 'analysis',
  components: {
    ClassAnalysis,
    SalesAnalysis,
    HotKeywords,
    HotProductsInfo
  }
}
</script>

<style></style>
