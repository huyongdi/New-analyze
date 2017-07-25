<!--suppress ALL -->
<template>
  <div id="app" @keyup.27="abc">
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
    created: function () {
      this.baseBind();
    },
    mounted: function () {
      this.baseBind()
    },
    updated:function () {
      this.baseBind()
    },
    watch: {
      '$route' (to, from) { //路由变化的时候判断需不需要加载头部
        this.inLogin = !new Boolean(localStorage.token)
        if (from.name === 'login') {  //重新登录之后token不刷新
          this.myAxios.headers = {'Authorization': localStorage.token};
        }
      }
    },
    methods: {
      baseBind: function () {
        /*点击tr加背景色*/
        $("table tbody").off('click').on("click", 'tr', function () {
          if (!$(this).hasClass('not-base')) {
            if ($(this).hasClass('in')) {
              $(this).removeClass('in')
            } else {
              $(this).closest('tbody').find('.in').removeClass('in')
              $(this).addClass('in');
            }
          }
        });
        /*点击左侧列表*/
        $(".under-left").off('click').on('click','>li',function (event) {
          const _currentLi = $(event.target).closest('li');
          const _children = _currentLi.find('.children');
          if(_currentLi.hasClass('active')){
            _currentLi.removeClass('active')
          }else{
            $(".under-left").find("li.active").removeClass('active');
            _currentLi.addClass('active');
          }
        });
        /*自定义的上传输入框*/
        $(".upload-content").on("click",'.text',function () {
          $(this).next().click();
        });
        $(".upload-content").on('change','.hide-input',function () {
          const arr = $(this).val().split("\\");
          $(this).parent().find('.show-name').val(arr[arr.length-1])
        })
      },
      abc:function () {
        console.log(1111111111)
      }
    }
  }

</script>

<style lang="less">
  @triangle-color: rgb(0, 118, 192);
  @border: rgb(168, 185, 209);
  @tableSha: rgb(185, 184, 184);
  @in: rgb(14, 125, 195);
  @inBc: rgb(220, 238, 249);
  @color: rgb(49, 49, 49);
  @tdBorder: rgb(225, 226, 227);
  @trHover: rgb(255, 245, 231);
  @trIn: rgb(255, 236, 210);
  @interleave:rgb(246,248,250);
  @fliterBorder:rgb(212,212,212);
  html {
    min-width: 1350px;
    background:linear-gradient(to bottom,#f0f0f0,#ffffff);
    min-height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    /*overflow-x: hidden;*/
    body {
      background: url("../static/img/html-bc.png");
      /*background:linear-gradient(to bottom,#e9e9e9,#fafafa);*/
      min-height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
      font-family: "AdobeHeitiStd";
      background-size: 100% 100%;
      #app {
        min-height: 100%;
        /*自定义class*/
        .span-a{
          color: #337ab7;
          cursor: pointer;
          &:hover{
            text-decoration: underline;
            color: #23527c;
          }
        }
        .break-all{
          word-break: break-all;
        }
        .po {
          cursor: pointer;
        }
        .inline {
          display: inline-block;
        }
        .block {
          display: block;
        }
        .fr{
          float: right;
        }
        .fl{
          float: left;
        }
        .center{
          text-align: center;
        }
        a {
          text-decoration: none;
        }
        .common-a{
          &:hover{
            text-decoration: underline;
          }
        }
        .bold{
          font-weight: bold;
        }
        ul {
          li {
            list-style: none;
          }
        }
        .rea{
          position: relative;
        }
        input,textarea{
          border: 1px solid #d4d4d4;
          border-radius: 3px;
          padding: 1px 8px;
        }
        select::-ms-expand { display: none; }
        .my-select{
          border: 1px solid #d4d4d4;
          border-radius: 3px;
          height: 24px;
          line-height: 24px;
          padding-left: 5px;
          padding-right: 24px;
          appearance:none;
          -moz-appearance:none;
          -webkit-appearance:none;
          -ms-appearance:none;
          background: url(../static/img/select-right.png) no-repeat scroll right center transparent;
        }

        .my-btn{
          display: inline-block;
          width: 95px;
          height: 28px;
          line-height: 28px;
          border-radius: 3px;
          border: 1px solid #df3a24;
          text-align: center;
          color: #fff;
          background:linear-gradient(to bottom,#f46554,#ea533f);
          cursor: pointer;
          img{
            margin: -3px 5px 0 0;
          }
          &:active{
            background:linear-gradient(to bottom,#ea533f,#f46544);
          }
        }
        .upload-content{
          display: inline-block;
          width: 50%;
          padding: 0;
          .show-name{
            background-color: #fff;
            width: 78%;
            margin-right: -2%;
            padding-right: 2%;
            float: left;
            &:focus{
              outline: none;
            }
          }
          .text{
            cursor: pointer;
            border: 1px solid #d4d4d4;
            border-radius: 3px;
            display: inline-block;
            width: 24%;
            height: 24px;
            line-height: 24px;
            text-align: center;
            background-color: rgb(238,238,238);
          }
          .hide-input{
            display: none;
          }
        }

        .shadow{
          border: 1px solid @tableSha;
          border-radius: 5px;
          box-shadow: 0 0 10px 1px @tableSha;
        }
        .shadow-top{
          border-top: 5px solid rgb(0,118,192);
          border-radius: 5px;
          box-shadow: 0 0 10px 1px @tableSha;
        }
        .bc-fff{
          background-color: #fff;
        }
        /*表格样式*/
        table{
          tr.interleave{
            background-color: @interleave;
          }
        }
        table.my-table {
          margin-top: 15px;
          border: 1px solid @tableSha;
          border-radius: 5px;
          box-shadow: 0 0 10px 1px @tableSha;
          width: 100%;
          max-width: 100%;
          border-spacing: 0;
          border-collapse: separate;
          /*overflow: hidden;*/
          thead {
            background-color: rgb(230, 239, 245);
            overflow: hidden;
            tr {
              th {
                padding: 5px 0 5px 17px;
                border-bottom: 2px solid rgb(206, 219, 227);
              }
              th:first-child {
                border-top-left-radius: 5px;
              }
              th:last-child {
                border-top-right-radius: 5px;
              }
              th:not(:first-child) {
                border-left: 1px dashed @tdBorder;
              }
              th{
                .img1 {  //th上面显示的图
                  width: 29px;
                  height: 32px;
                  background: url(../static/img/th-2.png);
                  float: right;
                  margin-top: -6px;
                  margin-bottom: -6px;
                  cursor: pointer;
                  position: relative;
                  &:hover{
                    .hide-content{
                      display: block;
                    }
                  }
                  .hide-content{
                    position: absolute;
                    top: 32px;
                    display: none;
                    .img2{
                      cursor: pointer;
                      background-color: transparent;
                      z-index: 11;
                      margin-left: 6px;
                    }
                    ul{
                      margin: -5px 0 0 -30px;
                      border: 1px solid @tableSha;
                      box-shadow: 0 0 10px 1px @tableSha;
                      padding: 0;
                      z-index: 10;
                      background-color: #fff;
                      font-weight: normal;
                      cursor: pointer;
                      li{
                        padding: 5px 20px;
                        white-space:nowrap;
                        &:hover{
                          background-color: @trIn;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          tbody {
            cursor: pointer;
            font-size: 12px;
            tr {
              td {
                padding: 5px 8px 5px 17px;
              }
              td:not(:first-child) {
                border-left: 1px dashed @tdBorder;
              }
              &:hover {
                background-color: @trHover;
              }
            }
            tr.in {
              background-color: @trIn;
            }
            tr:not(:last-child) {
              td {
                border-bottom: 1px dashed @tdBorder;
              }
            }
          }
          table tr:first-child th:first-child {
            border-top-left-radius: 5px
          }
        }
        /*筛选框样式*/
        .filtrate-content{
          width: 290px;
          border: 1px solid @tableSha;
          border-radius: 5px;
          box-shadow: 0 0 10px 1px @tableSha;
          position: absolute;
          right: 0;
          top: 40px;
          padding: 14px 14px 20px 14px;
          background-color: #fff;
          z-index: 10;
          .up{
            position: absolute;
            right: 20px;
            top:-9px;
          }
          .title{
            padding-bottom: 9px;
            border-bottom: 1px solid @fliterBorder;
          }
          .content{
            padding-top: 6px;
            .left{
              float: left;
              width: 70px;
            }
            .right{
              float: left;
              width: 185px;
              input{
                border: 1px solid @fliterBorder;
                border-radius: 3px;
                width: 100%;
              }
            }
            .single{
              margin: 3px 0;
              min-height: 28px;
            }
          }
          .search-btn{
            margin-top: 20px;
            margin-left: 90px;
          }
        }
        /*页面共用样式*/
        .all-content {
          height: 100%;
          .under {
            border-top: 1px solid @border;
            min-height: calc(~'100vh - 58px');
            .under-left {
              float: left;
              width: 249px;
              min-height: calc(~'100vh - 58px');
              /*height: 100%;*/
              margin: 0;
              padding: 0;
              color: @color;
              background-color: #fff;
              li{
                cursor: pointer;
              }
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
                border-bottom: 1px solid #d3d4d4;
                border-top: 1px solid #fbfbfb;
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
                border-top: 1px solid #fbfbfb;
                border-bottom: 1px solid #d3d4d4;
                a {
                  height: 25px;
                  line-height: 25px;
                  color: inherit;
                  padding-left: 23px;
                }
                a.active,a:hover,.router-link-active,.router-link-active:hover {
                  color: @in;
                  background-color: @inBc;
                }
              }
            }
            .under-right {
              border-left: 1px solid rgb(211,212,212);
              display: inline-block;
              /*float: left;*/
              width: calc(~'100vw - 300px');
              min-width: 1100px;
              min-height: calc(~'100vh - 58px');
              padding-left: 30px;
              padding-top: 28px;
              padding-bottom: 50px;
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
