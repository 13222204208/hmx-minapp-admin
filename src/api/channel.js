import request from '@/utils/request'

export function storeChannel(params) {
  return request({
    url: '/channel',
    method: 'post',
    params: params
  })
}

export function channelList(listQuery) {
  return request({
    url: '/channel',
    method: 'get',
    params: listQuery
  })
}

export function delChannel(id) {
  return request({
    url: '/channel/'+id,
    method: 'delete'
  })
}

export function editChannel(id) {
  return request({
    url: '/channel/'+id+'/edit',
    method: 'get'
  })
}

export function updateChannel(id,params) {
  return request({
    url: '/channel/'+id,
    method: 'patch',
    params:params
  })
}
