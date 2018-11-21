<template>
<el-menu class="navbar" mode="horizontal">
  <hamburger :toggle-click="toggleSidebar" :is-active="sidebar.opened" class="hamburger-container"/>
  <breadcrumb class="breadcrumb-container" />
  <div class="right-menu">
    <lang-select class="international right-menu-item"/>

    <el-dropdown class="avatar-container right-menu-item" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>{{ $t('navbar.dashboard') }}</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <div @click="logout">{{ $t('navbar.logout') }}</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</el-menu>
</template>

<script>
import LangSelect from '@/components/LangSelect'
import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'NavBar',
  data () {
    return {
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
  },
  computed: mapState('app', ['sidebar']),
  components: {
    Breadcrumb,
    Hamburger,
    LangSelect
  },
  methods: {
    ...mapMutations('app', ['toggleSidebar']),
    logout () {}
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .international{
      vertical-align: top;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
