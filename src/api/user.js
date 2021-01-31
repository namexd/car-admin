import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getUsers(params) {
  return request({
    url: '/admin/user',
    method: 'get',
    params: params
  })
}
export function getUser(id) {
  return request({
    url: `/admin/user/${id}`,
    method: 'get',
  })
}
export function getUserCoupon(params) {
  return request({
    url: `/admin/user-coupon`,
    method: 'get',
    params: params
  })
}
export function addsUerCoupon(data) {
  return request({
    url: '/admin/user-coupon',
    method: 'post',
    data
  })
}
export function deleteUser(id) {
  return request({
    url: `/admin/user/${id}`,
    method: 'delete',
  })
}
export function blackUser(id) {
  return request({
    url: `/admin/user/${id}/black`,
    method: 'put',
  })
}
export function deleteUserCoupon(data) {
  return request({
    url: `/admin/user-coupon`,
    method: 'delete',
    data
  })
}
export function getUserChild(id,params) {
  return request({
    url: `/admin/user/${id}/child`,
    method: 'get',
    params: params
  })
}


export function updateUserParent(id,data) {
  return request({
    url: `/admin/user/${id}/parent`,
    method: 'put',
    data
  })
}

