import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

let requireAll = requireContext => requireContext.keys().map(requireContext)
let req = require.context('./svg', false, /\.svg$/)
requireAll(req)
