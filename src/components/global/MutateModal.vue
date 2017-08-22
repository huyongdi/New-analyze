<!--变异详情的模态框-->
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
            位点：
            <span v-if="moduleData.variant">
               <span v-if="moduleData.variant.start == moduleData.variant.end">{{moduleData.variant.chrom}}:{{moduleData.variant.start}}({{moduleData.variant.ref}}/{{moduleData.variant.alt}})</span>
               <span v-else="">{{moduleData.variant.chrom}}:{{moduleData.variant.start}}-{{moduleData.variant.end}}({{moduleData.variant.ref}}/{{moduleData.variant.alt}})</span>
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
            基因：<span v-if="moduleData.anno">
                    <a class="common-a" target="_blank" v-if="moduleData.anno.genes.symbols" v-for="(oneGene,index) in moduleData.anno.genes.symbols"
                       :href="dbHtml+'#/gene?n='+oneGene">
                      {{oneGene}} <span v-if="index!==moduleData.anno.genes.symbols.length-1">,</span>
                    </a>
                  </span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandwcnv'||app==='grandanno'||app==='grandtrio'">
            <span>NCBI GENE ID:</span>
            <span v-if="moduleData.anno">
                    <a class="common-a" target="_blank" v-if="moduleData.anno.genes.geneids" v-for="(oneGene,index) in moduleData.anno.genes.geneids"
                       :href="dbHtml+'#/geneD?geneId='+oneGene">
                      {{oneGene}} <span v-if="index!==moduleData.anno.genes.geneids.length-1">,</span>
                    </a>
            </span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito' || app==='grandwcnv'||app==='grandanno'||app==='grandtrio'">
            区域：<span v-if="moduleData.anno">{{moduleData.anno.regions.join(',')}}</span>
          </div>

          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'||app==='grandtrio'">
            功能：<span v-if="moduleData.anno &&moduleData.anno.funcs.length!=0">{{moduleData.anno.funcs.join(',')}}</span><span v-else="">-</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
            纯/杂合：<span v-if="moduleData.info">{{moduleData.info.isHomo?'纯合':'杂合'}}</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
            深度：<span v-if="moduleData.info">{{moduleData.info.depth}}</span>
          </div>

          <div class="col-md-4" v-if=" app==='grandwcnv'">
            相对深度：<span>{{moduleData.mCPratio}}</span>
          </div>
          <div class="col-md-4" v-if=" app==='grandwcnv'">
            人群平均深度：<span>{{moduleData.mDepOfPopu}}</span>
          </div>
          <div class="col-md-4" v-if=" app==='grandwcnv'">
            人群深度标准差：<span>{{moduleData.stdOfPopDep}}</span>
          </div>

          <div class="col-md-12" v-if="app==='grandwcnv'">
            基因：<a target="_blank" v-if='moduleData.annotations' class="common-a"
                  :href="dbHtml+'#/gene?query=' + moduleData.annotations.geneSymbol.join(',')">{{moduleData.annotations.geneSymbol.join(',')}}</a>
          </div>

          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
            质量：<span v-if="moduleData.info">{{moduleData.info.quality}}</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
            变异比例：
            <span v-if="moduleData.info">{{moduleData.info.ratio | percentData}}%</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'||app==='grandanno' || app==='grandtrio'">
            MCAP：<span v-if="moduleData.anno">{{moduleData.anno.dbinfo.mcap?moduleData.anno.dbinfo.mcap:'-'}}</span>
          </div>

          <div class="col-md-4" v-if="app==='grandmgd'||app==='grandanno' || app==='grandtrio'">
            HGMD：<span v-if="moduleData.anno">{{moduleData.anno.dbinfo.hgmd?moduleData.anno.dbinfo.hgmd:'-'}}</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'||app==='grandanno' || app==='grandtrio'">
            东亚人群频率(e/g)：<span v-if="moduleData.anno">{{moduleData.anno.freqs.dbfreq.exome | percentData}}/{{moduleData.anno.freqs.dbfreq.genome | percentData}}%</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmito'">
            人群频率：<span v-if="moduleData.anno">{{moduleData.anno.freqs.mtdb | percentData}}%</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno' || app==='grandtrio'">
            本地人群频率：<span v-if="moduleData.anno">{{moduleData.anno.freqs.grandfreq | percentData}}%</span>
          </div>

          <div class="col-md-12" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
            gatkFilter：<span v-if="moduleData.info">{{moduleData.info.gatkFilter}}</span>
          </div>

          <div class="col-md-12" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno' || app==='grandtrio'">
            ACMG：<span v-if="moduleData.intervar">{{moduleData.intervar.intervar}}
              ( 待填
              <!--<router-link class="common-a" target="_blank" v-if="moduleData.intervar.rank"-->
                           <!--:to="{path:'/taskM/foo/getIntervar',query:{query:moduleData.intervar.rank.join(',')}}">-->
                <!--{{moduleData.intervar.rank.join(',')}}-->
              <!--</router-link>-->
              <!--<span v-else=""> . </span>-->
              )
            </span>
          </div>

          <div class="col-md-12" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno' || app==='grandtrio'">
            CLINVAR：<span v-if="moduleData.dbinfo&&moduleData.dbinfo.clinvar.length!=0">{{moduleData.dbinfo.clinvar.join(',')}}</span><span v-else="">-</span>
          </div>

          <div class="col-md-12" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandwcnv'||app==='grandanno'||app==='grandtrio'">
            <div class="">变异信息：(常用转录本：
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
            DGV：<span v-if="moduleData.annotations" class="break-all">{{moduleData.annotations.dgv.join(',')}}</span>
          </div>

          <table class="table my-table" v-if="app==='grandtrio'">
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
              编辑<span>(最后编辑人:"<span v-if="moduleData.edit">{{moduleData.edit.lastEditor ? moduleData.edit.lastEditor : '无'}}</span>")：</span>
            </div>
            <div class="edit-content">
              <div>评论：</div>
              <textarea v-if="moduleData.edit" class="form-control" id="comment" rows="3" @keyup.enter="changeComment" :value="moduleData.edit.comment"></textarea>
            </div>

            <div class="edit-content" id="select_content">
              <div>状态：</div>
              <select class="form-control" id="detail_select">
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
    props: ['moduleDataFromFather', 'ID', 'app'],
    data: function () {
      return {
        moduleData: this.moduleDataFromFather
      }
    },
    methods: {
      patchEdit: function (axiosUrl) {
        const _vue = this;
        const axiosStatus = $("#detail_select").find('option:selected').val();
        this.myAxios({
          url: axiosUrl,
          method: 'patch',
          data: {
            'status': axiosStatus,
            'comment': $.trim($("#comment").val())
          }
        }).then(function () {
          _vue.$emit('changeStatus', axiosStatus);
          alert('修改成功!');
          $("#mutateDetailModal").modal('hide')
        });
      },
    },
    watch: {
      moduleDataFromFather: function (newData) {
        this.moduleData = newData;
        $("#detail_select").val(newData.edit.status);
        $("#comment").val(newData.edit.comment);
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
  #id_modal {
    .col-md-4 {
      margin: 4px 0;
    }
    .col-md-12 {
      margin: 4px 0px;
    }
    .edit {
      margin: 0 15px;
      clear: both;
      #comment {
        margin-bottom: 10px;
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
