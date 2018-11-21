<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="closeSidebar(false)"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  beforeMount () {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted () {
    const isMobile = this.isMobile()
    if (isMobile) {
      this.toggleDevice('mobile')
      this.closeSidebar(true)
    }
  },
  watch: {
    $route () {
      if (this.device === 'mobile' && this.sidebar.opened) {
        this.closeSidebar(false)
      }
    }
  },
  computed: {
    ...mapState('app', ['sidebar', 'device']),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    ...mapMutations('app', ['closeSidebar', 'toggleDevice']),
    isMobile () {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 3 < 1024
    },
    resizeHandler () {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        this.toggleDevice(isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          this.closeSidebar(true)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar{
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
