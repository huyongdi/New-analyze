<template>
  <div class="login-all">
    <div class="header-content">
      <span class="login-logo">
        <img class="logo" src="../../static/img/login-logo-1.png" alt="">
        <span class="title">医学大数据分析平台</span>
      </span>
    </div>
    <div class="login-content">
      <div class="name">
        账号 <input type="text" class="form-control" v-model="inputName">
      </div>
      <div class="password">
        密码 <input type="password" class="form-control" v-model="inputPassword" @keyup.enter="login">
      </div>
    </div>

    <button class="btn" @click="login">登&nbsp;&nbsp;&nbsp;录</button>

    <!--底部内容-->
    <div class="footer">
      <span class="content-1">版权所有：北京希望组生物科技有限公司</span>
      <img class="content-2" src="../../static/img/home-footer-logo.png">
      <span class="content-3">联系我们：网址：www.grandomics.com&nbsp;&nbsp;|&nbsp;&nbsp;电话：010-57746524&nbsp;&nbsp;|&nbsp;&nbsp;邮箱：support@grandomics.com</span>
    </div>

  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        inputName: '',
        inputPassword: ''
      }
    },
    created: function () {
      if (localStorage.token) {
        this.$router.push({path: '/'})
      }
    },
    methods: {
      login: function () {
        const _vue = this;
        this.instance({
          url: 'user/login/',
          method: 'post',
          data: {
            username: $.trim(this.inputName),
            password: $.trim(this.inputPassword)
          }
        }).then(function (resp) {
          localStorage.token = resp.data.data.token;
          localStorage.uname = resp.data.data.personnel;
          const nextPath = _vue.$route.query.next && _vue.$route.query.next !='/login'? _vue.$route.query.next : '/';
          _vue.$router.push({path: nextPath})
        }).catch(function (error) {
          _vue.catchFun(error);
        });
      }
    }
  }
</script>
<style lang="less" scoped>
  .footer{
    width: 100%;
    position: fixed;
    /*position: relative;*/
    height: 60px;
    background-color: #e5e5e5;
    /*bottom: -30px;*/
    bottom: 0;
    padding-left: 56px;
    line-height: 60px;
    text-align: center;
    font-size: 12px;
    .content-2{
      margin: -2px 25px 0 10px;
    }
  }
  .login-all {
    background-color: #fff;
    height: 100%;
    button{
      display: block;
      width: 200px;
      margin: 80px auto;
      background-color: rgb(44,127,210);
      color: #fff;
    }
    .login-content{
      text-align: center;
      .name{
        margin-top: 10vh;
        input{
          margin-left: 20px;
          width: 300px;
          display: inline-block;
        }
      }
      .password{
        margin-top: 40px;
        input{
          margin-left: 20px;
          width: 300px;
          display: inline-block;
        }
      }
    }
    .header-content {
      height: 280px;
      text-align: center;
      .login-logo {
        display: inline-block;
        width: 100%;
        height: 100%;
        background: url(../../static/img/login-header.png) no-repeat center;
        background-size: 100% 100%;
        .logo {
          margin-top: 75px;
        }
        .title{
          font-size: 24px;
          color: rgb( 190, 236, 255 );
          margin-top: 20px;
          display: block;
        }
      }
    }
  }
</style>
