<template>
  <div class="all">
    <div class="header">
      <div class="pull-left logo">
        <img class="logo-img" src="../../static/img/logo.png" alt="grandbox">
        <img class="pull-right" src="../../static/img/header-2.png"/>
      </div>
      <div class="pull-left">
        <div class="font-content">
          <img class="cloud" src="../../static/img/header-1.png" alt="">
          <span class="header-font">On-boarding</span>
          <img src="../../static/img/header-2.png"/>
        </div>
      </div>
      <div class="pull-right po">
        <img src="../../static/img/header-2.png"/>
        <img class="register-img" src="../../static/img/header-3.png"/>
        <span class="register-span">登录</span>
      </div>
      <div class="pull-right po">
        <img src="../../static/img/header-2.png"/>
        <img class="register-img" src="../../static/img/header-3.png"/>
        <span class="register-span">注册</span>
      </div>
    </div>
    <div class="content">
      <div class="content-left pull-left">
        <ul>
          <li @click="clickLi" class="po li-analyze active">
            <i class="img-analyze"></i>
            <span>Analyze一分析解读平台</span>
            <i class="triangle"></i>
          </li>
          <li @click="clickLi" class="po li-manage">
            <i class="img-manage"></i>
            <span>Management一项目管理系统</span>
            <i class="triangle"></i>
          </li>
          <li @click="clickLi" class="po li-data">
            <i class="img-data"></i>
            <span>BioMedDB一医学大数据库</span>
            <i class="triangle"></i>
          </li>
        </ul>
      </div>
      <div class="content-right">
        <div class="row">
          <div class="col-md-10">
            <img class="login-logo" src="../../static/img/login-1.png" alt="">

            <div class="login-content">
              <label class="block">
                <p>用户名:</p>
                <input type="text" class="form-control">
              </label>
              <label class="block">
                <p>密码:</p>
                <input class="form-control" type="password">
              </label>
              <img class="login-img po" src="../../static/img/login-2.png" alt="">
            </div>

            <div class="alert">
              <i class="alert-img inline"></i>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      clickLi: function (event) {
        $(".content-left").find(".active").removeClass('active');
        $(event.target).closest('li').addClass('active')
      }
    }
  }
</script>
<style lang="less" scoped>
  @border: rgb(168, 185, 209);
  @in: rgb(14, 125, 195);
  @triangle-color: rgb(0, 118, 192);
  @font-color: rgb(21, 65, 65);
  .all {
    font-family: "AdobeHeitiStd";
    height: 100%;
    .header {
      height: 52px;
      line-height: 52px;
      width: 100%;
      color: #fff;
      background: url('../../static/img/header-bc.png') no-repeat center;
      background-size: 100%;
      border-bottom: 1px solid rgb(0, 77, 144);
      .logo {
        width: 251px;
        text-align: center;
      }
      .font-content {
        .cloud {
          margin: 0 6px 0 32px;
        }
        .header-font {
          margin-right: 28px;
        }
      }
      .register-img {
        margin: 0 5px 0 20px;
      }
      .register-span {
        margin-right: 20px;
      }
    }
    .content {
      border-top: 1px solid @border;
      height: calc(~'100vh - 52px');
      .content-left {
        width: 250px;
        height: 100%;
        border-right: 1px solid @border;
        ul {
          margin-left: -40px;
          .triangle {
            float: right;
            width: 0;
            height: 0;
            margin-top: 4px;
            border-top: 15px solid transparent;
            border-right: 18px solid @triangle-color;
            border-bottom: 15px solid transparent;
            display: none;
          }
          .active {
            .triangle {
              display: block;
            }
            border-right: 1px solid @triangle-color;
            color: @in;
          }
          li {
            list-style: none;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid @border;
            font-weight: bold;
            &:hover {
              color: @in;
            }
            .img-analyze {
              width: 18px;
              height: 18px;
              display: inline-block;
              background: url('../../static/img/all-1.png');
              margin: 0 4px -4px 11px;
            }
            .img-manage {
              width: 18px;
              height: 18px;
              display: inline-block;
              background: url('../../static/img/all-1.png') 0 450px;
              margin: 0 4px -4px 11px;
            }
            .img-data {
              width: 18px;
              height: 22px;
              display: inline-block;
              background: url('../../static/img/all-1.png') 0 425px;
              margin: 0 4px -4px 11px;
            }
          }
          .li-analyze {
            &:hover {
              .img-analyze {
                background-position-x: 18px;
              }
            }
          }
          .li-manage {
            &:hover {
              .img-manage {
                background-position-x: 18px;
              }
            }
          }
          .li-data {
            &:hover {
              .img-data {
                background-position-x: 18px;
              }
            }
          }
        }
      }
      .content-right {
        height: 100%;
        float: left;
        padding-left: 32px;
        width: calc(~'100vw - 267px');
        .login-logo {
          margin-top: 40px;
          width: 100%;
        }
        .login-content {
          color: @font-color;
          margin: 40px 0;
          .block{
            margin: 20px 0;
            input{
              width: 20vw;
            }
          }
          .login-img{
            margin-top: 10px;
          }
        }
        .alert{
          height: 137px;
          width: 100%;
          background-color: rgb(237,246,251);
          .alert-img{
              width: 15px;
            height: 15px;
            background: url('../../static/img/all-2.jpg') 0 15px;
          }
        }
      }
    }
  }
</style>
