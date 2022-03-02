<template>
  <div class="padding-t-10 height-100">
    <el-row :gutter="20" class="margin-0 height-100">
      <el-col :span="16" class="friends-left height-100">
        <div class="friend-info bg-white padding-20">
          <h3 class="font-20 padding-b-15">朋友圈内容</h3>
          <el-input type="textarea" :rows="10" placeholder="在这里输入朋友圈内容" v-model="textarea"></el-input>
          <div class="margin-t-20">
            <el-tabs v-model="activeTabs" @tab-click="handleClick">
              <el-tab-pane label="本地上传" name="local" class="padding-tb-10">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  class="upload"
                  multiple
                  :on-preview="handlePreview"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                >
                  <div class="el-icon-plus font-20"></div>
                  <div slot="file" slot-scope="{ file }">
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
              </el-tab-pane>
              <el-tab-pane label="文案库" name="document"></el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="friend-comment bg-white padding-20 margin-t-10">
          <div class="flex-space-between">
            <h3 class="font-20 padding-b-15">延时评论(选填)</h3>
            <div class="color-blue">添加</div>
          </div>
          <div class="scroll-y" style="height: 245px">
            <ul class="height-100">
              <li v-for="item in 10" :key="item" class="margin-b-10">
                <el-radio v-model="commentRadio" :label="item">备选项-{{ item }}</el-radio>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="padding-0 height-100">
        <div class="flex-col-start bg-white padding-20 height-100">
          <div class="flex-space-between border-1px-b padding-b-15">
            <h3 class="font-16">相关设置</h3>
            <span class="color-blue font-14">一键清空内容</span>
          </div>
          <div class="flex-col-start">
            <div class="font-14 padding-tb-10 font-bold">选择微信号</div>
            <div class="border-1px-b padding-b-20">
              <ul class="room-container">
                <li class="link-img friend-img" v-for="item in 6" :key="item">
                  <img
                    class=""
                    src="https://thirdwx.qlogo.cn/mmopen/vi_32/oSwzAyoT5IaNTTJicQ6U6nD1XCs6KPP1MLwEX6KVRPxgYqHyK36FZYDUCJm8YEpQBo5RMoGTeoqlPp6brMso3Zg/132"
                    alt=""
                  />
                </li>
                <li class="flex-col-center">
                  <div class="addWeChat">
                    <i class="el-icon-plus font-20"></i>
                  </div>
                  <span class="font-10" style="margin-top: 7px">添加微信号</span>
                </li>
              </ul>
            </div>
            <div class="border-1px-b padding-b-10">
              <div class="font-14 padding-tb-10 font-bold">发布时间</div>
              <div class="flex-start-center">
                <el-radio
                  class="radio-margin"
                  size="mini"
                  v-model="sendTimeRadio"
                  v-for="(item, key, index) in sendTimeRange"
                  :key="index"
                  :label="key"
                >
                  <span class="font-14">{{ item }}</span>
                </el-radio>
              </div>
              <el-date-picker
                v-if="sendTimeRadio == 1"
                size="small"
                class="margin-t-10 width-100"
                v-model="value2"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
            <div class="border-1px-b padding-b-10">
              <div class="font-14 padding-tb-10 font-bold">可见范围</div>
              <div class="flex-start-center">
                <el-radio class="radio-margin" size="mini" v-model="viewRadio" v-for="(item, key, index) in viewRange" :key="index" :label="key">
                  <span class="font-14">{{ item }}</span>
                </el-radio>
              </div>
            </div>
            <div class="margin-b-10">
              <div class="flex-space-between">
                <div class="font-14 padding-tb-10 font-bold">提醒谁看</div>
                <div class="color-blue" @click="openModal">编辑</div>
              </div>
              <div>
                已选中
                <span class="color-blue">0</span>
                位好友
              </div>
              <ul class="remind">
                <li></li>
              </ul>
            </div>
            <el-button type="primary" size="small" class="margin-t-10">发送</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'friends',
  data() {
    return {
      textarea: '',
      activeTabs: 'local',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      value2: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      commentRadio: '0',
      sendTimeRadio: '0',
      sendTimeRange: {
        0: '立即发送',
        1: '自定义时间',
        2: '推荐发送时段'
      },
      viewRadio: '0',
      viewRange: {
        0: '全部',
        1: '私密',
        2: '部分可见',
        3: '不给谁看'
      }
    }
  },
  methods: {
    handleClick() {
      console.log('handleClick++')
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess() {},
    handleError() {},
    handlePreview() {},
    openModal() {
      this.$openModal({
        route: 'weChatUserList',
        query: {},
        options: { title: '选择提醒谁看', width: 508, height: 651, resizable: false, maximizable: false }
      })
    }
  }
}
</script>
<style lange="scss" scoped>
::v-deep.upload .el-upload--picture-card {
  width: 72px;
  height: 72px;
  line-height: 72px;
}
::v-deep.el-upload-list--picture-card .el-upload-list__item {
  width: 72px;
  height: 72px;
}
.friends-left {
  padding: 0 12px 0 0 !important;
}
.friend-img {
  width: 48px;
  height: 48px;
  margin: 0 4px 5px 0;
}
.addWeChat {
  width: 48px;
  height: 48px;
  line-height: 48px;
  display: block;
  text-align: center;
  border: 2px dotted #ddd;
  background: #eee;
}
.room-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.radio-margin {
  margin: 0 10px 0 0 !important;
}
.remind {
  height: 200px;
  border-bottom: 1px solid #ddd;
}
</style>
