<template>
  <div id="home-content" class="right-content ">
    <div class="base-section">
      <span class="base-section-title">构建安全、稳定的基因大数据分析管理系统</span>
    </div>
    <div class="middle-content">
      <div class="container">
        <div class="row">
          <div class=" col-xs-4 col-sm-4 col-md-4 ps">
            <a :href="manHtml+'sample/patient'" class="homeContent-li">
              <span class="middle-content-img middle-content-img-manage"></span>
              <h4><strong>管理系统</strong></h4>
              <span class="middle-content-detail">提供方便且高效的数据管理方法，个性化的实时样本管理，</span>
              <span class="middle-content-detail">简化日常工作流程，更加有效地管理和捕获数据并改进沟通。</span>
              <span class="middle-content-detail">根据最新信息制定决策</span>
            </a>
          </div>
          <!--<div class=" col-xs-4 col-sm-4 col-md-4 ps">-->
            <!--&lt;!&ndash;<a href="#" class="homeContent-li">&ndash;&gt;-->
            <!--<router-link class="homeContent-li" :to="{path:'/dataList'}">-->
              <!--<span class="middle-content-img middle-content-img-data"></span>-->
              <!--<h4><strong>数&nbsp;据</strong></h4>-->
              <!--<span class="middle-content-detail">上传和管理临床、样本、数据信息，</span>-->
              <!--<span class="middle-content-detail">能够可靠管理数据、资源和工作流程，</span>-->
              <!--<span class="middle-content-detail">极大减少工作成本。</span>-->
            <!--</router-link>-->
            <!--&lt;!&ndash;</a>&ndash;&gt;-->
          <!--</div>-->
          <!--<div class=" col-xs-4 col-sm-4 col-md-4 ps">-->
            <!--<a href="javascript:void(0)" class="homeContent-li" @click="alertReport">-->
              <!--<span class="middle-content-img middle-content-img-report"></span>-->
              <!--<h4><strong>报&nbsp;告</strong></h4>-->
              <!--<span class="middle-content-detail">查看检测分析报告，</span>-->
              <!--<span class="middle-content-detail">快速调取检测报告，一键导出。</span>-->
            <!--</a>-->
          <!--</div>-->

          <div class=" col-xs-4 col-sm-4 col-md-4 ps">
            <a :href="anaHtml+'#/dataList'" class="homeContent-li">
              <span class="middle-content-img middle-content-img-analyze"></span>
              <h4><strong>分析系统</strong></h4>
              <span class="middle-content-detail">可视化分析测序数据，</span>
              <span class="middle-content-detail">同步分析流程，监控分析数据，提高检测验证、</span>
              <span class="middle-content-detail">样本生物分析和结果报告的效率。</span>
            </a>
          </div>
          <!--<div class=" col-xs-4 col-sm-4 col-md-4 ps">-->
            <!--&lt;!&ndash;<a href="#" class="homeContent-li">&ndash;&gt;-->
            <!--<router-link class="homeContent-li" :to="{path:'/task'}">-->
              <!--<span class="middle-content-img middle-content-img-task"></span>-->
              <!--<h4><strong>任&nbsp;务</strong></h4>-->
              <!--<span class="middle-content-detail">管理和监控分析任务，实时准确的跟踪分析结果，</span>-->
              <!--<span class="middle-content-detail">有效地提高工作效率，实现精细化管理。</span>-->
            <!--</router-link>-->
            <!--&lt;!&ndash;</a>&ndash;&gt;-->
          <!--</div>-->
          <div class=" col-xs-4 col-sm-4 col-md-4 ps">
            <a :href="dbHtml+'#/gene'" class="homeContent-li">
              <span class="middle-content-img middle-content-img-database"></span>
              <h4><strong>医学大数据库</strong></h4>
              <span class="middle-content-detail">管理和监控分析任务，实时准确的跟踪分析结果，</span>
              <span class="middle-content-detail">有效地提高工作效率，实现精细化管理。</span>
            </a>
          </div>
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
    methods:{
      alert:function () {
        alert('请查看左侧导航')
      },
      alertReport:function () {
        alert('请在样本分析结果中查看报告')
      }
    }
  }
</script>

<style scoped lang="less">
  /*底部样式*/

  #home-content{
    background-color: #fff;
  }

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
.full-60{
  height: 60px;
  background-color: #fff;
}
  /*底部样式--end*/
  .middle-content {
    background-color: #fff;
    margin-bottom: 60px;
  }

  #home-content.right-content {
    position: relative;
    height: 100%;
  }

  html body #app .right-content{
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

  .middle-content-img-database{
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
