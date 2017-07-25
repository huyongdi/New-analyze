<template>
  <div class="right-content">
    <loading v-if="loading"></loading>
    <location imgClass="database-small" currentPage="数据列表"></location>
    <div class="detailShow fff">
      <search :inputValue='inputValue' placeholder="请输入关键字" @onEnter="onEnter"></search>
      <div class="btn-content">
        <label class="checkbox-inline" @click="">
          <input type="checkbox" v-model="hasAllchecked" @click.stop="allChecked"> 全选
        </label>
        <button type="button" class="btn my-btn" @click="deleteAll">
          <i class="fa fa-minus-square-o"></i>
          删除数据

        </button>
        <button type="button" class="btn my-btn" @click="addDataFun">
          <i class="fa fa-plus-square-o"></i>
          添加数据

        </button>
        <button type="button" class="btn my-btn" @click="addExcelFun">
          <i class="fa fa-file-excel-o"></i>
          提交Excel文件

        </button>
      </div>
      <table class="table myTable">
        <thead>
        <tr>
          <th>选择</th>
          <th>文件编号</th>
          <th>样本编号</th>
          <th>受检者</th>
          <th>检测平台</th>
          <th>数据格式</th>
          <th>数据量(Mbp)</th>
          <th>Q30%</th>
          <th>备注</th>
          <th>下载</th>
          <th>分析结果</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(val,index) in lists" @click="addBc">
          <td><input :data-code=val.code @click="listInput" class="list-input" type="checkbox"/></td>
          <td>{{val.code}}</td>
          <td>{{val.sampleCode}}</td>
          <td>{{val.patientName}}（{{val.gender}}）</td>
          <td>{{val.capture}}</td>
          <td>{{val.dataFormat}}</td>
          <td>
            <span v-if="val.volume==-1"> - </span>
            <span v-else="">{{val.volume}}</span>
          </td>
          <td>
            <span v-if="val.q30==-1"> - </span>
            <span v-else="">{{val.q30}}</span>
          </td>
          <td>{{val.comment ? val.comment : ' - '}}</td>
          <td>
            <div class="dropdown" @mouseenter="showFile" @mouseleave="hideFile">
              <span class="dropdown-toggle" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="true">文件
                <span class="caret"></span>
              </span>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li><a :href="val.file1" v-if="val.file1">文件1</a></li>
                <li><a :href="val.file2" v-if="val.file2">文件2</a></li>
              </ul>
            </div>
          </td>
          <td>
            <span v-if="val.jobs && val.jobs.length==0">待分析</span>
            <div v-else="" class="dropdown" @mouseenter="showResult" @mouseleave="hideResult">
              <router-link v-if="val.jobs[0].app.code === 'grandmgd'"
                           :to="{path:'sgResult',query:{id:val.jobs[0].paramId}}">
                <i data-toggle="tooltip" data-placement="top"
                   :data-original-title="val.jobs[0].app.name+'('+val.jobs[0].paramId+')'"
                   v-if="val.jobs[0].status == 'completed'" class="fa fa-check text-success po">已完成</i>
              </router-link>
              <router-link v-if="val.jobs[0].app.code === 'grandmito'"
                           :to="{path:'gmResult',query:{id:val.jobs[0].paramId}}">
                <i data-toggle="tooltip" data-placement="top"
                   :data-original-title="val.jobs[0].app.name+'('+val.jobs[0].paramId+')'"
                   v-if="val.jobs[0].status == 'completed'" class="fa fa-check text-success po">已完成</i>
              </router-link>
              <router-link v-if="val.jobs[0].app.code === 'grandwcnv'"
                           :to="{path:'gwResult',query:{id:val.jobs[0].paramId}}">
                <i data-toggle="tooltip" data-placement="top"
                   :data-original-title="val.jobs[0].app.name+'('+val.jobs[0].paramId+')'"
                   v-if="val.jobs[0].status == 'completed'" class="fa fa-check text-success po">已完成</i>
              </router-link>
              <router-link v-if="val.jobs[0].app.code === 'grandanno'"
                           :to="{path:'snvResult',query:{id:val.jobs[0].paramId}}">
                <i data-toggle="tooltip" data-placement="top"
                   :data-original-title="val.jobs[0].app.name+'('+val.jobs[0].paramId+')'"
                   v-if="val.jobs[0].status == 'completed'" class="fa fa-check text-success po">已完成</i>
              </router-link>


              <span v-if="val.jobs[0].status == 'running'" class="text-success">
                <i class="fa fa-spinner fa-pulse"></i>运行中
              </span>
              <i v-if="val.jobs[0].status == 'error'" class="fa fa-bug text-danger">出错</i>

            </div>
          </td>
          <td>
            <button type="button" class="btn my-btn my-btn-small" :data-index="index" @click="editFun(val)">
              <i class="fa fa-pencil fa-fw"></i>编辑

            </button>
            <button type="button" class="btn my-btn my-btn-small" :data-code=val.code @click='deleteFun'>
              <i class="fa fa-minus-square-o fa-fw"></i>删除

            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <pagenation :count="count" :reset="reset" @getCurrent="getCurrent"></pagenation>

      <!--点击单列的编辑-->
      <div class="modal fade" tabindex="-1" role="dialog" id="editModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title">修改样本数据</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-3">文件编号</div>
                <div class="col-md-9 edit-one" id="edit-code">{{editModalData.code}}</div>
              </div>
              <div class="row">
                <div class="col-md-3">Capture</div>
                <div class="col-md-9 relative">
                  <select class="form-control" id="edit-capture" :value="editModalData.capture">
                    <option value="">请选择</option>

                    <option :value="list.name" v-for="list in capList">{{list.name}}</option>


                  </select>
                  <a href="javascript:void(0)" class="toArea" @click="toArea">新增捕获区域</a>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">样本编号</div>
                <div class="col-md-9">
                  <input type="text" class="form-control" id="edit-sampleCode" :value="editModalData.sampleCode">
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">受检者姓名</div>
                <div class="col-md-9">
                  <input type="text" class="form-control" id="edit-patientName" :value="editModalData.patientName">
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">受检者性别</div>
                <div class="col-md-9">
                  <input type="text" class="form-control" id="edit-gender" :value="editModalData.gender">
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">数据格式</div>
                <div class="col-md-9">
                  <input type="text" class="form-control" id="edit-dateFormat" :value="editModalData.dataFormat">
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">数据量</div>
                <div class="col-md-9">
                  <input type="text" class="form-control" id="edit-volume"
                         :value="editModalData.volume == -1?' - ':editModalData.volume">
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">Q30</div>
                <div class="col-md-9">
                  <input type="text" class="form-control" id="edit-q30"
                         :value="editModalData.q30 == -1?' - ' :editModalData.q30">
                </div>
              </div>
              <div class="row noneBottom">
                <div class="col-md-3">备注</div>
                <div class="col-md-9">
                  <textarea type="text" class="form-control" id="edit-comment"
                            :value="editModalData.comment"></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-primary my-btn" @click="editShowGene">基因信息</button>
              <button type="button" class="btn btn-primary my-btn" @click="saveEdit">保存</button>
            </div>
          </div>
        </div>
      </div>
      <!--点击单列的编辑里面的基因-->
      <div class="modal fade" tabindex="-1" role="dialog" id="editGeneModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title">提交基因信息</h4>
            </div>
            <div class="modal-body" id="modal-panel">
              <div class="row">
                <div class="col-md-2">
                  <a :href="dbHtml+'#/panel'" class="toPanel" target="_blank" title="点击跳转到基因页面">Panel信息</a>
                </div>
                <div class="col-md-10 relative">
                  <fuzzyQuery placeholder='请输入panel名' :leftData="panelData" :rightData="originalPanelData" title="已选panel"
                              @sendInput="receiveFuzzy"></fuzzyQuery>
                </div>
              </div>

              <div class="row">
                <div class="col-md-2">Gene信息</div>
                <div class="col-md-10">
                  <textarea v-model="geneInput" placeholder="请用逗号或换行隔开" class="form-control"></textarea>
                </div>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-primary my-btn" @click.self="saveEditGene">保存</button>
            </div>
          </div>
        </div>
      </div>
      <!--点击添加数据-->
      <div class="modal fade" tabindex="-1" role="dialog" id="addData">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title">添加数据</h4>
            </div>
            <div class="modal-body">
              <form id="addDataForm">
                <div class="row">
                  <div class="col-md-3"><span class="fa fa-star"></span>文件编号</div>
                  <div class="col-md-9"><input type="text" id="add-code" class="form-control" name="code"></div>
                </div>
                <div class="row">
                  <div class="col-md-3"><span class="fa fa-star"></span>检测平台</div>
                  <div class="col-md-9">
                    <select class="form-control" name="capture">
                      <option value="">请选择</option>
                      <option :value="list.name" v-for="list in capList">{{list.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3"><span class="fa fa-star"></span>样本编号</div>
                  <div class="col-md-9">
                    <input type="text" class="form-control" id="add-sampleCode" name="sampleCode">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3"><span class="fa fa-star"></span>受检者姓名</div>
                  <div class="col-md-9">
                    <input type="text" class="form-control" id="add-patientName" name="patientName">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">受检者性别</div>
                  <div class="col-md-9">
                    <!--<input type="text" class="form-control" name="gender">-->
                    <select name="gender" id="" class="form-control">
                      <option value="男">男</option>
                      <option value="女">女</option>
                      <option value="未知">未知</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3"><span class="fa fa-star"></span>数据格式</div>
                  <div class="col-md-9">
                    <!--<input type="text" class="form-control" name="dataFormat">-->
                    <select name="dataFormat" id="" class="form-control">
                      <option value="fastq">fastq</option>
                      <option value="fastqSE">fastqSE</option>
                      <option value="vcf">vcf</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">数据量(Mbp)</div>
                  <div class="col-md-9">
                    <input type="text" class="form-control" id="add-volume" name="volume">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">Q30</div>
                  <div class="col-md-9">
                    <input type="text" class="form-control" id="add-q30" name="q30">
                  </div>
                </div>
                <div class="row noneBottom">
                  <div class="col-md-3">备注</div>
                  <div class="col-md-9">
                    <textarea type="text" class="form-control" id="add-comment" name="comment"></textarea>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3"><span class="fa fa-star"></span>文件1</div>
                  <div class="col-md-9">
                    <input type="text" class="form-control" id="add-file1" name="file1">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">文件2</div>
                  <div class="col-md-9">
                    <input type="text" class="form-control" id="add-file2" name="file2">
                  </div>
                </div>
                <!--<div class="row">-->
                <!--<div class="col-md-3"><span class="fa fa-star"></span>文件1</div>-->
                <!--<div class="col-md-9">-->
                <!--<input type="file" name="file1">-->
                <!--</div>-->
                <!--</div>-->
                <!--<div class="row">-->
                <!--<div class="col-md-3">文件2-->
                <!--</div>-->
                <!--<div class="col-md-9">-->
                <!--<input type="file" name="file2">-->
                <!--</div>-->
                <!--</div>-->
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-primary my-btn" @click="saveData">保存</button>
            </div>
          </div>
        </div>
      </div>
      <!--点击添加excel文件-->
      <div class="modal fade" tabindex="-1" role="dialog" id="addExcel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title">提交Excel文件</h4>
            </div>
            <div class="modal-body">
              <a class="data-base" :href='anaHtml+"/static/数据模版.xlsx"' title="点击下载数据模板">数据模板</a>
              <form id="addExcelForm">
                <input type="file" name="excel"/>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-primary my-btn" @click="saveExcel">保存</button>
            </div>
          </div>
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
  export default {
    components: {
      'location': topLocation,
      'search': search,
      'pagenation': pagenation,
      'fuzzyQuery': fuzzyQuery,
    },
    data: function () {
      return {
        panelData: [],
        originalPanelData: [],

        page: 1,
        inputValue: '',
        loading: true,
        lists: [],
        listsTemp: [],
        hasAllchecked: false,
        hasAllcheckedFlag: false, /*chrome和firefox对点击判断checked不一样*/
        //页码
        count: 0,
        reset: 0,
        //单列编辑modal
        editModalData: '',
        geneInput: '',
        panelInput: '',
        //添加数据
        addModalData: '',
        //模糊搜索
        subPanelList: [],
        //捕获区域（检测平台列表）
        capList:[]
      }
    },
    created: function () {
      this.dataAxios();
      this.getCapture();
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip();
    },
    methods: {
      getCapture:function () {
        const _vue = this;
        this.$axios({
          url: 'sample/capture/',
          method: 'get'
        }).then(function (resp) {
          _vue.capList = resp.data.results;
          _vue.loading = false;
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      dataAxios: function () {
        const _vue = this;
        this.lists = [];
        this.loading = true;
        const axiosUrl = this.inputValue ? 'sample/datafile/' + '?page=' + this.page + '&query=' + this.inputValue
          : 'sample/datafile/' + '?page=' + this.page;
        this.$axios({
          url: axiosUrl,
          method: 'get'
        }).then(function (resp) {
          _vue.count = resp.data.count;
          if (_vue.count === 0) {
            _vue.loading = false;
          }
          $.each(resp.data.results, function (i, data) {
            data.jobs = []
          });
          $.each(resp.data.results, function (k4, k5) {
            k5.file1 = 'test.analyze.grandbox.site/media/' + k5.file1;
            k5.file2 = 'test.analyze.grandbox.site/media/' + k5.file2;
          });
          _vue.lists = resp.data.results;
          _vue.listsTemp = resp.data.results;
          _vue.getJob();
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      getJob: function () {
        const _vue = this;
        $.each(_vue.lists, function (i, data) {
          _vue.$axios({
            url: 'sample/datafile/' + data.code + '/job/',
            method: 'get'
          }).then(function (resp) {
            resp = resp.data;
            console.log(resp)
            $.each(resp, function (k1, k2) {
              data.jobs.push({
                paramId: k2.paramId,
                app: k2.app,
                status: k2.status,
              });
            });
            _vue.loading = false
          }).catch(function (error) {
            _vue.catchFun(error);
          });

        })
      },
      onEnter: function (data) {
        this.inputValue = data;
        this.page = 1;
        this.reset = 1; //重置当前页面为1
        this.dataAxios();
      },
      getCurrent: function (data) {
        this.page = data;
        this.reset = 0;
        this.dataAxios();
      },
      editFun: function (val) {
        this.editModalData = '';
        this.editModalData = val;
        const _vue = this;
        this.$axios({
          url: 'sample/genelist/' + val.code + '/'
        }).then(function (resp) {
          _vue.originalPanelData=[];
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
        $("#editModal").modal('show');

      },
      editShowGene: function () {
        const _vue = this;
//        console.log(this.editModalData)
//        this.$axios({
//          url: 'sample/genelist/' + this.editModalData.code + '/'
//        }).then(function (resp) {
//          console.log(resp.data)
////          _vue.panelValue = resp.data.panelCode;
//          $.each(resp.data.panelCode, function (i, data) {
//            _vue.originalPanelData.push({
//              key: data,
//              value: data
//            });
//          });
//          _vue.geneInput = resp.data.customGene.join(',');
//        }).catch(function (error) {
//          _vue.catchFun(error);
//        });

        $("#editGeneModal").modal('show')
      },
      saveEdit: function () {
        const _vue = this;
        var axiosObj = {
          capture: $.trim($("#edit-capture").val()),
          sampleCode: $.trim($("#edit-sampleCode").val()),
          patientName: $.trim($("#edit-patientName").val()),
          gender: $.trim($("#edit-gender").val()),
          dateFormat: $.trim($("#edit-dateFormat").val()),
          volume: $("#edit-volume").val() === ' - ' ? -1 : $.trim($("#edit-volume").val()),
          q30: $("#edit-q30").val() === ' - ' ? -1 : $.trim($("#edit-q30").val()),
          comment: $.trim($("#edit-comment").val()),
        };
        this.$axios({
          url: 'sample/datafile/' + $("#edit-code").html() + '/',
          method: 'patch',
          data: axiosObj
        }).then(function () {
          alert('编辑成功');
          $("#editModal").modal('hide');
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      deleteFun: function (event) {
        const _vue = this;
        if (confirm('是否删除该样本')) {
          const code = $(event.target).data('code');
          _vue.$axios({
            url: 'sample/datafile/' + code + '/',
            method: 'delete'
          }).then(function () {
            alert('已成功删除该样品');
            $(event.target).parent().parent().remove();
          }).catch(function (error) {
            _vue.catchFun(error);
          })
        }
      },
      listInput: function () {
        this.hasAllchecked = $(".list-input:checked").length === this.lists.length;
        this.hasAllcheckedFlag = $(".list-input:checked").length === this.lists.length;
      },
      allChecked: function () {
        if (!this.hasAllcheckedFlag) {  //准备变成true状态
          $(".list-input").each(function () {
            $(this).prop('checked', true);
          });
          this.hasAllcheckedFlag = true;
        } else {
          $(".list-input").each(function () {
            $(this).prop('checked', false);
          });
          this.hasAllcheckedFlag = false;
        }
      },
      deleteAll: function () {
        const length = $(".list-input:checked").length;
        const _vue = this;
        let i = 0; //用来计数成功删除的个数
        if (length === 0) {
          alert('请选择删除项')
        } else {
          if (confirm('确定要删除吗？')) {
            $(".list-input").each(function () {
              if ($(this).prop('checked')) {
                const code = $(this).data('code');
                const _this = $(this);
                _vue.$axios({
                  url: 'sample/datafile/' + code + '/',
                  method: 'delete'
                }).then(function () {
                  _this.parent().parent().remove();
                  i += 1;
                  if (i === length) {
                    alert('全部删除成功')
//                    _vue.$router.go(0);
                    _vue.dataAxios()
                  }
                }).catch(function (error) {
                  _vue.catchFun(error);
                })
              }
            })
          }
        }
      },
      addDataFun: function () {
        $("#addData").modal("show")
      },
      saveData: function () {
        const _vue = this;

        $("#add-code").val($.trim($("#add-code").val()));
        $("#add-sampleCode").val($.trim($("#add-sampleCode").val()));
        $("#add-patientName").val($.trim($("#add-patientName").val()));
        $("#add-volume").val($.trim($("#add-volume").val()));
        $("#add-q30").val($.trim($("#add-q30").val()));
        $("#add-comment").val($.trim($("#add-comment").val()));
        $("#add-file1").val($.trim($("#add-file1").val()));
        $("#add-file1").val($.trim($("#add-file1").val()));

        this.$axios({
          url: 'sample/datafile/',
          method: 'post',
          data: new FormData(document.getElementById('addDataForm'))
        }).then(function () {
          alert('提交成功');
          $("#addData").modal("hide");
//          _vue.$router.go(0);
          _vue.dataAxios()

        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      addExcelFun: function () {
        $("#addExcel").modal("show")
      },
      saveExcel: function () {
        const _vue = this;
        this.loading = true;
        this.$axios({
          url: 'sample/datafile/excel/',
          method: 'post',
          data: new FormData(document.getElementById('addExcelForm'))
        }).then(function (resp) {
          alert(resp.data);
          _vue.loading = false;
        }).catch(function (error) {
          _vue.loading = false;

          _vue.catchFun(error);
        })
      },
      showResult: function (event) {
        $(event.target).addClass('open')
      },
      hideResult: function (event) {
        $(event.target).removeClass('open')
      },
      showFile: function (event) {
        $(event.target).addClass('open')
      },
      hideFile: function (event) {
        $(event.target).removeClass('open')
      },
      addBc: function (event) {
        const _tr = $(event.target).closest('tr');
        const _table = _tr.closest('table');
        _table.find('.tr-active').removeClass('tr-active')
        _tr.addClass('tr-active');
      },
      toArea: function () {
        $("#editModal").modal('hide');
        this.$router.push({'path': '/captureArea'})
      },
      receiveFuzzy: function (data) {
        const _vue = this;
        _vue.loading = true;
        this.$axios({
          url: _vue.dbUrl + 'product/subpanel/?query=' + data
        }).then(function (resp) {
            _vue.panelData = [];
          $.each(resp.data.results, function (n, data) {
            _vue.panelData.push({
              key: data.code,
              value: data.name_cn
            })
          });
          _vue.loading = false;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      showSubpanel: function () {
        const _vue = this;
        _vue.loading = true;
        this.$axios({
          url: _vue.dbUrl + 'product/subpanel/?query=' + this.panelInput
        }).then(function (resp) {
          _vue.panelData = [];
          $.each(resp.data.results, function (n, k) {
            _vue.panelData.push({
              key: k.code,
              label: k.name_cn,
            });
          });
          _vue.loading = false;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      saveEditGene: function () {
        const _vue = this;
//        this.geneInput = this.geneInput.replace('，', ',');
//        this.geneInput = this.geneInput.replace(/<\/?.+?>/g, ",");
//        this.geneInput = this.geneInput.replace(/[\r\n]/g, ",");
//
//        let geneArr = this.geneInput.split(',');
        let panelArr = [];
//        if (geneArr.length === 1 && geneArr[0] === '') {
//          geneArr = [];
//        }
//        $("#modal-panel").find('.fuzzy-content .right ul li').each(function () {
//          panelArr.push($(this).data('key'))
//        });
        $('#right-ul').find('li').each(function () {
          panelArr.push($(this).data('key'))
        });

        this.$axios({
          url: 'sample/genelist/' + this.editModalData.code + '/',
          method: 'patch',
          data: {
            panelCode: panelArr,
            customGene: _vue.strToArr(this.geneInput),
          }
        }).then(function () {
          alert('提交成功');
          $("#editGeneModal").modal('hide')
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },

    }
  }
</script>


<style scoped lang="less">

  #modal-panel {
    .row{
      height: auto;
      border-bottom: none;
    }
    .row:first-child {
      margin-bottom: 30px;
    }
    textarea {
      width: 98%;
      height: 100px;
    }
  }

  .modal-body .row input, .modal-body .row select, .modal-body .row textarea {
    width: 70%;
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

  .table-gene.table > tbody > tr > td,
  .table-gene.table > tbody > tr > th,
  .table-gene.table > tfoot > tr > td,
  .table-gene.table > tfoot > tr > th,
  .table-gene.table > thead > tr > td,
  .table-gene.table > thead > tr > th {
    vertical-align: middle;
  }

  .myTable {
    margin-top: 10px;
  }

  .table-task th {
    background-color: #f0f4f7;
  }

  .table-task.table > thead > tr > th {
    border-bottom: none;
  }

  .btn-content {
    margin: 30px 0 5px 0;
  }

  .btn-content .my-btn {
    margin-left: 20px;
  }

  .pagination li span.toPage {
    padding: 4px;
  }

  .pagination li span.toPage input {
    width: 35px;
    text-align: center;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .po {
    cursor: pointer;
  }

  .hasResult {
    color: red;
  }

  .dropdown-menu {
    margin-top: 0;
  }

  .fa-star {
    color: red;
    margin-right: 10px;
  }

  .data-base {
    float: right;
    margin-right: 20px;
  }

  .toArea {
    position: absolute;
    top: 2px;
    right: 30px;
  }
</style>
