import request from '@/plugins/axios'

export function getList (params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
