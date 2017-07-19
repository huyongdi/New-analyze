<template>
  <div class="nav-content" :class="{'items-center':!inHome}" id="nav-content">
    <ul class="nav navbar-nav navbar-center">
      <li class="home-li children" @click="toHome"><!--:class="{'in':inHome}"-->
        <div class="content home">
          <i></i>
        </div>
        <div class="hideDiv hide">
          <router-link to="/">首&nbsp;&nbsp;&nbsp;页</router-link>
        </div>
      </li>

      <li class="manage-li" @click="showManage" title="管理系统">
        <div class="content manage">
          <i></i>
          <span class="triangle-top"></span>
          <span class="triangle-down"></span>
        </div>
      </li>
      <!--管理系统隐藏页面-->
      <li class="manage-person-li children">
        <div class="content manage-person">
          <i></i>
        </div>
        <div class="hideDiv hide">
          <a :href="manHtml+'person/company'">人员与部门</a>
        </div>
      </li>
      <li class="manage-sample-li children">
        <div class="content manage-sample">
          <i></i>
        </div>
        <div class="hideDiv hide">
          <a :href="manHtml+'sample/patient'">样本中心</a>
        </div>
      </li>
      <!--end-->

      <li class="analyze-li" :class="{'in bot':!inHome}" @click="showAnalyze" title="分析系统">
        <div class="content analyze">
          <i></i>
          <span class="triangle-top"></span>
          <span class="triangle-down"></span>
        </div>
      </li>
      <!--分析隐藏页面-->
      <li class="analyze-data-li children">
        <div class="content analyze-data">
          <i :class="{'inData':inData}" ></i>
        </div>
        <div class="hideDiv hide">
          <router-link to="/dataList" class="a-bot">数据列表</router-link>
          <router-link to="/captureArea" class="">捕获区域</router-link>
        </div>
      </li>
      <li class="analyze-analyze-li children">
        <div class="content analyze-analyze">
          <i :class="{'inAnalyze':inAnalyze}"></i>
        </div>
        <div class="hideDiv analyze-width hide">
          <!--<router-link v-for="(list,index) in allList" :class="{'a-bot':index!==allList.length-1,'hide':!list.href_vue}" :key="list.id"-->
                       <!--:title="list.comment" :to="list.href_vue">-->
            <!--{{list.name}}-->
          <!--</router-link>-->

          <router-link to="/sgList" class="a-bot">单基因遗传病检测</router-link>
          <router-link to="/gmList" class="a-bot">线粒体检测</router-link>
          <router-link to="/snvList" class="a-bot">SNV注释</router-link>
          <router-link to="/gwList">低深度全基因CNV检测</router-link>

        </div>
      </li>
      <li class="analyze-task-li children">
        <div class="content analyze-task">
          <i :class="{'inTask':inTask}"></i>
        </div>
        <div class="hideDiv hide">
          <router-link to="/task">任&nbsp;&nbsp;&nbsp;务</router-link>
        </div>
      </li>
      <!--end-->

      <li class="database-li" @click="showDatabase" title="数据库">
        <div class="content database">
          <i></i>
          <span class="triangle-top"></span>
          <span class="triangle-down"></span>
        </div>
      </li>
      <!--数据库隐藏页面-->
      <li class="database-gene-li children">
        <div class="content database-gene">
          <i></i>
        </div>
        <div class="hideDiv hide">
          <a :href="dbHtml+'#/gene'">基&nbsp;&nbsp;&nbsp;因</a>
        </div>
      </li>
      <li class="database-pro-li children">
        <div class="content database-pro">
          <i></i>
        </div>
        <div class="hideDiv hide">
          <a :href="dbHtml+'#/panel'">产&nbsp;&nbsp;&nbsp;品</a>
        </div>
      </li>
      <li class="database-hpo-li children">
        <div class="content database-hpo">
          <i></i>
        </div>
        <div class="hideDiv hide">
          <a class="a-bot" :href="dbHtml+'#/phenoType'">表型分析</a>
          <a target="_blank" href="http://chinahpo.org">中文HPO</a>
        </div>
      </li>
      <li class="database-mutate-li children">
        <div class="content database-mutate">
          <i></i>
        </div>
        <div class="hideDiv hide">
          <a :href="dbHtml+'#/mutate'">变&nbsp;&nbsp;&nbsp;异</a>
        </div>
      </li>
      <!--end-->
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'footer',
    data: function () {
      return {
        allList: [],
        list: {
          pipeline: [],
          software: [],
          tool: [],
        },
        inData: '',
        inAnalyze: '',
        inTask: '',
        inHome: '',
      }
    },
    mounted: function () {  //兼容刷新的时候
      const currentPath = this.$router.currentRoute.name;
      this.judgeIn(currentPath);
    },
    watch: {
      '$route' (to) {
        const currentPath = to.name;
        this.inData = '';
        this.inAnalyze = '';
        this.inTask = '';
        this.inHome = '';
        this.judgeIn(currentPath);
      }
    },
    created: function () {
      const _vue = this;
//      this.$axios({
//        method: "get",
//        url: 'application/app/',
//      }).then(function (resp) {
//
//        $.each(resp.data.results, function (i, data) {
//          if (data.code === 'grandmgd') { //单基因
//            data.href_vue = 'sgList'
//          } else if (data.code === 'grandmito') { //线粒体
//            data.href_vue = 'gmList'
//          } else if (data.code === 'grandwcnv') { //低深度
//            data.href_vue = 'gwList'
//          }else {
//            data.href_vue = ''
//          }
//          _vue.allList.push(data);
//        });
//      }).catch(function (error) {
//        _vue.catchFun(error);
//
//      });

      this.$axios({
        url: 'space/',
      }).then(function (resp) {
        if (resp.data.space >= 90) {
          alert('磁盘占用率已达到' + resp.data.space + '%，请及时清理')
        }
      });
    },
    methods: {
      showAnalyze: function () {
        const _fatherLi = $(".analyze-li");
        const _triangleContent = $('.analyze');
        const _top = _triangleContent.find('.triangle-top');
        const _down = _triangleContent.find('.triangle-down');
        if ($('.analyze-analyze-li').css('display') === 'list-item') {
          if (this.inHome) {
            _fatherLi.removeClass('in')
          }
          _fatherLi.removeClass('bot');
          _top.removeClass('opacity1').addClass('opacity0');
          _down.removeClass('opacity0').addClass('opacity1');
          $(".analyze-analyze-li").slideToggle();
          $(".analyze-data-li").slideToggle();
          $(".analyze-task-li").slideToggle();
        } else {
          _fatherLi.addClass('in').addClass('bot');
          _top.removeClass('opacity0').addClass('opacity1');
          _down.removeClass('opacity1').addClass('opacity0');
          $(".analyze-analyze-li").slideToggle();
          $(".analyze-data-li").slideToggle();
          $(".analyze-task-li").slideToggle();
        }
      },
      showDatabase: function () {
        const _fatherLi = $(".database-li");
        const _triangleContent = $('.database');
        const _top = _triangleContent.find('.triangle-top');
        const _down = _triangleContent.find('.triangle-down');
        if ($('.database-gene-li').css('display') === 'list-item') {
          _fatherLi.removeClass('in').removeClass('bot');
          _top.removeClass('opacity1').addClass('opacity0');
          _down.removeClass('opacity0').addClass('opacity1');
          $('.database-gene-li').slideToggle();
          $(".database-pro-li").slideToggle();
          $(".database-hpo-li").slideToggle();
          $(".database-mutate-li").slideToggle();
        } else {
          _fatherLi.addClass('in').addClass('bot');
          _top.removeClass('opacity0').addClass('opacity1');
          _down.removeClass('opacity1').addClass('opacity0');
          $('.database-gene-li').slideToggle();
          $(".database-pro-li").slideToggle();
          $(".database-hpo-li").slideToggle();
          $(".database-mutate-li").slideToggle();
        }
      },
      showManage:function () {
        const _fatherLi = $(".manage-li");
        const _triangleContent = $('.manage');
        const _top = _triangleContent.find('.triangle-top');
        const _down = _triangleContent.find('.triangle-down');
        if ($('.manage-person-li').css('display') === 'list-item') {
          _fatherLi.removeClass('in').removeClass('bot');
          _top.removeClass('opacity1').addClass('opacity0');
          _down.removeClass('opacity0').addClass('opacity1');
          $('.manage-person-li').slideToggle();
          $(".manage-sample-li").slideToggle();
        } else {
          _fatherLi.addClass('in').addClass('bot');
          _top.removeClass('opacity0').addClass('opacity1');
          _down.removeClass('opacity1').addClass('opacity0');
          $('.manage-person-li').slideToggle();
          $(".manage-sample-li").slideToggle();
        }
      },
      toHome: function () {
        this.$router.push({path: '/'})
      },
      judgeIn: function (currentPath) {
        if (currentPath.includes('capture') || currentPath.includes('dataList')) {
          this.inData = true
        } else if (currentPath.includes('sg') || currentPath.includes('gm') || currentPath.includes('get')) {
          this.inAnalyze = true
        } else if (currentPath.includes('task')) {
          this.inTask = true
        } else if (currentPath.includes('home')) {
          this.inHome = true
        }
      }
    }
  }
</script>

<style scoped lang="less">
  /*修改的样式20170620*/
  @bcColor: rgb(44, 127, 210);
  @topColor: rgb(1, 98, 167);
  @boColor: rgb(70, 157, 245);
  .inAndHover {
    background-color: #fff;
    .home {
      i {
        background: url(../../../static/img/left-all.png) -2px 0;
        width: 30px;
        height: 29px;
        margin-top: 12px;
      }
    }
    .analyze {
      i {
        background: url(../../../static/img/left-all.png) -2px -55px;
        width: 33px;
        height: 33px;
        margin-top: 10px;
      }
    }
    .database {
      i {
        background: url(../../../static/img/left-all.png) -2px -295px;
        width: 31px;
        height: 33px;
        margin-top: 10px;
      }
    }
    .manage {
      border-bottom: 1px solid @topColor;
      i {
        background: url(../../../static/img/manage-1.png) no-repeat center;
        width: 27px;
        height: 32px;
        margin-top: 10px;
      }
    }
    /*隐藏页面*/
    .analyze-data {
      i,i.inData {
        background: url(../../../static/img/left-all.png) -2px -113px;
        width: 30px;
        height: 38px;
        margin-top: 8px;
      }
    }
    .analyze-analyze {
      i,i.inAnalyze {
        background: url(../../../static/img/left-all.png) -2px -175px;
        width: 30px;
        height: 33px;
        margin-top: 10px;
      }
    }
    .analyze-task {
      i,i.inTask {
        background: url(../../../static/img/left-all.png) -2px -233px;
        width: 30px;
        height: 33px;
        margin-top: 10px;
      }
    }
    .database-gene {
      i {
        background: url(../../../static/img/left-all.png) -2px -350px;
        width: 32px;
        height: 33px;
        margin-top: 10px;
      }
    }
    .database-pro {
      i {
        background: url(../../../static/img/left-all.png) -2px -410px;
        width: 31px;
        height: 33px;
        margin-top: 10px;
      }
    }
    .database-hpo {
      i {
        background: url(../../../static/img/left-all.png) -2px -475px;
        width: 30px;
        height: 33px;
        margin-top: 13px;
      }
    }
    .database-mutate {
      i {
        background: url(../../../static/img/left-all.png) -2px -520px;
        width: 32px;
        height: 40px;
      }
    }
    .manage-person{
      i{
        margin-top: 13px;
        background: url(../../../static/img/manage-2-1.png) no-repeat center;
        width: 25px;
        height: 25px;
      }
    }
    .manage-sample{
      i{
        margin-top: 13px;
        background: url(../../../static/img/manage-3-1.png) no-repeat center;
        width: 25px;
        height: 25px;
      }
    }
  }

  #nav-content.items-center {
    align-items: flex-start;
    padding-top: 63px;
  }

  #nav-content {
    background-color: @bcColor;
    z-index: 100;
    width: 56px;
    height: 100%;
    margin-top: -60px;
    position: fixed;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    ul {
      width: 100%;
      .opacity0 {
        opacity: 0;
      }
      .opacity1 {
        opacity: 1;
      }
      .manage-person-li,.manage-sample-li,
      .analyze-data-li, .analyze-analyze-li, .analyze-task-li,
      .database-hpo-li, .database-gene-li, .database-pro-li, .database-mutate-li {
        display: none;
      }
      .children {
        position: relative;
        .analyze-width.hideDiv {
          a {
            width: 150px
          }
        }
        .hideDiv {
          position: absolute;
          z-index: 100;
          top: 0;
          left: 56px;
          border-right: 1px solid #d3d3d3;
          border-top: 1px solid #d3d3d3;
          border-bottom: 1px solid #d3d3d3;
          background-color: #fff;
          a {
            display: block;
            width: 100px;
            margin: 0 15px;
            height: 52px;
            line-height: 52px;
            &:hover{
              color: @bcColor;
            }
          }
          .a-bot {
            border-bottom: 1px dashed #d3d3d3;
          }
        }
      }
      .children:hover {
        .hideDiv {
          display: block !important;
        }
      }
      .bot {
        margin-bottom: -2px;
      }
      .in {
        .inAndHover;
      }
      li:hover {
        .inAndHover
      }
      li {
        cursor: pointer;
        width: 56px;
        height: 54px;
        vertical-align: middle;
        border-top: 1px solid @topColor;
        .content {
          border-top: 1px solid @boColor;
          height: 100%;
        }
        i {
          width: 100%;
          height: 100%;
          display: inline-block;
        }
        .home {
          i {
            background: url(../../../static/img/left-all.png) 138px 0;
            width: 30px;
            height: 29px;
            margin-top: 12px;
          }
        }
        .analyze {
          i {
            background: url(../../../static/img/left-all.png) 138px -55px;
            width: 33px;
            height: 33px;
            margin-top: 10px;
          }
        }

        .database {
          border-bottom: 1px solid @topColor;
          i {
            background: url(../../../static/img/left-all.png) 138px -295px;
            width: 31px;
            height: 33px;
            margin-top: 10px;
          }
        }

        .manage {
          border-bottom: 1px solid @topColor;
          i {
            background: url(../../../static/img/manage-1-1.png) no-repeat center;
            width: 27px;
            height: 32px;
            margin-top: 10px;
          }
        }

        /*隐藏页面*/
        .analyze-data {
          i {
            background: url(../../../static/img/left-all.png) 138px -113px;
            width: 30px;
            height: 38px;
            margin-top: 8px;
          }
          i.inData{
            background: url(../../../static/img/left-all.png) 34px -113px;
            width: 35px;
            height: 38px;
            margin-top: 7px;
          }
        }
        .analyze-analyze {
          i {
            background: url(../../../static/img/left-all.png) 138px -175px;
            width: 30px;
            height: 33px;
            margin-top: 10px;
          }
          i.inAnalyze {
            background: url(../../../static/img/left-all.png) 34px -175px;
            width: 35px;
            height: 33px;
            margin-top: 9px;
          }
        }
        .analyze-task {
          i {
            background: url(../../../static/img/left-all.png) 138px -233px;
            width: 30px;
            height: 33px;
            margin-top: 10px;
          }
          i.inTask {
            background: url(../../../static/img/left-all.png) 34px -233px;
            width: 35px;
            height: 33px;
            margin-top: 9px;
          }
        }
        .database-gene {
          i {
            background: url(../../../static/img/left-all.png) 138px -350px;
            width: 32px;
            height: 33px;
            margin-top: 10px;
          }
        }
        .database-pro {
          i {
            background: url(../../../static/img/left-all.png) 138px -410px;
            width: 31px;
            height: 33px;
            margin-top: 10px;
          }
        }
        .database-hpo {
          i {
            background: url(../../../static/img/left-all.png) 138px -475px;
            width: 30px;
            height: 33px;
            margin-top: 13px;
          }
        }
        .database-mutate {
          border-bottom: 1px solid @topColor;
          i {
            background: url(../../../static/img/left-all.png) 138px -520px;
            width: 32px;
            height: 40px;
          }
        }
        .manage-person{
          i{
            margin-top: 13px;
            background: url(../../../static/img/manage-2.png) no-repeat center;
            width: 25px;
            height: 25px;
          }
        }
        .manage-sample{
          i{
            margin-top: 13px;
            background: url(../../../static/img/manage-3.png) no-repeat center;
            width: 25px;
            height: 25px;
          }
        }

      }
      .database-li {
        border-bottom: 1px solid @boColor;
      }
      .database-mutate-li {
        border-bottom: 1px solid @boColor;
      }
    }
    .triangle-down {
      position: absolute;
      width: 0;
      height: 0;
      bottom: -8px;
      left: 20px;
      border-top: 8px solid @boColor;
      border-right: 8px solid transparent;
      border-left: 8px solid transparent;
    }
    .triangle-top {
      position: absolute;
      width: 0;
      height: 0;
      bottom: 0;
      left: 20px;
      border-bottom: 8px solid @topColor;
      border-right: 8px solid transparent;
      border-left: 8px solid transparent;
      opacity: 0;
    }
  }

  .nav a, .nav a:link, .nav a:visited, .nav a:hover, .nav a:active {
    text-decoration: none;
    color: inherit;
  }

</style>
