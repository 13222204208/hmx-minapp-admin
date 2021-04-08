import request from '@/utils/request'

export function storeMessage(params) {
  return request({
    url: '/message',
    method: 'post',
    params: params
  })
}

export function messageList(listQuery) {
  return request({
    url: '/message',
    method: 'get',
    params: listQuery
  })
}

export function delMessage(id) {
  return request({
    url: '/message/'+id,
    method: 'delete'
  })
}

export function editMessage(id) {
  return request({
    url: '/message/'+id+'/edit',
    method: 'get'
  })
}

export function updateMessage(id,params) {
  return request({
    url: '/message/'+id,
    method: 'patch',
    params:params
  })
}
