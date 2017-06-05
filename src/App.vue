<!--suppress ALL -->
<template>
  <div id="app">
    <nav-header v-if="inLogin"></nav-header>
    <main-left v-if="inLogin"></main-left>
    <router-view></router-view>
  </div>
</template>
<script>

  import header from './components/global/Header.vue'
  import mainLeft from './components/global/MainLeft.vue'
  import Vue from  'vue'
  import axios from 'axios'

  Vue.component('loading', {
    template: '<div class="spinner">' +
    '<div class="bounce1"></div>' +
    '<div class="bounce2"></div>' +
    '<div class="bounce3"></div> ' +
    '</div>'
  });

  export default {
    name: 'app',
    components: {
      'nav-header': header,
      'main-left': mainLeft
    },
    data: function () {
      return {
        inLogin: '',
        inGene: ''
      }
    },
    created: function () { //刷新当前页面时候判断需不需要加载头部
//      this.inLogin = localStorage.uname;
    },
    watch: {
//      '$route' (to, from) { //路由变化的时候判断需不需要加载头部
//        this.inLogin = localStorage.uname
//        if (from.name === 'login') {  //重新登录之后token不刷新
//          axios.defaults.headers = {'Authorization': localStorage.token};
//        }
//      }
    }
  }

</script>

<style lang="less">
  html{
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    body{
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
    }
  }
</style>
