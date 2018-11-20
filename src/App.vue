<template>
  <div
    id="app"
    v-loading.fullscreen.lock="loading"
    element-loading-text="...拼命加载中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    loading () {
      return this.$store.state.pageLoading
    }
  }
}
</script>
