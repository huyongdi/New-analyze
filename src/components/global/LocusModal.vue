<!--查看位点信息-->
<template>
    <div>
      <loading v-if="loading"></loading>
      <div class="modal fade bs-example-modal-lg" aria-labelledby="gridSystemModalLabe5" tabindex="-1" role="dialog" id="locusM">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title" id="gridSystemModalLabel5">位点信息</h4>
            </div>
            <div class="modal-body" id="modal-panel">
              <div class="table-content">
                <table class="table my-table" v-show="!hide0">
                  <thead>
                  <tr>
                    <th>Datafile</th>
                    <th>纯/杂合</th>
                    <th>深度</th>
                    <th>质量</th>
                    <th>变异比例</th>
                    <th>GatkFilter</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="list in lists0">
                    <td>{{list.datafile|getDatafile}}</td>
                    <td>{{list.isHomo}}</td>
                    <td>{{list.depth}}</td>
                    <td>{{list.quality}}</td>
                    <td>
                      {{list.ratio?list.ratio.toFixed(4):'-'}}
                    </td>
                    <td>
                      <span v-if="list.gatkFilter">{{list.gatkFilter}}%</span>
                      <span v-else> - </span>
                    </td>
                  </tr>
                  <tr v-if="lists0.length === 0" class="center">
                    <td colspan="6">该位点在其它样本中没有信息</td>
                  </tr>
                  </tbody>
                </table>

                <table class="table my-table" v-show="!hide1">
                  <thead>
                  <tr>
                    <th>深度(原始)</th>
                    <th>深度(标准化)</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="list in lists1">
                    <td>{{list.originalReadDepth}}</td>
                    <td>{{list.readDepth}}</td>
                  </tr>
                  <tr v-if="lists1.length === 0" class="center">
                    <td colspan="2">该位点在其它样本中没有信息</td>
                  </tr>
                  </tbody>
                </table>

              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
      props:['locusId','datafile','locus','type'],
      data:function () {
        return{
          lists0:[],
          lists1:[],
          loading:false,
          hide0:true,
          hide1:true,
        }
      },
      watch:{
        locus:function () {
          this.hide0 = true;
          this.hide1 = false;
          const _vue = this;
          _vue.loading = true;
          if(this.type){ //1是cnv
            _vue.myAxios({
              url:'report/cnvwesinfo/records/?datafile='+_vue.datafile+'&cnv='+_vue.locus
            }).then(function (resp) {
              _vue.lists1 = resp.data;
              _vue.loading = false;
            }).catch(function (error) {
              _vue.catchFun(error);
            });
          }else{ //0是snv
            this.hide0 = false;
            this.hide1 = true;
            _vue.myAxios({
              url:'report/snvatinfo/records/?datafile='+_vue.datafile+'&snv='+_vue.locus
            }).then(function (resp) {
              _vue.lists0 = resp.data;
              _vue.loading = false;
            }).catch(function (error) {
              _vue.catchFun(error);
            });
          }
        },
      },
      filters:{
        filterData: function (data) { //取百分比
          if (data == 0) {
            return 0;
          }
          data = data * 100;
          data = data.toFixed(2);
          return data
        },
        getDatafile:function (str) {
          let arr = str.split('/');
          return arr[arr.length-2]
        }
      }
    }
</script>

<style scoped lang="less">
.table-content{
  width: 100%;
  .center{
    text-align: center;
  }
  table{
    table-layout: fixed;
    td,th{
      word-break: break-all;
    }
  }
}
</style>
