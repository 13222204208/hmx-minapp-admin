import request from '@/utils/request'



export function enrollList(listQuery) {
  return request({
    url: '/enroll',
    method: 'get',
    params: listQuery
  })
}

export function delEnroll(id) {
  return request({
    url: '/enroll/'+id,
    method: 'delete'
  })
}



export function updateEnroll(id,params) {
  return request({
    url: '/enroll/'+id,
    method: 'patch',
    params:params
  })
}
