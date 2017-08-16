<!--suppress ALL -->
<template>
  <div id="app">
    <nav-header v-if="notLogin"></nav-header>
    <nav-footer v-if="notLogin"></nav-footer>
    <router-view></router-view>
  </div>
</template>
<script>

  import header from './components/global/header'
  import footer from './components/global/footer'
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
      'nav-footer': footer
    },
    data: function () {
      return {
        notLogin: '',
        inGene: ''
      }
    },
    created: function () { //刷新当前页面时候判断需不需要加载头部
      this.notLogin = localStorage.token;
      if (!localStorage.token) {
        this.$router.push({path: '/login?next='+this.$route.path})
      }
    },
    watch: {
      '$route' (to, from) { //路由变化的时候判断需不需要加载头部
        this.notLogin = localStorage.token
        if (from.name === 'login') {  //重新登录之后token不刷新
          axios.defaults.headers = {'Authorization': localStorage.token?localStorage.token:''};
        }
      }
    }
  }

</script>

<style lang="less">
  @baseColor:#2c7fd2;

  html {
    /*overflow-x: hidden;*/
    /*overflow-y: auto;*/
    height: 100%;
    body {
      min-height: 100%;
      height: auto;
      margin: 0;
      padding: 0;
      font-family: "Microsoft YaHei", serif;
      overflow-x: hidden;
      #app {
        height: 100%;
        position: relative;
        background-color: #f5f5f5;
        .right-content {
          width: 100%;
          /*margin: 30px 46px 30px 102px;*/
          padding: 15px 46px 30px 102px;
          .bold{
            font-weight: bold;
          }
          .navTitle {
            height: 41px;
            line-height: 41px;
            .navTitle-span {
              float: left;
              font-size: 21px;
              /*color: #666;*/
              /*font-weight: bold;*/
              color: rgb( 98, 98, 98 );
              margin-left: 15px;
            }
          }
          .all-content {
            background-color: #fff;
            min-height: calc(~'100vh - 201px');
            padding: 20px;
            overflow-y: auto;
          }
          .detailTitle {
            margin-top: 10px;
            background-color: #eeeeee;
            padding: 5px 10px;
            font-family: "Microsoft YaHei", serif;
            color: rgb( 112, 112, 112 );
          }
          .detailShow {
            padding: 20px;
            background-color: #fff;
            min-height: calc(~'100vh - 201px');
            overflow-y: auto;
          }
        }
        /*自定义公共样式*/
        .s-cnv{
          color: red;
          margin-left: 5px;
          font-size: 12px;
          transform: scale(0.5); /*2D缩放*/
          display: inline-block;
        }
        .table > tbody > tr.active > td, .table > tbody > tr.active > th, .table > tbody > tr > td.active, .table > tbody > tr > th.active, .table > tfoot > tr.active > td, .table > tfoot > tr.active > th, .table > tfoot > tr > td.active, .table > tfoot > tr > th.active, .table > thead > tr.active > td, .table > thead > tr.active > th, .table > thead > tr > td.active, .table > thead > tr > th.active {
          background-color: inherit;
          color: red;
        }
        a.a-color, a.a-color:focus, a.a-color:hover {
          color: inherit;
          display: inline-block;
          width: 100%;
        }
        .btn-color {
          background-color: @baseColor;
          color: #fff;
          padding: 2px 30px;
        }
        .btn-color-r{
          background-color: rgb(233,73,73);
          color: #fff;
          padding: 2px 30px;
        }
        .inline{
          display: inline-block;
        }
        .fff {
          background-color: #fff;
        }
        .relative{
          position: relative;
        }
        .myTable {
          font-size: 12px;
          border-collapse: separate;
          border: 1px solid #ddd;
          th {
            background-color: #f0f4f7;
            border-bottom: none;
          }
        }
        ul li {
          list-style: none;
        }
        .block {
          display: block;
        }
        .font-12 {
          font-size: 12px;
        }
        .my-btn {
          color: #fff;
          background-color: @baseColor;
          border-color: #258dc1;
        }
        .btn.my-btn:hover, .btn.my-btn:focus {
          color: #fff;
          background-color: @baseColor;
          border-color: #258dc1
        }
        .btn.my-btn-small {
          padding: 2px 8px;
        }
        .font-700 {
          font-weight: 700;
        }
        .dropdown span {
          cursor: pointer;
        }
        .flag-th {
          margin-left: 10px;
        }
        .tr-active{
          background-color: #f5f5f5;
        }

        .disease-td{
          padding-left: 16px;
          >div{
            position: relative;
          }
          >div:not(:last-child){
            border-bottom: 1px solid #ddd;
            padding-bottom: 8px;
          }
          >div:not(:first-child){
           margin-top: 8px;
          }
          .color{
            position: absolute;
            border-radius: 50%;
            width: 8px;
            height: 8px;
            top: 3.5px;
            left: -15px;
          }
          .color0{
            .color;
            background-color:#eeb763;
          }
          .color1{
            .color;
            background-color:#8ebf73;
          }
          .color2{
            .color;
            background-color:#d32c52;
          }
          .color3{
            .color;
            background-color:#2a7fd2;
          }
          .color4{
            .color;
            background-color: #959595;
          }
        }
        /*加载动画*/
        .spinner {
          z-index: 10000;
          position: fixed;
          top: 50%;
          left: 45%;
          width: 150px;
          text-align: center;
          div {
            width: 30px;
            height: 30px;
            background-color: @baseColor;
            border-radius: 100%;
            display: inline-block;
            -webkit-animation: bounceDelay 1.4s infinite ease-in-out;
            animation: bounceDelay 1.4s infinite ease-in-out;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
          }
          .bounce1 {
            -webkit-animation-delay: -0.32s;
            animation-delay: -0.32s;
          }
          .bounce2 {
            -webkit-animation-delay: -0.16s;
            animation-delay: -0.16s;
          }
        }
        @-webkit-keyframes bounceDelay {
          0%, 80%, 100% {
            -webkit-transform: scale(0.0)
          }
          40% {
            -webkit-transform: scale(1.0)
          }
        }
        @keyframes bounceDelay {
          0%, 80%, 100% {
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
          }
          40% {
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
          }
        }

      }
    }
  }

  .po {
    cursor: pointer;
  }

</style>
