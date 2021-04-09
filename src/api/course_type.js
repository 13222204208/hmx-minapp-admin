import request from '@/utils/request'

export function storeCourseType(params) {
  return request({
    url: '/course_type',
    method: 'post',
    params: params
  })
}

export function courseTypeList(listQuery) {
  return request({
    url: '/course_type',
    method: 'get',
    params: listQuery
  })
}

export function delCourseType(id) {
  return request({
    url: '/course_type/'+id,
    method: 'delete'
  })
}

export function editCourseType(id) {
  return request({
    url: '/course_type/'+id+'/edit',
    method: 'get'
  })
}

export function updateCourseType(id,params) {
  return request({
    url: '/course_type/'+id,
    method: 'patch',
    params:params
  })
}
