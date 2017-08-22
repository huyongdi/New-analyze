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
              位点： <span v-if="CNVModuleData.variant">
               <span v-if="CNVModuleData.variant.start == CNVModuleData.variant.end">{{CNVModuleData.variant.chrom}}:{{CNVModuleData.variant.start}}({{CNVModuleData.variant.ref}}/{{CNVModuleData.variant.alt}})</span>
               <span v-else="">{{CNVModuleData.variant.chrom}}:{{CNVModuleData.variant.start}}-{{CNVModuleData.variant.end}}({{CNVModuleData.variant.ref}}/{{CNVModuleData.variant.alt}})</span>
            </span>
            </div>
            <div class="col-md-4">
              <router-link v-if="CNVModuleData.variant" :to="{path:'/svg',query:{pos: CNVModuleData.variant.chrom +
                       ':' + CNVModuleData.variant.start+ '-' + CNVModuleData.variant.end,id:ID}}" target="_blank"
                           title="查看位点覆盖图" class="common-a">查看位点覆盖图
              </router-link>
            </div>
            <div class="col-md-4">
              区域：<span v-if="CNVModuleData.anno">{{CNVModuleData.anno.regions.join(',')}}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              基因型：<span v-if="CNVModuleData.info&& CNVModuleData.info.wes">{{CNVModuleData.info.wes.genoType?CNVModuleData.info.wes.genoType:'-'}}</span><span v-else=""> - </span>
            </div>
            <div class="col-md-4">
              深度(原始)：<span v-if="CNVModuleData.info&& CNVModuleData.info.wes">{{CNVModuleData.info.wes.originalReadDepth?CNVModuleData.info.wes.originalReadDepth:'-'}}</span><span v-else=""> - </span>
            </div>
            <div class="col-md-4">
              深度(标准化)：<span v-if="CNVModuleData.info&& CNVModuleData.info.wes">{{CNVModuleData.info.wes.readDepth?CNVModuleData.info.wes.readDepth:'-'}}</span><span v-else=""> - </span>
            </div>
          </div>

          <div class="row specialRow">
            <div class="col-md-11">
              基因： <span v-if="CNVModuleData.anno">
                    <a class="common-a" target="_blank" v-if="CNVModuleData.anno.genes.symbols" v-for="(oneGene,index) in CNVModuleData.anno.genes.symbols"
                       :href="dbHtml+'#/gene?n='+oneGene">
                      {{oneGene}} <span v-if="index!==CNVModuleData.anno.genes.symbols.length-1">,</span>
                    </a>
                  </span>
            </div>

          </div>
          <div class="row specialRow">
            <div class="col-md-11">
              <span>NCBI GENE ID:</span>
              <span v-if="CNVModuleData.anno">
                    <a class="common-a" target="_blank" v-if="CNVModuleData.anno.genes.geneids" v-for="(oneGene,index) in CNVModuleData.anno.genes.geneids"
                       :href="dbHtml+'#/geneD?geneId='+oneGene">
                      {{oneGene}} <span v-if="index!==CNVModuleData.anno.genes.geneids.length-1">,</span>
                    </a>
            </span>
            </div>

          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="">变异信息：(常用转录本：
                <span v-if="CNVModuleData.geneResp" v-for="list in CNVModuleData.geneResp">
                <span v-if="list.geneData && list.geneData.tags">{{list.geneData.tags.transcript ? list.geneData.tags.transcript : '无'}}</span>
                <span v-else=""> 无 </span>
              </span>
                )
              </div>
              <div v-if="CNVModuleData.anno && CNVModuleData.anno.change">
                <div v-for="single in CNVModuleData.anno.change">{{single}}</div>
              </div>
            </div>
          </div>

          <div class="row specialRow">
            <div class="col-md-11">
              DGV：<span v-if="CNVModuleData.anno" class="dgv">{{CNVModuleData.anno.dgvs.join(',')}}</span>
            </div>
          </div>

          <div class="center">
            <img :src=IMG alt="">
          </div>

          <div class="edit">
            <div class="edit-title">
              编辑<span>(最后编辑人:"<span v-if="CNVModuleData.edit">{{CNVModuleData.edit.lastEditor ? CNVModuleData.edit.lastEditor : '无'}}</span>")：</span>
            </div>
            <div class="edit-content">
              <div>评论：</div>
              <textarea v-if="CNVModuleData.edit" class="form-control" :data-id=CNVModuleData.id id="commentCNV"
                        rows="3" :value="CNVModuleData.edit.comment"></textarea>

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
          <!--<button type="button" class="btn btn-primary" :data-url="CNVModuleData.url"-->
                  <!--@click="patchEdit(CNVModuleData.url,CNVModuleData.id)">保存修改-->
          <!--</button>-->
          <!--<button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>-->
          <span class="my-btn" :data-url="CNVModuleData.url" @click="patchEdit(CNVModuleData.url,CNVModuleData.id)"><img src="../../../static/img/red-save.png" alt="">保存</span>
          <span class="my-btn pull-left" data-dismiss="modal"><img src="../../../static/img/red-close.png" alt="">关闭</span>
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
        $("#detail_selectCNV").val(newData.edit.status);
        $("#commentCNV").val(newData.edit.comment);
        const _vue = this;
        this.myAxios({
          url: 'application/grandmgd/' + this.ID + '/image/?pos=' + newData.variant.chrom +
          ':' + newData.variant.start + '-' + newData.variant.end
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
    .dgv{
      word-break: break-all;
    }
  }
</style>
