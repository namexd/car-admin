import request from '@/utils/request'

export function getHome(params) {
  return request({
    url: '/admin',
    method: 'get',
    params
  })
}
