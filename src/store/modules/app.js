import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: !+Cookies.get('sidebarStatus'),
    withoutAnimation: false
  },
  language: Cookies.get('language') || 'zh',
  device: 'desktop'
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  // 切换侧边栏
  toggleSidebar (state) {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  // 设置语言
  setLanguage (state, language) {
    state.language = language
    Cookies.set('language', language)
  },
  // 关闭侧边栏
  closeSidebar (state, withoutAnimation) {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  // 切换设备
  toggleDevice (state, device) {
    state.device = device
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
