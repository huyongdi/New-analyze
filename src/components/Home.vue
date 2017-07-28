<template>
  <div id="home-content" class="right-content ">
    <div class="base-section">
      <span class="base-section-title">构建安全、稳定的基因大数据分析管理系统</span>
    </div>
    <div class="middle-content" id="middle-content">
      <!--   <div id="home-new">

           <div id="left-content-1" class="content-1">
             <div class="left">
               <div class="first">
                 <div class="title">Grandbox平台</div>
                 <div class="f12">是医学数据分析的操作系统，构建核心应用，整合精准内容，形成医学大数据。提供数据一体化、云端一体化、云服务一体化的数据分析管理产品。</div>
               </div>
               <div class="two">
                 <div class="two-single">
                   <div class="two-left">
                     <img src="../../static/img/homeNwe-11.png" alt="">
                   </div>
                   <div class="two-right">
                     <div class="two-right-title">
                       管理系统
                     </div>
                     <div class="two-right-content f12">
                       可视化分析测序数据，同步分析流程，监控分析数据，提高检测验证、样本生物分析和结果报告的效率。
                     </div>
                   </div>
                 </div>
                 <div class="two-single two-single-two">
                   <div class="two-left">
                     <img src="../../static/img/homeNew-12.png" alt="">
                   </div>
                   <div class="two-right">
                     <div class="two-right-title">
                       分析平台
                     </div>
                     <div class="two-right-content f12">
                       提供方便且高效的数据管理方法，个性化的实时样本管理，简化日常工作流程，更加有效的管理和捕获数据并进行沟通。根据最新信息制定决策。
                     </div>
                   </div>
                 </div>
                 <div class="two-single two-single-three">
                   <div class="two-left">
                     <img src="../../static/img/homeNew-13.png" alt="">
                   </div>
                   <div class="two-right">
                     <div class="two-right-title">
                       医学大数据库
                     </div>
                     <div class="two-right-content f12">
                       构建私有医学数据库，可以对不同数据源进行转化与合并，帮助将海量的企业数据转化为及时、有效的业务决策
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             <div class="right">
               <img src="../../static/img/homeNew-5.png" alt="">
             </div>
           </div>

           <div class="content-common" id="common-1" @click="toPage(1)">
             <div class="left">
               <div class="first">
                管理系统
               </div>
               <div class="two">
                 <div class="two-title">人员管理</div>
                 <img src="../../static/img/homeNew-4.png" alt="">
                 <div class="two-title">组织机构管理</div>
                 <img src="../../static/img/homeNew-4.png" alt="">
                 <div class="two-title">样本管理</div>
               </div>
             </div>
             <div class="right">
               <img src="../../static/img/homeNew-5.png" alt="">
             </div>
           </div>

           <div class="content-common" id="common-2" @click="toPage(2)">
             <div class="left">
               <div class="first">
                 分析平台
               </div>
               <div class="two">
                 <div class="two-title">数据分析</div>
                 <img src="../../static/img/homeNew-6.png" alt="">
                 <div class="two-title">检测平台</div>
                 <img src="../../static/img/homeNew-6.png" alt="">
                 <div class="two-title">分析任务</div>
               </div>
             </div>
             <div class="right">
               <img src="../../static/img/homeNew-5.png" alt="">
             </div>
           </div>
           <div class="content-common" id="common-3" @click="toPage(3)">
             <div class="left">
               <div class="first">
                 医学大数据库
               </div>
               <div class="two">
                 <div class="two-title">基因数据</div>
                 <img src="../../static/img/homeNew-7.png" alt="">
                 <div class="two-title">产品数据</div>
                 <img src="../../static/img/homeNew-7.png" alt="">
                 <div class="two-title">表型、变异查找</div>
               </div>
             </div>
           </div>
         </div>-->

      <div class="title">
        <div class="title-one">Grandbox 平台</div>
        <div class="title-two">是医学数据分析的操作系统，构建核心应用，整合精准内容，形成医学大数据。提供数据一体化、云端一体化、云服务一体化的数据分析管理产品。</div>
      </div>

      <div class="content">
        <div class="content-1" @click="toPage(1)">
          <img src="../../static/img/home-32.jpg" alt="">
          <span class="content-title">管理系统</span>
          <span class="content-content">提供方便且高效的数据管理方法，个性化的实时样本管理，简化日常工作流程，更加有效的管理和捕获数据并改进沟通。根据最新信息制定决策。</span>
        </div>
        <div class="content-1" @click="toPage(2)">
          <img src="../../static/img/home-33.jpg" alt="">
          <span class="content-title">分析平台</span>
          <span class="content-content">可视化分析测序数据，同步分析流程，监控分析数据，提高检测验证、样本生物分析和结果报告的效率。</span>
        </div>
        <div class="content-1" @click="toPage(3)">
          <img src="../../static/img/home-31.png" alt="">
          <span class="content-title">医学大数据库</span>
          <span class="content-content">提供方便且高效的数据管理方法，个性化的实时样本管理，简化日常工作流程，更加有效的管理和捕获数据并改进沟通。根据最新信息制定决策。</span>
        </div>
      </div>

    </div>


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
    name: 'home',
    created: function () {
      if (!localStorage.token) {
        this.$router.push({path: '/login?next=' + this.$route.path})
      }
    },
    methods: {
      alert: function () {
        alert('请查看左侧导航')
      },
      alertReport: function () {
        alert('请在样本分析结果中查看报告')
      },
      toPage: function (type) {
        if (type == 1) {
          window.location.href = this.manHtml + 'sample/patient'
        } else if (type == 2) {
          window.location.href = this.anaHtml + '#/dataList'
        } else if (type == 3) {
          window.location.href = this.dbHtml + '#/gene'
        }
      },
      getMargin: function () {
        const _width = $("#home-new").width();
        console.log(_width)
        const _left = $("#left-content-1");
        const _right3 = $("#common-3");
        const _right2 = $("#common-2");
        const _right1 = $("#common-1");
        if (_width > 1440) {
          _left.css("marginLeft", (_width - 1440) / 2 + 10);
          _right3.css("marginLeft", 0);
          _right2.css("marginLeft", 0);
          _right1.css("marginLeft", 0);
        } else if (_width < 1440 && _width > 1155) {
          _left.css("marginLeft", (_width - 1155) / 4);
          _right3.css("marginLeft", (_width - 1155) / 4);
          _right2.css("marginLeft", 0);
          _right1.css("marginLeft", 0);
        } else if (_width < 1155 && _width > 790) {
          _left.css("marginLeft", (_width - 790) / 4);
          _right2.css("marginLeft", (_width - 790) / 4);
          _right3.css("marginLeft", 0);
          _right1.css("marginLeft", 0);
        } else {
          _left.css("marginLeft", (790 - _width) / 2);
          _right1.css("marginLeft", (790 - _width) / 2);
          _right2.css("marginLeft", (790 - _width) / 2);
          _right3.css("marginLeft", (790 - _width) / 2);
        }
      }
    },
    mounted: function () {
      this.getMargin();
      const _vue = this;
      $(window).resize(function () {
        _vue.getMargin();
      });
    }
  }
</script>

<style scoped lang="less">

  .middle-content#middle-content {
    .title {
      width: 42vw;
      margin: 60px auto 80px;
      .title-one {
        font-size: 24px;
        color: rgb(42, 127, 210);
        text-align: center;
      }
      .title-two {
        margin-top: 10px;
        font-size: 12px;
        color: rgb(137, 137, 137);
      }
    }
    .content {
      width: 68vw;
      margin: 0 auto;
      .content-1:not(:last-child){
        margin-right: 7.6vw;
      }
      .content-1 {
        &:hover{
          border: 1px dashed #2c7fd2;
        }
        cursor: pointer;
        vertical-align: top;
        display: inline-block;
        width: 17vw;
        position: relative;
        border: 1px dashed rgb(181, 182, 182);
        text-align: center;
        padding: 0 30px;
        img {
          margin-top: 40px;
        }
        .content-title {
          display: block;
          font-size: 16px;
          color: rgb(67, 67, 67);
          margin: 20px 0;
        }
        .content-content {
          display: block;
          text-align: left;
          font-size: 12px;
          color: rgb(125, 125, 125);
          margin-bottom: 30px;
        }
      }
    }
  }

  /*中间样式20170727*/
  #home-new {
    overflow: hidden;
    > div {
      float: left;
      height: 516px;
      margin-top: 80px;
      .left, .right {
        float: left;
      }
      .right {
        text-align: center;
        height: 516px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 88px;
      }
    }
    .f12 {
      font-size: 12px;
    }
    #common-1 {
      .left {
        .first {
          background: rgb(217, 225, 244);
          border: 1px solid rgb(197, 210, 237);
        }
        .two {
          border-left: 1px dashed rgb(189, 206, 242);
          border-right: 1px dashed rgb(189, 206, 242);
          border-bottom: 1px dashed rgb(189, 206, 242);
          .two-title {
            background: rgb(236, 240, 249);
            border: 1px solid rgb(197, 210, 237);
          }
        }
      }
    }
    #common-2 {
      .left {
        .first {
          background: rgb(242, 229, 254);
          border: 1px solid rgb(220, 206, 228);
        }
        .two {
          border-left: 1px dashed rgb(179, 190, 239);
          border-right: 1px dashed rgb(179, 190, 239);
          border-bottom: 1px dashed rgb(179, 190, 239);
          .two-title {
            background: rgb(245, 239, 250);
            border: 1px solid rgb(238, 227, 245);
          }
        }
      }
    }
    #common-3 {
      width: 280px;
      .left {
        .first {
          background: rgb(213, 244, 247);
          border: 1px solid #bce9ed; /*待定*/
        }
        .two {
          border-left: 1px dashed rgb(176, 223, 245);
          border-right: 1px dashed rgb(176, 223, 245);
          border-bottom: 1px dashed rgb(176, 223, 245);
          .two-title {
            background: rgb(241, 253, 254);
            border: 1px solid rgb(219, 238, 240);
          }
        }
      }
    }
    .content-common {
      cursor: pointer;
      width: 370px;
      &:hover {
        height: 519px;
      }
      .left {
        &:hover {
          border-top: 3px solid #fff;
          height: 519px;
        }
        width: 280px;
        .first {
          width: 275px;
          font-size: 18px;
          color: rgb(98, 98, 98);
          height: 89px;
          text-align: center;
          line-height: 89px;
        }
        .two {
          height: 425px;
          width: 275px;
          text-align: center;
          padding: 45px 40px 0;
          img {
            margin: 25px 0;
          }
          .two-title {
            height: 45px;
            line-height: 45px;
            color: rgb(112, 112, 112);
          }
        }
      }
    }
    #left-content-1 {
      width: 404px;
      margin-left: 5px;
      .left {
        width: 311px;
        .first {
          background: rgb(44, 127, 210);
          color: #fff;
          height: 136px;
          padding: 33px 16px 0 16px;
          .title {
            margin-bottom: 8px;
          }
        }
        .two {
          height: 380px;
          border-left: 1px solid rgb(179, 217, 255);
          border-right: 1px solid rgb(179, 217, 255);
          border-bottom: 1px solid rgb(179, 217, 255);
          padding-top: 28px;
          .two-single {
            height: 90px;
            margin: 0 22px;
            .two-left {
              float: left;
              width: 47px;
            }
            .two-right {
              float: left;
              width: 206px;
              margin-left: 12px;
              .two-right-title {
                color: rgb(83, 83, 83);
              }
              .f12 {
                color: rgb(125, 125, 125);
              }
            }
          }
          .two-single-two {
            margin-top: 15px;
          }
          .two-single-three {
            margin-top: 32px;
          }

        }
      }
    }
  }

  /*底部样式*/

  #home-content {
    background-color: #fff;
  }

  .footer {
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
    .content-2 {
      margin: -2px 25px 0 10px;
    }
  }

  .full-60 {
    height: 60px;
    background-color: #fff;
  }

  /*底部样式--end*/
  .middle-content {
    background-color: #fff;
    /*margin-bottom: 60px;*/
    /*min-height: calc(~'100vh - 280px');*/
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
  }

  #home-content.right-content {
    position: relative;
    height: 100%;
  }

  html body #app .right-content {
    padding: 0 0 0 56px;
    margin: 0;
  }

  .homeContent-li {
    height: 210px;
    display: block;
    padding: 4px;
    line-height: 1.42857143;
    text-align: center;
    margin: 80px 0 30px 0;
    border: 1px solid transparent;
    -webkit-transition: border .2s ease-in-out;
    -o-transition: border .2s ease-in-out;
    transition: border .2s ease-in-out;
  }

  .homeContent-li:hover {
    border: 3px solid #fff;
  }

  .middle-content-img {
    width: 140px;
    height: 100px;
    display: inline-block;
  }

  .middle-content a,
  .middle-content a:link,
  .middle-content a:visited,
  .middle-content a:hover,
  .middle-content a:active {
    text-decoration: none;
  }

  .leftNav a {
    color: inherit;
  }

  .middle-content h4 {
    display: block;
    margin-top: 20px;
    color: #626262;
  }

  .middle-content-detail {
    font-size: 12px;
    display: block;
    word-break: keep-all;
    white-space: nowrap;
    color: #7d7d7d;
  }

  .middle-content-img-manage {
    background-size: 129px 81px;
    background: url(../../static/img/home-manage.png) no-repeat center;
  }

  .middle-content-img-data {
    background-size: 69px 71px;
    background: url(../../static/img/home-data.png) no-repeat center;
  }

  .middle-content-img-database {
    background-size: 78px 95px;
    background: url(../../static/img/home-database.png) no-repeat center;
  }

  .middle-content-img-report {
    background-size: 75px 94px;
    background: url(../../static/img/home-report.png) no-repeat center;
  }

  .middle-content-img-analyze {
    background-size: 129px 85px;
    background: url(../../static/img/home-analyze.png) no-repeat center;
  }

  .middle-content-img-task {
    background-size: 87px 98px;
    background: url(../../static/img/home-task.png) no-repeat center;
  }

  .base-section {
    height: 160px;
    line-height: 160px;
    background: url(../../static/img/home-title.png) no-repeat center;
    background-size: 100% 100%;
    position: relative;
  }

  .base-section-title {
    color: #fff;
    font-size: 18px;
    font-family: "HYQiHei", serif;
    display: inline-block;
    /*margin-left: 300px;*/
    position: absolute;
    left: 300px;
  }

  div.ps {
    position: static;
  }

</style>
