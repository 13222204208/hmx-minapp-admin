import request from '@/utils/request'

export function storeContent(params) {
  return request({
    url: '/content',
    method: 'post',
    params: params
  })
}

export function contentList(listQuery) {
  return request({
    url: '/content',
    method: 'get',
    params: listQuery
  })
}

export function delContent(id) {
  return request({
    url: '/content/'+id,
    method: 'delete'
  })
}

export function editContent(id) {
  return request({
    url: '/content/'+id+'/edit',
    method: 'get'
  })
}

export function updateContent(id,params) {
  return request({
    url: '/content/'+id,
    method: 'patch',
    params:params
  })
}
