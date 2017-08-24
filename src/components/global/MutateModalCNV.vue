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
              <span class="title">位点：</span> <span v-if="CNVModuleData.variant">
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
              <span class="title">区域：</span><span v-if="CNVModuleData.anno">{{CNVModuleData.anno.regions.join(',')}}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <span class="title">基因型：</span><span v-if="CNVModuleData.info&& CNVModuleData.info.wes">{{CNVModuleData.info.wes.genoType?CNVModuleData.info.wes.genoType:'-'}}</span><span v-else=""> - </span>
            </div>
            <div class="col-md-4">
              <span class="title">深度(原始)：</span><span v-if="CNVModuleData.info&& CNVModuleData.info.wes">{{CNVModuleData.info.wes.originalReadDepth?CNVModuleData.info.wes.originalReadDepth:'-'}}</span><span v-else=""> - </span>
            </div>
            <div class="col-md-4">
              <span class="title">深度(标准化)：</span><span v-if="CNVModuleData.info&& CNVModuleData.info.wes">{{CNVModuleData.info.wes.readDepth?CNVModuleData.info.wes.readDepth:'-'}}</span><span v-else=""> - </span>
            </div>
          </div>

          <div class="row specialRow">
            <div class="col-md-11">
              <span class="title">基因：</span> <span v-if="CNVModuleData.anno">
                    <a class="common-a" target="_blank" v-if="CNVModuleData.anno.genes.symbols" v-for="(oneGene,index) in CNVModuleData.anno.genes.symbols"
                       :href="dbHtml+'#/gene?n='+oneGene">
                      {{oneGene}} <span v-if="index!==CNVModuleData.anno.genes.symbols.length-1">,</span>
                    </a>
                  </span>
            </div>

          </div>
          <div class="row specialRow">
            <div class="col-md-11">
              <span class="title">NCBI GENE ID:</span>
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
              <div class=""><span class="title">变异信息：</span>(常用转录本：
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
              <span class="title">DGV：</span><span v-if="CNVModuleData.anno" class="dgv">{{CNVModuleData.anno.dgvs.join(',')}}</span>
            </div>
          </div>

          <div class="center">
            <img :src=IMG alt="">
          </div>

          <div class="edit">
            <div class="edit-title">
              <span class="title">编辑：</span><span>(最后编辑人:"<span v-if="CNVModuleData.edit">{{CNVModuleData.edit.lastEditor ? CNVModuleData.edit.lastEditor : '无'}}</span>")：</span>
            </div>


            <div class="edit-content">
              <div class="edit-radio" id="status-check">
                <span class="title">状态：</span>
                <span class="status-content"><span class="check-span check-no status-check" data-value="major"></span>主要的</span>
                <span class="status-content"><span class="check-span check-no status-check" data-value="minor"></span>次要的</span>
                <span class="status-content"><span class="check-span check-no status-check" data-value="benign"></span>良性的</span>
                <span class="status-content"><span class="check-span check-no status-check" data-value="invalid"></span>无效的</span>
                <span class="status-content"><span class="check-span check-no status-check" data-value=""></span>未作标记</span>
              </div>
            </div>

            <div class="edit-content">
              <div class="edit-radio" id="validation-check">
                <span class="title">验证来源：</span>
                <span class="status-content"><span class="check-span check-no validation-check" data-value="father"></span>父源</span>
                <span class="status-content"><span class="check-span check-no validation-check" data-value="mother"></span>母源</span>
                <span class="status-content"><span class="check-span check-no validation-check" data-value="both"></span>双方</span>
                <span class="status-content"><span class="check-span check-no validation-check" data-value="unknown"></span>未知</span>
              </div>
            </div>

            <div class="edit-content">
              <div class="title">评论：</div>
              <textarea v-if="CNVModuleData.edit" class="form-control" :data-id=CNVModuleData.id id="commentCNV"
                        rows="3" :value="CNVModuleData.edit.comment"></textarea>

            </div>

            <!--<div class="edit-content">-->
              <!--<div>状态：</div>-->
              <!--<select class="form-control" id="detail_selectCNV">-->
                <!--<option value="major">主要的</option>-->
                <!--<option value="minor">次要的</option>-->
                <!--<option value="benign">良性的</option>-->
                <!--<option value="invalid">无效的</option>-->
                <!--<option value="">未作标记</option>-->
              <!--</select>-->
            <!--</div>-->
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
    props: ['moduleDataFromFatherCNV', 'ID','postId'],
    data: function () {
      return {
        CNVModuleData: this.moduleDataFromFatherCNV,
        IMG: ''
      }
    },
    mounted:function () {
      $(".status-content").on("click",function () {
        const _checkRadio = $(this).find('.check-span');
        const _parent = $(this).closest('.edit-radio');
        if(_checkRadio.hasClass('check-no')){
          _parent.find('.check-yes').removeClass('check-yes').addClass('check-no');
          _checkRadio.removeClass('check-no').addClass('check-yes')
        }
      })
    },
    methods: {
      patchEdit: function (axiosUrl) {
        const _vue = this;
        const _comment = $.trim($("#commentCNV").val());
        let _status='';
        let _validation='';
        $('.status-check').each(function () {
          if($(this).hasClass('check-yes')){
            _status = _status?_status:$(this).data('value')
          }
        });
        $('.validation-check').each(function () {
          if($(this).hasClass('check-yes')){
            _validation = _validation?_validation:$(this).data('value')
          }
        });

        this.myAxios({
          url: 'report/edit/',
          method: 'post',
          data: {
            varType: 'cnv',
            objId: _vue.postId,
            status: _status,
            validation: _validation,
            comment: _comment,
          }
        }).then(function () {
          _vue.$emit('changeStatusCNV', {status: _status,validation: _validation,comment: _comment});
          alert('修改成功!');
          $("#mutateDetailModalCNV").modal('hide')
        });
      },
    },
    watch: {
      moduleDataFromFatherCNV: function (newData) {
        this.CNVModuleData = newData;
        console.log(newData)
        const _vue = this;
        $("#commentCNV").val(newData.edit.comment);


        $('.status-check').each(function () {
          const _value = $(this).data('value');
          if($(this).hasClass('check-yes')){
            $(this).removeClass('check-yes').addClass('check-no')
          }
          if(_value === newData.edit.status){
            $(this).removeClass('check-no').addClass('check-yes')
          }
        });

        $(".validation-check").each(function () {
          const _value = $(this).data('value');
          if($(this).hasClass('check-yes')){
            $(this).removeClass('check-yes').addClass('check-no')
          }
          if(_value === newData.edit.validation){
            $(this).removeClass('check-no').addClass('check-yes')
          }
        });

        this.myAxios({
          url: 'application/job/' + this.ID + '/image/?pos=' + newData.variant.chrom +
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
    .edit-title {
      margin-bottom: 10px;
    }
    .edit-content{
      margin-bottom: 10px;
    }
    .edit-radio {
      display: inline-block;
      .status-content{
        margin-right: 10px;
        cursor: pointer;
      }
      .check-span {
        display: inline-block;
        margin-bottom: -2px;
        margin-right: 5px;
      }
      .check-no {
        width: 15px;
        height: 15px;
        background: url(../../../static/img/all-2.png) 43px 0;
      }
      .check-yes {
        width: 15px;
        height: 15px;
        background: url(../../../static/img/all-2.png) 15px 0;
      }
    }
    .row {
      margin: 10px 0;
    }
    .edit {
      margin: 0 15px;
      padding-top: 5px;
      #comment {
        margin-bottom: 10px;
      }
    }
    .dgv{
      word-break: break-all;
    }
  }
</style>
