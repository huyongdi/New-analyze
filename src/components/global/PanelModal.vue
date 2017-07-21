<!--通过引入模糊搜索建立的panel搜索框-->
<template>
  <!--点击修改panel的模态框-->
  <div class="modal fade " aria-labelledby="gridSystemModalLabe5" tabindex="-1" role="dialog" id="panelModal">
    <loading v-if="loading"></loading>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="gridSystemModalLabel5">提交基因信息</h4>
        </div>
        <div class="modal-body" id="modal-panel">
          <div class="row">
            <div class="col-md-2">
              <a :href="dbHtml+'#/panel'" class="toPanel" target="_blank" title="点击跳转到基因页面">Panel信息</a>
            </div>
            <div class="col-md-10 relative">
              <fuzzyQuery placeholder='请输入panel名' :leftData="panelData" :rightData="originalPanelData" title="已选panel"
                          @sendInput="receiveFuzzy"></fuzzyQuery>
            </div>
          </div>
          <div class="row gene-row">
            <div class="col-md-2">Gene信息</div>
            <div class="col-md-10">
              <textarea v-model="geneInput" placeholder="请用逗号或换行隔开" class="form-control"></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary" @click="saveEditGene">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import fuzzyQuery from './fuzzyQuery.vue'
  export default {
    props: ['originalGeneInput','originalPanelData'],
    components: {
      'fuzzyQuery': fuzzyQuery,
    },
    data: function () {
      return {
        panelData: [],
        loading: false,
        geneInput:this.originalGeneInput
      }
    },
    watch:{
      originalGeneInput:function (newValue) {
        this.geneInput = newValue;
      }
    },
    methods: {
      receiveFuzzy: function (data) {
        const _vue = this;
        _vue.loading = true;
        this.myAxios({
          url: _vue.dbUrl + 'product/subpanel/?query=' + data
        }).then(function (resp) {
          _vue.panelData = [];
          $.each(resp.data.results, function (n, data) {
            _vue.panelData.push({
              key: data.code,
              value: data.name_cn
            })
          });
          _vue.loading = false;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      saveEditGene: function () {
        this.$emit('saveData', {panel: this.originalPanelData, gene: this.strToArr(this.geneInput)}) //函数名和父元素的@一致
      }
    },
  }
</script>

<style scoped lang="less">
  .gene-row {
    margin-top: 20px;
    textarea {
      width: 95%;
      height: 100px;
    }
  }
</style>
