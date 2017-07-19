<!--头部-->
<template>
  <div class="header">
    <div class="pull-left logo">
      <img class="logo-img" src="../../../static/img/logo.png" alt="grandbox">
      <img class="pull-right" src="../../../static/img/header-2.png"/>
    </div>
    <ul id="pathUl">
      <li>
        <router-link to="/">
          <span class="img-analyze li-img"></span>
          <span>Analyze</span>
        </router-link>
        <img class="right-img" src="../../../static/img/header-2.png"/>
      </li>
      <li>
        <router-link to="/dataM/foo/grandE">
          <span class="img-dataManage li-img"></span>
          <span>数据管理</span>
        </router-link>
        <img class="right-img" src="../../../static/img/header-2.png"/>
      </li>
      <li>
        <router-link to="/dataA/foo/sgList">
          <span class="img-dataAnalysis li-img"></span>
          <span>数据分析</span>
        </router-link>
        <img class="right-img" src="../../../static/img/header-2.png"/>
      </li>
      <li>
        <router-link to="/taskM/foo/done">
          <span class="img-taskManage li-img"></span>
          <span>任务管理</span>
        </router-link>
        <img class="right-img" src="../../../static/img/header-2.png"/>
      </li>
    </ul>
    <div class="pull-right po" @click="out">
      <img src="../../../static/img/header-2.png"/>
      <img class="register-img" src="../../../static/img/header-8.png"/>
      <span class="register-span">注销</span>
    </div>
    <div class="pull-right po dropdown">
      <div class="dropdown-toggle name-content" aria-haspopup="true" aria-expanded="true" data-toggle="dropdown"
           id="hideContent">
        <img src="../../../static/img/header-2.png"/>
        <img class="register-img" src="../../../static/img/header-9.png"/>
        <span class="register-span">{{uname}}</span>
        <i class="triangle"></i>
      </div>
      <!--<ul class="dropdown-menu" aria-labelledby="hideContent">-->
      <!--<li><a href="#" @click.stop.prevent="out">退出登录</a></li>-->
      <!--</ul>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    data: function () {
      return {
        uname: ''
      }
    },
    mounted: function () {  //兼容刷新的时候
      let currentName = this.$router.currentRoute.name;
      const _ul = $("#pathUl");
      _ul.find('.active').removeClass('active');
      _ul.find('li').each(function () {
        const href = $(this).find("a").attr("href");
        currentName = currentName.includes('-') ? currentName.substring(0, currentName.indexOf('-')) : currentName;
        if (href.includes(currentName)) {
          $(this).addClass('active')
        }
      })
    },
    watch: {
      '$route' (to, from) {
        const currentPath = to.name;
      }
    },
    created: function () {
      this.uname = localStorage.uname;
      if (!localStorage.token) {
//        this.$router.push({path: '/login?next=' + this.$route.path})
      }
    },
    methods: {
      out: function () {
        if (confirm('确定要退出登录吗？')) {
          localStorage.removeItem('token');
          localStorage.removeItem('uname');
          this.$router.push({path: '/?next=' + this.$route.path})
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .header {
    min-width: 1300px;
    height: 50px;
    line-height: 50px;
    width: 100%;
    color: #fff;
    background: url('../../../static/img/header-bc.png') no-repeat center;
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

    > ul {
      margin: 0;
      li.active {
        background-color: #fff;
        border-bottom: 1px solid #fff;
        color: rgb(0, 118, 192);
        .img-dataAnalysis {
          background: url(../../../static/img/header-4-1.png) no-repeat center;
        }
        .img-taskManage {
          background-size: 28px 19px;
          background: url(../../../static/img/header-7-1.png) no-repeat center;
        }
        .img-dataManage{
          background-size: 21px 21px;
          background: url(../../../static/img/header-5-1.png) no-repeat center;
        }
      }
      li {
        float: left;
        text-align: center;
        width: 165px;
        cursor: pointer;
        position: relative;
        .right-img {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
        }
        a {
          color: inherit;
          width: 100%;
          height: 100%;
          display: inline-block;
        }
        .li-img {
          display: inline-block;
          margin-bottom: -5px;
          width: 28px;
          height: 21px;
          margin-right: 8px;
        }
        .img-analyze {
          background-size: 21px 20px;
          background: url(../../../static/img/header-4.png) no-repeat center;
        }
        .img-dataManage {
          background-size: 21px 21px;
          background: url(../../../static/img/header-5.png) no-repeat center;
        }
        .img-dataAnalysis {
          background-size: 22px 21px;
          background: url(../../../static/img/header-6.png) no-repeat center;
        }
        .img-taskManage {
          background-size: 28px 19px;
          background: url(../../../static/img/header-7.png) no-repeat center;
        }
      }
    }
    .name-content {
      padding-right: 20px;
      .triangle {
        float: right;
        width: 0;
        height: 0;
        border-top: 7px solid #fff;
        border-right: 8px solid transparent;
        border-left: 7px solid transparent;
        margin: 23px 10px 0 -10px;
      }
      .register-img {
        margin-left: 25px;
      }
    }

    .dropdown-menu {
      left: 0;
    }

    .register-img {
      margin: 0 5px 0 20px;
    }

    .register-span {
      margin-right: 20px;
    }

  }
</style>
