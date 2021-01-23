import request from '@/utils/request'

export function getSysConfig(params) {
  return request({
    url: '/admin/sys-config',
    method: 'get',
    params
  })
}
export function updateSysConfig(data) {
  return request({
    url: '/admin/sys-config',
    method: 'put',
    data
  })
}
