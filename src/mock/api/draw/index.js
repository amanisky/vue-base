import Mock from 'mockjs'
import qs from 'qs'

Mock.mock(RegExp('/api/draw/background'), 'get', ({ url }) => {
  // 解析
  var params = qs.parse(url.split('?').length > 1 ? url.split('?')[1] : '')
  console.log(params)
  return {
    code: 401,
    msg: '用户名或密码错误'
  }
})
