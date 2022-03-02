<template>
  <div class="flex-start padding-20 bg-white height-100">
    <div class="left height-100 flex-col-start">
      <div class="font-16 margin-b-10">会员(100)</div>
      <el-input v-model="input" size="small" suffix-icon="el-icon-search" class="margin-b-10" placeholder="请输入内容">
        <el-select v-model="select" size="small" slot="prepend" style="width: 100px" placeholder="请选择">
          <el-option label="微信昵称" value="1"></el-option>
          <el-option label="手机号" value="2"></el-option>
          <el-option label="会员卡号" value="3"></el-option>
          <el-option label="用户标签" value="4"></el-option>
        </el-select>
      </el-input>
      <div class="member-list height-100">
        <ul class="height-100 scroll-y">
          <li
            class="flex-start padding-10 pointer"
            :class="[activeIndex == index ? 'active-item' : '']"
            @click="selectMemberItem(index)"
            v-for="(item, index) in 10"
            :key="index"
          >
            <div class="margin-r-5">
              <img :src="def_avatar" class="img" alt="" />
            </div>
            <div class="flex-col-start margin-l-5">
              <div class="font-16">微信昵称：芙露比</div>
              <div class="font-14 color-gray">手机号：13640339837</div>
              <div class="font-14 color-gray">会员卡号：13640339837</div>
              <div class="font-14 color-gray">渠道：小程序</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="right flex-col-start height-100">
      <div class="flex-col-start">
        <div class="flex-space-between padding-rl-10">
          <span class="font-20">会员信息</span>
          <div class="">
            <el-button size="small">修改关系链</el-button>
            <el-button size="small">冻结客户</el-button>
            <el-button size="small" type="primary">送优惠券</el-button>
          </div>
        </div>
        <div class="flex-start padding-tb-20 padding-rl-20">
          <img class="img margin-r-10" :src="def_avatar" alt="" />
          <div class="flex-wrap flex-start font-14">
            <div class="flex-col-8">昵称：芙露比</div>
            <div class="flex-col-8">客户编号：2558941235</div>
            <div class="flex-col-8">成为客户时间：2558941235</div>
            <div class="flex-col-8">
              归属店：XXXX店
              <span class="color-blue">变更记录</span>
            </div>
            <div class="flex-col-8">客户渠道：公众号 小程序</div>
          </div>
        </div>
      </div>
      <div class="member-info padding-t-10 padding-l-10 scroll-y">
        <div class="member-label bg-white margin-b-10 padding-10">
          <div class="flex-space-between margin-b-16">
            <div class="font-16">标签</div>
            <div class="iconfont font-12">&#xe638;</div>
          </div>
          <div class="margin-b-16">
            <div class="font-14 margin-b-10">手动标签</div>
            <div class="flex-wrap flex-start">
              <el-tag size="small">高消费</el-tag>
            </div>
          </div>
          <div>
            <div class="font-14 margin-b-10">自动标签</div>
            <ul class="flex-start flex-wrap">
              <li class="margin-r-10 margin-b-10 padding-rl-5 autoLabel" v-for="item in 10" :key="item">朋友圈广告</li>
            </ul>
          </div>
        </div>
        <div class="member-card bg-white padding-10 margin-b-10">
          <div class="flex-space-between margin-b-16">
            <div class="font-16">商城会员卡</div>
            <div class="iconfont font-12">&#xe638;</div>
          </div>
          <div class="flex-start flex-wrap">
            <div class="flex-col-8 margin-b-16">会员等级：黄金会员</div>
            <div class="flex-col-8">会员卡号：202122225</div>
            <div class="flex-col-8">开卡门店：XXXX</div>
            <div class="flex-col-8">开卡导购：李四</div>
          </div>
        </div>
        <div class="flex-start member-consume">
          <div class="consume flex-col-12 bg-white padding-10 flex-col-start margin-r-5">
            <div class="flex-space-between width-100 margin-b-10">
              <div class="font-16">消费信息</div>
              <div class="iconfont font-12">&#xe638;</div>
            </div>
            <div class="flex-col-start font-14">
              <div class="margin-b-10 font-bold">最近消费（不含外部）</div>
              <div class="margin-b-10">最近消费时间：2021-11-22 11:52:40</div>
              <div class="margin-b-10">最近消费金额：￥159.00</div>
            </div>
            <div class="flex-col-start font-14">
              <div class="margin-b-10 font-bold">累计消费&售后</div>
              <div class="margin-b-10">总消费金额：￥159.00（内部：￥27.00 外部：￥2000）</div>
              <div class="margin-b-10">总消费次数：10（内部：2 外部：8）</div>
              <div class="margin-b-10">总售后金额：￥159.00（内部：￥27.00 外部：￥2000）</div>
              <div class="margin-b-10">总售后次数：5（内部：1 外部：4）</div>
            </div>
            <div class="flex-col-start font-14">
              <div class="margin-b-10 font-bold">消费分析（不含外部）</div>
              <div class="margin-b-10">消费力：23.5</div>
              <div class="margin-b-10">连带率：￥159.00</div>
            </div>
          </div>
          <div class="assets flex-col-12 bg-white margin-l-5 padding-10 flex-col-start">
            <div class="flex-space-between width-100 margin-b-10">
              <div class="font-16">账号资产</div>
              <div class="iconfont font-12">&#xe638;</div>
            </div>
            <div class="flex-col-start font-14">
              <div class="margin-b-10 font-bold">储值账户</div>
              <div class="flex-start flex-wrap">
                <div class="margin-b-10 flex-col-12">当前余额：23.5</div>
                <div class="margin-b-10 flex-col-12">冻结余额：23.5</div>
                <div class="margin-b-10 flex-col-12">累计余额：23.5</div>
                <div class="margin-b-10 flex-col-12">充值次数：23.5</div>
                <div class="margin-b-10 flex-col-12">充值金额：23.5</div>
              </div>
            </div>
            <div class="flex-col-start font-14">
              <div class="margin-b-10 font-bold">积分</div>
              <div class="flex-start flex-wrap">
                <div class="margin-b-10 flex-col-12">当前积分：23.5</div>
                <div class="margin-b-10 flex-col-12">冻结积分：23.5</div>
                <div class="margin-b-10 flex-col-12">累计积分：23.5</div>
              </div>
            </div>
            <div class="flex-col-start font-14">
              <div class="margin-b-10 font-bold">优惠券</div>
              <div class="flex-start flex-wrap">
                <div class="margin-b-10 flex-col-12">未使用：0</div>
                <div class="margin-b-10 flex-col-12">已使用：1</div>
                <div class="margin-b-10 flex-col-12">已过期：1</div>
              </div>
            </div>
          </div>
        </div>
        <div class="member-behavior bg-white margin-t-10 padding-10">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in behaviorArray" :key="index" :label="item.label">
              <el-table :data="tableData" size="small">
                <el-table-column
                  v-for="(item, index) in column"
                  :key="index"
                  :width="item.width"
                  :label="item.label"
                  :prop="item.key"
                  align="center"
                ></el-table-column>
                <el-table-column label="操作" width="120" align="center">
                  <template slot-scope="scope">
                    <el-popover placement="right" width="200" trigger="hover">
                      <div>
                        <p v-for="(item, index) in scope.row.list" :key="index">{{ item }}</p>
                      </div>
                      <el-button size="small" type="text" class="color-blue" slot="reference">查看明细</el-button>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { server_config } from '../../config/common'
export default {
  name: 'customer',
  data() {
    return {
      def_avatar: server_config.def_avatar,
      select: '1',
      input: '',
      activeIndex: 0,
      activeName: '',
      behaviorArray: [
        {
          label: '行为记录',
          data: [],
          page: 1,
          limit: 10,
          total: 0
        },
        {
          label: '基本信息',
          data: [],
          page: 1,
          limit: 10,
          total: 0
        },
        {
          label: '交易明细',
          data: [],
          page: 1,
          limit: 10,
          total: 0
        },
        {
          label: '积分明细',
          data: [],
          page: 1,
          limit: 10,
          total: 0
        },
        {
          label: '储值账户明细',
          data: [],
          page: 1,
          limit: 10,
          total: 0
        },
        {
          label: '优惠券明细',
          data: [],
          page: 1,
          limit: 10,
          total: 0
        }
      ],
      column: [
        {
          key: 'date',
          label: '日期',
          width: 120
        },
        {
          key: 'time',
          label: '时间',
          width: 120
        },
        {
          key: 'channel',
          label: '渠道'
        },
        {
          key: 'store',
          label: '门店'
        },
        {
          key: 'gotoPage',
          label: '进入页面'
        },
        {
          key: 'backPage',
          label: '退出页面'
        },
        {
          key: 'backNum',
          label: '访问次数'
        },
        {
          key: 'shareVstore',
          label: '分享导购'
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          time: '11：00：00',
          channel: '小程序',
          gotoPage: '商品详情',
          backPage: '商品详情',
          backNum: 10,
          shareVstore: '芙露比',
          list: ['111111', '222222', '33333']
        }
      ]
    }
  },
  methods: {
    selectMemberItem(index) {
      this.activeIndex = index
    },
    handleClick() {},
    lookInfo(index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style>
.left {
  flex: 6;
}
.right {
  flex: 18;
}
.img {
  width: 55px;
  height: 55px;
  border: 1px solid #e7e9ec;
  opacity: 1;
  border-radius: 4px;
}
.active-item {
  background: #f5f7fa;
}
.member-info {
  background: #f5f7fa;
}
.autoLabel {
  color: #666666;
  background: #e7e9ec;
}
</style>
