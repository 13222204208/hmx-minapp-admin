import request from '@/utils/request'



export function orderList(listQuery) {
  return request({
    url: '/order',
    method: 'get',
    params: listQuery
  })
}

export function delOrder(id) {
  return request({
    url: '/order/'+id,
    method: 'delete'
  })
}



export function updateOrder(id,params) {
  return request({
    url: '/order/'+id,
    method: 'patch',
    params:params
  })
}
