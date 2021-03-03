import request from '@/utils/request'

export function storeCourse(params) {
  return request({
    url: '/course',
    method: 'post',
    params: params
  })
}

export function courseList(listQuery) {
  return request({
    url: '/course',
    method: 'get',
    params: listQuery
  })
}

export function delCourse(id) {
  return request({
    url: '/course/'+id,
    method: 'delete'
  })
}

export function editCourse(id) {
  return request({
    url: '/course/'+id+'/edit',
    method: 'get'
  })
}

export function updateCourse(id,params) {
  return request({
    url: '/course/'+id,
    method: 'patch',
    params:params
  })
}
