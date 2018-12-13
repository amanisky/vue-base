<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: mapState('app', ['language']),
  methods: {
    ...mapMutations('app', ['setLanguage']),
    handleSetLanguage (lang) {
      this.$i18n.locale = lang
      this.setLanguage(lang)
      this.$message({
        message: lang === 'zh' ? '切换语言成功' : 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px!important;
}
</style>
