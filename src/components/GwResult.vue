<template>
  <div class="right-content">
    <loading v-if="loading"></loading>
    <location imgClass="analyzeTool-small" currentPage="低深度全基因CNV检测结果"></location>
    <locusModal :datafile="datafile" :snv="snv" type="1"></locusModal>

    <div class="all-content">


      <div class="sampleInfo">
        样本信息：{{sampleInfo}}
      </div>

      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab"
                                                  data-toggle="tab">质控统计</a></li>
        <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab"
                                   @click="toCNV">CNV</a>
        <li role="presentation"><a href="#myImg" aria-controls="messages" role="tab" data-toggle="tab"
                                   @click="toIMG">CHROM 图</a>
        </li>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content">

        <div role="tabpanel" class="tab-pane active" id="home">
          <div class="bold">质控详情</div>

          <div class="down-content">
            <div class="inline">
              基因分析报告：&nbsp;
              <router-link target="_blank" :to="{path:'reportTest',query:{code:datafile,app:'grandwcnv'}}">点击查看</router-link>
            </div>
          </div>

          <div class="table-content">
            <table class="table left-table">
              <thead>
              <tr>
                <th class="th-1">类别</th>
                <th class="th-3">值</th>
              </tr>
              </thead>
              <tbody>
              <tr class="trIn">
                <td>性别</td>
                <td>{{statData.gender}}</td>
              </tr>
              <tr>
                <th class="th-1">染色体</th>
                <th class="th-3">Reads数</th>
              </tr>
              <tr v-for="(list,index) in statData.count">
                <td>{{list.chrom}}</td>
                <td>{{list.reads_number}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div role="tabpanel" class="tab-pane" id="messages">

          <table class="table table-gene task-result-table myTable" id="aberrance1">
            <thead>
            <tr>
              <th>位点</th>
              <th>长度</th>
              <th>基因</th>
              <th>区域</th>
              <th class="disease-td">疾病</th>
              <th>相对深度</th>
              <th>人群平均深度</th>
              <th>人群深度标准差</th>
              <th>状态</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="data in cnvData">
              <td>
                <i :data-id='data.id' class="fa fa-font-awesome po text-3" title="查看详情" @click="showDetailCNV"></i>
                <!--<span v-if="data.localcnv">{{data.localcnv.name}}</span>-->
                <a class="po" v-if="data.localcnv" @click="showLocus0(data.localcnv.chrom+':'+data.localcnv.start+':'+data.localcnv.end+':'+data.localcnv.alt)">
                  {{data.localcnv.name}}
                </a>
              </td>
              <td>
                <span v-if="data.localcnv">{{data.localcnv.length}}</span>
              </td>
              <td v-if="data.annotations">
                <a target="_blank" class="block" v-if="data.geneVue"
                   v-for="single in data.geneVue"
                   :href="dbHtml+'#/gene?query=' + single.id">{{single.name}}</a>
              </td>
              <td v-if="data.annotations">
                {{data.annotations.region}}
              </td>
              <td class="disease-td">
                <div v-for="(disease,index) in data.geneResp" v-if="disease.geneData.phenotypeMap.length !== 0">
<span :data-geneId="disease.geneId" v-if="data.annotations.geneId.length !==1"
      :class="{color0:index===0,color1:index%4===1,color2:index%4===2,color3:index%4===3,color4:index%4===0&&index!==0}">
                    </span>
                <div v-for="diseaseSingle in disease.geneData.phenotypeMap">
                    <div v-if="diseaseSingle.inheritances.gene.length!=0">
              <span class="po font-700 a-color" data-toggle="tooltip" data-placement="top"
                    :data-original-title="diseaseSingle.inheritances.gene.join(',')">
              [{{diseaseSingle.inheritances.gene_ab.join(',')}}]
              </span>
                      <a class="po" v-if="diseaseSingle.omim.titles.chinese"
                         @click="showHPOCNV(diseaseSingle.omim.mimNumber,diseaseSingle)"
                         data-toggle="tooltip"
                         data-placement="top" :data-original-title='diseaseSingle.phenotype'>
                        {{diseaseSingle.omim.titles.chinese}}
                      </a>
                      <a v-else
                         @click="showHPOCNV(diseaseSingle.omim.mimNumber,diseaseSingle)">{{diseaseSingle.phenotype}}</a>
                      (<a target="_blank"
                          :href="dbHtml+'#/geneOmDetail?&omId='+diseaseSingle.omim.mimNumber"
                          class="color-a">{{diseaseSingle.omim.mimNumber}}
                    </a>)
                      <!--<a @click="showHPO(diseaseSingle.omim.mimNumber,diseaseSingle)"-->
                      <!--class="showHPO">查看HPO信息</a>-->
                      <!--<i class="fa fa-comment-o po showHPO" title="查看变异类型" data-type="cnv" @click="showHPOCNV(diseaseSingle.omim.mimNumber,diseaseSingle)"></i>-->
                    </div>
                    <div v-else>
              <span class="po font-700 a-color" data-toggle="tooltip" data-placement="top"
                    :data-original-title="diseaseSingle.inheritances.phenotype.join(',')">
              [{{diseaseSingle.inheritances.phenotype_ab.join(',')}}]
              </span>
                      <a class="po" v-if="diseaseSingle.omim.titles.chinese"
                         @click="showHPOCNV(diseaseSingle.omim.mimNumber,diseaseSingle)"
                         data-toggle="tooltip" data-placement="top"
                         :data-original-title='diseaseSingle.phenotype'>
                        {{diseaseSingle.omim.titles.chinese}}
                      </a>
                      <a v-else
                         @click="showHPOCNV(diseaseSingle.omim.mimNumber,diseaseSingle)">{{diseaseSingle.phenotype}}</a>
                      (<a target="_blank"
                          :href="dbHtml+'#/geneOmDetail?&omId='+diseaseSingle.omim.mimNumber"
                          class="color-a">{{diseaseSingle.omim.mimNumber}}</a>)
                      <!--<a @click="showHPO(diseaseSingle.omim.mimNumber,diseaseSingle)"-->
                      <!--class="showHPO">查看HPO信息</a>-->
                      <!--<i class="fa fa-comment-o po showHPO" title="查看变异类型" data-type="cnv" @click="showHPOCNV(diseaseSingle.omim.mimNumber,diseaseSingle)"></i>-->
                    </div>
                  </div>
                </div>
              </td>
              <td>{{data.mCPratio}}</td>
              <td>{{data.mDepOfPopu}}</td>
              <td>{{data.stdOfPopDep}}</td>
              <td
                :class="{ active1: data.status=='major',active2: data.status=='minor',active3: data.status=='benign',active4: data.status=='invalid'}">
                {{data.status | getStatus}}
              </td>
            </tr>

            </tbody>
          </table>
          <pagenation :count="cnvCount" :reset="cnvReset" @getCurrent="getCurrentDetail"></pagenation>

          <!--查看详情的模态框-->
          <div class="modal fade  bs-example-modal-lg" tabindex="-1" id="CNVDetail" role="dialog"
               aria-labelledby="gridSystemModalLabel2">
            <div class="modal-dialog modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                    aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="gridSystemModalLabel2">详情</h4>
                </div>
                <div class="modal-body" id="">
                  <div class="row">
                    <div class="col-md-4">
                      位点：<span v-if="CNVmoduleData.localcnv">{{CNVmoduleData.localcnv.name}}</span>
                    </div>
                    <!--<div class="col-md-4">-->
                    <!--<router-link v-if="CNVmoduleData.localcnv" :to="{path:'/svg',query:{pos: CNVmoduleData.localcnv.chrom +-->
                    <!--':' + CNVmoduleData.localcnv.start+ '-' + CNVmoduleData.localcnv.end,id:ID}}" target="_blank"-->
                    <!--title="查看位点覆盖图">查看位点覆盖图-->
                    <!--</router-link>-->
                    <!--</div>-->
                    <div class="col-md-4">
                      区域：<span v-if="CNVmoduleData.annotations">{{CNVmoduleData.annotations.region}}</span>
                    </div>
                    <div class="col-md-4">
                      相对深度：<span>{{CNVmoduleData.mCPratio}}</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      人群平均深度：<span>{{CNVmoduleData.mDepOfPopu}}</span>

                    </div>
                    <div class="col-md-4">
                      人群深度标准差：<span>{{CNVmoduleData.stdOfPopDep}}</span>
                    </div>
                  </div>
                  <div class="row specialRow">
                    基因：<a target="_blank" v-if="CNVmoduleData.geneVue" v-for="single in CNVmoduleData.geneVue"
                          :href="dbHtml+'#/gene?query=' + single.id">{{single.name}}&nbsp;&nbsp;</a>
                  </div>
                  <div class="row specialRow">
                    <span>NCBI GENE ID:</span>
                    <span v-if="CNVmoduleData.annotations"><span
                      v-for="(gene,index) in CNVmoduleData.annotations.geneId">
                          <a target="_blank" :href="dbHtml+'#/geneDetail?geneId=' + gene">{{gene}}</a>
                          <span v-if="index == CNVmoduleData.annotations.geneId.length">；</span>
                          </span>
                    </span>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="">变异信息：(常用转录本：
                        <span v-if="CNVmoduleData.geneResp" v-for="list in CNVmoduleData.geneResp">
                            <span v-if="list.geneData.length !== 0" v-for="(list1,index) in list.geneData">
                            </span>
                          <span
                            v-if="list.geneData && list.geneData.tags">{{list.geneData.tags.transcript ? list.geneData.tags.transcript : '无'}}</span>
                        </span>
                        )
                      </div>
                      <div v-if="CNVmoduleData.annotations && CNVmoduleData.annotations.change">
                        <div v-for="single in CNVmoduleData.annotations.change">{{single}}</div>
                      </div>

                    </div>
                  </div>
                  <div class="row specialRow">
                    DGV：<span v-if="CNVmoduleData.annotations">{{CNVmoduleData.annotations.dgv.join(',')}}</span>
                  </div>
                  <!--<div class="img-content">-->
                  <!--<img :src=IMG alt="">-->
                  <!--</div>-->
                  <div class="edit">
                    <div class="edit-title">
                      编辑<span>(最后编辑人:"{{CNVmoduleData.lastEditor ? CNVmoduleData.lastEditor : '无'}}")：</span>
                    </div>
                    <div class="edit-content">
                      <div>评论：</div>
                      <textarea class="form-control" :data-id=CNVmoduleData.id id="commentCNV"
                                rows="3">{{CNVmoduleData.comment}}</textarea>
                    </div>
                    <div class="edit-content" :data-id="CNVmoduleData.id">
                      <div>状态：</div>
                      <select class="form-control" id="CNV_select">
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
                  <button type="button" class="btn btn-primary" :data-url="CNVmoduleData.url"
                          @click="patchEditCNV(CNVmoduleData.url,CNVmoduleData.id)"
                          id="save_designCNV">保存修改
                  </button>
                  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
                </div>
              </div>
            </div>
          </div>

          <!--查看HPO的模态框-->
          <div class="modal fade  bs-example-modal-lg" tabindex="-1" id="hpo_detail_cnv" role="dialog"
               aria-labelledby="gridSystemModalLabel4">
            <div class="modal-dialog modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                    aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="gridSystemModalLabel4">详情</h4>
                </div>
                <div class="modal-body">
                  <table class="table table-bordered myTable">
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>ClinicalPhenotye</th>
                      <th>HPO</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="clinicalSynopsis.length === 0" class="center">
                      <td colspan="3">暂无数据</td>
                    </tr>
                    <tr v-else="" class="font-12" v-for="data in sortSyn(clinicalSynopsis)">
                      <td>{{data.name}}</td>
                      <td>
                        <div v-for="singleData in data">{{singleData.clinicalPhenotye}}
                        </div>
                      </td>
                      <td>
                        <div v-for="singleData in data">
                          <span v-if="singleData.hpo">{{singleData.hpo}}({{singleData.hpoName}})</span>
                          <span v-else> - </span>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="modal-footer analyze-footer">
                  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div role="tabpanel" class="tab-pane" id="myImg">
          <table class="table table-gene task-result-table myTable" id="aberrance2">
            <thead>
            <tr>
              <th>类别名</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(img,index) in imgs">
              <td>
                <span>{{img.chrom}}</span>
              </td>
              <td>
                <a href="javascript:void(0)" :data-index="index" @click="showImg">点击查看图片</a>
              </td>
            </tr>
            <!--<tr v-for="img in imgs" class="hideImg">-->
            <!--<td colspan="2">-->
            <!--<img :src='imgSrc' alt="">-->
            <!--</td>-->
            <!--</tr>-->

            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import topLocation from './global/location'
  import search from './global/search'
  import pagenation from './global/pagenation'
  import fuzzyQuery from './global/fuzzyQuery.vue'
  import locusModal from './global/locusModal.vue'

  export default {
    components: {
      'location': topLocation,
      'search': search,
      'pagenation': pagenation,
      'fuzzyQuery': fuzzyQuery,
      'locusModal': locusModal,
    },
    data: function () {
      return {
        snv:'',
        panelData: [],
        originalPanelData: [],
        geneInput: '',

        loading: '',
        ID: this.$route.query.id,
        sampleInfo: '',
        datafile: '',
        statData: '',

        cnvPage: 1,
        cnvCount: 0,
        cnvReset: 0,
        cnvData: '',
        CNVmoduleData: '',
        clinicalSynopsis: '',

        imgs: [],
        imgSrc: ''
      }
    },
    mounted: function () {
      if (!this.ID) {
        alert('页面错误');
        this.$router.push('/')
      }
      const _vue = this;
      //获得样本信息
      this.$axios({
        url: 'application/grandwcnv/' + this.ID + '/',
      }).then(function (resp) {
        _vue.datafile = resp.data.datafile;
        _vue.$axios({
          url: resp.data.job
        }).then(function (respJob) {
          _vue.sampleInfo = respJob.data.name;
        })
      });
      this.stat(); //获取stat信息
    },
    methods: {
      showLocus0:function (snv) {
        this.snv = snv;
        $("#locusM").modal('show')
      },
      stat: function () {
        const _vue = this;
        this.$axios({
          url: 'application/grandwcnv/' + this.ID + "/stat/",
        }).then(function (resp) {
          _vue.statData = resp.data
        }).catch(function (error) {
          _vue.catchFun(error);
        });
      },
      toCNV: function () {
        const _vue = this;
        this.loading = true;
        this.$axios({
          url: 'application/grandwcnv/' + this.ID + '/cnv/',
        }).then(function (respAll) {
          let str = '';
          $.each(respAll.data.query_params, function (i, value) {
            str += i + '=' + value + "&"
          });

          _vue.$axios({
            url: respAll.data.query_url + '?' + str + 'page=' + _vue.cnvPage,
//          url: 'report/cnvwgsinfo/?datafile=' + _vue.datafile + '&page=' + _vue.cnvPage
          }).then(function (resp) {
            _vue.cnvCount = resp.data.count;
            let id = 0;
            let genePostData = [];
            $.each(resp.data.results, function (i, value) {
              id += 1;
              value.id = id;
              //gene名和id綁定起來
              value.geneVue = [];
              $.each(value.annotations.geneSymbol, function (n1, n2) {
                $.each(value.annotations.geneId, function (n3, n4) {
                  if (n1 === n3) {
                    value.geneVue.push({
                      name: n2,
                      id: n4
                    });
                  }
                })
              });
              //疾病信息
              value.geneResp = [];
              $.each(value.annotations.geneId, function (n, k) {
                genePostData.push(k)
              });
//            $.each(value.annotations.geneUrl, function (k, data) {
//              _vue.$axios({
//                url: data,
//              }).then(function (geneResp) {
//                value.geneResp.push(geneResp.data);
//                k += 1;
//                if (k === value.annotations.geneUrl.length && i === resp.data.results.length - 1) {
//                  _vue.loading = false;
//                }
//              });
//            });
            });
            _vue.cnvData = resp.data.results;

            _vue.$axios({
              url: _vue.dbUrl+'knowledge/gene/dictbygeneids/',
              method: 'post',
              data: {
                geneids: genePostData
              }
            }).then(function (respA) {
              let count0 = 0;
              let count1 = 0;
              $.each(respA.data,function (k3,k4) {
                count1+=1;
              });
              $.each(respA.data, function (k1, k2) {
                count0 += 1;
                $.each(resp.data.results, function (n1, n2) {
                  $.each(n2.annotations.geneId, function (n3, n4) {
                    if (k1 == n4) {
//                    n2.geneResp.push(k2);
                      n2.geneResp.push({
                        geneId: n4,
                        geneData: k2
                      });
                    }
                  })
                });
                if(count0 === count1){
                  _vue.loading = false;
                }
              });
            });
          }).catch(function (error) {
            _vue.catchFun(error);
          });

        });

      },
      getCurrentDetail: function (data) {
        this.cnvPage = data;
        this.cnvReset = 0;
        this.toCNV();
      },
      showDetailCNV: function (event) {
        const _modal = $("#CNVDetail");
        const _vue = this;
        _modal.modal("show");
        //判断点击的是哪一个
        const id = $(event.target).data('id');
        let codeData = null;
        $.each(_vue.cnvData, function (i, value) {
          if (value.id === id) {
            codeData = value;
          }
        });
        this.CNVmoduleData = codeData;
        console.log(codeData.status)

        $("#CNV_select").find('option').each(function () {
          console.log($(this).val())
          if ($(this).val() === codeData.status) {
            $(this).attr('selected', 'selected');
            $(this).prop('selected', true)
          }
        });
        $("#commentCNV").val(codeData.comment); //强制更新评论内容，因为vue的惰性加载，值不变就不加载，导致上次评论未保存内容依旧存在
        //获取图片地址

//        this.$axios({
//          url: 'application/grandmgd/' + _vue.ID + '/image/?pos=' + codeData.localcnv.chrom +
//          ':' + codeData.localcnv.start + '-' + codeData.localcnv.end
//        }).then(function (resp) {
//          console.log(resp);
//          _vue.IMG = resp.data.url
//        })
      },
      patchEditCNV: function (url, eid) {
        const _comment = $("#commentCNV");
        const ajaxValue = $.trim(_comment.val());
        const _vue = this;
        this.$axios({
          url: url,
          method: 'patch',
          data: {
            'status': $("#CNV_select").find('option:selected').val(),
            'comment': ajaxValue
          }
        }).then(function (resp) {
          $.each(_vue.cnvData, function (i, data) {
            if (data.id === eid) {
              data.comment = ajaxValue;
              data.status = $("#CNV_select").find('option:selected').val()
            }
          });
          alert('修改成功!');
          $("#CNVDetail").modal('hide');
        });
      },
      showHPOCNV: function (id, data) {
        $("#hpo_detail_cnv").modal("show");
        this.loading = !$.isEmptyObject(data.omim.clinicalSynopsis);
        this.clinicalSynopsis = [];
        const _vue = this;
        let count = 0; //用来记clinicalSynopsis对象有多少个值
        let count1 = 0;
        $.each(data.omim.clinicalSynopsis, function (n2, data2) {
          count += 1; //对象里面的key个数
          data2.name = n2;
          let data2Length = 0;
          $.each(data2, function (n3, data3) {
            if (data3.hpo) {
              _vue.$axios({
                method: "get",
                url: _vue.dbUrl + 'knowledge/hpo/' + data3.hpo + '/',
              }).then(function (resp) {
                data3.hpoName = resp.data.titles.chinese;
                data2Length += 1;
                if (data2Length === data2.length) {
                  _vue.clinicalSynopsis.push(data2);
                  count1 += 1;
                  if (count1 === count) {
                    _vue.loading = false;
                  }
                }
              }).catch(function () {
                data2Length += 1;
                if (data2Length === data2.length) {
                  _vue.clinicalSynopsis.push(data2);
                  count1 += 1;
                  if (count1 === count) {
                    _vue.loading = false;
                  }
                }
              });
            } else {
              data2Length += 1;
              if (data2Length === data2.length) {
                _vue.clinicalSynopsis.push(data2);
                count1 += 1;
                if (count1 === count) {
                  _vue.loading = false;
                }
              }
            }
          });
        });
      },
      sortSyn: function (clinicalSynopsis) {
        let arr = [];
        let _vue = this;
        $.each(clinicalSynopsis, function (i, value) {
          if (value.name === 'dateCreated') { //剔除数据
            return;
          }
          $.each(_vue.sortArr, function (k, data) {
            if (value.name === data) {
              value.code = k;
            }
          });
          arr.push(value)
        });
        arr = arr.sort(function (a, b) {
          return a.code - b.code
        });
        return arr
      },
      toIMG: function () {
        const _vue = this;
        this.loading = true;
        this.$axios({
          url: 'application/grandwcnv/' + this.ID + '/images/'
        }).then(function (resp) {
          _vue.imgs = resp.data;
          _vue.loading = false;
        }).catch(function (error) {
          _vue.catchFun(error);
        });
      },
      showImg: function (event) {
        const _tr = $(event.target).closest('tr');
        const _index = $(event.target).data('index');
        let imgUrl = '';
        $.each(this.imgs, function (i, data) {
          if (i === _index) {
            imgUrl = data.url
          }
        });
        if (_tr.next().hasClass('hasImg')) {
          _tr.next().remove()
        } else {
          _tr.after(`<tr class="hasImg"><td colspan="2"><div style="text-align: center;width: calc(100vw - 250px);height: 100%;overflow: auto"><img style="width: 100%" src=${imgUrl} alt=""></div></td></tr>`)
        }
//        $(".hideImg").slideToggle();
      },
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip();
    },
    filters: {
      getStatus: function (status) {
        switch (status) {
          case 'major':
            return '主要的';
            break;
          case 'minor':
            return '次要的';
            break;
          case 'benign':
            return '良性的';
            break;
          case 'invalid':
            return '无效的';
            break;
          case '':
            return '未作标记';
            break;
        }
      }
      ,
      filterData: function (data) { //取百分比
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
  @inColor: rgb(44, 127, 210);
  @bcIn: rgb(240, 244, 247);
  @border: rgb(225, 226, 227);
  @bcTable: rgb(242, 242, 242);
  /* @bcTable:red*/
  tr {
    width: 100%;
  }

  .hideImg {
    /*display: none;*/
    width: 200px;
    height: 200px;
  }

  #settings {
    .title-content {
      /*margin-top: 20px;*/
      padding-top: 35px;
    }
  }

  #messages {
    > div.row.font-12 {
      padding-top: 30px;
    }
  }

  .all-content {
    .nav-tabs {
      border-bottom: 1px solid @border;
      margin-top: 30px;
      font-weight: bold;
      li:first-child {
        margin-left: 0;
      }
      li {
        margin-bottom: 1px;
        margin-left: 5px;
        height: 35px;
        a {
          padding: 2px 0 1px 0;
          width: 120px;
          text-align: center;
          color: inherit;
          background-color: @bcIn;
          margin-top: 10px;
          border-top: 1px solid @border;
          border-left: 1px solid @border;
          border-right: 1px solid @border;
          &:hover {
            border-bottom: 1px solid #fff;
          }
        }
      }
      li.active {
        border-bottom: 1px solid #fff;
        a {
          background-color: #fff;
          color: @inColor;
          margin-top: 3px;
          height: 100%;
          border-top: 1px solid @border;
          border-left: 1px solid @border;
          border-right: 1px solid @border;
          line-height: 34px;
        }
      }
    }
  }

  .tab-content {
    .row.font-12, .title-content.row {
      padding-top: 15px;
      margin-left: 0;
      margin-right: 0;
      border-left: 1px solid @border;
      border-right: 1px solid @border;
      border-bottom: 1px solid @border;
      padding-bottom: 40px;
      .filter-right {
        .row-div:first-child {
          margin-top: 40px;
        }
      }
    }
    #home {
      padding: 25px 0 100px 30px;
      border-left: 1px solid @border;
      border-right: 1px solid @border;
      border-bottom: 1px solid @border;
      .down-content {
        margin: 30px 0;
        font-weight: bold;
        > .inline {
          margin-right: 80px;
        }
        .flag-content {
          .red {
            /*display: inline-block;*/
            /*width: 16px;*/
            /*height: 16px;*/
            /*background-color: rgb(233,73,73);*/
            /*margin-right: 5px;*/
            color: rgb(233, 73, 73);
          }
        }
      }
      .table-content {
        width: 80%;
        border-left: 1px solid rgb(194, 194, 194);
        /*border-right: 1px solid rgb(194, 194, 194);*/
        overflow: hidden;
        table {
          margin: 0;
        }
        th, td {
          text-align: center;
          border-bottom: none;
          border-top: none;
        }
        .trIn {
          background-color: @bcTable;
        }
        .right-table {
          width: 40%;
          th {
            color: #fff;
          }
          .th-4 {
            background-color: rgb(44, 127, 210);
          }
        }
        .left-table {
          width: 60%;
          float: left;
          th {
            color: #fff;
          }
          td {
            border-right: 1px solid rgb(194, 194, 194);
          }
          .th-1 {
            background-color: rgb(255, 187, 52)
          }
          .th-2 {
            background-color: rgb(241, 69, 108)
          }
          .th-3 {
            background-color: rgb(0, 198, 148)
          }
          .th-4 {
            background-color: rgb(44, 127, 210);
          }
          .aln {
            div {
              height: 36px;
              line-height: 36px;
              /*padding: 8px;*/
              /*vertical-align: top;*/
            }
          }
        }
      }

    }
  }

  .btn-content {
    margin-top: 25px;
    margin-bottom: 25px;
    .btn-color-r.con-submit {
      margin-left: 40px;
    }
  }

  .showHPO {
    cursor: pointer;
    margin-left: 10px;
  }

  .sampleInfo {
    margin-bottom: 10px;
    font-weight: bold;
  }

  .submit-table {
    margin-top: 40px;
  }

  .filter-title {
    display: block;
    font-size: 15px;
  }

  .gene-name {
    margin-top: 10px;
    display: inline-block;
    margin-right: 50px;
    min-height: 100px;
    margin-left: 15px;
  }

  .filter-right {
    margin-top: 10px;
    /*font-size: 16px;*/
  }

  .no-textarea button {
    margin-left: 100px;
  }

  #messages, #myImg {
    padding: 20px;
    border-left: 1px solid #e1e2e3;
    border-right: 1px solid #e1e2e3;
    border-bottom: 1px solid #e1e2e3;
  }

  .task-result-table {
    /*margin-top: 20px;*/
  }

  .my-form-control {
    display: block;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  .infoView-title {
    font-size: 15px;
    margin-bottom: 15px;
  }

  .special-p {
    float: left;
    background-color: #CC0033;
    height: 20px;
    width: 50px;
  }

  .special-p-text {
    float: left;
    margin-left: 5px;
  }

  .insertsize-content {
    margin-top: 20px;
  }

  .infoView-left {
    padding: 20px;
    background-color: #e5e5e5;
    height: 680px;
  }

  .infoView-right {
    padding: 20px;
    background-color: #e5e5e5;
    height: 680px;
  }

  .fastqc-content {
    margin-top: 40px;
  }

  .fastq {
    margin-top: 5px;
    display: block;
    cursor: pointer;
    margin-left: 20px;
  }

  #detail-t .active {
    color: red;
  }

  #mutateDetail .active {
    color: red;
  }

  #id_modal .row {
    margin: 10px 0;
  }

  .edit {
    margin: 30px 15px;
  }

  .edit-content {
    margin: 15px 0;
  }

  .edit-title {
    margin-bottom: -5px;
    font-size: 16px;
  }

  #info-contrast table {
    margin-top: 30px;
  }

  .noFound {
    margin-top: 30px;
  }

  #aberrance #detail-t .bc-active, #aberrance1 .bc-active {
    background-color: rgb(240, 244, 247);
    /*color: #fff;*/
  }

  .bc-active a {
    /*color: #fff;*/
  }

  .noFound-a {
    margin: 0 3px;
  }

  .analyze-footer {
    padding: 15px 28px;
  }

  .dbfreq-content span {
    float: left;
    margin-top: 1px;
    margin-right: 5px;
  }

  /*筛选条件的样式*/
  .filter-left {
    /*margin-top: 15px;*/
  }

  .filter-left textarea {
    /*float: none;*/
    /*margin: 0;*/
    width: 100%;
  }

  .row-div {
    margin: 10px 0;
    min-height: 20px;
  }

  .row-name {
    float: left;
    margin-top: 5px;
  }

  .row-content {
    float: left;
    display: inline-block;
  }

  .condition {
    cursor: pointer;
    padding: 0 8px;
    display: inline-block;
    height: 28px;
    line-height: 28px;
    margin: 0 5px 5px 5px;
    border: 1px solid #fff;
  }

  .condition:hover {
    border: 1px solid rgb(194, 194, 194);
  }

  .condition.on {
    border: 1px solid rgb(44, 127, 210);
    color: rgb(44, 127, 210);
    display: inline-block;
    font-weight: bold;
    font-size: 12px;
    background-size: 32px 32px;
  }

  #CNVDetail .row {
    margin: 10px 0;
  }

  #CNVDetail .row.specialRow {
    margin: 10px 15px;
    word-break: break-all;
  }

  a.a-color, a.a-color:focus, a.a-color:hover {
    color: inherit;
  }

  .fliter-gene {
    cursor: pointer;
  }

  .fliter-gene.on {
    /*color: #337ab7;*/
  }

  .row-div .gene-i {
    left: 80px;
    top: 4px;
    color: #337ab7;
  }

  .btn-content {
    /*text-align: center;*/
    /*padding-left: 13px;*/
    clear: both;
  }

  .con-submit {
    /*margin-left: 15px;*/
  }

  .CNV-input {
    display: inline-block;
    width: 80%;
  }

  .center {
    text-align: center;
  }

  .img-content {
    width: 100%;
    text-align: center;
  }

  #messages .btn-content {
    padding-left: 0;
    margin-top: 20px;
  }

  #messages .gene-span {
    min-width: 60px;
  }

  .row-name {
    font-weight: bold;
  }

  .noStandard {
    color: red;
  }

  .title {
    margin-bottom: 20px;
  }

  .find-cover {
    margin-top: 5px;
  }

  #showPanel {
    margin-left: 100px;
  }

  #modal-panel {
    .row:first-child {
      margin-bottom: 30px;
    }
    textarea {
      width: 98%;
      height: 100px;
    }
  }

  .text-1 {
    color: #f1456c;
  }

  .text-2 {
    color: #ffbb34;
  }

  .text-3 {
    color: #2c7fd2;
  }

  .active1 {
    color: #f1456c;
  }

  .active2 {
    color: #ffbb34;
  }

  .active3 {
    color: #2c7fd2;
  }

  .active4 {
    color: #d3d3d3;
  }

</style>
