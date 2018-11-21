import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from '@/lang'
import '@/styles/index.scss'
import '@/icons'

export default {
  install (Vue) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示。
    // https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false

    // 当前环境
    Vue.prototype.$env = process.env.NODE_ENV

    // 当前的 baseUrl
    Vue.prototype.$baseUrl = process.env.BASE_URL

    // 配置 ElementUI 语言
    Vue.use(ElementUI, {
      i18n: (key, value) => i18n.t(key, value)
    })
  }
}
