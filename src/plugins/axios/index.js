import axios from 'axios'

const server = axios.create({
  baseURL: process.env.API_BASE_URL
})

/**
 * 请求拦截器
 */
server.interceptors.request.use(function (config) {
  config.headers['Authorization'] = 'Bear amaniskyappleshy'
  return config
}, function (error) {
  return Promise.reject(error)
})

/**
 * 响应拦截器
 */
server.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default server
