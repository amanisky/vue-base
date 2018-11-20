<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
// import ResizeMixin from './mixin/resize'

export default {
  name: 'Layout',
  data () {
    return {
      classObj: { hideSidebar: false, openSidebar: true, withoutAnimation: false, mobile: false },
      device: 'desktop',
      sidebar: { opened: true, withoutAnimation: false }
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  methods: {
    handleClickOutside () {

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
