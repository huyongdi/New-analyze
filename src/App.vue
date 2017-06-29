<!--suppress ALL -->
<template>
  <div id="app">
    <nav-header v-if="inLogin"></nav-header>
    <router-view></router-view>
  </div>
</template>
<script>

  import header from './components/global/Header.vue'
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
  @triangle-color: rgb(0, 118, 192);
  @border: rgb(168, 185, 209);
  @in: rgb(14, 125, 195);
  @color: rgb(49, 49, 49);
  @tdBorder: rgb(225, 226, 227);
  @trHover: rgb(255,245,231);
  @trIn: rgb(255,236,210);

  html {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    body {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
      font-family: "AdobeHeitiStd";
      #app {
        height: 100%;
        /*自定义class*/
        .po {
          cursor: pointer;
        }
        .inline {
          display: inline-block;
        }
        .block {
          display: block;
        }
        a {
          text-decoration: none;
        }
        ul {
          li {
            list-style: none;
          }
        }
        .my-btn {
          width: 92px;
          height: 30px;
          padding: 4px 8px;
          background-color: rgb(234, 84, 66);
          border: 1px solid rgb(223, 61, 37);
          color: #fff;
          img {
            margin: 0 5px 2px 0;
          }
        }
        /*表格样式*/
        table {
          margin-top: 15px;
          border: 1px solid @border;
          border-radius: 10px;
          box-shadow: 0 0 15px 1px @border;
          width: 100%;
          max-width: 100%;
          border-spacing: 0;
          border-collapse: separate;
          overflow: hidden;
          thead {
            background-color: rgb(230, 239, 245);
            tr {
              th {
                padding: 8px 0 8px 17px;
                border-bottom: 2px solid rgb(206, 219, 227);
              }
              th:first-child {
                border-top-left-radius: 10px;
              }
              th:last-child {
                border-top-right-radius: 10px;
              }
              th:not(:first-child) {
                border-left: 1px dashed @tdBorder;
              }
            }
          }
          tbody {
            tr {
              td {
                padding: 8px 8px 8px 17px;
              }
              td:not(:first-child) {
                border-left: 1px dashed @tdBorder;
              }
              &:hover {
                background-color: @trHover;
              }
            }
            tr.in{
              background-color: @trIn;
            }
            tr:not(:last-child) {
              td {
                border-bottom: 1px dashed @tdBorder;
              }
            }
          }
          table tr:first-child th:first-child {
            border-top-left-radius: 20px
          }
        }
        /*页面共用样式*/
        .all-content {
          height: 100%;
          .under {
            border-top: 1px solid @border;
            height: calc(~'100vh - 52px');
            .under-left {
              /*display: inline-block;*/
              float: left;
              width: 250px;
              height: 100%;
              margin: 0;
              padding: 0;
              color: @color;
              cursor: pointer;
              border-right: 1px solid @border;
              li.active {
                .father {
                  .triangle {
                    opacity: 1;
                  }
                  border-right: 1px solid @triangle-color;
                  color: @in;
                }
                .children {
                  display: block;
                }
              }
              .father {
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid @border;
                font-weight: bold;
                .img {
                  float: left;
                  width: 18px;
                  height: 25px;
                  margin: 6px 10px 0 20px;
                }
                img {
                  float: right;
                  margin: 16px 20px 0 0;
                }
                .triangle {
                  float: right;
                  width: 0;
                  height: 0;
                  margin-top: 4px;
                  border-top: 15px solid transparent;
                  border-right: 18px solid @triangle-color;
                  border-bottom: 15px solid transparent;
                  opacity: 0;
                }
              }
              .children {
                display: none;
                padding-left: 23px;
                border-bottom: 1px solid @border;
                a {
                  height: 25px;
                  line-height: 25px;
                  color: inherit;
                }
                a.active {
                  color: @in;
                }
              }
            }
            .under-right {
              /*display: inline-block;*/
              float: left;
              width: calc(~'100vw - 270px');
              height: 100%;
              padding-left: 30px;
              padding-top: 28px;
              .title {
                color: rgb(67, 67, 67);
                font-weight: bold;
                .title-b {
                  font-weight: bold;
                  font-size: 18px;
                }
              }
            }
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
            background-color: #258dc1;
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
</style>
