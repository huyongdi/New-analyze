<!--变异详情的模态框-->
<!--cnvResult里面的CNV实际上应该放到mutateModalCNV.vue里面，但是由于和本文件相似性更高，放到了这里-->
<template>
  <div class="modal fade  bs-example-modal-lg" tabindex="-1" id="mutateDetailModal" role="dialog"
       aria-labelledby="gridSystemModalLabel1">
    <div class="modal-dialog modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="gridSystemModalLabel1">详情</h4>
        </div>
        <div class="modal-body" id="id_modal">

          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'|| app==='grandtrio' ">
            <a class="analyze-mutate po common-a" v-if="moduleData.variant" :href="dbHtml+'#/variationD?p='+moduleData.variant.chrom + ':'
                       + moduleData.variant.start + ':' + moduleData.variant.ref + ':' + moduleData.variant.alt"
               target="_blank" title="查看变异数据库">查看变异数据库
            </a>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno' || app==='grandtrio'||app==='grandwcnv'">
            <span class="title">位点：</span>
            <span v-if="moduleData.variant">
               <span
                 v-if="moduleData.variant.start == moduleData.variant.end">{{moduleData.variant.chrom}}:{{moduleData.variant.start}}({{moduleData.variant.ref}}/{{moduleData.variant.alt}})</span>
               <span
                 v-else="">{{moduleData.variant.chrom}}:{{moduleData.variant.start}}-{{moduleData.variant.end}}({{moduleData.variant.ref}}/{{moduleData.variant.alt}})</span>
            </span>
          </div>

          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
            <router-link v-if="moduleData.variant && (app==='grandmgd'||app==='grandanno')" class="common-a" :to="{path:'/taskM/foo/locusSvg',query:{pos: moduleData.variant.chrom +
                       ':' + moduleData.variant.start+ '-' + moduleData.variant.end,id:ID}}" target="_blank"
                         title="查看位点覆盖图">查看位点覆盖图
            </router-link>
            <router-link v-if="moduleData.variant && app==='grandmito'" class="common-a" :to="{path:'/taskM/foo/locusSvg',query:{pos: moduleData.variant.chrom +
                       ':' + moduleData.variant.start+ '-' + moduleData.variant.end,id:ID,t:1}}" target="_blank"
                         title="查看位点覆盖图">查看位点覆盖图
            </router-link>
          </div>

          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'||app==='grandtrio'">
            <span class="title">基因：</span><span v-if="moduleData.anno">
                    <a class="common-a" target="_blank" v-if="moduleData.anno.genes.symbols" v-for="(oneGene,index) in moduleData.anno.genes.symbols"
                       :href="dbHtml+'#/gene?n='+oneGene">
                      {{oneGene}} <span v-if="index!==moduleData.anno.genes.symbols.length-1">,</span>
                    </a>
                  </span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandwcnv'||app==='grandanno'||app==='grandtrio'">
            <span class="title">NCBI GENE ID:</span>
            <span v-if="moduleData.anno">
                    <a class="common-a" target="_blank" v-if="moduleData.anno.genes.geneids" v-for="(oneGene,index) in moduleData.anno.genes.geneids"
                       :href="dbHtml+'#/geneD?geneId='+oneGene">
                      {{oneGene}} <span v-if="index!==moduleData.anno.genes.geneids.length-1">,</span>
                    </a>
            </span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito' || app==='grandwcnv'||app==='grandanno'||app==='grandtrio'">
            <span class="title">区域：</span><span v-if="moduleData.anno">{{moduleData.anno.regions.join(',')}}</span>
          </div>

          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'||app==='grandtrio'">
            <span class="title">功能：</span><span v-if="moduleData.anno &&moduleData.anno.funcs.length!=0">{{moduleData.anno.funcs.join(',')}}</span><span v-else="">-</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
            <span class="title">纯/杂合：</span><span v-if="moduleData.info">{{moduleData.info.isHomo ? '纯合' : '杂合'}}</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
            <span class="title">深度：</span><span v-if="moduleData.info">{{moduleData.info.depth}}</span>
          </div>

          <div class="col-md-4" v-if=" app==='grandwcnv'">
            <span class="title">相对深度：</span><span>{{moduleData.mCPratio}}</span>
          </div>
          <div class="col-md-4" v-if=" app==='grandwcnv'">
            <span class="title">人群平均深度：</span><span>{{moduleData.mDepOfPopu}}</span>
          </div>
          <div class="col-md-4" v-if=" app==='grandwcnv'">
            <span class="title">人群深度标准差：</span><span>{{moduleData.stdOfPopDep}}</span>
          </div>

          <div class="col-md-12" v-if="app==='grandwcnv'">
            <span class="title">基因：</span><a target="_blank" v-if='moduleData.annotations' class="common-a"
                  :href="dbHtml+'#/gene?query=' + moduleData.annotations.geneSymbol.join(',')">{{moduleData.annotations.geneSymbol.join(',')}}</a>
          </div>

          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
            <span class="title">质量：</span><span v-if="moduleData.info">{{moduleData.info.quality}}</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
            <span class="title">变异比例：</span>
            <span v-if="moduleData.info">{{moduleData.info.ratio | percentData}}%</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'||app==='grandanno' || app==='grandtrio'">
            <span class="title">MCAP：</span><span v-if="moduleData.anno">{{moduleData.anno.dbinfo.mcap ? moduleData.anno.dbinfo.mcap : '-'}}</span>
          </div>

          <div class="col-md-4" v-if="app==='grandmgd'||app==='grandanno' || app==='grandtrio'">
            <span class="title">HGMD：</span><span v-if="moduleData.anno">{{moduleData.anno.dbinfo.hgmd ? moduleData.anno.dbinfo.hgmd : '-'}}</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'||app==='grandanno' || app==='grandtrio'">
            <span class="title">东亚人群频率(e/g)：</span><span v-if="moduleData.anno">{{moduleData.anno.freqs.dbfreq.exome | percentData}}/{{moduleData.anno.freqs.dbfreq.genome |
          percentData}}%</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmito'">
            <span class="title">人群频率：</span><span v-if="moduleData.anno">{{moduleData.anno.freqs.mtdb | percentData}}%</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno' || app==='grandtrio'">
            <span class="title">本地人群频率：</span><span v-if="moduleData.anno">{{moduleData.anno.freqs.grandfreq | percentData}}%</span>
          </div>

          <div class="col-md-12" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
            <span class="title">gatkFilter：</span><span v-if="moduleData.info">{{moduleData.info.gatkFilter}}</span>
          </div>

          <div class="col-md-12" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno' || app==='grandtrio'">
            <span class="title">ACMG：</span><span v-if="moduleData.intervar">{{moduleData.intervar.intervar}}
              ( 待填
            <router-link class="common-a" target="_blank" v-if="moduleData.intervar.rank"
            :to="{path:'/taskM/foo/getIntervar',query:{query:moduleData.intervar.rank.join(','),
            snv:moduleData.variant.chrom+':'+moduleData.variant.start+':'+moduleData.variant.end+':'+moduleData.variant.ref+':'+moduleData.variant.alt
            }}">
            {{moduleData.intervar.rank.join(',')}}
            </router-link>
            <span v-else=""> . </span>
              )
            </span>
          </div>

          <div class="col-md-12" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno' || app==='grandtrio'">
            <span class="title">CLINVAR：</span><span v-if="moduleData.dbinfo&&moduleData.dbinfo.clinvar.length!=0">{{moduleData.dbinfo.clinvar.join(',')}}</span><span v-else="">-</span>
          </div>

          <div class="col-md-12" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandwcnv'||app==='grandanno'||app==='grandtrio'">
            <div class=""><span class="title">变异信息：</span>(常用转录本：
              <span v-if="moduleData.geneResp" v-for="list in moduleData.geneResp">
                <span v-if="list.geneData && list.geneData.tags">{{list.geneData.tags.transcript ? list.geneData.tags.transcript : '无'}}</span>
                <span v-else=""> 无 </span>
              </span>
              )
            </div>
            <div v-if="moduleData.anno && moduleData.anno.change">
              <div v-for="single in moduleData.anno.change">{{single}}</div>
            </div>
          </div>

          <div class="col-md-12" v-if="app==='grandwcnv'">
            <span class="title">DGV：</span><span v-if="moduleData.annotations" class="break-all">{{moduleData.annotations.dgv.join(',')}}</span>
          </div>

          <table class="table my-table no-shadow" v-if="app==='grandtrio'">
            <thead>
            <tr>
              <th>关系</th>
              <th>姓名</th>
              <th>是否存在</th>
              <th>纯/杂合</th>
              <th>质量</th>
              <th>深度</th>
              <th>gatkFilter</th>
              <th>变异比例</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>受检者</td>
              <td><span v-if="moduleData.patient">{{moduleData.patient.patient}}</span></td>
              <td><span v-if="moduleData.patient">{{moduleData.patient.exists ? '存在' : '不存在'}}</span></td>
              <td><span v-if="moduleData.patient">
                         <span
                           v-if="moduleData.patient.snvinfo">{{moduleData.patient.snvinfo.isHomo ? moduleData.patient.snvinfo.isHomo : '-'}}</span>
                        <span v-else=""> - </span>
                      </span></td>
              <td><span v-if="moduleData.patient">{{moduleData.patient.snvinfo.quality}}</span></td>
              <td><span v-if="moduleData.patient">{{moduleData.patient.snvinfo.depth}}</span></td>
              <td><span v-if="moduleData.patient">{{moduleData.patient.snvinfo.gatkFilter}}</span></td>
              <td><span v-if="moduleData.patient">{{moduleData.patient.snvinfo.ratio}}</span></td>
            </tr>
            <tr>
              <td>父亲</td>
              <td><span v-if="moduleData.father">{{moduleData.father.patient}}</span></td>
              <td><span v-if="moduleData.father">{{moduleData.father.exists ? '存在' : '不存在'}}</span></td>
              <td><span v-if="moduleData.father">
                        <span v-if="moduleData.father.snvinfo">{{moduleData.father.snvinfo.isHomo ? moduleData.father.snvinfo.isHomo : '-'}}</span>
                        <span v-else=""> - </span>
                      </span>
              </td>
              <td><span v-if="moduleData.father">
                        <span v-if="moduleData.father.snvinfo">{{moduleData.father.snvinfo.quality}}</span>
                        <span v-else=""> - </span>
                      </span></td>
              <td><span v-if="moduleData.father">
                        <span v-if="moduleData.father.snvinfo">{{moduleData.father.snvinfo.depth}}</span>
                        <span v-else=""> - </span>
                      </span></td>
              <td><span v-if="moduleData.father">
                         <span v-if="moduleData.father.snvinfo">{{moduleData.father.snvinfo.gatkFilter}}</span>
                        <span v-else=""> - </span>
                      </span></td>
              <td><span v-if="moduleData.father">
                        <span v-if="moduleData.father.snvinfo">{{moduleData.father.snvinfo.ratio}}</span>
                        <span v-else=""> - </span>
                      </span></td>
            </tr>
            <tr>
              <td>母亲</td>
              <td><span v-if="moduleData.mother">{{moduleData.mother.patient}}</span></td>
              <td><span v-if="moduleData.mother">{{moduleData.mother.exists ? '存在' : '不存在'}}</span></td>
              <td>
                        <span v-if="moduleData.mother">
                          <span v-if="moduleData.mother.snvinfo">{{moduleData.mother.snvinfo.isHomo ? moduleData.mother.snvinfo.isHomo : '-'}}</span>
                          <span v-else=""> - </span>
                        </span>
              </td>
              <td><span v-if="moduleData.mother">
                        <span v-if="moduleData.mother.snvinfo">{{moduleData.mother.snvinfo.quality}}</span>
                        <span v-else=""> - </span>
                      </span></td>
              <td><span v-if="moduleData.mother">
                        <span v-if="moduleData.mother.snvinfo">{{moduleData.mother.snvinfo.depth}}</span>
                        <span v-else=""> - </span>
                      </span></td>
              <td><span v-if="moduleData.mother">
                         <span v-if="moduleData.mother.snvinfo">{{moduleData.mother.snvinfo.gatkFilter}}</span>
                        <span v-else=""> - </span>
                      </span></td>
              <td><span v-if="moduleData.mother">
                        <span v-if="moduleData.mother.snvinfo">{{moduleData.mother.snvinfo.ratio}}</span>
                        <span v-else=""> - </span>
                      </span></td>
            </tr>


            </tbody>
          </table>

          <div class="edit">
            <div class="edit-title">
              <span class="title">编辑：</span><span>(最后编辑人:"<span v-if="moduleData.edit">{{moduleData.edit.lastEditor ? moduleData.edit.lastEditor : '无'}}</span>")：</span>
            </div>
            <!--<div class="edit-content" id="select_content">-->
            <!--<div>状态：</div>-->
            <!--<select class="form-control" id="detail_select">-->
            <!--<option value="major">主要的</option>-->
            <!--<option value="minor">次要的</option>-->
            <!--<option value="benign">良性的</option>-->
            <!--<option value="invalid">无效的</option>-->
            <!--<option value="">未作标记</option>-->
            <!--</select>-->
            <!--</div>-->

            <div class="edit-content">
              <div class="edit-radio" id="status-all">
                <span class="title">状态：</span>
                <span class="status-content"><span class="check-span check-no status-check" data-value="major"></span>主要的</span>
                <span class="status-content"><span class="check-span check-no status-check" data-value="minor"></span>次要的</span>
                <span class="status-content"><span class="check-span check-no status-check" data-value="benign"></span>良性的</span>
                <span class="status-content"><span class="check-span check-no status-check" data-value="invalid"></span>无效的</span>
                <span class="status-content"><span class="check-span check-no status-check" data-value=""></span>未作标记</span>
              </div>
            </div>

            <div class="edit-content">
              <div class="edit-radio" id="validation-all">
                <span class="title">验证来源：</span>
                <span class="status-content"><span class="check-span check-no validation-check" data-value="father"></span>父源</span>
                <span class="status-content"><span class="check-span check-no validation-check" data-value="mother"></span>母源</span>
                <span class="status-content"><span class="check-span check-no validation-check" data-value="both"></span>双方</span>
                <span class="status-content"><span class="check-span check-no validation-check" data-value="unknown"></span>未知</span>
              </div>
            </div>

            <div class="edit-content">
              <div class="title">评论：</div>
              <textarea v-if="moduleData.edit" class="form-control" id="comment" rows="3" @keyup.enter="changeComment"
                        :value="moduleData.edit.comment"></textarea>
            </div>

          </div>
        </div>
        <div class="modal-footer analyze-footer">
          <!--<button type="button" class="btn btn-primary" :data-url="moduleData.url"-->
          <!--@click="patchEdit(moduleData.url,moduleData.id)"-->
          <!--id="save_design">保存修改-->
          <!--</button>-->
          <span class="my-btn" :data-url="moduleData.url" @click="patchEdit(moduleData.url,moduleData.id)"><img src="../../../static/img/red-save.png"
                                                                                                                alt="">保存</span>
          <span class="my-btn pull-left" data-dismiss="modal"><img src="../../../static/img/red-close.png" alt="">关闭</span>
          <!--<button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['moduleDataFromFather', 'ID', 'app', 'postId'],
    data: function () {
      return {
        moduleData: this.moduleDataFromFather
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
        const _comment = $.trim($("#comment").val());
        let _status=$("#status-all").find('.status-content').find('.check-yes').data('value');
        let _validation=$("#validation-all").find('.status-content').find('.check-yes').data('value');

        $('.validation-check').each(function () {
          if($(this).hasClass('check-yes')){
            _validation = _validation?_validation:$(this).data('value')
          }
        });

        let _varType ='';
        if(_vue.app=='grandwcnv'){
          _varType = 'cnv'
        }else if(_vue.app == 'grandtrio'){
          _varType = 'trio'
        }else{
          _varType = 'snv'
        }

        this.myAxios({
          url: 'report/edit/',
          method: 'post',
          data: {
            varType: _varType,
            objId: _vue.postId,
            status: _status,
            validation: _validation,
            comment: _comment,
          }
        }).then(function () {
          _vue.$emit('changeStatus', {status: _status,validation: _validation,comment: _comment});
          alert('修改成功!');
          $("#mutateDetailModal").modal('hide')
        });
      },
    },
    watch: {
      moduleDataFromFather: function (newData) {
        this.moduleData = newData;
        $("#comment").val(newData.edit.comment);

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

      }
    },
    filters: {
      percentData: function (data) { //取百分比
//        if (data == 0) {
//          return 0;
//        }
//        data = data * 100;
//        data = data.toFixed(2);
//        return data

        return Math.round(data*10000)/100


      },
    }
  }
</script>

<style scoped lang="less">
  #id_modal {
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

    .col-md-4 {
      margin: 4px 0;
    }
    .col-md-12 {
      margin: 4px 0;
    }
    .edit {
      margin: 0 15px;
      padding-top: 5px;
      clear: both;
      #comment {
        margin-bottom: 10px;
      }
      .edit-content{
        margin-bottom: 8px;
      }
    }
    .edit-title {
      margin-bottom: 10px;
    }
    .my-table {
      float: right;
    }
  }
</style>
