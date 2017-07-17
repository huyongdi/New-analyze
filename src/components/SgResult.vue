<!--suppress HtmlUnknownTag -->
<template>
  <div class="row">
    <loading v-if="loading0"></loading>
    <loading v-if="loading1"></loading>
    <loading v-if="loading2"></loading>
    <loading v-if="loading3"></loading>
    <div class="done-list col-md-10 ">
      <div class="title">
        <span class="title-b">任务详情</span>
        <span class="title-s">< {{sampleInfo}}</span>
        <span class="span-a change-panel" @click="showPanelModal">修改panel</span>
      </div>

      <panelModal @saveData="savePanel" :originalGeneInput='geneInput'
                  :originalPanelData="originalPanelData"></panelModal>

      <div class="all-content">
        <div class="title-list">
          <div @click="changeContent" data-type="0" class="title-single active">质控统计</div>
          <div @click="changeContent" data-type="1" class="title-single">变异详情</div>
          <div @click="changeContent" data-type="2" class="title-single">XHMM CNV</div>
          <div @click="changeContent" data-type="3" class="title-single">基因覆盖度查询</div>
        </div>
        <div class="detail-content">
          <div class="content-1" :class="{hide:!in0}">
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
          <div class="content-2" :class="{hide:!in1}">我是2</div>
          <div class="content-3" :class="{hide:!in2}">我是3</div>
          <div class="content-4" :class="{hide:!in3}">我是4</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import page from './global/Page.vue'
  import panelModal from './global/PanelModal.vue'
  export default {
    components: {
      'page': page,
      'panelModal': panelModal,
    },
    data: function () {
      return {
        //公用
        ID: this.$route.query.id,
        datafile: '',
        sampleInfo: '',
        in0: true,
        in1: '',
        in2: '',
        in3: '',
        geneInput: '',
        originalPanelData: [],
        loading1: false,
        loading2: false,
        loading3: false,
        //content-0
        loading0: false,
        R1: '',
        R2: '',
        insert: '',
        CSV: '',
        lists0: [],
      }
    },
    created: function () {
      this.getSample();
      this.current0();
    },
    methods: {
      /*修改panel*/
      showPanelModal: function () {
        const _vue = this;
        this.myAxios({
          url: 'sample/genelist/' + _vue.datafile + '/'
        }).then(function (resp) {
          _vue.originalPanelData = [];
          resp.data.panelCode = ["GCA04", "GDE01", "GCA02"]
          resp.data.customGene = ['1', '2']
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
          url: 'application/grandmgd/' + this.ID + '/',
        }).then(function (resp) {
          _vue.datafile = resp.data.datafile;
          _vue.myAxios({
            url: resp.data.job
          }).then(function (respJob) {
            _vue.sampleInfo = respJob.data.name;
          })
        });
      },
      current0: function () {
        this.loading0 = true;
        const _vue = this;
        this.myAxios({
          url: 'application/grandmgd/' + this.ID + '/fastqc/',
        }).then(function (resp) {
          _vue.R1 = resp.data.r1;
          _vue.R2 = resp.data.r2;
        });
        this.myAxios({
          url: 'application/grandmgd/' + this.ID + '/insertsize/',
        }).then(function (resp) {
          _vue.insert = resp.data
        });
        this.myAxios({
          url: 'application/grandmgd/' + this.ID + '/csv/',
        }).then(function (resp) {
          _vue.CSV = resp.data
        });

        //列表
        this.myAxios({
          url: 'application/grandmgd/' + this.ID + "/stat/",
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
      current1: function () {

      },
      current2: function () {

      },
      current3: function () {

      },
      changeContent: function (event) {
        const _current = $(event.target);
        const current = _current.data("type");
        _current.parent().find('.active').removeClass('active');
        _current.addClass('active');
        this.in0 = '';
        this.in1 = '';
        this.in2 = '';
        this.in3 = '';
        if (current === 0) {
          this.in0 = true;
          this.current0();
        } else if (current === 1) {
          this.in1 = true;
          this.current1();
        } else if (current === 2) {
          this.in2 = true;
          this.current2();
        } else if (current === 3) {
          this.in3 = true;
          this.current3();
        }
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
      .content-1 {
        .red {
          color: @red;
        }
        ul {
          padding-left: 0;
          margin: 23px 0;
          li {
            display: inline-block;
            margin-right: 92px;
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
    }
  }
</style>
