import request from '@/utils/request'

export function storeAffiche(params) {
  return request({
    url: '/affiche',
    method: 'post',
    params: params
  })
}

export function afficheList(listQuery) {
  return request({
    url: '/affiche',
    method: 'get',
    params: listQuery
  })
}

export function delAffiche(id) {
  return request({
    url: '/affiche/'+id,
    method: 'delete'
  })
}

export function editAffiche(id) {
  return request({
    url: '/affiche/'+id+'/edit',
    method: 'get'
  })
}

export function updateAffiche(id,params) {
  return request({
    url: '/affiche/'+id,
    method: 'patch',
    params:params
  })
}
