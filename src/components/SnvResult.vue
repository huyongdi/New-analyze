<!--suppress HtmlUnknownTag -->
<template>
  <div class="row" id="snvResult">
    <loading v-if="loading0"></loading>
    <loading v-if="loading1"></loading>
    <loading v-if="loading3"></loading>
    <div class="done-list col-md-10">
      <div class="title">
        <span class="title-b">任务详情</span>
        <span class="title-s">< {{sampleInfo}}</span>
        <span class="span-a change-panel" @click="showPanelModal">修改panel</span>
      </div>
      <div class="all-content">
        <div class="title-list">
          <div @click="changeContent" data-type="0" class="title-single active">质控统计</div>
          <div @click="changeContent" data-type="1" class="title-single">变异详情</div>
        </div>
        <div class="detail-content">
          <div class="content-0" :class="{hide:!in0}">
            <div class="bold">质控详情</div>
            <ul class="bold">
              <li>
                基因分析报告 :
                <router-link target="_blank" class="common-a"
                             :to="{path:'report',query:{code:datafile,app:'grandanno'}}">点击查看
                </router-link>
              </li>
            </ul>
            <table>
              <thead>
              <tr>
                <th class="th-1">类别</th>
                <th class="th-2">值</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(list,index) in lists0" :class="{'trIn':index%2}">
                <td>{{list.name}}</td>
                <td>{{list.value}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="content-1" :class="{hide:!in1}">
            <div class="rea">
              <span class="my-btn pull-right condition" @click.stop="filtrateShow1Fun"><img
                src="../../static/img/red-con.png"
                alt="">筛选条件</span>
              <!--筛选条件弹框-->
              <div class="filtrate-content hide" @click.stop="" id="filtrate-content">
                <img src="../../static/img/th-1.png" alt="" class="up">
                <div class="title">搜索选项</div>
                <div class="content">
                  <div class="single">
                    <div class="left" data-name="report">数据库报道：</div>
                    <div class="right">
                      <span class="option" data-value="p">致病性</span>
                      <span class="option" data-value="o">其他</span>
                      <span class="option" data-value="f">未报道</span>
                      <span class="option in default">不筛选</span>
                      <i class="fa fa-question-circle-o po flag-q" data-toggle="tooltip" data-placement="top"
                         data-html="true" data-title="<div style='text-align:left'>致病性满足任一条件：</div>
                                             <div style='text-align:left;padding-left:5px'>1.CLINVAR包含Pathogenic</div>
                                             <div style='text-align:left;padding-left:5px'>2.CLINVAR包含Likely pathogenic</div>
                                             <div style='text-align:left;padding-left:5px'>3.HGMD为DM</div>">
                      </i>
                    </div>
                  </div>
                  <div class="single">
                    <div class="left" data-name="inheritance">遗传方式：</div>
                    <div class="right">
                      <span class="option in default" data-value="All">全部</span>
                      <span class="option" data-value="AR">AR</span>
                      <span class="option" data-value="AD">AD</span>
                      <span class="option" data-value="XR">XR</span>
                      <span class="option" data-value="XD">XD</span>
                      <span class="option" data-value="X-linked">X-LINKED</span>
                      <span class="option" data-value="Y-linked">Y-LINKED</span>
                      <span class="option" data-value="Other">其它</span>
                      <span class="option">不筛选</span>
                    </div>
                  </div>
                  <div class="single">
                    <div class="left" data-name="func">突变类型：</div>
                    <div class="right">
                      <span class="option" data-value="stop">stop*</span>
                      <span class="option" data-value="nonsyn">nonsynonymous</span>
                      <span class="option" data-value="splic">splicing</span>
                      <span class="option" data-value="frameshift">(non)frameshift</span>
                      <span class="option in default">不筛选</span>
                    </div>
                  </div>
                  <div class="single">
                    <div class="left" data-name="ratio">突变比例：</div>
                    <div class="right">
                      <span class="option" data-value="0.9-1">0.9-1</span>
                      <span class="option" data-value="0.2-0.9">0.2-0.9</span>
                      <span class="option" data-value="0-0.2">0-0.2</span>
                      <span class="option in default">不筛选</span>
                    </div>
                  </div>
                  <div class="single">
                    <div class="left" data-name="depth">测序深度：</div>
                    <div class="right">
                      <span class="option" data-value="10-20">10-20</span>
                      <span class="option" data-value=">20">>20</span>
                      <span class="option in default">不筛选</span>
                    </div>
                  </div>
                  <div class="single">
                    <div class="left" data-name="dbfreq">普通人群携带率低于：</div>
                    <div class="right">
                      <span class="option" data-value="0">0</span>
                      <span class="option" data-value="0.0001">0.01%</span>
                      <span class="option" data-value="0.001">0.1%</span>
                      <span class="option" data-value="0.01">1%</span>
                      <span class="option" data-value="0.02">2%</span>
                      <span class="option" data-value="0.05">5%</span>
                      <span class="option in default">不筛选</span>
                    </div>
                  </div>
                  <div class="single">
                    <div class="left" data-name="grandfreq">本地人群携带率低于：</div>
                    <div class="right">
                      <span class="option" data-value="0">0</span>
                      <span class="option" data-value="0.0001">0.01%</span>
                      <span class="option" data-value="0.001">0.1%</span>
                      <span class="option" data-value="0.01">1%</span>
                      <span class="option" data-value="0.02">2%</span>
                      <span class="option" data-value="0.05">5%</span>
                      <span class="option in default">不筛选</span>
                    </div>
                  </div>
                  <div class="single">
                    <div class="left" data-name="status">状态：</div>
                    <div class="right">
                      <span class="option" data-value="true">已标记</span>
                      <span class="option" data-value="false">未标记</span>
                      <span class="option in default">不筛选</span>
                    </div>
                  </div>
                  <div class="single">
                    <div class="left" data-name="genes">基因：</div>
                    <div class="right">
                      <textarea placeholder='请用逗号或换行隔开' v-model="geneTextArea"></textarea>

                    </div>
                  </div>
                </div>
                <span class="my-btn search-btn" @click="filter"><img src="../../static/img/red-con.png" alt="">搜索</span>
                <span class="my-btn refresh" @click="resetFilter"><img src="../../static/img/red-refresh.png"
                                                                       alt="">重置</span>
              </div>
            </div>

            <table class="table my-table" id="table-1">
              <thead>
              <tr>
                <th>位点
                  <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                     data-original-title="红色代表最高级，黄色代表第二级，蓝色代表第三级">
                  </i>
                </th>
                <th>基因</th>
                <th>区域</th>
                <th>功能</th>
                <th>疾病</th>
                <th>CLINVAR</th>
                <th>HGMD</th>
                <th>东亚人群频率(EXOME/GENOME%)</th>
                <th>本地人群频率(%)</th>
                <th>变异比例(%)</th>
                <th>状态</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="data in lists1">
                <td>
                  <i title="查看详情" class="fa fa-font-awesome po" @click="showDetail(data,0,data.id)"
                     :class="{'text-1':data.level == 0,'text-2':data.level==1,'text-3':data.level==2}"></i>
                  <a class="po common-a" v-if="data.variant"
                     @click="showLocus(data.variant.chrom+':'+data.variant.start+':'+data.variant.end+':'+data.variant.ref+':'+data.variant.alt,0)">
                    <span
                      v-if="data.variant.start == data.variant.end">{{data.variant.chrom}}:{{data.variant.start}}({{data.variant.ref}}/{{data.variant.alt}})</span>
                    <span
                      v-else="">{{data.variant.chrom}}:{{data.variant.start}}-{{data.variant.end}}({{data.variant.ref}}/{{data.variant.alt}})</span>
                  </a>
                </td>
                <td>
                  <span v-if="data.anno">
                    <a class="common-a" target="_blank" v-if="data.anno.genes.symbols" v-for="(oneGene,index) in data.anno.genes.symbols"
                       :href="dbHtml+'#/gene?n='+oneGene">
                      {{oneGene}} <span v-if="index!==data.anno.genes.symbols.length-1">,</span>
                    </a>
                  </span>
                </td>
                <td>
                  <span v-if="data.anno">{{data.anno.regions.join(',')}}</span>
                </td>
                <td>
                  <span v-if="data.anno &&data.anno.funcs.length!=0">{{data.anno.funcs.join(',')}}</span><span v-else="">-</span>
                </td>
                <diseaseTd :geneResp="data.geneResp" @sendPhenotypeMapSingle="getPhenotypeMapSingle"></diseaseTd>

                <td><span v-if="data.dbinfo&&data.dbinfo.clinvar.length!=0">{{data.dbinfo.clinvar.join(',')}}</span><span v-else="">-</span></td>
                <td><span v-if="data.dbinfo&&data.dbinfo.hgmd">{{data.dbinfo.hgmd}}</span><span v-else="">-</span></td>
                <td><span v-if="data.anno.freqs">{{data.anno.freqs.dbfreq.exome | getPercent}}/{{data.anno.freqs.dbfreq.genome | getPercent}}</span>
                </td>
                <td><span v-if="data.anno.freqs">{{data.anno.freqs.grandfreq | getPercent}}</span></td>
                <td><span v-if="data.info">{{data.info.ratio | getPercent}}</span></td>
                <td
                  :class="{ active1: data.edit.status=='major',active2: data.edit.status=='minor',active3: data.edit.status=='benign',
                  active4: data.edit.status=='invalid'}">
                  {{data.edit.status | getStatus}}
                </td>
              </tr>

              </tbody>
            </table>
            <page :childCount="count1" :childReset="reset1" @childCurrent="getCurrent"></page>
          </div>
        </div>
      </div>
    </div>

    <locusModal :datafile="datafile" :locus="locus" :type="type"></locusModal>
    <panelModal @saveData="savePanel" :originalGeneInput='geneInput'
                :originalPanelData="originalPanelData"></panelModal>
    <hpoModal :clinicalSynopsisObj="phenotypeMapSingle"></hpoModal>
    <mutateModal @changeStatus="getMutateModalStatus" :moduleDataFromFather="moduleData" :ID="ID" app="grandanno" :postId="snvId"></mutateModal>
  </div>
</template>

<script>
  import page from './global/Page.vue'
  import panelModal from './global/PanelModal.vue'
  import diseaseTd from './global/DiseaseTd.vue'
  import locusM from './global/LocusModal.vue'
  import mutateModal from './global/MutateModal.vue'
  import hpoModal from './global/HpoModal.vue'
  import geneCover from './global/GeneCover.vue'

  export default {
    components: {
      'page': page,
      'panelModal': panelModal,
      'diseaseTd': diseaseTd,
      'locusModal': locusM,
      'mutateModal': mutateModal,
      'hpoModal': hpoModal,
      'geneCover': geneCover,
    },
    data: function () {
      return {
        //公用
        locus: '',
        type: 0,
        phenotypeMapSingle: '',
        ID: this.$route.query.id,
        datafile: '',
        sampleInfo: '',
        in0: true,
        in1: '',
        in2: '',
        in3: '',
        geneInput: '',
        originalPanelData: [],
        loading3: false,
        //content-0
        loading0: false,
        R1: '',
        R2: '',
        insert: '',
        CSV: '',
        lists0: [],
        //content-1
        loading1: false,
        lists1: [],
        geneTextArea: '',
        geneTextAreaShow: false,
        count1: 0,
        page1: 1,
        reset1: 0,
        moduleData: '',
        filtrateShow1: false,

        //请求链接cnv snv
        snvUrl: '',
        cnvUrl: '',
        csv: {},
        snvId: 0
      }
    },
    mounted: function () {
      this.bindCurrent();//绑定变异详情的过滤点击事件
      this.getSampleAndUrl();
      this.getStat()
//      this.getSample();
//      this.current0();
    },
    methods: {
      //查看位点信息
      showLocus: function (locus, type) {
        this.locus = locus;
        this.type = type;
        $("#locusM").modal('show')
      },
      /*修改panel*/
      showPanelModal: function () {
        const _vue = this;
        this.myAxios({
          url: 'sample/genelist/' + _vue.datafile + '/'
        }).then(function (resp) {
          _vue.originalPanelData = [];
          $.each(resp.data.panelCode, function (i, data) {
            _vue.originalPanelData.push({
              key: data,
              value: data
            });
          });
          _vue.geneInput = resp.data.customGene.join(',');
        }).catch(function (error) {
          _vue.catchFun(error);
        });
        $("#panelModal").modal('show');
      },
      savePanel: function (data) {
        let panelArr = [];
        $.each(data.panel, function (i, n) {
          panelArr.push(n.key)
        });
        this.myAxios({
          url: 'sample/genelist/' + this.datafile + '/',
          method: 'patch',
          data: {
            panelCode: panelArr,
            customGene: data.gene
          }
        }).then(function () {
          alert('提交成功');
          $("#panelModal").modal('hide');
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      //获取样本信息
      getSampleAndUrl: function () {
        const _vue = this;
        this.myAxios({
          url: 'application/job/' + this.ID + '/url/'
        }).then(function (resp) {
          const data = resp.data;
          //QC和inse
          if (data.files) {
            if (data.files.fastqc) {
              _vue.R1 = data.files.fastqc[0];
              _vue.R2 = data.files.fastqc[1];
            }
            _vue.insert = data.files.insertsize;
            _vue.csv = data.files.csv;
          }

          //CNV.SNV
//          if(data.cnv){
//            _vue.cnvUrl = resp.data.cnv.query_url + '?';
//            $.each(data.cnv.query_params, function (i, data) {
//              _vue.cnvUrl += '&' + i + '=' + data
//            });
//            _vue.getList2();
//          }
          if (data.snv) {
            _vue.snvUrl = resp.data.snv.query_url + '?';
            $.each(data.snv.query_params, function (i, data) {
              _vue.snvUrl += '&' + i + '=' + data
            });
            _vue.getList1();
          }
        });

        this.myAxios({
          url: 'application/job/' + this.ID + '/'
        }).then(function (resp) {
          _vue.sampleInfo = resp.data.name;
          _vue.datafile = resp.data.parameter.datafile;
        })

      },
      //切换导航
      changeContent: function (event) {
        const _current = $(event.target);
        const current = _current.data("type");
        _current.parent().find('.active').removeClass('active');
        _current.addClass('active');
        this.in0 = '';
        this.in1 = '';
        this.in3 = '';
        if (current === 0) {
          this.in0 = true;
          this.current0();
        } else if (current === 1) {
          this.in1 = true;
          this.current1();
        } else if (current === 3) {
          this.in3 = true;
          this.current3();
        }
      },
      //绑定基础操作
      bindCurrent: function () {
        $('.option').on("click", function () {
          $(this).parent().find('.in').removeClass('in');
          $(this).addClass('in')
        });
      },
      resetFilter: function () {
        this.geneTextArea = '';
        this.geneTextAreaContent2 = '';
        $(".default").each(function () {
          $(this).parent().find('.in').removeClass('in');
          $(this).addClass('in')
        })
      },
      //每个块域的逻辑
      /*疾病TD里面显示hpo的弹框*/
      getPhenotypeMapSingle: function (data) {
        this.phenotypeMapSingle = data;
      },
      getStat: function () {
        this.loading0 = true;
        const _vue = this;
        //列表
        this.myAxios({
          url: 'application/job/' + this.ID + "/stat/",
        }).then(function (resp) {
           resp = resp.data;
          $.each(resp, function (k, n) {
            _vue.lists0.push({
              name: k,
              value: n
            })
          });
          _vue.loading0 = false
        }).catch(function (error) {
          _vue.catchFun(error);
        });
      },
      current1: function () {
        if (this.lists1.length === 0) {
          this.getList1();
        }
      },
      getList1: function () {
        this.loading1 = true;
        let urlParam = '';
        $('#filtrate-content').find('.option').each(function () {
          if ($(this).html() !== '不筛选' && $(this).hasClass('in')) {
            urlParam += '&' + $(this).parent().prev().data('name') + '=' + $(this).data('value');
          }
        });
        if (this.geneTextArea) {
          urlParam += '&genes=' + this.strToArr(this.geneTextArea)
        }
        //条件判断结束
        const _vue = this;
        this.lists1 = [];
        _vue.myAxios({
          url: _vue.snvUrl + '&page=' + _vue.page1 + urlParam,
        }).then(function (resp) {
          if (resp.data.count === 0) {
            _vue.loading1 = false
          }
          _vue.count1 = resp.data.count;
          let genePostData = [];
          $.each(resp.data.results, function (i, value) {
            //处理highlight和active得到级别(highlight为true的时候active必定为true)
            if (value.flag.highlight && value.flag.active) {
              value.level = 0
            } else if (!value.flag.highlight && value.flag.active) {
              value.level = 1
            } else if (!value.flag.highlight && !value.flag.active) {
              value.level = 2
            }
            $.each(value.anno.genes.geneids, function (n, k) {
              if (!genePostData.join(',').includes(k)) {
                genePostData.push(k)
              }
            });
            value.geneResp = [];
          });
          _vue.lists1 = resp.data.results;
          _vue.myAxios({
            url: _vue.dbUrl + 'knowledge/gene/dictbygeneids/',
            method: 'post',
            data: {
              geneids: genePostData
            }
          }).then(function (respA) {
            let count0 = 0;
            let count1 = 0;
            $.each(respA.data, function () {
              count1 += 1;
            });
            $.each(respA.data, function (k1, k2) {
              count0 += 1;
              $.each(resp.data.results, function (n1, n2) {
                $.each(n2.anno.genes.geneids, function (n3, n4) {
                  if (k1 == n4) {
                    n2.geneResp.push({
                      geneId: n4,
                      geneData: k2
                    });
                  }
                })
              });
              if (count0 === count1) {
                _vue.loading1 = false
              }
            });
          });
        });
      },
      filtrateShow1Fun: function () {
//        this.filtrateShow1 = !this.filtrateShow1
        this.switchHide('filtrate-content');
      },
      showDetail: function (data, type, postId) {
        const _vue = this;
        _vue.moduleData = data;
        _vue.snvId = postId;
        $("#mutateDetailModal").modal('show');
      },
      getMutateModalStatus: function (newStatus) {
        const _vue = this;
        $.each(_vue.lists1, function (i, data) {
          if (data.id == _vue.snvId) {
            data.edit.status = newStatus.status;
            data.edit.comment = newStatus.comment;
            data.edit.validation = newStatus.validation
          }
        })
      },
      getCurrent: function (data) {
        this.page1 = data;
        this.reset1 = 0;
        this.getList1();
      },
      filter: function () {
        this.page1 = 1;
        this.reset1 = 1;
        this.getList1();
        this.filtrateShow1 = false;
      },
      current3: function () {

      },
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip();
    },
    filters: {
      getPercent: function (data) {
//        if (data == 0) {
//          return 0;
//        }
//        data = data * 100;
//        data = data.toFixed(2);
//        return data
        return Math.round(data*10000)/100

      },
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
    }

  }
</script>

<style scoped lang="less">
  @border: rgb(193, 192, 192);
  @tableSha: rgb(185, 184, 184);
  @in: rgb(44, 127, 210);
  @red: rgb(233, 73, 73);

  #snvResult {
    .all-content {
      table {
        box-shadow: none;
      }
      margin: 15px 0 0 0;
      .change-panel {
        margin-left: 50px;
      }
      .flag-q {
        margin: 8px;
      }
      .title-list {
        width: 486px;
        border-bottom: 1px solid @border;
        font-weight: bold;
        margin-bottom: -1px;
        position: relative;
        z-index: 10;
        .title-single {
          display: inline-block;
          width: 116px;
          height: 27px;
          padding-top: 3px;
          vertical-align: bottom;
          background-color: #fff;
          text-align: center;
          border-top: 1px solid @border;
          border-left: 1px solid @border;
          border-right: 1px solid @border;
          border-top-right-radius: 3px;
          border-top-left-radius: 3px;
          /*margin-left: 3px;*/
          cursor: pointer;
        }
        .title-single:first-child {
          margin: 0;
          box-shadow: -3px 0 5px -2px rgb(200, 200, 200);
        }
        .title-single.active {
          height: 35px;
          border-top: 4px solid rgb(0, 118, 192);
          padding-top: 7px;
          margin-bottom: -1px;
          color: @in;
        }
      }
      .detail-content {
        min-height: 300px;
        border: 1px solid @tableSha;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
        box-shadow: 0 0 20px 3px rgb(200, 200, 200);
        background-color: #fff;
        position: relative;
        > div {
          padding: 20px 30px 35px 30px;
        }
        table#table-1, table#table-2 {
          margin-top: 50px;
          .text-1, .active1 {
            color: #f1456c;
          }
          .text-2, .active2 {
            color: #ffbb34;
          }
          .text-3, .active3 {
            color: #2c7fd2;
          }
          .active4 {
            color: #d3d3d3;
          }
        }
        #filtrate-content, #filtrate-content-2 {
          .option {
            float: left;
            padding: 3px 8px;
            border: 1px solid #fff;
            cursor: pointer;
            margin: 2px;
            &:hover {
              border: 1px solid #b9b8b8;
            }
          }
          .option.in {
            border: 1px solid #0076c0;
            color: #2c7fd2;
            font-weight: bold;
          }
        }
        #filtrate-content {
          width: 520px;
          .search-btn {
            margin-left: 130px;
          }
          .refresh {
            margin-left: 50px;
          }
          .content {
            textarea {
              min-height: 100px;
              width: 100%;
              float: left;
              margin-top: 10px;
            }
            .left {
              width: 140px;
              margin-top: 6px;
            }
            .right {
              width: 350px;
            }
          }
        }
        #filtrate-content-2 {
          width: 310px;
          .search-btn {
            margin-left: 40px;
          }
          .refresh {
            margin-left: 20px;
          }
          .content {
            textarea {
              min-height: 100px;
              width: 100%;
              float: left;
              margin-top: 10px;
            }
            .left {
              width: 80px;
              margin-top: 6px;
            }
            .right {
              width: 200px;
            }
          }
        }
        .content-0 {
          .red {
            color: @red;
          }
          ul {
            padding-left: 0;
            margin: 23px 0;
            li {
              display: inline-block;
              margin-right: 80px;
              .r1 {
                margin-right: 10px;
              }
            }
          }
          table {
            width: 100%;
            max-width: 100%;
            border-spacing: 0;
            border-collapse: collapse;
            thead {
              tr {
                th {
                  text-align: center;
                  color: #fff;
                  padding: 13px 0;
                }
                .th-1 {
                  background-color: rgb(255, 187, 52);
                  border-left: 1px solid rgb(255, 187, 52);
                }
                .th-2 {
                  background-color: rgb(241, 69, 108)
                }
                .th-3 {
                  background-color: rgb(0, 198, 148)
                }
                .th-4 {
                  background-color: rgb(44, 127, 210);
                  border-right: 1px solid rgb(44, 127, 210);
                }
              }
            }
            tbody {
              cursor: pointer;
              border-left: 1px solid rgb(211, 211, 211);
              border-right: 1px solid rgb(211, 211, 211);
              border-bottom: 1px solid rgb(211, 211, 211);
              tr {
                td {
                  padding: 9px 30px;
                  border-left: 1px solid rgb(211, 211, 211);
                  border-bottom: 1px dashed rgb(225, 226, 227);
                }
                .td-1 {
                  padding-left: 46px;
                }
              }
            }
          }
        }
        .filter-content {
          font-size: 12px;
          ul {
            margin-top: 10px;
            padding-left: 0;
            li {
              .title {
                font-weight: bold;
                display: inline-block;
                margin: 12px 20px 12px 0;
              }

              .option {
                padding: 5px 10px;
                border: 1px solid #fff;
                cursor: pointer;
                &:hover {
                  border: 1px solid #b9b8b8;
                }
              }
              .option.in {
                border: 1px solid #0076c0;
                color: #2c7fd2;
                font-weight: bold;
              }
              .fa-chevron-right {
                color: #2c7fd2;
              }
              .left {
                width: 50%;
              }
            }
            .textarea-li {
              overflow: hidden;
              .click-content {
                float: left;
                cursor: pointer;
              }
              textarea {
                min-height: 100px;
                width: 80%;
                float: left;
                margin-left: 28px;
                margin-top: 10px;
              }
            }
          }
        }
        .btn-content {
          clear: both;
          margin-top: 20px;
          .condition {
            margin-right: 30px;
          }
        }
      }
    }
  }


</style>
