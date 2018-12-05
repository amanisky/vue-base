import request from '@/plugins/axios'

export function getBackground (params) {
  return request({
    url: '/draw/background',
    method: 'get',
    params
  })
}
