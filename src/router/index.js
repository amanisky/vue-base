import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)
const router = new Router({
  routes,
  scrollBehavior: () => ({ y: 0 })
})
/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
  // console.log(to, '路由开始...')
  next()
})

router.afterEach(to => {
  // console.log(to, '路由完成...')
})
export default router
