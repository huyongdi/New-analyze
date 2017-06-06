<template>
  <div class="all">
    <div class="header">
      <div class="pull-left logo">
        <img class="logo-img" src="../../static/img/logo.png" alt="grandbox">
        <img src="../../static/img/header-2.png"/>
      </div>
      <div class="pull-left">
        <div class="font-content">
          <img class="cloud" src="../../static/img/header-1.png" alt="">
          <span class="header-font">On-boarding</span>
          <img src="../../static/img/header-2.png"/>
        </div>
      </div>
      <div class="pull-right">
        <img src="../../static/img/header-2.png"/>
        <img class="register-img" src="../../static/img/header-3.png"/>
        <span class="register-span">登录</span>
      </div>
      <div class="pull-right">
        <img src="../../static/img/header-2.png"/>
        <img class="register-img" src="../../static/img/header-3.png"/>
        <span class="register-span">注册</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  .all {
    .header {
      height: 52px;
      line-height: 52px;
      width: 100%;
      font-family: "AdobeHeitiStd";
      color: #fff;
      background: url('../../static/img/header-bc.png') no-repeat center;
      background-size: 100%;
      border-bottom: 1px solid rgb(0, 77, 144);
      .logo {
        text-align: center;
        .logo-img {
          margin: 0 16px 0 26px;
        }
      }
      .font-content {
        .cloud {
          margin: 0 6px 0 32px;
        }
        .header-font {
          margin-right: 28px;
        }
      }
      .register-img{
        margin: 0 5px 0 20px;
      }
      .register-span{
        margin-right: 20px;
      }
    }
  }
</style>
