<template>
  <div id="report-content">

    <loading v-if="loading"></loading>


    <div class="refresh-content">
      <button class="btn btn-color-r con-submit" @click="refresh1">重新生成报告</button>
    </div>

    <div class="sample-content">
      <span class="title">送检信息：</span>
      <div class="row">
        <div class="col-md-4">
          姓名：{{sampleData.name}}
        </div>
        <div class="col-md-4">
          性别：{{sampleData.gender}}
        </div>
        <div class="col-md-4">
          出生年月: {{sampleData.birthday}}
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          样本编号：{{sampleData.sn}}
        </div>
        <div class="col-md-4">
          名族：{{sampleData.nation}}
        </div>
        <div class="col-md-4">
          样品类型:
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          检测项目：{{sampleData.item}}
        </div>
        <div class="col-md-4">
          检测方法：{{sampleData?'靶向捕获-高通量测序':''}}
        </div>
        <div class="col-md-4">
          送检医院: {{sampleData.unit_name}}
        </div>
      </div>
    </div>

    <div class="sample-content">
      <span class="title">临床信息：</span>
      <span>{{sampleData.remark}}</span>
    </div>


    <span class="title">主要变异：</span>
    <table class="table myTable">
      <thead>
      <tr>
        <th>序号</th>
        <th>基因名</th>
        <th>转录本</th>
        <th>染色体位置</th>
        <th>核苷酸改变</th>
        <th>氨基酸改变</th>
        <th>纯/杂合</th>
        <th>普通人群频率</th>
        <th>来源</th>
        <th>变异类型</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(list,index) in allData.majors">
        <td>{{index+1}}</td>
        <td>{{list.gene.symbol}}</td>
        <td>{{list.transcript}}</td>
        <td>{{list.position}}</td>
        <td>{{list.change.na ? list.change.na : '-'}}</td>
        <td>{{list.change.aa ? list.change.aa : '-'}}</td>
        <td>{{list.homhet}}</td>
        <td>{{list.freq}}</td>
        <td>-</td>
        <td>{{list.intervar.value === 'Uncertain significance' ? 'VUS' : list.intervar.value}}</td>
      </tr>
      </tbody>
    </table>

    <span class="title">次要变异：</span>
    <table class="table myTable">
      <thead>
      <tr>
        <th>序号</th>
        <th>基因名</th>
        <th>转录本</th>
        <th>染色体位置</th>
        <th>核苷酸改变</th>
        <th>氨基酸改变</th>
        <th>纯/杂合</th>
        <th>普通人群频率</th>
        <th>遗传方式</th>
        <th>疾病表型及OMIM编号</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(list,index) in allData.minors">
        <td>{{index+1}}</td>
        <td>{{list.gene.symbol}}</td>
        <td>{{list.transcript}}</td>
        <td>{{list.position}}</td>
        <td>{{list.change.na ? list.change.na : '-'}}</td>
        <td>{{list.change.aa ? list.change.aa : '-'}}</td>
        <td>{{list.homhet}}</td>
        <td>{{list.freq}}</td>
        <td>
          <div v-for="a in list.diseases">
            <span v-if="a.inheritance.length !== 0">{{a.inheritance.join(',')}}</span>
            <span v-else="">-</span>
          </div>
        </td>
        <td>
          <div v-for="a in list.diseases">
            <span >{{a.title}}({{a.mimNumber}})</span>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <span class="title">检测基因列表：</span>
    <table class="table myTable gene-table">
      <thead>
      <tr>
        <th colspan="8">相关疾病panel，共<span v-if="allData.genes">{{allData.genes.length}}</span>个基因</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="list in geneArr">
        <td v-for="listS in list">{{listS}}</td>
      </tr>
      </tbody>
    </table>


  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        id: this.$route.query.code,
        app: this.$route.query.app,
        allData: '',
        geneArr: [],
        minorsDiseases: [],
        loading: false,
        token:'',

        sampleData:''
      }
    },
    created: function () {
      if (!this.id) {
        alert('页面错误');
        this.$router.push('/')
      }
      this.getData();
      this.sampleInfo();
    },
    methods: {
      sampleInfo:function () {
        const _vue = this;
        _vue.$axios({
          url:'report/reportsnv/patient/?datafile='+_vue.id
        }).then(function (resp) {
          if(resp.data.status === 'error'){
          }else{
            if(resp.data.data.birthday){
              let arr = resp.data.data.birthday.split('-');
              resp.data.data.birthday = arr[0]+'年'+arr[1]+'月'+arr[2]+'号';
            }
            _vue.sampleData = resp.data.data;
          }
        }).catch(function (error) {
          _vue.catchFun(error);
        });
      },
      refresh1: function () {
        const _vue = this;
        _vue.loading = true;
        _vue.$axios({
          url: 'report/reportsnv/refresh/?datafile=' + _vue.id + '&app=' + _vue.app
        }).then(function (respRe) {
          _vue.allData = respRe.data;
          _vue.loading = false;
        }).catch(function (error) {
          _vue.catchFun(error);
        });
      },
      getData: function () {
        const _vue = this;
        _vue.loading = true;
        this.$axios({
          url: 'report/reportsnv/?datafile=' + this.id + '&app=' + this.app,
        }).then(function (resp) {
          if (resp.data.results.length === 0) {
            _vue.$axios({
              url: 'report/reportsnv/refresh/?datafile=' + _vue.id + '&app=' + _vue.app
            }).then(function (respRe) {
              _vue.allData = respRe.data;
              _vue.loading = false;
            }).catch(function (error) {
              _vue.catchFun(error);
            });
          } else {
            _vue.allData = resp.data.results[0];
            _vue.loading = false;
          }
        })
      }
    },
    watch: {
      allData: function () {
        /*将数组里面的值8个8个输出*/
        if (!this.allData) {
          return
        }
        const genes = this.allData.genes;
        var arrCount = Math.ceil(genes.length / 8);
        var pushArr = [];
        while (arrCount) {
          pushArr.push([]);
          arrCount -= 1
        }
        $.each(genes, function (i, data) {
          i += 1;
          $.each(pushArr, function (k1, k2) {
            if (Math.ceil(i / 8) === k1 + 1) {
              k2.push(data)
            }
          })
        });
        $.each(pushArr, function (i, data) {
          if (data.length !== 8) {
            data.length = 8
          }
        });
        this.geneArr = pushArr;

        //次要变异（遗传方式、疾病表型及OMIM编号）
//        const diseases = this.allData.minors.diseases;
//        $.each(diseases,function (i,data) {
//          _vue.minorsDiseases
//        })

      }
    },
  }
</script>

<style scoped lang="less">
  #report-content {
    padding-left: 100px;
    padding-top: 30px;
    padding-right: 40px;
    .refresh-content {
      text-align: center;
    }
    .sample-content{
      margin: 20px 0;
    }
    table {
      th, td {
        text-align: center;
        border: 1px solid #d3d3d3;
      }
    }
    .title {
      font-weight: bold;
      font-size: 16px;
    }
    .gene-table {
      th {
        text-align: center;
      }
    }
  }
</style>
