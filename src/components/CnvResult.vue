<!--suppress HtmlUnknownTag -->
<template>
  <div class="row" id="cnvResult">
    <loading v-if="loading0"></loading>
    <loading v-if="loading1"></loading>
    <loading v-if="loading2"></loading>
    <div class="done-list col-md-10 ">
      <div class="title">
        <span class="title-b">任务详情</span>
        <span class="title-s">< {{sampleInfo}}</span>
        <span class="span-a change-panel" @click="showPanelModal">修改panel</span>
      </div>
      <div class="all-content">
        <div class="title-list">
          <div @click="changeContent" data-type="0" class="title-single active">质控统计</div>
          <div @click="changeContent" data-type="1" class="title-single">CNV</div>
          <div @click="changeContent" data-type="2" class="title-single">CHROM图</div>
        </div>
        <div class="detail-content">
          <div class="content-0" :class="{hide:!in0}">
            <div class="bold">质控详情</div>
            <ul class="bold">
              <li>
                基因分析报告 :
                <router-link target="_blank" class="common-a"
                             :to="{path:'report',query:{code:datafile,app:'grandwcnv'}}">点击查看
                </router-link>
              </li>
            </ul>
            <table>
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
          <div class="content-1" :class="{hide:!in1}">
            <div class="rea">
              <!--<span class="my-btn pull-right condition" @click.stop="filtrateShow1Fun"><img-->
                <!--src="../../static/img/red-con.png"-->
                <!--alt="">筛选条件</span>-->
              <!--筛选条件弹框-->
              <div class="filtrate-content hide" id="filtrate-content" @click.stop="">
                <img src="../../static/img/th-1.png" alt="" class="up">
                <div class="title">搜索选项</div>
                <div class="content">
                  <div class="single">
                    <div class="left" data-name="clinvar">CLINVAR：</div>
                    <div class="right">
                      <span class="option" data-value="true">已报道</span>
                      <span class="option" data-value="false">未报道</span>
                      <span class="option in default">不筛选</span>
                    </div>
                  </div>
                  <div class="single">
                    <div class="left" data-name="mitipact">MITIPACT：</div>
                    <div class="right">
                      <span class="option" data-value="true">已报道</span>
                      <span class="option" data-value="false">未报道</span>
                      <span class="option in default">不筛选</span>
                    </div>
                  </div>
                  <div class="single">
                    <div class="left" data-name="mitomap">MITOMAP：</div>
                    <div class="right">
                      <span class="option" data-value="true">已报道</span>
                      <span class="option" data-value="false">未报道</span>
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
                    <div class="left" data-name="grandfreq">普通人群携带率低于：</div>
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

                </div>
                <span class="my-btn search-btn" @click="filter"><img src="../../static/img/red-con.png" alt="">搜索</span>
                <span class="my-btn refresh" @click="resetFilter"><img src="../../static/img/red-refresh.png"
                                                                       alt="">重置</span>
              </div>
            </div>

            <table class="table my-table" id="table-1">
              <thead>
              <tr>
                <th>位点</th>
                <th>长度</th>
                <th>基因</th>
                <th>区域</th>
                <th>疾病</th>
                <th>相对深度</th>
                <th>人群平均深度</th>
                <th>人群深度标准差</th>
                <th>状态</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="data in lists1">
                <td>
                  <i title="查看详情" class="fa fa-font-awesome po" @click="showDetail(data,1,data.id)"
                     :class="{'text-1':data.level == 0,'text-2':data.level==1,'text-3':data.level==2}"></i>
                  <a class="po common-a" v-if="data.variant"
                     @click="showLocus(data.variant.chrom+':'+data.variant.start+':'+data.variant.end+':'+data.variant.ref+':'+data.variant.alt,0)">
                    <span
                      v-if="data.variant.start == data.variant.end">{{data.variant.chrom}}:{{data.variant.start}}({{data.variant.ref}}/{{data.variant.alt}})</span>
                    <span
                      v-else="">{{data.variant.chrom}}:{{data.variant.start}}-{{data.variant.end}}({{data.variant.ref}}/{{data.variant.alt}})</span>

                  </a>
                </td>
                <td>{{data.length?data.length:'-'}}</td>
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
                <diseaseTd :geneResp="data.geneResp" @sendPhenotypeMapSingle="getPhenotypeMapSingle"></diseaseTd>
                <td><span v-if="data.info && data.info.wgs">{{data.info.wgs.mCPratio}}</span><span v-else=""> - </span></td>
                <td><span v-if="data.info && data.info.wgs">{{data.info.wgs.mDepOfPopu}}</span><span v-else=""> - </span></td>
                <td><span v-if="data.info && data.info.wgs">{{data.info.wgs.stdOfPopDep}}</span><span v-else=""> - </span></td>
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
          <div class="content-2" :class="{hide:!in2}">
            <table class="table my-table">
              <thead>
              <tr>
                <th>类别名</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(img,index) in imgs">
                <td>
                  <span>{{img.name}}</span>
                </td>
                <td>
                  <a href="javascript:void(0)" :data-index="index" @click="showImg">点击查看图片</a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <locusModal :datafile="datafile" :locus="locus" :type="1"></locusModal>
    <panelModal @saveData="savePanel" :originalGeneInput='geneInput'
                :originalPanelData="originalPanelData"></panelModal>
    <hpoModal :clinicalSynopsisObj="phenotypeMapSingle"></hpoModal>
    <mutateModal @changeStatus="getMutateModalStatus" :moduleDataFromFather="moduleData" :ID="ID" app="grandwcnv" :postId="cnvId"></mutateModal>
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
        statData:'',
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
        //content-2
        imgs:[],
        loading2:false,

        //请求链接cnv snv
        snvUrl: '',
        cnvUrl: '',
        cnvId:''
      }
    },
    mounted: function () {
      this.bindCurrent();//绑定变异详情的过滤点击事件
      this.getSampleAndUrl();
      this.getStat();
      this.current2();
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
          if(data.files){
            if(data.files.fastqc){
              _vue.R1 = data.files.fastqc[0];
              _vue.R2 = data.files.fastqc[1];
            }
            _vue.insert = data.files.insertsize;
            _vue.csv = data.files.csv;
          }

          //CNV
          if(data.cnv){
            _vue.cnvUrl = resp.data.cnv.query_url + '?';
            $.each(data.cnv.query_params, function (i, data) {
              _vue.cnvUrl += '&' + i + '=' + data
            });
            _vue.getList1();
          }
//          if(data.snv){
//            _vue.snvUrl = resp.data.snv.query_url + '?';
//            $.each(data.snv.query_params, function (i, data) {
//              _vue.snvUrl += '&' + i + '=' + data
//            });
//            _vue.getList1();
//          }
        });

        this.myAxios({
          url: 'application/job/' + this.ID + '/'
        }).then(function (resp) {
          _vue.sampleInfo = resp.data.name;
          _vue.datafile = resp.data.parameter.datafile;
        })

      },
      getStat:function () {
        this.loading0 = true;
        const _vue = this;
        //列表
        this.myAxios({
          url: 'application/job/' + this.ID + "/stat/",
        }).then(function (resp) {
          _vue.statData = resp.data;
          _vue.loading0 = false
        }).catch(function (error) {
          _vue.catchFun(error);
        });
      },
      //切换导航
      changeContent: function (event) {
        const _current = $(event.target);
        const current = _current.data("type");
        _current.parent().find('.active').removeClass('active');
        _current.addClass('active');
        this.in0 = '';
        this.in1 = '';
        this.in2 = '';
        if (current === 0) {
          this.in0 = true;
        } else if (current === 1) {
          this.in1 = true;
        } else if (current === 2) {
          this.in2 = true;
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
      current1: function () {
        if (this.lists1.length === 0) {
          this.getList1();
        }
      },
      getList1: function () {
        this.loading1 = true;
        const _vue = this;
        this.lists1 = [];
          _vue.myAxios({
            url: _vue.cnvUrl + '&page=' + _vue.page1,
          }).then(function (resp) {
            _vue.count1 = resp.data.count;
            if(!_vue.count1){
              _vue.loading1 = false
            }
            let genePostData = [];
            $.each(resp.data.results, function (i, value) {
//              //gene名和id綁定起來
//              value.geneVue = [];
//              $.each(value.annotations.geneSymbol, function (n1, n2) {
//                $.each(value.annotations.geneId, function (n3, n4) {
//                  if (n1 === n3) {
//                    value.geneVue.push({
//                      name: n2,
//                      id: n4
//                    });
//                  }
//                })
//              });
//              //疾病信息
//              value.geneResp = [];
//              $.each(value.annotations.geneId, function (n, k) {
//                genePostData.push(k)
//              });

              $.each(value.anno.genes.geneids, function (n, k) {
                if (!genePostData.join(',').includes(k)) {
                  genePostData.push(k)
                }
              });
              value.geneResp = [];

            });
            _vue.lists1 = resp.data.results;
            _vue.myAxios({
              url: _vue.dbUrl+'knowledge/gene/dictbygeneids/',
              method: 'post',
              data: {
                geneids: genePostData
              }
            }).then(function (respA) {
              let count0 = 0;
              let count1 = 0;
              $.each(respA.data,function () {
                count1+=1;
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
                if(count0 === count1){
                  _vue.loading1 = false;
                }
              });
          })

        });


      },
      filtrateShow1Fun: function () {
//        this.filtrateShow1 = !this.filtrateShow1
        this.switchHide('filtrate-content')
      },
      showDetail: function (data,type,postId) {
        this.cnvId =postId;
        this.moduleData = data;
        $("#mutateDetailModal").modal('show')
      },
      getMutateModalStatus: function (newStatus) {
        const _vue = this;
        $.each(_vue.lists1, function (i, data) {
          if (data.id ==_vue.cnvId) {
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
      current2: function () {
        const _vue = this;
        this.loading2 = true;
        this.myAxios({
//          url:'application/job/'+this.ID+'/image/'
          url:'application/job/599690a7ccaa6c94a937a5bb/image/'
        }).then(function (resp) {
          _vue.imgs = resp.data;
          _vue.loading2 = false;
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
          _tr.after(`<tr class="hasImg"><td colspan="2"><div style="text-align: center;width: calc(100vw - 700px);height: 100%;overflow: auto"><img style="width: 100%" src=${imgUrl} alt=""></div></td></tr>`)
        }
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
  #cnvResult{
    .change-panel {
      margin-left: 50px;
    }
    .all-content {
      table{
        box-shadow: none;
      }
      margin: 15px 0 0 0;
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
          box-shadow: -3px 0 5px -2px rgb(200,200,200);
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
        box-shadow: 0 0 20px 3px rgb(200,200,200);
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
