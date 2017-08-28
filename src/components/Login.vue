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
      <div class="pull-right po" @click="login" >
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
      <div class="content-left pull-left bc-fff">
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
                <input type="text" class="form-control" v-model="inputName">
              </label>
              <label class="block">
                <p>密码:</p>
                <input @keyup.enter="login" class="form-control" type="password" v-model="inputPassword">
              </label>
              <!--<img @click="login" class="my-btn login-img po" src="../../static/img/login-2.png" alt="">-->
              <span class="my-btn" @click="login"><img src="../../static/img/red-login.png" alt="">登录</span>
            </div>

            <div class="alert">
              <i class="alert-img inline"></i>
              <span class="alert-title">公告</span>
              <div class="alert-content">
                <span class="block">
                  grandbox为向您提供分析解读平台（Analyze）、项目管理系统（Management）、医学大数据库（BioMedDB）等可选择系统模块。若您选择grandbox
                  系统网站上提供的服务，都是您自行做出的选择，同时表明您完全同意本免责声明的全部内容。
                </span>
                <span class="block">
                  grandbox系统网站上提供的信息均为严格保密，用户将个人密码告诉他人或与他人共享注册账户，由此导致的任何个人资料泄露，grandbox不承担由此
                  引起的任何损失和责任。
                </span>
                <span class="block">
                  本免责声明的最终解释权归北京希望组生物科技有限公司所有，且希望组生物科技有限公司有权在不通知您的情况下更新本免责声明，并只需在grandbox
                  网站上发布即生效。
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        this.loginAxios({
          url: 'user/login/',
          method: 'post',
          data: {
            username: this.inputName,
            password: this.inputPassword
          }
        }).then(function (resp) {
          localStorage.token = resp.data.data.token;
          localStorage.uname = resp.data.data.personnel;
          const nextPath = _vue.$route.query.next?_vue.$route.query.next:'/home';
          _vue.$router.push({path: nextPath})
        }).catch(function (error) {
          _vue.catchFun(error);
        });
      },
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
    height: 100%;
      min-width: 1300px;
    .header {
      height: 50px;
      line-height: 50px;
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
        border-left: 1px solid @border;
        float: left;
        min-height: 100%;
        padding-left: 32px;
        width: calc(~'100vw - 285px');
        min-width: 1050px;
        .login-logo {
          margin-top: 40px;
          width: 100%;
        }
        .login-content {
          color: @font-color;
          margin: 5vh 0 7vh 0;
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
          width: 100%;
          padding: 25px 20px;
          background-color: rgb(237,246,251);
          .alert-img{
            width: 15px;
            height: 15px;
            background: url('../../static/img/all-2.png') 0 15px;
          }
          .alert-title{
            color: rgb( 21, 65, 65 );
            font-weight: bold;
          }
          .alert-content{
            color: rgb( 49, 49, 49 );
            font-weight: bold;
            margin-top: 12px;
          }
        }
      }
    }
  }
</style>
