<template>
  <div id="genoType-content">
    <loading v-show="loading"></loading>
    <div class="title">
      <span class="title-b">医学大数据库</span>
      <span class="title-s">< 表型分析</span>
    </div>

    <div class="content shadow-top">
      <div class="shadow-title">输入HPO表型</div>
      <div class="check-content row">
        <div class="col-md-6" id="content0">
          <span class="title">搜索表型相关基因</span>
          <div class="out-in">
            <span id="content0-0" class="check out-check"></span>
            <span>关联子表型</span>
          </div>
          <!--<div class="out-in">-->
            <!--<span id="content0-1" class="out-check check"></span>-->
            <!--<span>扩展orphanet信息</span>-->
          <!--</div>-->

          <fuzzyQuery placeholder='请输入表型' :leftData="leftData0" :rightData="originalRightData0" title="已选表型"
                      @sendInput="receiveFuzzy0"></fuzzyQuery>
        </div>

        <div class="col-md-6" id="content1">
          <span class="title">去除表型相关基因</span>
          <div class="out-in">
            <span id="content1-0" class="check out-check"></span>
            <span>关联子表型</span>
          </div>
          <!--<div class="out-in">-->
            <!--<span id="content1-1" class="out-check check"></span>-->
            <!--<span>扩展orphanet信息</span>-->
          <!--</div>-->

          <fuzzyQuery placeholder='请输入表型' :leftData="leftData1" :rightData="originalRightData1" title="已选表型"
                      @sendInput="receiveFuzzy1"></fuzzyQuery>
        </div>

        <div class="content-op">
          <div class="out-in">
            <span id="content-op" class="out-check check"></span>
            <span>扩展orphanet信息</span>
          </div>
        </div>


      </div>



      <span class="my-btn search-btn" @click="search"><img src="../../static/img/red-con.png" alt="">搜索</span>

      <div class="table-content">
        <table class="my-table">
          <thead>
          <tr>
            <th>基因ID</th>
            <th>基因名</th>
            <th>别名</th>
            <th>Panels</th>
            <th>Cov5</th>
            <th>表型</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="result in results">
            <td>{{result.gene.geneId}}</td>
            <td>{{result.gene.name.symbol}}</td>
            <td>{{result.gene.name.synonyms.join('|')}}</td>
            <td>
              <span v-if="result.panels.length !==0">{{result.panels.join(' , ')}}</span>
              <span v-else=""> - </span>
            </td>
            <td>
              <div v-for="list in result.gene.tags.cov5">{{list.transcript}}:  {{list.value | filterData}}</div>
            </td>
            <td>
              <span class="show-hpos" v-for="hpo in result.hpos">{{hpo.info.hpoId}}({{hpo.info.title.chinese ? hpo.info.title.chinese : hpo.info.title.english}})</span>
            </td>
          </tr>
          <tr v-if="results.length===0">
            <td class="center" colspan="6">暂无数据</td>
          </tr>
          </tbody>

        </table>
      </div>


    </div>
  </div>
</template>

<script>
  import fuzzyQuery from './global/fuzzyQuery.vue'

  export default {
    components: {
      'fuzzyQuery': fuzzyQuery,
    },
    data: function () {
      return {
        loading: '',

        input0: '',
        input0Arr: [],
        leftData0: [],
        originalRightData0: [],

        input1: '',
        input1Arr: [],
        leftData1: [],
        originalRightData1: [],

        results: [],
      }
    },
    mounted: function () {
      this.baseInit();
    },
    methods: {
      baseInit: function () {
        $(".out-in").on("click", function () {
          const _check = $(this).find('.check');
          if (_check.hasClass('out-check')) {
            _check.removeClass('out-check').addClass('in-check');
          } else {
            _check.removeClass('in-check').addClass('out-check');
          }
        })
      },
      receiveFuzzy0: function (data) {
        const _vue = this;
        this.loading = true;
        this.myAxios({
          url: _vue.dbUrl+'knowledge/phenomini/?query=' + data,
          type: 'get'
        }).then(function (resp) {
          _vue.loading = false;
          const results = resp.data;
          $.each(results, function (i, data) {
            data.vHtml = data.hpoId + ' ' + data.titles.chinese + '(' + data.titles.english + ')';
            _vue.leftData0.push({
              key: data.hpoId,
              value: data.vHtml
            })
          });
        }).catch(function (error) {
          _vue.catchFun(error)
        });
      },
      receiveFuzzy1: function (data) {
        const _vue = this;
        this.loading = true;
        this.myAxios({
          url: _vue.dbUrl+'knowledge/phenomini/?query=' + data,
          type: 'get'
        }).then(function (resp) {
          _vue.loading = false;
          const results = resp.data;
          $.each(results, function (i, data) {
            data.vHtml = data.hpoId + ' ' + data.titles.chinese + '(' + data.titles.english + ')';
            _vue.leftData1.push({
              key: data.hpoId,
              value: data.vHtml
            })
          });
        }).catch(function (error) {
          _vue.catchFun(error)
        });
      },
      search:function () {
        const _vue = this;
        this.loading = true;
        const ajaxMust = [];
        const ajaxOpt = [];

        $("#content0").find('.fuzzy-content .right ul li').each(function (i,data) {
          ajaxMust.push($(this).data('key'))
        });
        $("#content1").find('.fuzzy-content .right ul li').each(function (i,data) {
          ajaxOpt.push($(this).data('key'))
        });

        this.myAxios({
          url: _vue.dbUrl+'knowledge/phenomini/',
          method: 'post',
          data: {
            'includes': ajaxMust,
            'excludes': ajaxOpt,
            'children':[$('#content0-0').hasClass('in-check'),$('#content1-0').hasClass('in-check')],
            'orpha':$("#content-op").hasClass('in-check')
          }
        }).then(function (resp) {
          _vue.loading = false;

          _vue.results = resp.data;
        }).catch(function (error) {
          _vue.catchFun(error)
        });

      },
    },
    filters: {
      filterData: function (data) { //取百分比
        if (data == 0) {
          return 0;
        }
        else if(data == 1){
          return 1
        }else{
          return data.toFixed(4)
        }
      },
    }
  }
</script>

<style scoped lang="less">
  #genoType-content {
    .content {
      min-height: 450px;
      margin-top: 25px;
      background-color: #fff;
      padding-bottom: 20px;
      .out-in {
        display: inline-block;
        cursor: pointer;
        margin-bottom: 5px;
        margin-right: 10px;
        .check {
          display: inline-block;
          width: 15px;
          height: 15px;
          background-size: 15px 15px;
          margin-bottom: -3px;
        }
        .out-check {
          background: url("../../static/img/all-2.png") 43px 0;
        }
        .in-check {
          background: url("../../static/img/all-2.png") 15px 0;
        }
      }
      .content-op{
        clear: both;
        width: 100%;
        text-align: center;
        padding-top: 20px;
      }
      .check-content {
        margin: 0 33px;
        .title {
          display: block;
          margin: 10px 0 5px 0;
        }
      }

      /*width: 650px;*/
      /*margin: 40px auto;*/
      /*>div{*/
      /*margin-bottom: 26px;*/
      /*.left-input{*/
      /*margin-left: 16px;*/
      /*}*/
      /*.red {*/
      /*font-family: "FZXH1JW";*/
      /*color: rgb(238, 83, 63);*/
      /*font-size: 18px;*/
      /*float: left;*/
      /*margin-top: 5px;*/
      /*margin-right: 8px;*/
      /*}*/
      /*input{*/
      /*width: 345px;*/
      /*}*/
      /*.out-in{*/
      /*display: inline-block;*/
      /*margin-left: 15px;*/
      /*cursor: pointer;*/
      /*.check{*/
      /*display: inline-block;*/
      /*width: 15px;*/
      /*height: 15px;*/
      /*background-size: 15px 15px;*/
      /*margin-bottom: -3px;*/
      /*}*/
      /*.out-check{*/
      /*background: url("../../static/img/all-2.png") 43px 0;*/
      /*}*/
      /*.in-check{*/
      /*background: url("../../static/img/all-2.png") 15px 0;*/
      /*}*/
      /*}*/
      /*}*/
      /*.single{*/
      /*position: relative;*/
      /*ul{*/
      /*width: 345px;*/
      /*left: 16px;*/
      /*}*/
      /*}*/
      .search-btn {
        display: block;
        width: 95px;
        margin: 50px auto;
      }
      .table-content {
        margin: 0 33px;
        .my-table {
          box-shadow: none;
        }
      }
    }
  }
</style>
