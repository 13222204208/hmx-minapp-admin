import request from '@/utils/request'

export function storeActivity(params) {
  return request({
    url: '/activity',
    method: 'post',
    params: params
  })
}

export function activityList(listQuery) {
  return request({
    url: '/activity',
    method: 'get',
    params: listQuery
  })
}

export function delActivity(id) {
  return request({
    url: '/activity/'+id,
    method: 'delete'
  })
}

export function editActivity(id) {
  return request({
    url: '/activity/'+id+'/edit',
    method: 'get'
  })
}

export function updateActivity(id,params) {
  return request({
    url: '/activity/'+id,
    method: 'patch',
    params:params
  })
}
