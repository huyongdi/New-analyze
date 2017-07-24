<!--suppress HtmlUnknownTag -->
<template>
  <div class="row">
    <loading v-if="loading0"></loading>
    <loading v-if="loading1"></loading>
    <loading v-if="loading3"></loading>
    <div class="done-list col-md-10 ">
      <div class="title">
        <span class="title-b">任务详情</span>
        <span class="title-s">< {{sampleInfo}}</span>
        <span class="span-a change-panel" @click="showPanelModal">修改panel</span>
      </div>
      <div class="all-content">
        <div class="title-list">
          <div @click="changeContent" data-type="0" class="title-single active">质控统计</div>
          <div @click="changeContent" data-type="1" class="title-single">变异详情</div>
          <!--<div @click="changeContent" data-type="3" class="title-single">基因覆盖度查询</div>-->
        </div>
        <div class="detail-content">
          <div class="content-0" :class="{hide:!in0}">
            <div class="bold">质控详情</div>
            <ul class="bold">
              <li>
                <span class="red">红字</span>：代表未达标
              </li>
              <li>
                FASTQC：<a :href='R1' target="_blank" class="common-a r1">R1:fastq</a>
                <a target="_blank" :href="R2" class="common-a">R2:fastq</a>
              </li>
              <li>
                INSERTSIZE图：<a class="common-a" :href="insert">点击下载</a>
              </li>
              <li>
                注释结果(CSV)：<a class="common-a" :href="CSV">点击下载</a>
              </li>
              <li>
                基因分析报告 :
                <router-link target="_blank" class="common-a"
                             :to="{path:'report',query:{code:datafile,app:'grandmito'}}">点击查看
                </router-link>

              </li>
            </ul>
            <table>
              <thead>
              <tr>
                <th class="th-1">类别</th>
                <th class="th-2">GrandOmics指控参数</th>
                <th class="th-3">真实值</th>
                <th class="th-4">分析详情</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(list,index) in lists0" :class="{'interleave':index%2!==0}">
                <td>{{list.type}}</td>
                <td>{{list.grandValue}}</td>
                <td :class="{'red':!list.standard}">{{list.realValue}}</td>
                <td>{{list.detail}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="content-1" :class="{hide:!in1}">
            <div class="rea">
              <span class="my-btn pull-right condition" @click="filtrateShow1Fun"><img
                src="../../static/img/red-con.png"
                alt="">筛选条件</span>
              <!--筛选条件弹框-->
              <div class="filtrate-content" v-show="filtrateShow1" id="filtrate-content">
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
                <th>位点
                  <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                     data-original-title="红色代表最高级，黄色代表第二级，蓝色代表第三级">
                  </i>
                </th>
                <th>基因</th>
                <th>区域</th>
                <th>功能</th>
                <th class="disease-td">疾病</th>
                <th>CLINVAR</th>
                <th>本地人群频率(%)</th>
                <th>MITIMPACT</th>
                <th>MITOMAP</th>
                <th>人群频率(%)</th>
                <th>状态</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="data in lists1">
                <td>
                  <i title="查看详情" class="fa fa-font-awesome po" @click="showDetail(data.url)"
                     :class="{'text-1':data.level == 0,'text-2':data.level==1,'text-3':data.level==2}"></i>
                  <a class="po common-a" v-if="data.localsnv"
                     @click="showLocus(data.localsnv.chrom+':'+data.localsnv.start+':'+data.localsnv.end+':'+data.localsnv.ref+':'+data.localsnv.alt,0)">
                    {{data.localsnv.name}}
                  </a>
                </td>
                <td v-if="data.annotations">
                  <a class="common-a" target="_blank" v-if="data.annotations.geneSymbol"
                     :href="dbHtml+'#/gene?query=' + data.annotations.geneSymbol.join(',')">{{data.annotations.geneSymbol.join(',')}}</a>
                </td>
                <td v-if="data.annotations">
                  {{data.annotations.region}}
                </td>
                <td v-if="data.annotations">
                  {{data.annotations.func}}
                </td>
                <diseaseTd :geneResp="data.geneResp" @sendPhenotypeMapSingle="getPhenotypeMapSingle"></diseaseTd>
                <td v-if="data.annotations">{{data.annotations.clinvar}}</td>
                <td v-if="data.annotations"> - </td>
                <td v-if="data.annotations">
                  <div v-for="single in data.annotations.mitimpact.split(';')">
                    {{single}}
                  </div>
                </td>
                <td v-if="data.annotations">
                  <div v-for="single in data.annotations.mitomap.split(';')">
                    {{single}}
                  </div>
                </td>
                <td v-if="data.annotations">{{data.annotations.mtdb | getPercent}}</td>
                <td
                  :class="{ active1: data.status=='major',active2: data.status=='minor',active3: data.status=='benign',
                  active4: data.status=='invalid'}">
                  {{data.status | getStatus}}
                </td>
              </tr>

              </tbody>
            </table>
            <page :childCount="count1" :childReset="reset1" @childCurrent="getCurrent"></page>
          </div>
          <!--<div class="content-3" :class="{hide:!in3}">-->
            <!--<geneCover :ID="ID" app="grandmito"></geneCover>-->
          <!--</div>-->
        </div>
      </div>
    </div>

    <locusModal :datafile="datafile" :locus="locus" :type="type"></locusModal>
    <panelModal @saveData="savePanel" :originalGeneInput='geneInput'
                :originalPanelData="originalPanelData"></panelModal>
    <hpoModal :phenotypeMapSingle="phenotypeMapSingle"></hpoModal>
    <mutateModal @changeStatus="getMutateModalStatus" :moduleDataFromFather="moduleData" :ID="ID" app="grandmito"></mutateModal>
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
      }
    },
    created: function () {
//      this.getSample();
//      this.current0();
    },
    mounted: function () {
      this.bindCurrent();//绑定变异详情的过滤点击事件
      this.getSample();
      this.current0();
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
      getSample: function () {
        const _vue = this;
        this.myAxios({
          url: 'application/grandmito/' + this.ID + '/',
        }).then(function (resp) {
          _vue.datafile = resp.data.datafile;
          _vue.myAxios({
            url: resp.data.job
          }).then(function (respJob) {
            _vue.sampleInfo = respJob.data.name;
          })
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
      current0: function () {
        this.loading0 = true;
        const _vue = this;
        this.myAxios({
          url: 'application/grandmito/' + this.ID + '/fastqc/',
        }).then(function (resp) {
          _vue.R1 = resp.data.r1;
          _vue.R2 = resp.data.r2;
        });
        this.myAxios({
          url: 'application/grandmito/' + this.ID + '/insertsize/',
        }).then(function (resp) {
          _vue.insert = resp.data
        });
        this.myAxios({
          url: 'application/grandmito/' + this.ID + '/csv/',
        }).then(function (resp) {
          _vue.CSV = resp.data
        });

        //列表
        this.myAxios({
          url: 'application/grandmito/' + this.ID + "/stat/",
        }).then(function (resp) {
          resp = resp.data;
          const qObj = _vue.getValue(resp.final);//定义传到质控列表的对象
          qObj.q30 = resp.data.q30 === -1 ? '---' : resp.data.q30;
          qObj.volume = resp.data.volume === -1 ? '---' : resp.data.volume;
          qObj.baseGender = resp.data.gender;
          qObj.gender = resp.data.gender;
          if (qObj.Sample_gender === 'Male') {
            qObj.Sample_gender = '男'
          } else if (qObj.Sample_gender === 'Female') {
            qObj.Sample_gender = '女'
          } else {
            qObj.Sample_gender = '未知'
          }
          //如果性别和20X都不对
          if (qObj.Sample_gender !== qObj.gender && qObj.above_20 < 95) {
            alert('指数严重不合格！')
          }
          const arr = [
            {
              type: '20X覆盖度',
              grandValue: '≥≈95%',
              realValue: qObj.above_20,
              standard: qObj.above_20 >= 95
            }, {
              type: '性别',
              grandValue: qObj.baseGender,
              realValue: qObj.above_20,
              standard: qObj.Sample_gender == qObj.gender
            }, {
              type: 'Q30',
              grandValue: '≥85%',
              realValue: qObj.q30,
              standard: qObj.q30 >= 85
            }, {
              type: '数据量(M)',
              grandValue: '≥10G',
              realValue: qObj.volume,
              standard: qObj.volume >= 10000
            }, {
              type: 'Duplication%',
              grandValue: '≤20%',
              realValue: qObj.duplication,
              standard: qObj.duplication <= 0.2
            }, {
              type: 'Total Reads%',
              grandValue: '---',
              realValue: qObj.total,
              standard: true
            }, {
              type: 'QC passed Reads%',
              grandValue: '---',
              realValue: qObj.qc,
              standard: true
            }, {
              type: 'Mapped Reads%',
              grandValue: '---',
              realValue: qObj.mapped,
              standard: true
            }, {
              type: '捕获效率',
              grandValue: '≥70%',
              realValue: qObj.target,
              standard: qObj.target >= 0.7
            }, {
              type: '平均深度',
              grandValue: '≥75X',
              realValue: qObj.depth,
              standard: qObj.depth >= 75
            }, {
              type: '1X覆盖度',
              grandValue: '---',
              realValue: qObj.above_1,
              standard: true
            }, {
              type: '5X覆盖度',
              grandValue: '---',
              realValue: qObj.above_5,
              standard: true
            }, {
              type: '10X覆盖度',
              grandValue: '---',
              realValue: qObj.above_10,
              standard: true
            }, {
              type: '30X覆盖度',
              grandValue: '---',
              realValue: qObj.above_30,
              standard: true
            }
          ];
          $.each(resp.aln, function (i, data) {
            $.each(arr, function (n, k) {
              if (i === n) {
                k.detail = data
              }
            })
          });
          _vue.lists0 = arr;
          _vue.loading0 = false;
        });
      },
      getValue: function (final) {
        const obj = {};
        $.each(final, function (i, data) {
          if (data.name === 'mapped reads') {
            obj.mapped = data.value.raw
          } else if (data.name === 'QC passed reads') {
            obj.qc = data.value
          } else if (data.name === 'total reads') {
            obj.total = data.value
          } else if (data.name === 'duplication rate') {
            obj.duplication = data.value
          } else if (data.name === 'target reads ratio') {
            obj.target = data.value
          } else if (data.name === 'depth') {
            obj.depth = data.value
          } else if (data.name === '%_bases_above_1') {
            obj.above_1 = data.value
          } else if (data.name === '%_bases_above_5') {
            obj.above_5 = data.value
          } else if (data.name === '%_bases_above_10') {
            obj.above_10 = data.value
          } else if (data.name === '%_bases_above_20') {
            obj.above_20 = data.value
          } else if (data.name === '%_bases_above_30') {
            obj.above_30 = data.value
          } else if (data.name === 'Sample_gender') {
            obj.Sample_gender = data.value
          }
        });
        return obj;
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
        this.myAxios({
          url: 'application/grandmito/' + this.ID + '/snv/',
        }).then(function (resp) {
          let str = '';
          $.each(resp.data.query_params, function (i, value) {
            str += i + '=' + value + "&"
          });
          _vue.myAxios({
            url: resp.data.query_url + '?' + str + 'page=' + _vue.page1 + urlParam,
          }).then(function (resp) {
            if (resp.data.count === 0) {
              _vue.loading1 = false
            }
            _vue.count1 = resp.data.count;
            let genePostData = [];
            $.each(resp.data.results, function (i, value) {
              //处理highlight和active得到级别(highlight为true的时候active必定为true)
              if (value.highlight && value.active) {
                value.level = 0
              } else if (!value.highlight && value.active) {
                value.level = 1
              } else if (!value.highlight && !value.active) {
                value.level = 2
              }
              $.each(value.annotations.geneId, function (n, k) {
                genePostData.push(k)
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
                  $.each(n2.annotations.geneId, function (n3, n4) {
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
        });
      },
      filtrateShow1Fun: function () {
        this.filtrateShow1 = !this.filtrateShow1
      },
      showDetail: function (url) {
        const _vue = this;
        $.each(this.lists1, function (i, data) {
          if (data.url === url) {
            _vue.moduleData = data;
            $("#mutateDetailModal").modal('show')
          }
        });
      },
      getMutateModalStatus: function (newStatus) {
        const _vue = this;
        $.each(this.lists1, function (i, data) {
          if (data.url === _vue.moduleData.url) {
            data.status = newStatus;
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
        if (data == 0) {
          return 0;
        }
        data = data * 100;
        data = data.toFixed(2);
        return data
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
  .all-content {
    margin: 15px 0 0 0;
    .change-panel {
      margin-left: 50px;
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
        margin-left: 3px;
        cursor: pointer;
      }
      .title-single:first-child {
        margin: 0;
        box-shadow: -3px 0 5px -2px @tableSha;
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
      box-shadow: 0 0 5px 1px @tableSha;
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
</style>
