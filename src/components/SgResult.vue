<template>
  <div class="right-content">
    <loading v-if="QCLoading"></loading>
    <loading v-if="coverLoading"></loading>
    <loading v-if="detailLoading"></loading>
    <loading v-if="CNVLoading"></loading>
    <location imgClass="analyzeTool-small" currentPage="单基因遗传病检测结果"></location>

    <div class="all-content">

      <!--点击修改panel的模态框-->
      <div class="modal fade " aria-labelledby="gridSystemModalLabe5" tabindex="-1" role="dialog" id="editGeneModal1">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title" id="gridSystemModalLabel5">提交基因信息</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-3">
                  Panel信息
                </div>
                <div class="col-md-9 panel">
                  <input @keyup="showSubpanel" @blur="hideSubpanel" type="text" v-model="geneInput" class="form-control"
                         placeholder="请输入编号:如GCA100,GDE100">
                  <a :href="dbHtml+'#/panel'"
                     target="_blank" title="点击跳转到基因页面">Panel信息</a>

                  <!--模糊查询-->
                  <ul id="subpanel" class="hide">
                    <li @mousedown.stop="clickLi(list.code)" v-for="list in subPanelList" :data-code="list.code">
                      {{list.name_cn}}
                    </li>
                  </ul>

                </div>
              </div>

              <div class="row noneBottom">
                <div class="col-md-3">
                  Gene信息

                </div>
                <div class="col-md-9">
                  <textarea v-model="panelInput" placeholder="请用逗号隔开" class="form-control"></textarea>
                </div>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-primary my-btn" @click="saveEditGene">保存</button>
            </div>
          </div>
        </div>
      </div>

      <div class="sampleInfo">
        样本信息：{{sampleInfo}}
        <a id="showPanel" class="po" @click="showPanel">修改panel</a>
      </div>

      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab"
                                                  data-toggle="tab">质控统计</a></li>
        <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab"
                                   @click="toDetail">变异详情</a></li>
        <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab"
                                   @click="toCNV">XHMM CNV</a>
        </li>
        <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">基因覆盖度查询</a>
        </li>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content">

        <div role="tabpanel" class="tab-pane active" id="home">

          <div class="bold">质控详情</div>

          <div class="down-content">
            <div class="inline flag-content">
              <span class="red">红色</span>：
              <span>代表未达标</span>
            </div>
            <div class="inline">
              FASTQC:&nbsp;
              <a class="inline" :href="R1" target="_blank">R1：fastq</a>&nbsp;&nbsp;
              <a class="inline" :href="R2" target="_blank">R2：fastq</a>
            </div>
            <div class="inline">
              INSERTSIZE图:&nbsp;
              <a class="inline" :href="insertsize" target="_blank">点击下载</a>
            </div>
            <div class="inline">
              注释结果（CSV）:&nbsp;
              <a class="inline" :href="CSV" target="_blank">点击下载</a>
            </div>
          </div>

          <div class="table-content">
            <table class="table left-table">
              <thead>
              <tr>
                <th class="th-1">类别</th>
                <th class="th-2">GrandOmics指控参数</th>
                <th class="th-3">真实值</th>
                <!--<th class="th-4">分析详情</th>-->
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>20X覆盖度</td>
                <td>≥≈95%</td>
                <td :class="{'noStandard':final.above_20<95}">{{final.above_20}}</td>
                <!--<td class="aln" :rowspan="aln.length">-->
                <!--<div :class="{trIn:index%2}" v-for="(al,index) in aln">{{al}}</div>-->
                <!--</td>-->
              </tr>
              <tr class="trIn">
                <td>性别</td>
                <td>{{final.baseGender}}</td>
                <td :class="{noStandard:final.Sample_gender != final.gender}">
                  {{final.Sample_gender}}
                </td>
              </tr>
              <tr>
                <td>Q30</td>
                <td>≥85%</td>
                <td :class="{noStandard:final.q30<0.85}">{{final.q30}}</td>
              </tr>
              <tr class="trIn">
                <td>数据量(M)</td>
                <td>≥10G</td>
                <td :class="{noStandard:final.volume<10000}">{{final.volume}}</td>
              </tr>
              <tr>
                <td>Duplication%</td>
                <td>≤20%</td>
                <td :class="{noStandard:final.duplication>0.2}">{{final.duplication}}</td>
              </tr>
              <tr class="trIn">
                <td>Total Reads%</td>
                <td>---</td>
                <td>{{final.total}}</td>
              </tr>
              <tr>
                <td>QC passed Reads%</td>
                <td>---</td>
                <td>{{final.qc}}</td>
              </tr>
              <tr class="trIn"><!--total reads-->
                <td>Mapped Reads%</td>
                <td>---</td>
                <td>{{final.mapped }}</td>
              </tr>
              <tr>
                <td>捕获效率</td>
                <td>≥70%</td>
                <td :class="{noStandard:final.target<0.7}">{{final.target }}</td>
              </tr>
              <tr class="trIn">
                <td>平均深度</td>
                <td>≥75X</td>
                <td :class="{noStandard:final.depth<75}">{{final.depth}}</td>
              </tr>
              <tr>
                <td>1X覆盖度</td>
                <td>---</td>
                <td>{{final.above_1}}</td>
              </tr>
              <tr class="trIn">
                <td>5X覆盖度</td>
                <td>---</td>
                <td>{{final.above_5}}</td>
              </tr>
              <tr>
                <td>10X覆盖度</td>
                <td>---</td>
                <td>{{final.above_10}}</td>
              </tr>
              <tr class="trIn">
                <td>30X覆盖度</td>
                <td>---</td>
                <td>{{final.above_30}}</td>
              </tr>
              </tbody>
            </table>

            <table class="right-table table">
              <thead>
              <tr>
                <th class="th-4">分析详情</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(al,index) in aln">
                <td :class="{'trIn':index%2}">{{al}}</td>
              </tr>
              </tbody>
            </table>
          </div>


          <!--    <div class="infoView-left col-lg-6">
                <div class="infoView-title">质控详情</div>
                <div class="row">
                  <div class="col-lg-3">
                    <span class="special-p"></span>
                    <span class="special-p-text">: 代表未达标</span>
                    <div class="fastqc-content">
                      <span>FASTQC：</span>
                      <a class="fastq" :href="R1" target="_blank">R1：fastq</a>
                      <a class="fastq" :href="R2" target="_blank">R2：fastq</a>
                    </div>

                    <div class="insertsize-content">
                      <span>INSERTSIZE图：</span>
                      <a class="fastq" :href="insertsize" target="_blank">点击下载</a>
                    </div>

                    <div class="insertsize-content">
                      <span>注释结果（CSV）：</span>
                      <a class="fastq" :href="CSV" target="_blank">点击下载</a>
                    </div>

                  </div>
                  <div class="col-lg-9">
                    <table class="table table-bordered">
                      <thead>
                      <tr>
                        <th>类别</th>
                        <th>GrandOmics指控参数</th>
                        <th>真实值</th>
                      </tr>
                      </thead>
                      <tbody id="qControl">
                      <tr>
                        <td>20X覆盖度</td>
                        <td>≥≈95%</td>
                        <td :class="{'noStandard':final.above_20<95}">{{final.above_20}}</td>
                      </tr>
                      <tr>
                        <td>性别</td>
                        <td>{{final.baseGender}}</td>
                        <td :class="{noStandard:final.Sample_gender != final.gender}">
                          {{final.Sample_gender}}
                        </td>
                      </tr>
                      <tr>
                        <td>Q30</td>
                        <td>≥85%</td>
                        <td :class="{noStandard:final.q30<0.85}">{{final.q30}}</td>
                      </tr>
                      <tr>
                        <td>数据量(G)</td>
                        <td>≥10G</td>
                        <td :class="{noStandard:final.volume<10000}">{{final.volume}}</td>
                      </tr>
                      <tr>
                        <td>Duplication%</td>
                        <td>≤20%</td>
                        <td :class="{noStandard:final.duplication>0.2}">{{final.duplication}}</td>
                      </tr>
                      <tr>
                        <td>Total Rate%</td>
                        <td>-&#45;&#45;</td>
                        <td>{{final.total}}</td>
                      </tr>
                      <tr>
                        <td>QC passed Rate%</td>
                        <td>-&#45;&#45;</td>
                        <td>{{final.qc}}</td>
                      </tr>
                      <tr>&lt;!&ndash;total reads&ndash;&gt;
                        <td>Map Rate%</td>
                        <td>-&#45;&#45;</td>
                        <td>{{final.mapped }}</td>
                      </tr>
                      <tr>
                        <td>捕获效率</td>
                        <td>≥70%</td>
                        <td :class="{noStandard:final.target<0.7}">{{final.target }}</td>
                      </tr>
                      <tr>
                        <td>平均深度</td>
                        <td>≥75X</td>
                        <td :class="{noStandard:final.depth<75}">{{final.depth}}</td>
                      </tr>
                      <tr>
                        <td>1X覆盖度</td>
                        <td>-&#45;&#45;</td>
                        <td>{{final.above_1}}</td>
                      </tr>
                      <tr>
                        <td>5X覆盖度</td>
                        <td>-&#45;&#45;</td>
                        <td>{{final.above_5}}</td>
                      </tr>
                      <tr>
                        <td>10X覆盖度</td>
                        <td>-&#45;&#45;</td>
                        <td>{{final.above_10}}</td>
                      </tr>
                      <tr>
                        <td>30X覆盖度</td>
                        <td>-&#45;&#45;</td>
                        <td>{{final.above_30}}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="infoView-right col-lg-5 col-lg-offset-1">
                <div class="infoView-title">分析详情</div>
                <div id="analyzeDetail">
                  <table class="table">
                    <tbody>
                    <tr v-for="al in aln">
                      <td>{{al}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>-->
        </div>

        <div role="tabpanel" class="tab-pane" id="profile">
          <!--<span class="filter-title bold">过滤条件：</span>-->
          <div class="row font-12">
            <div class="filter-left col-md-6">
              <div class="row-div title row">
                <span class="row-name col-md-2 bold">过滤条件：</span>
              </div>
              <div class="row-div row">
                <span class="row-name col-md-2">HGMD</span>
                <div class="row-content col-md-10">
                  <span class="condition" @click="conClick" data-name="hgmd" data-value="true">已报道</span>
                  <span class="condition" @click="conClick" data-name="hgmd" data-value="false">未报道</span>
                  <span class="condition on con-default" @click="conClick">不筛选</span>
                </div>
              </div>
              <div class="row-div row">
                <span class="row-name col-md-2">CLINVAR</span>
                <div class="row-content col-md-10">
                  <span class="condition" @click="conClick" data-name="clinvar" data-value="true">已报道</span>
                  <span class="condition" @click="conClick" data-name="clinvar" data-value="false">未报道</span>
                  <span class="condition on con-default" @click="conClick">不筛选</span>
                </div>
              </div>
              <div class="row-div row">
                <span class="row-name col-md-2">突变类型</span>
                <div class="row-content col-md-10">
                  <span class="condition" @click="conClick" data-name="func" data-value="stop">stop*</span>
                  <span class="condition" @click="conClick" data-name="func" data-value="nonsynon">nonsynonymous</span>
                  <span class="condition" @click="conClick" data-name="func" data-value="splic">splicing</span>
                  <span class="condition" @click="conClick" data-name="func"
                        data-value="frameshift">(non)frameshift</span>
                  <!--<span class="condition">frameshift</span>-->
                  <!--<span class="condition">stoploss</span>-->
                  <!--<span class="condition">synonymous</span>-->
                  <!--<span class="condition">unknown</span>-->
                  <span class="condition on con-default" @click="conClick">不筛选</span>
                </div>
              </div>

              <div class="row-div row">
                <span class="row-name col-md-2">突变比例</span>
                <div class="row-content col-md-10">
                  <span class="condition" @click="conClick" data-name="ratio" data-value="0.9-1">0.9-1</span>
                  <span class="condition" @click="conClick" data-name="ratio" data-value="0.2-0.9">0.2-0.9</span>
                  <span class="condition" @click="conClick" data-name="ratio" data-value="0-0.2">0-0.2</span>
                  <span class="condition on con-default" @click="conClick">不筛选</span>
                </div>
              </div>

              <div class="row-div row">
                   <span @click="showTextArea" class="row-name col-md-2 fliter-gene" id="fliter-gene" title="点击出现输入框">
                     <span>过滤基因</span>
                     <i class="fa-li fa fa-chevron-right gene-i"></i>
                   </span>
                <div class="row-content col-md-9 hide" id="gene-name">
                  <textarea type="text" class="my-form-control gene-name"
                            placeholder="请用逗号隔开"></textarea>
                </div>
              </div>

            </div>
            <div class="filter-right col-md-6 col-md-offset-">
              <div class="row-div row">
                <span class="row-name col-md-3">遗传方式</span>
                <div class="row-content col-md-9">
                  <span class="condition on con-default" @click="conClick" data-name="inheritance"
                        data-value="All">全部</span>
                  <span class="condition" @click="conClick" data-name="inheritance" data-value="AR">AR</span>
                  <span class="condition" @click="conClick" data-name="inheritance" data-value="AD">AD</span>
                  <span class="condition" @click="conClick" data-name="inheritance" data-value="XR">XR</span>
                  <span class="condition" @click="conClick" data-name="inheritance" data-value="XD">XD</span>
                  <span class="condition" @click="conClick" data-name="inheritance"
                        data-value="X-linked">X-LINKED</span>
                  <span class="condition" @click="conClick" data-name="inheritance"
                        data-value="Y-linked">Y-LINKED</span>
                  <span class="condition" @click="conClick" data-name="inheritance" data-value="Other">其它</span>
                  <span class="condition" @click="conClick">不筛选</span>
                </div>
              </div>
              <div class="row-div row">
                <span class="row-name col-md-3">测序深度</span>
                <div class="row-content col-md-9">
                  <span class="condition" @click="conClick" data-name="depth" data-value="10-20">10-20</span>
                  <span class="condition" @click="conClick" data-name="depth" data-value=">20">>20</span>
                  <span class="condition on con-default" @click="conClick">不筛选</span>
                </div>
              </div>

              <div class="row-div row">
                <span class="row-name col-md-3">普通人群携带率低于</span>
                <div class="row-content col-md-9">
                  <span class="condition" @click="conClick" data-name="dbfreq" data-value="0">0</span>
                  <span class="condition" @click="conClick" data-name="dbfreq" data-value="0.01">1%</span>
                  <span class="condition" @click="conClick" data-name="dbfreq" data-value="0.02">2%</span>
                  <span class="condition" @click="conClick" data-name="dbfreq" data-value="0.05">5%</span>
                  <span class="condition on con-default" @click="conClick">不筛选</span>
                </div>
              </div>

              <div class="row-div row">
                <span class="row-name col-md-3">本地人群携带率低于</span>
                <div class="row-content col-md-9">
                  <span class="condition" @click="conClick" data-name="grandfreq" data-value="0">0</span>
                  <span class="condition" @click="conClick" data-name="grandfreq" data-value="0.01">1%</span>
                  <span class="condition" @click="conClick" data-name="grandfreq" data-value="0.02">2%</span>
                  <span class="condition" @click="conClick" data-name="grandfreq" data-value="0.05">5%</span>
                  <span class="condition on con-default" @click="conClick">不筛选</span>
                </div>
              </div>

              <div class="row-div row">
                <span class="row-name col-md-3">状态</span>
                <div class="row-content col-md-9">
                  <span class="condition" @click="conClick" data-name="status" data-value="true">已标记</span>
                  <span class="condition" @click="conClick" data-name="status" data-value="false">未标记</span>
                  <span class="condition on con-default" @click="conClick">不筛选</span>
                </div>
              </div>
            </div>
          </div>
          <div class="btn-content">
            <button class="btn btn-color con-submit" @click="detailFilter">过&nbsp;&nbsp;滤</button>
            <button class="btn btn-color-r con-submit" @click="resetCon">重&nbsp;&nbsp;置</button>
          </div>

          <div class="re">
            <table class="table table-gene task-result-table myTable" id="aberrance">
              <thead>
              <tr>
                <th>位点
                  <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                     data-original-title="红色代表最高级，绿色代表第二级，灰色代表带三级">
                  </i>
                </th>
                <th>基因</th>
                <th>区域</th>
                <th>功能</th>
                <th>疾病</th>
                <th>CLINVAR</th>
                <th>HGMD</th>
                <th>东亚人群频率(%)</th>
                <th>本地人群频率(%)</th>
                <th>状态</th>
              </tr>
              </thead>
              <tbody id="detail-t" class=""> <!--测试用，去掉hide-->
              <tr v-for="data in detailAllData" @click="addBc">
                <td>
                  <i v-if="data.level==0" :data-id='data.id' class="fa fa-font-awesome text-danger po"
                     title="查看详情" @click="showDetail"></i>  <!--最高级红色-->
                  <i v-else-if="data.level==1" :data-id='data.id' class="fa fa-font-awesome text-success po"
                     title="查看详情" @click="showDetail"></i> <!--第二级绿色-->
                  <i v-else :data-id='data.id' class="fa fa-font-awesome po" title="查看详情"
                     @click="showDetail"></i><!--第三级-->
                  <span v-if="data.localsnv">{{data.localsnv.name}}</span>
                </td>
                <td v-if="data.annotations">
                  <a target="_blank" v-if="data.annotations.geneSymbol"
                     :href="dbHtml+'#/gene?query=' + data.annotations.geneSymbol.join(',')">{{data.annotations.geneSymbol.join(',')}}</a>
                </td>
                <td v-if="data.annotations">
                  {{data.annotations.region}}
                </td>
                <td v-if="data.annotations">
                  {{data.annotations.func}}
                </td>
                <td>
                  <div v-for="disease in data.geneResp">
                    <div v-for="diseaseSingle in disease.phenotypeMap">
                      <div v-if="diseaseSingle.inheritances.gene.length!=0">
                        <span class="po font-700 a-color" data-toggle="tooltip" data-placement="top"
                              :data-original-title="diseaseSingle.inheritances.gene.join(',')">
                          [{{diseaseSingle.inheritances.gene_ab.join(',')}}]
                        </span>
                        <a class="po" v-if="diseaseSingle.omim.titles.chinese"
                           @click="showHPO(diseaseSingle.omim.mimNumber,diseaseSingle)"
                           data-toggle="tooltip"
                           data-placement="top" :data-original-title='diseaseSingle.phenotype'>
                          {{diseaseSingle.omim.titles.chinese}}
                        </a>
                        <a v-else @click="showHPO(diseaseSingle.omim.mimNumber,diseaseSingle)">{{diseaseSingle.phenotype}}</a>
                        (&nbsp;<a target="_blank"
                                  :href="dbHtml+'#/geneOmDetail?&omId='+diseaseSingle.omim.mimNumber"
                                  class="color-a">{{diseaseSingle.omim.mimNumber}}
                      </a>&nbsp;)
                        <!--<i class="fa fa-comment-o po showHPO" title="查看变异类型" @click="showHPO(diseaseSingle.omim.mimNumber,diseaseSingle)"></i>-->

                      </div>
                      <div v-else>
                        <span class="po font-700 a-color" data-toggle="tooltip" data-placement="top"
                              :data-original-title="diseaseSingle.inheritances.phenotype.join(',')">
                          [{{diseaseSingle.inheritances.phenotype_ab.join(',')}}]
                        </span>
                        <a class="po" v-if="diseaseSingle.omim.titles.chinese"
                           @click="showHPO(diseaseSingle.omim.mimNumber,diseaseSingle)"
                           data-toggle="tooltip" data-placement="top"
                           :data-original-title='diseaseSingle.phenotype'>
                          {{diseaseSingle.omim.titles.chinese}}
                        </a>
                        <a v-else @click="showHPO(diseaseSingle.omim.mimNumber,diseaseSingle)">{{diseaseSingle.phenotype}}</a>
                        (&nbsp;<a target="_blank"
                                  :href="dbHtml+'#/geneOmDetail?&omId='+diseaseSingle.omim.mimNumber"
                                  class="color-a">{{diseaseSingle.omim.mimNumber}}</a>&nbsp;)
                        <!--<a @click="showHPO(diseaseSingle.omim.mimNumber,diseaseSingle)" class="showHPO">查看HPO信息</a>-->
                        <!--<i class="fa fa-comment-o po showHPO" title="查看变异类型" @click="showHPO(diseaseSingle.omim.mimNumber,diseaseSingle)"></i>-->


                      </div>
                    </div>
                    <!--<span v-if="disease.phenotypeMap.length ===0"> - </span>-->
                  </div>
                </td>
                <td v-if="data.annotations">{{data.annotations.clinvar}}</td>
                <td v-if="data.annotations">{{data.annotations.hgmd}}</td>
                <td v-if="data.annotations">{{data.annotations.dbfreq | filterData}}</td>
                <td>
                  <span v-if="data.annotations"><span
                    v-if="data.annotations.grandfreq">{{data.annotations.grandfreq | filterData}}</span></span>
                  <span v-else>0</span>
                </td>
                <td :class="{ active: data.status!='' }">{{data.status | getStatus}}
                </td>
              </tr>

              </tbody>
            </table>
          </div>

          <pagenation :count="detailCount" :reset="detailReset" @getCurrent="getCurrentDetail"></pagenation>

          <!--查看详情的模态框-->
          <div class="modal fade  bs-example-modal-lg" tabindex="-1" id="mutateDetail" role="dialog"
               aria-labelledby="gridSystemModalLabel1">
            <div class="modal-dialog modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                    aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="gridSystemModalLabel1">详情</h4>
                </div>
                <div class="modal-body" id="id_modal">
                  <div class="row">
                    <div class="col-md-4">
                      <a class="analyze-mutate po" v-if="moduleData.localsnv" :href="dbHtml+'#/mutateDetail?query='+moduleData.localsnv.chrom + ':'
                       + moduleData.localsnv.start + ':' + moduleData.localsnv.ref + ':' + moduleData.localsnv.alt"
                         target="_blank" title="查看变异数据库">
                        查看变异数据库
                      </a>
                    </div>
                    <div class="col-md-4">
                      位点：<span v-if="moduleData.localsnv">{{moduleData.localsnv.name}}</span>
                    </div>
                    <div class="col-md-4">
                      <!--const pos = codeData.localsnv.chrom + ':' + codeData.localsnv.start + '-' + codeData.localsnv.end;-->
                      <!--_modal.find('.analyze-svg').attr("href", "analyze-svg.html?pos=" + pos + "&id=" + ID);-->
                      <router-link v-if="moduleData.localsnv" :to="{path:'/svg',query:{pos: moduleData.localsnv.chrom +
                       ':' + moduleData.localsnv.start+ '-' + moduleData.localsnv.end,id:ID}}" target="_blank"
                                   title="查看位点覆盖图">查看位点覆盖图
                      </router-link>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      基因：<a target="_blank" v-if='moduleData.annotations'
                            :href="dbHtml+'#/gene?query=' + moduleData.annotations.geneSymbol.join(',')">{{moduleData.annotations.geneSymbol.join(',')}}</a>
                    </div>
                    <div class="col-md-4">
                      <span>NCBI GENE ID:</span>
                      <span v-if="moduleData.annotations">
                                            <span v-for="(gene,index) in moduleData.annotations.geneId">
                                               <a target="_blank"
                                                  :href="dbHtml+'#/geneDetail?geneId=' + gene">{{gene}}</a>
                                               <span v-if="index == moduleData.annotations.geneId.length">；</span>
                                           </span>
                                           </span>
                    </div>
                    <div class="col-md-4">
                      区域：<span v-if="moduleData.annotations">{{moduleData.annotations.region}}</span>
                    </div>

                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      功能：<span v-if="moduleData.annotations">{{moduleData.annotations.func}}</span>
                    </div>
                    <div class="col-md-4">
                      纯/杂合：{{moduleData.isHomo}}
                    </div>
                    <div class="col-md-4">
                      深度：{{moduleData.depth}}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      质量：{{moduleData.quality}}
                    </div>
                    <div class="col-md-4">
                      变异比例：
                      <span v-if="moduleData.ratio">{{moduleData.ratio.toFixed(3)}}</span>
                    </div>
                    <div class="col-md-4">
                      MCAP：<span v-if="moduleData.annotations">{{moduleData.annotations.mcap}}</span>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      HGMD：<span v-if="moduleData.annotations">{{moduleData.annotations.hgmd}}</span>
                    </div>
                    <div class="col-md-4">
                      东亚人群频率：<span v-if="moduleData.annotations">
                      {{moduleData.annotations.dbfreq ? moduleData.annotations.dbfreq.toFixed(4) : 0}}
                    </span>
                    </div>
                    <div class="col-md-4">
                      本地人群频率：<span v-if="moduleData.annotations">
                      {{moduleData.annotations.grandfreq ? moduleData.annotations.grandfreq.toFixed(4) : 0}}</span>
                    </div>

                  </div>
                  <div class="row">
                    <div class="col-md-11">
                      gatkFilter：{{moduleData.gatkFilter}}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-11">
                      ACMG：
                      <span v-if="moduleData.intervars">{{moduleData.intervars.intervar}}(
                         <router-link target="_blank"
                                      :to="{path:'/getIntervar',query:{query:moduleData.intervars.rank.join(',')}}">
                          {{moduleData.intervars.rank.join(',')}}</router-link>
                        )</span>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      CLINVAR：<span v-if="moduleData.annotations">{{moduleData.annotations.clinvar}}</span>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="">变异信息：(常用转录本：
                        <span v-if="moduleData.geneResp">
                              <span v-for="(resp,index) in moduleData.geneResp">
                                <span
                                  v-if="index === moduleData.geneResp.length-1">{{resp.tags.transcript ? resp.tags.transcript : '无'}}</span>
                                <span v-else="">{{resp.tags.transcript ? resp.tags.transcript : '无,'}}</span>
                              </span>
                        </span>
                        )
                      </div>
                      <div v-if="moduleData.annotations && moduleData.annotations.change">
                        <div v-for="single in moduleData.annotations.change">{{single}}</div>
                      </div>

                    </div>
                  </div>
                  <div class="edit">
                    <div class="edit-title">
                      编辑<span>(最后编辑人:"{{moduleData.lastEditor ? moduleData.lastEditor : '无'}}")：</span>
                    </div>
                    <div class="edit-content">
                      <div>评论：</div>
                      <textarea class="form-control" :data-id=moduleData.id id="comment" rows="3"
                                @keyup.enter="changeComment">{{moduleData.comment}}</textarea>
                    </div>

                    <div class="edit-content" :data-id="moduleData.id" id="select_content">
                      <div>状态：</div>
                      <select class="form-control" id="detail_select">
                        <option value="major">主要的</option>
                        <option value="minjor">次要的</option>
                        <option value="benign">良性的</option>
                        <option value="invalid">无效的</option>
                        <option value="">未作标记</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="modal-footer analyze-footer">
                  <button type="button" class="btn btn-primary" :data-url="moduleData.url" @click="patchEdit(moduleData.url,moduleData.id)"
                          id="save_design">保存修改
                  </button>
                  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
                </div>
              </div>
            </div>
          </div>

          <!--查看HPO的模态框-->
          <div class="modal fade  bs-example-modal-lg" tabindex="-1" id="hpo_detail" role="dialog"
               aria-labelledby="gridSystemModalLabel3">
            <div class="modal-dialog modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                    aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="gridSystemModalLabel3">详情</h4>
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
                    <tbody id="synopsis_table">
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
        <div role="tabpanel" class="tab-pane" id="messages">

          <div class="row font-12">
            <div class="filter-left col-md-6">
              <div class="row-div row">
                <span class="row-name col-md-1 gene-span">基因</span>
                <input class="form-control col-md-8 CNV-input" id="CNV-input" placeholder="请用逗号隔开"/>
              </div>
            </div>
            <div class="filter-left col-md-6">
              <div class="row-div row">
                <span class="row-name col-md-2">变异类型</span>
                <div class="row-content col-md-10" id="CNV-fun">
                  <span class="condition" @click="conClick" data-value="del">DEL</span>
                  <span class="condition" @click="conClick" data-value="dup">DUP</span>
                  <span class="condition on con-default" @click="conClick">不筛选</span>
                </div>
              </div>
            </div>
          </div>

          <div class="btn-content">
            <button class="btn btn-color con-submit" @click="CNVFilter">过&nbsp;&nbsp;滤</button>
            <button class="btn btn-color-r con-submit" @click="resetConCNV">重&nbsp;&nbsp;置</button>
          </div>


          <div class="re">
            <table class="table table-gene task-result-table myTable" id="aberrance1">
              <thead>
              <tr>
                <th>
                  位点
                  <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                     data-original-title="红色代表最高级，绿色代表第二级，灰色代表带三级">
                  </i>
                </th>
                <th>基因</th>
                <th>区域</th>
                <th>疾病</th>
                <th>基因型</th>
                <th>深度(原始)</th>
                <th>深度(标准化)</th>
                <th>状态</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="data in CNVAllData" @click="addBcCNV">
                <td>
                  <i v-if="data.level==0" :data-id='data.id' class="fa fa-font-awesome text-danger po"
                     title="查看详情" @click="showDetailCNV"></i>  <!--最高级-->
                  <i v-else-if="data.level==1" :data-id='data.id' class="fa fa-font-awesome text-success po"
                     title="查看详情" @click="showDetailCNV"></i> <!--第二级-->
                  <i v-else :data-id='data.id' class="fa fa-font-awesome po" title="查看详情"
                     @click="showDetailCNV"></i><!--第三级-->
                  <span v-if="data.localcnv">{{data.localcnv.name}}</span>
                </td>

                <td v-if="data.annotations">
                  <a target="_blank" class="block" v-if="data.annotations.geneSymbol"
                     v-for="single in data.annotations.geneSymbol"
                     :href="dbHtml+'#/gene?query=' + single">{{single}}</a>
                  <!--<a target="_blank" v-if="data.annotations.geneSymbol"-->
                  <!--:href="dbHtml+'#/gene?query=' + data.annotations.geneSymbol.join(',')">{{data.annotations.geneSymbol.join(',')}}</a>-->
                </td>
                <td v-if="data.annotations">
                  {{data.annotations.region}}
                </td>
                <td>
                  <div v-for="disease in data.geneResp">
                    <div v-for="diseaseSingle in disease.phenotypeMap">
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
                        (<a
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
                        (<a
                        :href="dbHtml+'#/geneOmDetail?&omId='+diseaseSingle.omim.mimNumber"
                        class="color-a">{{diseaseSingle.omim.mimNumber}}</a>)
                        <!--<a @click="showHPO(diseaseSingle.omim.mimNumber,diseaseSingle)"-->
                        <!--class="showHPO">查看HPO信息</a>-->
                        <!--<i class="fa fa-comment-o po showHPO" title="查看变异类型" data-type="cnv" @click="showHPOCNV(diseaseSingle.omim.mimNumber,diseaseSingle)"></i>-->
                      </div>
                    </div>
                    <!--<span v-if="disease.phenotypeMap.length ===0"> - </span>-->
                  </div>
                </td>
                <td>{{data.genoType}}</td>
                <td>{{data.originalReadDepth}}</td>
                <td>{{data.readDepth}}</td>
                <td :class="{ active: data.status!='' }">{{data.status | getStatus}}
                </td>

              </tr>

              </tbody>
            </table>
          </div>

          <pagenation :count="CNVCount" :reset="CNVReset" @getCurrent="getCurrentCNV"></pagenation>

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
                    <div class="col-md-4">
                      <router-link v-if="CNVmoduleData.localcnv" :to="{path:'/svg',query:{pos: CNVmoduleData.localcnv.chrom +
                       ':' + CNVmoduleData.localcnv.start+ '-' + CNVmoduleData.localcnv.end,id:ID}}" target="_blank"
                                   title="查看位点覆盖图">查看位点覆盖图
                      </router-link>
                    </div>
                    <div class="col-md-4">
                      区域：<span v-if="CNVmoduleData.annotations">{{CNVmoduleData.annotations.region}}</span>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      基因型：<span>{{CNVmoduleData.genoType}}</span>
                    </div>
                    <div class="col-md-4">
                      深度(原始)：<span>{{CNVmoduleData.originalReadDepth}}</span>

                    </div>
                    <div class="col-md-4">
                      深度(标准化)：<span>{{CNVmoduleData.readDepth}}</span>
                    </div>
                  </div>


                  <div class="row specialRow">

                    基因：<a target="_blank" v-if='CNVmoduleData.annotations'
                          :href="dbHtml+'#/gene?query=' + CNVmoduleData.annotations.geneSymbol.join(',')">
                    {{CNVmoduleData.annotations.geneSymbol.join(',')}}</a>
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
                        <span v-if="CNVmoduleData.geneResp">
                              <span v-for="(resp,index) in CNVmoduleData.geneResp">
                                <span
                                  v-if="index === CNVmoduleData.geneResp.length-1">{{resp.tags.transcript ? resp.tags.transcript : '无'}}</span>
                                <span v-else="">{{resp.tags.transcript ? resp.tags.transcript : '无,'}}</span>
                              </span>
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

                  <div class="img-content">

                    <img :src=IMG alt="">
                  </div>

                  <div class="edit">
                    <div class="edit-title">
                      编辑<span>(最后编辑人:"{{CNVmoduleData.lastEditor ? CNVmoduleData.lastEditor : '无'}}")：</span>
                    </div>
                    <div class="edit-content">
                      <div>评论：</div>
                      <textarea class="form-control" :data-id=CNVmoduleData.id id="commentCNV"
                                rows="3">{{CNVmoduleData.comment}}</textarea>
                    </div>

                    <div class="edit-content" :data-id="CNVmoduleData.id" id="">
                      <div>状态：</div>
                      <select class="form-control" id="CNV_select">
                        <option value="major">主要的</option>
                        <option value="minjor">次要的</option>
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
                    <tbody id="synopsis_table">
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
        <div role="tabpanel" class="tab-pane" id="settings">
          <div class="title-content row">
            <div class="col-md-offset-4 col-md-3">
              <input class="form-control" id="countInput" @keyup.enter="geneCoverEnter"
                     placeholder="输入gene名称，逗号分隔">
            </div>
            <div class="col-md-1">
              <button class="btn btn-color find-cover" @click="geneCoverEnter">查&nbsp;&nbsp;询</button>
            </div>
          </div>

          <div class="alert alert-danger alert-dismissible fade in noFound hide" role="alert" id="id_alert">
            <h4>警告：</h4>
            <p>以下基因名：（
              <span v-for="single in notfound">
                <a class="noFound-a" :href="dbHtml +'#/gene?query=' + single" target="_blank">{{single}}</a>
              </span>
              ）在GRCh37 refgene中没有找到，请确认基因名是否填写正确</p>
          </div>

          <table class="table submit-table myTable">
            <thead>
            <tr>
              <th>转录本</th>
              <th>基因</th>
              <th>NCBI GENE ID</th>
              <th>1X覆盖度</th>
              <th>5X覆盖度</th>
              <th>10X覆盖度</th>
              <th>20X覆盖度</th>
              <th>30X覆盖度</th>
            </tr>
            </thead>
            <tbody id="find_table">
            <tr v-for="data in allData">
              <td>{{data.transcrpit}}</td>
              <td>{{data.geneSymbol}}</td>
              <td>
                <span v-for="(gene,index) in data.geneId">
                   <a target="_blank" :href="dbHtml+'#/geneDetail?geneId=' + gene">{{gene}}</a>
                  <span v-if="index == data.geneId.length">；</span>
                </span>
              </td>
              <td>{{data.cov1}}</td>
              <td>{{data.cov5}}</td>
              <td>{{data.cov10}}</td>
              <td>{{data.cov20}}</td>
              <td>{{data.cov30}}</td>
            </tr>
            <tr v-if="allData.length == 0" style="text-align: center">
              <td colspan="8">暂无数据!</td>
            </tr>
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
  export default {
    components: {
      'location': topLocation,
      'search': search,
      'pagenation': pagenation,
    },
    data: function () {
      return {
        ID: this.$route.query.id,
        sampleInfo: '',
        datafile:'',
        //质控
        R1: '',
        R2: '',
        insertsize: '',
        CSV: '',
        QCLoading: true,
        final: '',
        aln: '',
        clinicalSynopsis: '',
        //变异详情
        detailAllData: '',
        detailCount: 0,
        detailReset: 0,
        detailPage: 1,
        detailLoading: false,
        moduleData: '',

        subPanelList:'',
        geneInput:'',
        panelInput:'',
        //CNV
        CNVAllData: '',
        CNVCount: 0,
        CNVReset: 0,
        CNVPage: 1,
        CNVLoading: false,
        CNVmoduleData: '',
        IMG: '',

        //基因覆盖度查询
        allData: [],
        coverLoading: false,
        notfound: [],
        sortArr: ["inheritance", "growth", "growthHeight", "growthWeight", "growthOther",
          "headAndNeck", "headAndNeckHead", "headAndNeckFace", "headAndNeckEars", "headAndNeckEyes",
          "headAndNeckNose", "headAndNeckMouth", "headAndNeckTeeth", "headAndNeckNeck", "cardiovascular",
          "cardiovascularHeart", "cardiovascularVascular", "respiratory", "respiratoryNasopharynx", "respiratoryLarynx",
          "respiratoryAirways", "respiratoryLung", "chest", "chestExternalFeatures", "chestRibsSternumClaviclesAndScapulae", "chestBreasts",
          "chestDiaphragm", "abdomen", "abdomenExternalFeatures", "abdomenLiver", "abdomenPancreas", "abdomenBiliaryTract", "abdomenSpleen", "abdomenGastrointestinal", "genitourinary",
          "genitourinaryExternalGenitaliaMale",
          "genitourinaryExternalGenitaliaFemale",
          "genitourinaryInternalGenitaliaMale",
          "genitourinaryInternalGenitaliaFemale",
          "genitourinaryKidneys",
          "genitourinaryUreters",
          "genitourinaryBladder",
          "skeletal",
          "skeletalSkull",
          "skeletalSpine",
          "skeletalPelvis",
          "skeletalLimbs",
          "skeletalHands",
          "skeletalFeet",
          "skinNailsHair",
          "skinNailsHairSkin",
          "skinNailsHairSkinHistology",
          "skinNailsHairSkinElectronMicroscopy",
          "skinNailsHairNails",
          "skinNailsHairHair",
          "muscleSoftTissue",
          "neurologic",
          "neurologicCentralNervousSystem",
          "neurologicPeripheralNervousSystem",
          "neurologicBehavioralPsychiatricManifestations",
          "voice",
          "metabolicFeatures",
          "endocrineFeatures",
          "hematology",
          "immunology",
          "neoplasia",
          "prenatalManifestations",
          "prenatalManifestationsMovement",
          "prenatalManifestationsAmnioticFluid",
          "prenatalManifestationsPlacentaAndUmbilicalCord",
          "prenatalManifestationsMaternal",
          "prenatalManifestationsDelivery",
          "laboratoryAbnormalities",
          "miscellaneous",
          "molecularBasis",
        ],
      }
    },
    created: function () {
      const _vue = this;
      //获得样本信息
      this.$axios({
        url: 'application/grandmgd/' + this.ID + '/',
      }).then(function (resp) {
        _vue.datafile = resp.data.datafile
        _vue.$axios({
          url: resp.data.job
        }).then(function (respJob) {
          _vue.sampleInfo = respJob.data.name;
        })
      });
      this.QC(); //获取质控详情数据
    },
    methods: {
      QC: function () {
        //FASTQC
        const _vue = this;
        this.$axios({
          url: 'application/grandmgd/' + this.ID + '/fastqc/',
        }).then(function (resp) {
          _vue.R1 = resp.data.r1;
          _vue.R2 = resp.data.r2;
        });

        this.$axios({
          url: 'application/grandmgd/' + this.ID + '/insertsize/',
        }).then(function (resp) {
          _vue.insertsize = resp.data
        });

        this.$axios({
          url: 'application/grandmgd/' + this.ID + '/csv/',
        }).then(function (resp) {
          _vue.CSV = resp.data
        });

        //列表
        this.$axios({
          url: 'application/grandmgd/' + this.ID + "/stat/",
        }).then(function (resp) {
          resp = resp.data;
          const qObj = {};//定义传到质控列表的对象一个对象
          $.each(resp.final, function (i, data) {
            if (data.name === 'mapped reads') {
              qObj.mapped = data.value.raw
            } else if (data.name === 'QC passed reads') {
              qObj.qc = data.value
            } else if (data.name === 'total reads') {
              qObj.total = data.value
            } else if (data.name === 'duplication rate') {
              qObj.duplication = data.value
            } else if (data.name === 'target reads ratio') {
              qObj.target = data.value
            } else if (data.name === 'depth') {
              qObj.depth = data.value
            } else if (data.name === '%_bases_above_1') {
              qObj.above_1 = data.value
            } else if (data.name === '%_bases_above_5') {
              qObj.above_5 = data.value
            } else if (data.name === '%_bases_above_10') {
              qObj.above_10 = data.value
            } else if (data.name === '%_bases_above_20') {
              qObj.above_20 = data.value
            } else if (data.name === '%_bases_above_30') {
              qObj.above_30 = data.value
            } else if (data.name === 'Sample_gender') {
              qObj.Sample_gender = data.value
            }
          });
          qObj.q30 = resp.data.q30 === -1 ? '---' : resp.data.q30;
          qObj.volume = resp.data.volume === -1 ? '---' : resp.data.volume;
          qObj.baseGender = resp.data.gender;
          if (qObj.Sample_gender === 'Male') {
            qObj.Sample_gender = '男'
          } else {
            qObj.Sample_gender = '女'
          }
//          qObj.gender = resp.data.gender === '女' ? 'Female' : 'Male';
          qObj.gender = resp.data.gender;
          _vue.final = qObj;
          _vue.aln = resp.aln;
          _vue.QCLoading = false;
          //如果性别和20X都不对
          if (qObj.Sample_gender !== qObj.gender && qObj.above_20 < 95) {
            alert('指数严重不合格！')
          }

        });
      },
      CNVFilter: function () {
        this.CNVReset = 1;
        this.CNVPage = 1;
        this.toCNV();
      },
      toCNV: function () {
        this.CNVLoading = true;
        let urlParam = '';
        const value = $('#CNV-fun').find('.on').html();
        if (value !== '不筛选') {
          urlParam = '&alt=' + value
        }
        const inputValue = $.trim($("#CNV-input").val());
        if (inputValue) {
          urlParam += '&genes=' + inputValue;
        }

        //条件判断结束
        const _vue = this;
        this.CNVAllData = [];
        this.$axios({
          url: 'application/grandmgd/' + this.ID + '/cnv/',
        }).then(function (resp) {
          let str = '';
          $.each(resp.data.query_params, function (i, value) {
            str += i + '=' + value + "&"
          });
          _vue.$axios({
            url: resp.data.query_url + '?' + str + 'page=' + _vue.CNVPage + urlParam,
          }).then(function (resp) { //开始填数据
            if (resp.data.count === 0) {
              _vue.CNVLoading = false
            }
            _vue.CNVCount = resp.data.count;
            //填充列表
            let id = 0;//用来代表从后台的接到的20个数据排序
            $.each(resp.data.results, function (i, value) {
              //遍历结果
              id += 1;
              value.id = id;

              //处理highlight和active得到级别(highlight为true的时候active必定为true)
              if (value.highlight && value.active) { //两个都为true是最高级
                value.level = 0
                /*红*/
              } else if (!value.highlight && value.active) {
                value.level = 1
                /*绿*/
              } else if (!value.highlight && !value.active) {
                value.level = 2
                /*灰*/
              }

              value.geneResp = [];
              $.each(value.annotations.geneUrl, function (k, data) {
                _vue.$axios({
                  url: data,
                }).then(function (geneResp) {
                  value.geneResp.push(geneResp.data);
                  if (i === resp.data.results.length - 1) {
                    _vue.CNVLoading = false
                  }
                });
              });
              _vue.CNVAllData.push(value); //填充最外层数据
            });
          });
        });
      },
      getCurrentCNV: function (data) {
        this.CNVPage = data;
        this.CNVReset = 0;
        this.toCNV();
      },
      showDetailCNV: function (event) {
        const _modal = $("#CNVDetail");
        const _vue = this;
        _modal.modal("show");
        //判断点击的是哪一个
        const id = $(event.target).data('id');
        let codeData = null;
        $.each(_vue.CNVAllData, function (i, value) {
          if (value.id === id) {
            codeData = value;
          }
        });
        this.CNVmoduleData = codeData;
        console.log(codeData)

        $("#CNV_select").find('option').each(function () {
          if ($(this).val() === codeData.status) {
            $(this).attr('selected', 'selected')
          }
        });
        $("#commentCNV").val(codeData.comment); //强制更新评论内容，因为vue的惰性加载，值不变就不加载，导致上次评论未保存内容依旧存在
        //获取图片地址

        this.$axios({
          url: 'application/grandmgd/' + _vue.ID + '/image/?pos=' + codeData.localcnv.chrom +
          ':' + codeData.localcnv.start + '-' + codeData.localcnv.end
        }).then(function (resp) {
          console.log(resp);
          _vue.IMG = resp.data.url
        })

      },
      patchEditCNV: function (url,eid) {
//        const url = $("#save_designCNV").data('url');
        const _comment = $("#commentCNV");
//        const id = _comment.data('id');
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
          $.each(_vue.CNVAllData, function (i, data) {
            if (data.id === eid) {
              data.comment = ajaxValue;
              data.status = $("#CNV_select").find('option:selected').val()
            }
          });
          alert('修改成功!');
//          _vue.toCNV();
        });
      },
      geneCoverEnter: function () {
        const value = $.trim($("#countInput").val());
        if (!value) {
          alert('gene名称不能为空');
          return
        }
        const _vue = this;
        this.coverLoading = true;
        this.$axios({
          url: 'application/grandmgd/' + this.ID + '/cov/',
          method: 'post',
          data: {'gene': value.split(',')}
        }).then(function (resp) {
          resp = resp.data;

          _vue.coverLoading = false;
          if (resp.notfound.length === 0) {
            $("#id_alert").addClass('hide');
            _vue.allData = resp.found;
          } else {
            $("#id_alert").removeClass('hide');
            _vue.notfound = resp.notfound;
          }
        });
      },
      conClick: function (event) {
        if ($(event.target).hasClass('on')) {
        } else {
          $(event.target).parent().find('.on').removeClass('on');
          $(event.target).addClass('on')
        }
      },
      showTextArea: function () {
        const $text = $("#gene-name");
        const $click = $('#fliter-gene');
        if ($text.hasClass('hide')) {
          $text.removeClass('hide');
          $click.addClass('on')
        } else {
          $text.addClass('hide');
          $click.removeClass('on')
        }
      },
      showDetail: function (event) {
        const _modal = $("#mutateDetail");
        const _vue = this;
        _modal.modal("show");
        //判断点击的是哪一个
        const id = $(event.target).data('id');
        let codeData = null;
        $.each(_vue.detailAllData, function (i, value) {
          if (value.id === id) {
            codeData = value;
          }
        });
        this.moduleData = codeData;
        console.log(codeData)

        $("#detail_select").find('option').each(function () {
          console.log($(this).val())
          if ($(this).val() == codeData.status) {
            $(this).attr('selected', 'selected')
            $(this).prop('selected', true)
          }
        });

        $("#comment").val(codeData.comment); //强制更新评论内容，因为vue的惰性加载，值不变就不加载，导致上次评论未保存内容依旧存在
      },
      addBc: function (event) {
        $("#aberrance").find(".bc-active").removeClass('bc-active');
        $(event.target).closest('tr').addClass('bc-active');
      },
      addBcCNV: function (event) {
        $("#aberrance1").find(".bc-active").removeClass('bc-active');
        $(event.target).closest('tr').addClass('bc-active');
      },
      detailFilter: function () {
        this.detailReset = 1;
        this.detailPage = 1;
        this.toDetail();
      },
      toDetail: function () {
        this.detailLoading = true;
        let urlParam = '';
        $('#profile').find('.condition').each(function () {
          if ($(this).html() !== '不筛选' && $(this).hasClass('on')) {
            urlParam += '&' + $(this).data('name') + '=' + $(this).data('value');
          }
        });
        if ($("#fliter-gene").hasClass('on')) {
          urlParam += '&genes=' + $.trim($("#gene-name").find('textarea').val())
        }
        //条件判断结束
        const _vue = this;
        this.detailAllData = [];
        this.$axios({
          url: 'application/grandmgd/' + this.ID + '/snv/',
        }).then(function (resp) {
          let str = '';
          $.each(resp.data.query_params, function (i, value) {
            str += i + '=' + value + "&"
          });
          _vue.$axios({
            url: resp.data.query_url + '?' + str + 'page=' + _vue.detailPage + urlParam,
          }).then(function (resp) { //开始填数据
            if (resp.data.count === 0) {
              _vue.detailLoading = false
            }
            _vue.detailCount = resp.data.count;
            //填充列表
            let id = 0;//用来代表从后台的接到的20个数据排序
            $.each(resp.data.results, function (i, value) {
              //遍历结果
              id += 1;
              value.id = id;
              //处理highlight和active得到级别(highlight为true的时候active必定为true)
              if (value.highlight && value.active) { //两个都为true是最高级
                value.level = 0
              } else if (!value.highlight && value.active) {
                value.level = 1
              } else if (!value.highlight && !value.active) {
                value.level = 2
              }
//              value.localsnvData = {};
//              value.atAnnosData = {};
//              value.illnessData = [];
              value.geneResp = [];
              $.each(value.annotations.geneUrl, function (k, data) {
                _vue.$axios({
                  url: data,
                }).then(function (geneResp) {
                  value.geneResp.push(geneResp.data);
                  if (i === resp.data.results.length - 1) {
                    _vue.detailLoading = false
                  }
                });
              });
              _vue.detailAllData.push(value); //填充最外层数据
            });
          });
        });
      },
      getCurrentDetail: function (data) {
        this.detailPage = data;
        this.detailReset = 0;
        this.toDetail();
      },
      patchEdit: function (url,eid) {
//        const url = $("#save_design").data('url');
        const _comment = $("#comment");
//        const id = _comment.data('id');
        const ajaxValue = $.trim(_comment.val());
        const _vue = this;
        this.$axios({
          url: url,
          method: 'patch',
          data: {
            'status': $("#detail_select").find('option:selected').val(),
            'comment': ajaxValue
          }
        }).then(function (resp) {
          $.each(_vue.detailAllData, function (i, data) {
            if (data.id === eid) {
              data.comment = ajaxValue;
              data.status = $("#detail_select").find('option:selected').val()
            }
          });
          alert('修改成功!')
        });
      },
      resetCon: function () {
        $('#profile').find(".on").each(function () {
          if ($(this).hasClass("row-name")) { //gene输入框
            $(this).click()
          } else {
            $(this).parent().find('.on').removeClass('on');
            $(this).parent().find('.con-default').addClass('on');
          }
        })
      },
      resetConCNV: function () {
        $("#CNV-fun").find('.on').removeClass('on');
        $("#CNV-fun").find(".con-default").addClass('on');
        $("#CNV-input").val('');
      },
      showHPO: function (id, data) {
        $("#hpo_detail").modal("show");

        this.clinicalSynopsis = '';

        this.detailLoading = !$.isEmptyObject(data.omim.clinicalSynopsis);
//        表型信息 排序并显示HPO的中文
        const clinicalSynopsisArr = [];
        const _vue = this;
        let count = 0; //用来记clinicalSynopsis对象有多少个值
        $.each(data.omim.clinicalSynopsis, function (n2, data2) {
          count += 1;
          data2.name = n2;
          $.each(data2, function (n3, data3) {
            if (data3.hpo) {
              _vue.$axios({
                method: "get",
                url: _vue.dbUrl + 'knowledge/hpo/' + data3.hpo + '/',
              }).then(function (resp) {
                data3.hpoName = resp.data.titles.chinese;
                _vue.loading = false;
                if (n3 === data2.length - 1) { //如果clinicalSynopsis对象某个属性遍历完了
                  clinicalSynopsisArr.push(data2);
                  if (count === clinicalSynopsisArr.length) { ////如果clinicalSynopsis对象所有属性遍历完了
                    _vue.clinicalSynopsis = clinicalSynopsisArr;
                    _vue.detailLoading = false;

                  }
                }
              }).catch(function (error) {
                _vue.catchFun(error)
              });
            } else {
              if (n3 === data2.length - 1) {
                clinicalSynopsisArr.push(data2);
                if (count === clinicalSynopsisArr.length) {
                  _vue.clinicalSynopsis = clinicalSynopsisArr;
                  _vue.detailLoading = false;

                }
              }
            }
          });
        });
      },
      showHPOCNV: function (id, data) {
        $("#hpo_detail_cnv").modal("show");

        this.clinicalSynopsis = '';

        this.detailLoading = !$.isEmptyObject(data.omim.clinicalSynopsis);
//        表型信息 排序并显示HPO的中文
        const clinicalSynopsisArr = [];
        const _vue = this;
        let count = 0; //用来记clinicalSynopsis对象有多少个值
        $.each(data.omim.clinicalSynopsis, function (n2, data2) {
          count += 1;
          data2.name = n2;
          $.each(data2, function (n3, data3) {
            if (data3.hpo) {
              _vue.$axios({
                method: "get",
                url: _vue.dbUrl + 'knowledge/hpo/' + data3.hpo + '/',
              }).then(function (resp) {
                data3.hpoName = resp.data.titles.chinese;
                _vue.loading = false;
                if (n3 === data2.length - 1) { //如果clinicalSynopsis对象某个属性遍历完了
                  clinicalSynopsisArr.push(data2);
                  if (count === clinicalSynopsisArr.length) { ////如果clinicalSynopsis对象所有属性遍历完了
                    _vue.clinicalSynopsis = clinicalSynopsisArr;
                    _vue.detailLoading = false;

                  }
                }
              }).catch(function (error) {
                _vue.catchFun(error)
              });
            } else {
              if (n3 === data2.length - 1) {
                clinicalSynopsisArr.push(data2);
                if (count === clinicalSynopsisArr.length) {
                  _vue.clinicalSynopsis = clinicalSynopsisArr;
                  _vue.detailLoading = false;

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
      /*模糊查询 修改panel*/
      showPanel:function () {
        const _vue = this;
        this.$axios({
          url: 'sample/genelist/' + _vue.datafile + '/'
        }).then(function (resp) {
          _vue.geneInput = resp.data.panelCode.join(',');
          _vue.panelInput = resp.data.customGene.join(',');
        }).catch(function (error) {
          _vue.catchFun(error);
        });
        $("#editGeneModal1").modal('show')
      },
      showSubpanel: function () {
        let value = $.trim(this.geneInput);
        value = value.replace('，', ',');
        let valueArr = value.split(',');
        if (!valueArr[valueArr.length - 1]) {
          return;
        }
        this.loading = true;
        const _vue = this;

        let newArr = [];
        $.each(valueArr,function (i,data) {
          newArr.push($.trim(data));
        });

        valueArr = newArr;

        this.$axios({
          url: _vue.dbUrl + 'product/subpanel/?query=' + valueArr[valueArr.length - 1]
        }).then(function (resp) {
          $("#subpanel").removeClass('hide');
          _vue.subPanelList = resp.data.results;
          _vue.loading = false;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      clickLi: function (code) {
        let flag = false;
        let value = $.trim(this.geneInput);
        value = value.replace('，', ',');
        let valueArr = value.split(',');

        $.each(valueArr, function (i, data) {
          if (data === code) {
            flag = true;
          }
        });
        if (flag) {
          alert('请不要重复添加');
          return;
        }

        valueArr[valueArr.length - 1] = code;
        this.geneInput = valueArr.join(',');
//        var lastStr = this.geneInput.substring(this.geneInput.length-1,this.geneInput);
//        console.log(lastStr);
//        if(lastStr === ',' || lastStr === '，'){
//          this.geneInput = this.geneInput+ code
//        }else{
//          this.geneInput = this.geneInput+ ','+code
//        }
      },
      hideSubpanel: function () {
        $("#subpanel").addClass('hide');
      },
      saveEditGene: function () {
        const _vue = this;
        this.geneInput = this.geneInput.replace('，', ',');
        this.panelInput = this.panelInput.replace('，', ',');

        let arr1 = this.geneInput.split(',');
        let arr2 = this.panelInput.split(',');

        if (arr1.length === 1 && arr1[0] === '') {
          arr1 = [];
        }
        if (arr2.length === 1 && arr2[0] === '') {
          arr2 = [];
        }
        this.$axios({
          url: 'sample/genelist/' + this.datafile + '/',
          method: 'patch',
          data: {
            panelCode: arr1,
            customGene: arr2,
          }
        }).then(function () {
          alert('提交成功');
          $("#editGeneModal1").modal('hide')
        }).catch(function (error) {
          _vue.catchFun(error);
        })
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
          case 'minjor':
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
      getHomo: function (str) {
        if (str) {
          return '纯合'
        } else {
          return '杂合'
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
    ,
  }
</script>

<style scoped lang="less">
  @inColor: rgb(44, 127, 210);
  @bcIn: rgb(240, 244, 247);
  @border: rgb(225, 226, 227);
  @bcTable:rgb(242,242,242);
  /* @bcTable:red*/;
  #settings{
    .title-content{
      /*margin-top: 20px;*/
      padding-top: 35px;
    }
  }
  #messages{
    >div.row.font-12{
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
    .row.font-12,.title-content.row{
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
    #home{
      padding: 25px 0 100px 30px;
      border-left: 1px solid @border;
      border-right: 1px solid @border;
      border-bottom: 1px solid @border;
      .down-content{
        margin: 30px 0;
        font-weight: bold;
        >.inline{
          margin-right: 80px;
        }
        .flag-content{
          .red{
            /*display: inline-block;*/
            /*width: 16px;*/
            /*height: 16px;*/
            /*background-color: rgb(233,73,73);*/
            /*margin-right: 5px;*/
            color: rgb(233,73,73);
          }
        }
      }
      .table-content{
        width: 80%;
        border-left: 1px solid rgb(194,194,194);
        border-right: 1px solid rgb(194,194,194);
        overflow: hidden;
        table{
          margin: 0;
        }
        th,td{
          text-align: center;
          border-bottom: none;
          border-top: none;
        }
        .trIn{
          background-color: @bcTable;
        }
        .right-table{
          width: 40%;
          th{
            color: #fff;
          }
          .th-4{
            background-color: rgb(44,127,210);
          }
        }
        .left-table{
          width: 60%;
          float: left;
          th{
            color: #fff;
          }
          td{
            border-right: 1px solid rgb(194,194,194);
          }
          .th-1{
            background-color: rgb(255,187,52)
          }
          .th-2{
            background-color: rgb(241,69,108)
          }
          .th-3{
            background-color: rgb(0,198,148)
          }
          .th-4{
            background-color: rgb(44,127,210);
          }
          .aln{
            div{
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

  .task-result-table {
    margin-top: 20px;
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

  .find-cover{
    margin-top: 5px;
  }

  #showPanel{
    margin-left: 100px;
  }

  #editGeneModal1{
    .modal-body .row input, .modal-body .row select, .modal-body .row textarea {
      width: 50%;
      height: 35px;
      margin-top: 5px;
      line-height: 20px;
    }

    .modal-body .row textarea {
      width: 90%;
      height: 100px;
    }

    .modal-body .row {
      height: 45px;
      line-height: 40px;
      border-bottom: 1px solid #e5e5e5;
    }

    .modal-body .row.noneBottom {
      height: 120px;
      border-bottom: none;
    }

    .panel {
      position: relative;
    }

    .panel ul {
      position: absolute;
      padding: 0;
      top: 50px;
      z-index: 100;
      left: 14px;
    }

    .panel ul li {
      display: block;
      padding: 5px 10px;
      margin-bottom: -1px;
      background-color: #fff;
      border: 1px solid #ddd;
      cursor: pointer;
    }

    .panel ul li:hover {
      background-color: rgb(0, 161, 233);
    }

    .panel input {
      float: left;
      margin: 0;
    }

    .panel a {
      float: left;
      margin-left: 20px;
    }
  }

</style>
