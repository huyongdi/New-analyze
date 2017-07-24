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

          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'">
            <a class="analyze-mutate po common-a" v-if="moduleData.localsnv" :href="dbHtml+'#/mutateDetail?query='+moduleData.localsnv.chrom + ':'
                       + moduleData.localsnv.start + ':' + moduleData.localsnv.ref + ':' + moduleData.localsnv.alt"
               target="_blank" title="查看变异数据库">查看变异数据库
            </a>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'">
            位点：<span v-if="moduleData.localsnv">{{moduleData.localsnv.name}}</span>
          </div>

          <div class="col-md-4" v-if=" app==='grandwcnv'">
            位点：<span v-if="moduleData.localcnv">{{moduleData.localcnv.name}}</span>
          </div>

          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'">
            <router-link v-if="moduleData.localsnv && app==='grandmgd'" class="common-a" :to="{path:'/taskM/foo/locusSvg',query:{pos: moduleData.localsnv.chrom +
                       ':' + moduleData.localsnv.start+ '-' + moduleData.localsnv.end,id:ID}}" target="_blank"
                         title="查看位点覆盖图">查看位点覆盖图
            </router-link>
            <router-link v-if="moduleData.localsnv && app==='grandmito'" class="common-a" :to="{path:'/taskM/foo/locusSvg',query:{pos: moduleData.localsnv.chrom +
                       ':' + moduleData.localsnv.start+ '-' + moduleData.localsnv.end,id:ID,t:1}}" target="_blank"
                         title="查看位点覆盖图">查看位点覆盖图
            </router-link>
          </div>

          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'">
            基因：<a target="_blank" v-if='moduleData.annotations' class="common-a"
                  :href="dbHtml+'#/gene?query=' + moduleData.annotations.geneSymbol.join(',')">{{moduleData.annotations.geneSymbol.join(',')}}</a>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandwcnv'">
            <span>NCBI GENE ID:</span>
            <span v-if="moduleData.annotations">
                <span v-for="(gene,index) in moduleData.annotations.geneId">
                  <a class="common-a" target="_blank" :href="dbHtml+'#/geneDetail?geneId=' + gene">{{gene}}</a>
                  <span v-if="index == moduleData.annotations.geneId.length">；</span>
                </span>
              </span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito' || app==='grandwcnv'">
            区域：<span v-if="moduleData.annotations">{{moduleData.annotations.region}}</span>
          </div>

          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'">
            功能：<span v-if="moduleData.annotations">{{moduleData.annotations.func}}</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'">
            纯/杂合：{{moduleData.isHomo}}
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'">
            深度：{{moduleData.depth}}
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

          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'">
            质量：{{moduleData.quality}}
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'">
            变异比例：
            <span v-if="moduleData.ratio">{{moduleData.ratio.toFixed(3)}}</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'">
            MCAP：<span v-if="moduleData.annotations">{{moduleData.annotations.mcap}}</span>
          </div>

          <div class="col-md-4" v-if="app==='grandmgd'">
            HGMD：<span v-if="moduleData.annotations">{{moduleData.annotations.hgmd}}</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'">
            东亚人群频率：<span v-if="moduleData.annotations">{{moduleData.annotations.dbfreq | percentData}}%</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmito'">
            人群频率：<span v-if="moduleData.annotations">{{moduleData.annotations.mtdb | percentData}}%</span>
          </div>
          <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'">
            本地人群频率：<span v-if="moduleData.annotations">{{moduleData.annotations.grandfreq | percentData}}%</span>
          </div>

            <div class="col-md-12" v-if="app==='grandmgd'|| app==='grandmito'">
              gatkFilter：{{moduleData.gatkFilter}}
            </div>

            <div class="col-md-12" v-if="app==='grandmgd'|| app==='grandmito'">
              ACMG：<span v-if="moduleData.intervars">{{moduleData.intervars.intervar}}
              (<router-link class="common-a" target="_blank"
                            :to="{path:'/taskM/foo/getIntervar',query:{query:moduleData.intervars.rank.join(',')}}">
                {{moduleData.intervars.rank.join(',')}}
              </router-link>)
            </span>
            </div>

            <div class="col-md-12" v-if="app==='grandmgd'|| app==='grandmito'">
              CLINVAR：<span v-if="moduleData.annotations">{{moduleData.annotations.clinvar}}</span>
            </div>

            <div class="col-md-12" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandwcnv'">
              <div class="">变异信息：(常用转录本：
                <span v-if="moduleData.geneResp" v-for="list in moduleData.geneResp">
                            <span v-if="list.geneData.length !== 0" v-for="(list1,index) in list.geneData">
                            </span>
                          <span
                            v-if="list.geneData && list.geneData.tags">{{list.geneData.tags.transcript ? list.geneData.tags.transcript : '无'}}</span>
                        </span>
                )
              </div>
              <div v-if="moduleData.annotations && moduleData.annotations.change">
                <div v-for="single in moduleData.annotations.change">{{single}}</div>
              </div>
            </div>

            <div class="col-md-12" v-if="app==='grandwcnv'">
              DGV：<span v-if="moduleData.annotations" class="break-all">{{moduleData.annotations.dgv.join(',')}}</span>
            </div>

          <div class="edit">
            <div class="edit-title">
              编辑<span>(最后编辑人:"{{moduleData.lastEditor ? moduleData.lastEditor : '无'}}")：</span>
            </div>
            <div class="edit-content">
              <div>评论：</div>
              <textarea class="form-control" id="comment" rows="3"
                        @keyup.enter="changeComment">{{moduleData.comment}}</textarea>
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
          <button type="button" class="btn btn-primary" :data-url="moduleData.url"
                  @click="patchEdit(moduleData.url,moduleData.id)"
                  id="save_design">保存修改
          </button>
          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
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
        $("#detail_select").val(newData.status);
        $("#comment").val(newData.comment);
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
  }
</style>
