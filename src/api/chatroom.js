import { request } from '@/plugins/axios'
// import { joinParams } from '@/plugins/utils'

// 查看自己创建标签列表
export function sysTagList(params) {
  return request({
    method: 'GET',
    url: '/web/sysTagList',
    params
  })
}

// 根据用户id 查询所属标签信息
export function sysTagById(params) {
  return request({
    method: 'GET',
    url: '/web/sysTagById',
    params
  })
}

// 标签添加
export function sysTag(data) {
  return request({
    method: 'POST',
    url: '/web/sysTag',
    data
  })
}

// 删除用户的标签
export function delSysUserTag(params) {
  return request({
    method: 'DELETE',
    url: `/web/sysUserTag/${params.id}`,
    params
  })
}

// 删除自己创建的标签
export function delSysTag(params) {
  return request({
    method: 'DELETE',
    url: `/web/sysTag/${params.id}`,
    params
  })
}

// 綁定用户和标签
export function bindUserTag(data) {
  return request({
    method: 'POST',
    url: `/web/BindUserTag`,
    data
  })
}

// 快捷回复话术列表
export function queryQuickReply(params) {
  return request({
    method: 'GET',
    url: '/web/QuickReply',
    params
  })
}

// 话术添加
export function quickReply(data) {
  return request({
    method: 'POST',
    url: `/web/QuickReply`,
    data
  })
}
// 删除快捷回复话
export function delQuickReply(params) {
  return request({
    method: 'DELETE',
    url: `/web/QuickReply/${params.Id}`,
    params
  })
}
