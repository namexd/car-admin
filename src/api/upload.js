import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/upload/baidu',
    method: 'post'
  })
}

export function uploadFile(param) {
  return request({
    url: '/admin/file',
    method: 'post',
    param,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    transformRequest: [
      function () {
        return param;
      },
    ],

  })
}



