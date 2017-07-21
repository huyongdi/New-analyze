<!--基因覆盖度模板-->
<template>
  <div>
    <div class="rea">
      <span class="my-btn pull-right condition" id="filter-btn" @click="filtrateShow3Fun"><img
        src="../../../static/img/red-con.png" alt="">筛选条件</span>
      <!--筛选条件弹框-->
      <div class="filtrate-content" v-show="filtrateShow3" id="filtrate-content-2">
        <img src="../../../static/img/th-1.png" alt="" class="up">
        <div class="title">搜索选项</div>
        <div class="content">
          <div class="single">
            <div class="left" data-name="genes">基因：</div>
            <div class="right">
              <textarea placeholder='请用逗号或换行隔开' v-model="geneTextAreaContent3"></textarea>
            </div>
          </div>
        </div>
        <span class="my-btn search-btn" @click="geneCoverEnter"><img src="../../../static/img/red-con.png"
                                                                     alt="">搜索</span>
      </div>
    </div>

    <div class="alert alert-danger alert-dismissible fade in noFound hide" role="alert" id="id_alert">
      <h4>警告：</h4>
      <p>以下基因名：（
        <span v-for="single in notfound">
                <a class="noFound-a" :href="dbHtml +'#/gene?query=' + single" target="_blank">{{single}}</a>
              </span>
        ）在GRCh37 refgene中没有找到，请确认基因名是否填写正确</p>
    </div>
    <table class="table my-table">
      <thead>
      <tr>
        <th>转录本</th>
        <th>基因</th>
        <th>NCBI GENE ID</th>
        <th>1X覆盖度(%)</th>
        <th>5X覆盖度(%)</th>
        <th>10X覆盖度(%)</th>
        <th>20X覆盖度(%)</th>
        <th>30X覆盖度(%)</th>
      </tr>
      </thead>
      <tbody id="find_table">
      <tr v-for="data in allData">
        <td>{{data.transcrpit}}</td>
        <td>{{data.geneSymbol}}</td>
        <td>
                <span v-for="(gene,index) in data.geneId">
                   <a target="_blank" :href="dbHtml+'#/geneDetail?geneId=' + gene">{{gene}}</a>
                  <span v-if="index == data.geneId.length">；</span>
                </span>
        </td>
        <td>{{data.cov1 | percentData}}</td>
        <td>{{data.cov5 | percentData}}</td>
        <td>{{data.cov10 | percentData}}</td>
        <td>{{data.cov20 | percentData}}</td>
        <td>{{data.cov30 | percentData}}</td>
      </tr>
      <tr v-if="allData.length == 0" style="text-align: center">
        <td colspan="8">暂无数据!</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: ['ID','app'],
    data: function () {
      return {
        filtrateShow3: false,
        allData: [],
        coverLoading: false,
        notfound: [],
        geneTextAreaContent3: ''
      }
    },
    methods: {
      geneCoverEnter: function () {
        if (!this.geneTextAreaContent3) {
          alert('gene名称不能为空');
          return
        }
        const _vue = this;
        this.coverLoading = true;
        this.myAxios({
          url: 'application/'+this.app+'/' + this.ID + '/cov/',
          method: 'post',
          data: {'gene': _vue.strToArr(this.geneTextAreaContent3)}
        }).then(function (resp) {
          resp = resp.data;
          _vue.coverLoading = false;
          if (resp.notfound.length === 0) {
            $("#id_alert").addClass('hide');
          } else {
            $("#id_alert").removeClass('hide');
            _vue.notfound = resp.notfound;
          }
          _vue.allData = resp.found;
          _vue.filtrateShow3 = false;
        });
      },
      filtrateShow3Fun: function () {
        this.filtrateShow3 = !this.filtrateShow3
      }
    },
    filters: {
      percentData: function (data) { //取百分比
        if (data == 0) {
          return 0;
        }
        data = data * 100;
        data = data.toFixed(2);
        return data
      },
    }
  }
</script>

<style scoped lang="less">
  #filter-btn {
    margin-bottom: 20px;
  }

  textarea {
    height: 150px;
  }

  #id_alert {
    clear: both;
  }
</style>
