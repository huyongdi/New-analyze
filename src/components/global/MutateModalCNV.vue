<!--CNV变异详情的模态框-->
<template>
  <div class="modal fade  bs-example-modal-lg" tabindex="-1" id="mutateDetailModalCNV" role="dialog"
       aria-labelledby="gridSystemModalLabel2">
    <div class="modal-dialog modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="gridSystemModalLabel2">详情</h4>
        </div>
        <div class="modal-body" id="id_modal">
          <div class="row">
            <div class="col-md-4">
              位点：<span v-if="CNVModuleData.localcnv">{{CNVModuleData.localcnv.name}}</span>
            </div>
            <div class="col-md-4">
              <router-link v-if="CNVModuleData.localcnv" :to="{path:'/svg',query:{pos: CNVModuleData.localcnv.chrom +
                       ':' + CNVModuleData.localcnv.start+ '-' + CNVModuleData.localcnv.end,id:ID}}" target="_blank"
                           title="查看位点覆盖图" class="common-a">查看位点覆盖图
              </router-link>
            </div>
            <div class="col-md-4">
              区域：<span v-if="CNVModuleData.annotations">{{CNVModuleData.annotations.region}}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              基因型：<span>{{CNVModuleData.genoType}}</span>
            </div>
            <div class="col-md-4">
              深度(原始)：<span>{{CNVModuleData.originalReadDepth}}</span>

            </div>
            <div class="col-md-4">
              深度(标准化)：<span>{{CNVModuleData.readDepth}}</span>
            </div>
          </div>

          <div class="row specialRow">
            <div class="col-md-11">
              基因：<a target="_blank" v-if='CNVModuleData.annotations' class="common-a"
                    :href="dbHtml+'#/gene?query=' + CNVModuleData.annotations.geneSymbol.join(',')">
              {{CNVModuleData.annotations.geneSymbol.join(',')}}</a>
            </div>

          </div>
          <div class="row specialRow">
            <div class="col-md-11">
              <span>NCBI GENE ID:</span>
              <span v-if="CNVModuleData.annotations"><span
                v-for="(gene,index) in CNVModuleData.annotations.geneId">
                          <a target="_blank" :href="dbHtml+'#/geneDetail?geneId=' + gene" class="common-a">{{gene}}</a>
                          <span v-if="index == CNVModuleData.annotations.geneId.length">；</span>
                          </span>
                    </span>
            </div>

          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="">变异信息：(常用转录本：
                <span v-if="CNVModuleData.geneResp" v-for="list in CNVModuleData.geneResp">
                            <span v-if="list.geneData.length !== 0" v-for="(list1,index) in list.geneData">
                            </span>
                          <span
                            v-if="list.geneData && list.geneData.tags">{{list.geneData.tags.transcript ? list.geneData.tags.transcript : '无'}}</span>
                        </span>
                )
              </div>
              <div v-if="CNVModuleData.annotations && CNVModuleData.annotations.change">
                <div v-for="single in CNVModuleData.annotations.change">{{single}}</div>
              </div>

            </div>
          </div>

          <div class="row specialRow">
            <div class="col-md-11">
              DGV：<span v-if="CNVModuleData.annotations">{{CNVModuleData.annotations.dgv.join(',')}}</span>
            </div>
          </div>

          <div class="center">
            <img :src=IMG alt="">
          </div>

          <div class="edit">
            <div class="edit-title">
              编辑<span>(最后编辑人:"{{CNVModuleData.lastEditor ? CNVModuleData.lastEditor : '无'}}")：</span>
            </div>
            <div class="edit-content">
              <div>评论：</div>
              <textarea class="form-control" :data-id=CNVModuleData.id id="commentCNV"
                        rows="3">{{CNVModuleData.comment}}</textarea>
            </div>

            <div class="edit-content">
              <div>状态：</div>
              <select class="form-control" id="detail_selectCNV">
                <option value="major">主要的</option>
                <option value="minor">次要的</option>
                <option value="benign">良性的</option>
                <option value="invalid">无效的</option>
                <option value="">未作标记</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer analyze-footer">
          <button type="button" class="btn btn-primary" :data-url="CNVModuleData.url"
                  @click="patchEdit(CNVModuleData.url,CNVModuleData.id)">保存修改
          </button>
          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['moduleDataFromFatherCNV', 'ID'],
    data: function () {
      return {
        CNVModuleData: this.moduleDataFromFatherCNV,
        IMG: ''
      }
    },
    methods: {
      patchEdit: function (axiosUrl) {
        const _vue = this;
        const axiosStatus = $("#detail_selectCNV").find('option:selected').val();
        this.myAxios({
          url: axiosUrl,
          method: 'patch',
          data: {
            'status': axiosStatus,
            'comment': $.trim($("#commentCNV").val())
          }
        }).then(function () {
          _vue.$emit('changeStatusCNV', axiosStatus);
          alert('修改成功!');
          $("#mutateDetailModalCNV").modal('hide')
        });
      },
    },
    watch: {
      moduleDataFromFatherCNV: function (newData) {
        this.CNVModuleData = newData;
        $("#detail_selectCNV").val(newData.status);
        $("#commentCNV").val(newData.comment);
        const _vue = this;
        this.myAxios({
          url: 'application/grandmgd/' + this.ID + '/image/?pos=' + newData.localcnv.chrom +
          ':' + newData.localcnv.start + '-' + newData.localcnv.end
        }).then(function (resp) {
          _vue.IMG = resp.data.url
        })

      }
    }
  }
</script>

<style scoped lang="less">
  #id_modal {
    .row {
      margin: 10px 0;
    }
    .edit {
      margin: 0 15px;
      #comment {
        margin-bottom: 10px;
      }
    }
  }
</style>
