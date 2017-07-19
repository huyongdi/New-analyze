<template>
  <nav class="navBar">
    <div class="content">
      <div class="navbar-header">
        <a class="navbar-brand " href="/">
          <span class="topNav-logo"></span>
        </a>
      </div>
      <div class="row">
        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 title-content">
          <p class="topNav-words navbar-left navbar-text">医学大数据分析平台<br><span class="eng">MEDICAL BIG DATA PLATFORM</span></p>
        </div>
        <div class="login-content dropdown">
          <span class="login-in dropdown-toggle" aria-haspopup="true" aria-expanded="true" data-toggle="dropdown" id="home_toLogin">
            <a :class="{'hide':this.uname}">登&nbsp;&nbsp;&nbsp;录</a>
            <a class="a-uname" :class="{'hide':!this.uname}">{{this.uname}}</a>
          </span>
          <ul class="dropdown-menu" aria-labelledby="home_toLogin">
            <li><a href="#" @click.stop.prevent="out">退出登录</a></li>
            <li><a href="" id="changeP">修改密码</a></li>
            <!--<li><a href="#" @click.stop.prevent="changePassword">修改密码</a></li>-->
            <!--<li role="separator" class="divider"></li>-->
          </ul>
        </div>
      </div>

      <div class="modal fade" tabindex="-1" role="dialog" id="change">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">修改密码</h4>
            </div>
            <div class="modal-body">
              <p>One fine body&hellip;</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->

    </div>
  </nav>
</template>
<script>
  export default {
    name: 'header',
    data: function () {
      return {
        uname: ''
      }
    },
    mounted:function () {
      $("#changeP").attr('href','/manage/updatePassword?prev='+location.href)
    },
    created: function () {
      this.uname = localStorage.uname;
      if (!localStorage.token) {
        this.$router.push({path: '/login?next='+this.$route.path})
      }
      $("#changeP").attr('href','/manage/updatePassword?prev='+location.href)
    },
    methods: {
      out: function () {
        if (confirm('确定要退出登录吗？')) {
          localStorage.removeItem('uname');
          localStorage.removeItem('token');
          this.$router.push({path: '/login?next='+this.$route.path})
        }
      },
      changePassword:function () {
        $("#change").modal("show");
      }
    }
  }
</script>

<style scoped lang="less">
  @baseColor:#2c7fd2;
  .a-uname{
    color: @baseColor;
  }
  .navBar {
    /*position: fixed;*/
    height: 60px;
    text-align: center;
    width: 100%;
    /*z-index: 1040; !*bootstrap的弹框是1050*!*/
    /*margin-left: -15px;*/
    /*overflow: hidden;*/
  }

  .topNav-logo {
    width: 207px;
    height: 40px;
    display: inline-block;
    background-size: 207px 40px;
    background: url(../../../static/img/logo-new.png) no-repeat center;
  }

  .navBar .navbar-header {
    margin: -5px 0 0 25px;
  }

  .topNav-words {
    color: #777;
    line-height: 15px;
    min-width: 184px;
  }

  .login-in {
    width: 75px;
    display: inline-block;
    text-align: center;
    line-height: 60px;
    color: #707070;
    border-top: 3px solid #e5e5e5;
    cursor: pointer;
  }

  .login-content:hover > .login-in{
    border-top: 3px solid @baseColor;
  }

  .login-content {
    float: right;
    margin-right: 200px;
  }

  .content {
    margin-left: 56px;
    background-color: #e5e5e5;
  }

  .login-content a {
    text-decoration: none;
  }

  .modal{
    text-align: left;
  }
  .dropdown-menu{
    z-index: 1004;
  }
  .title-content{
    text-align: left;
    .eng{
      font-size: 12px;
    }
  }
</style>




