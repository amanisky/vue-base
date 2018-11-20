import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const isDev = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    pageLoading: false
  },
  mutations: {
    toggleLoading (state, loading) {
      state.pageLoading = loading
    }
  },
  strict: isDev
})
