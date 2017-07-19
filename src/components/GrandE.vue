<template>
  <div class="row">
    <loading v-if="loading"></loading>
    <div class="sg-list col-md-10">
      <div class="title">
        <span class="title-b">检测平台</span>
        <span class="title-s">< GrandExome</span>
      </div>
      <div class="btn-content rea">
        <span class="all-check inline po" @click="clickAll">
          <span class="all-check-yes hide"></span>
        </span>

        <span class="my-btn submit"  @click="deleteAll"><img src="../../static/img/red-delete.png" alt="">批量删除</span>
        <span class="my-btn refresh" @click="refresh"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
        <span class="my-btn pull-right condition" @click="filtrate"><img src="../../static/img/red-con.png" alt="">筛选条件</span>

        <!--筛选条件弹框-->
        <div class="filtrate-content hide" id="filtrate-content">
          <img src="../../static/img/th-1.png" alt="" class="up">
          <div class="title">搜索选项</div>
          <div class="content">
            <div class="single">
              <div class="left">关键字：</div>
              <div class="right">
                <input type="text" v-model="inputValue" @keyup.enter="search">
              </div>
            </div>
          </div>
          <span class="my-btn search-btn"><img src="../../static/img/red-con.png" alt="" @click="search">搜索</span>
        </div>
      </div>
      <table id="sg-table" class="bc-fff my-table">
        <thead>
        <tr>
          <th></th>
          <th>文件编号</th>
          <th>样本编号</th>
          <th>受检者</th>
          <th>检测平台</th>
          <th>数据格式</th>
          <th>数据量(Mbp)</th>
          <th>Q30</th>
          <th>备注</th>
          <th>文件</th>
          <th>分析结果</th>
          <th>选项</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(list,index) in results" @click="addIn" class="not-base">
          <td class="check-td">
            <span :data-datafile='list.code' :data-prefix='list.sampleCode' class="check-span check-no"></span>
          </td>
          <td>{{list.code}}</td>
          <td>{{list.sampleCode}}</td>
          <td>{{list.patientName}}（{{list.gender}}）</td>
          <td>{{list.capture}}</td>
          <td>{{list.dataFormat}}</td>
          <td>
            <span v-if="list.volume==-1"> - </span>
            <span v-else="">{{list.volume}}</span>
          </td>
          <td>
            <span v-if="list.q30==-1"> - </span>
            <span v-else="">{{list.q30}}</span>
          </td>
          <td>{{list.comment ? list.comment : ' 无 '}}</td>
          <td>
            <a class="common-a" :href="list.file1" v-if="list.file1">文件1</a>
            <a class="common-a" :href="list.file2" v-if="list.file2">文件2</a>
          </td>
          <td>
            <span v-if="list.jobs && list.jobs.length==0">待分析</span>
            <div v-else="" class="dropdown">
              <router-link v-if="list.jobs[0].app.code === 'grandmgd'"
                           :to="{path:'sgResult',query:{id:list.jobs[0].paramId}}">
                <i data-toggle="tooltip" data-placement="top"
                   :data-original-title="list.jobs[0].app.name+'('+list.jobs[0].paramId+')'"
                   v-if="list.jobs[0].status == 'completed'" class="fa fa-check text-success po">已完成</i>
              </router-link>
              <router-link v-if="list.jobs[0].app.code === 'grandmito'"
                           :to="{path:'gmResult',query:{id:list.jobs[0].paramId}}">
                <i data-toggle="tooltip" data-placement="top"
                   :data-original-title="list.jobs[0].app.name+'('+list.jobs[0].paramId+')'"
                   v-if="list.jobs[0].status == 'completed'" class="fa fa-check text-success po">已完成</i>
              </router-link>

              <router-link v-if="list.jobs[0].app.code === 'grandwcnv'"
                           :to="{path:'gwResult',query:{id:list.jobs[0].paramId}}">
                <i data-toggle="tooltip" data-placement="top"
                   :data-original-title="list.jobs[0].app.name+'('+list.jobs[0].paramId+')'"
                   v-if="list.jobs[0].status == 'completed'" class="fa fa-check text-success po">已完成</i>
              </router-link>
              <router-link v-if="list.jobs[0].app.code === 'grandanno'"
                           :to="{path:'snvResult',query:{id:list.jobs[0].paramId}}">
                <i data-toggle="tooltip" data-placement="top"
                   :data-original-title="list.jobs[0].app.name+'('+list.jobs[0].paramId+')'"
                   v-if="list.jobs[0].status == 'completed'" class="fa fa-check text-success po">已完成</i>
              </router-link>

              <i v-if="list.jobs[0].status == 'running'" class="fa fa-spinner fa-pulse text-success">运行中</i>
              <i v-if="list.jobs[0].status == 'error'" class="fa fa-bug text-danger">出错</i>
            </div>
          </td>
          <td>
            <img src="../../static/img/edit.png" @click="listEdit(list.code)">
            <img src="../../static/img/delete.png" class="list-delete" :data-code=list.code @click.stop='deleteFun'>
          </td>
        </tr>
        </tbody>
      </table>
      <page :childCount="count" :childReset="0" @childCurrent="getCurrent"></page>

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
                <div class="col-md-3"><span class="fa fa-star"></span>Capture</div>
                <div class="col-md-9 rea">
                  <select class="form-control" id="edit-capture" :value="editModalData.capture">
                    <option :value="list.name" v-for="list in capList">{{list.name}}</option>
                  </select>
                  <router-link class="toArea" to="/">新增捕获区域</router-link>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3"><span class="fa fa-star"></span>样本编号</div>
                <div class="col-md-9">
                  <input type="text" class="form-control" id="edit-sampleCode" :value="editModalData.sampleCode">
                </div>
              </div>
              <div class="row">
                <div class="col-md-3"><span class="fa fa-star"></span>受检者姓名</div>
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
                <div class="col-md-3"><span class="fa fa-star"></span>数据格式</div>
                <div class="col-md-9">
                  <select name="dataFormat" id="edit-dateFormat" class="form-control" :value="editModalData.dataFormat">
                    <option value="fastq">fastq</option>
                    <option value="fastqSE">fastqSE</option>
                    <option value="vcf">vcf</option>
                  </select>
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
              <div class="row">
                <div class="col-md-3">备注</div>
                <div class="col-md-9">
                  <textarea type="text" class="form-control" id="edit-comment"
                            :value="editModalData.comment"></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-primary" @click="showPanelModal">基因信息</button>
              <button type="button" class="btn btn-primary" @click="saveEdit">保存</button>
            </div>
          </div>
        </div>
      </div>
      <!--点击单列的编辑里面的基因-->
      <panelModal @saveData="savePanel" :originalGeneInput='geneInput' :originalPanelData="originalPanelData"></panelModal>
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
        geneInput:'',
        originalPanelData:[],
        results: [],
        inputValue: '',
        editModalData: '',
        capList: [],
        loading: false,
        count: 0,
        pageNum: 1
      }
    },
    created: function () {
      this.getList();
      this.getCap();
    },
    methods: {
      getCap: function () {
        const _vue = this;
        this.myAxios({
          url: 'sample/capture/',
          method: 'get'
        }).then(function (resp) {
          _vue.capList = resp.data.results;
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      getList: function () {
        const _vue = this;
        this.results = [];
        this.loading = true;
        const axiosUrl = this.inputValue ? 'sample/datafile/' + '?page=' + this.pageNum + '&query=' + this.inputValue
          : 'sample/datafile/' + '?page=' + this.pageNum;
        this.myAxios({
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
            k5.file1 = 'https://analyze.grandbox.site/media/' + k5.file1;
            k5.file2 = 'https://analyze.grandbox.site/media/' + k5.file2;
          });
          _vue.results = resp.data.results;
          _vue.getJob();
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      getCurrent: function (data) {
        this.pageNum = data;
        this.getList();
      },
      getJob: function () {
        const _vue = this;
        $.each(_vue.results, function (i, data) {
          _vue.myAxios({
            url: 'sample/datafile/' + data.code + '/job/',
            method: 'get'
          }).then(function (resp) {
            resp = resp.data;
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
      saveEdit: function () {
        const _vue = this;
        let axiosObj = {
          capture: $("#edit-capture").val(),
          sampleCode: $.trim($("#edit-sampleCode").val()),
          patientName: $.trim($("#edit-patientName").val()),
          gender: $.trim($("#edit-gender").val()),
          dateFormat: $.trim($("#edit-dateFormat").val()),
          volume: $("#edit-volume").val() === ' - ' ? -1 : $.trim($("#edit-volume").val()),
          q30: $("#edit-q30").val() === ' - ' ? -1 : $.trim($("#edit-q30").val()),
          comment: $.trim($("#edit-comment").val()),
        };
        this.myAxios({
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
      search: function () {
        this.pageNum = 1;
        this.getList();
        $("#filtrate-content").addClass('hide')
      },
      refresh: function () {
        this.getList();
      },
      listEdit: function (code) {
        const _vue = this;
        $.each(this.results, function (i, data) {
          if (data.code === code) {
            _vue.editModalData = data;
          }
        });
        $("#editModal").modal('show')
      },
      deleteFun: function (event) {
        const _vue = this;
        if (confirm('是否删除该样本')) {
          const code = $(event.target).data('code');
          _vue.myAxios({
            url: 'sample/datafile/' + code + '/',
            method: 'delete'
          }).then(function () {
            alert('已成功删除该样品');
            $(event.target).closest('tr').remove();
          }).catch(function (error) {
            _vue.catchFun(error);
          })
        }
      },
      deleteAll: function () {
        let k1 = 0;
        let k2 = 0;
        $(".check-span").each(function () {
          if ($(this).hasClass('check-yes')) {
            k1 += 1;
            _vue.myAxios({
              url: 'sample/datafile/' + $(this).data('datafile') + '/',
              method: 'delete'
            }).then(function () {
              $(this).closest('tr').remove();
              k2 += 1;
              if (k2 === k1) {
                alert('批量删除成功')
              }
            }).catch(function (error) {
              _vue.catchFun(error);
            })
          }
        })
      },
      filtrate: function () {
        const _filtrate = $("#filtrate-content");
        if (_filtrate.hasClass('hide')) {
          _filtrate.removeClass('hide')
        } else {
          _filtrate.addClass('hide')
        }
      },
      addIn: function (event) {
        //给tr内容加上样式
        const _tr = $(event.target).closest('tr');
        const _allYes = $(".all-check-yes");
        if (_tr.hasClass('in')) {
          _tr.removeClass('in');
          _tr.find('.check-span').removeClass('check-yes').addClass('check-no')
        } else {
          _tr.addClass('in');
          _tr.find('.check-span').removeClass('check-no').addClass('check-yes')
        }
        //判断全选
        let hasCheck = 0;
        $('.check-span').each(function () {
          if ($(this).hasClass('check-yes')) {
            hasCheck += 1;
          }
        });
        if (hasCheck === this.results.length) {
          _allYes.removeClass('hide')
        } else {
          _allYes.addClass('hide')
        }
      },
      clickAll: function () {
        const _allYes = $(".all-check-yes");
        if (_allYes.hasClass('hide')) { //准备去全选
          _allYes.removeClass('hide');
          $('.check-span').each(function () {
            $(this).addClass('check-yes').removeClass('check-no');
            $(this).closest('tr').addClass('in')
          });
        } else {
          _allYes.addClass('hide');
          $('.check-span').each(function () {
            $(this).removeClass('check-yes').addClass('check-no');
            $(this).closest('tr').removeClass('in')
          });
        }
      },
      /*修改panel*/
      showPanelModal:function () {
        const _vue = this;
        this.myAxios({
          url: 'sample/genelist/' + _vue.editModalData.code + '/'
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
        $("#panelModal").modal("show")
      },
      savePanel: function (data) {
        let panelArr = [];
        $.each(data.panel, function (i, n) {
          panelArr.push(n.key)
        });
        this.myAxios({
          url: 'sample/genelist/' + this.editModalData.code + '/',
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
    }
  }
</script>

<style scoped lang="less">
  @border: rgb(185, 184, 184);
  .sg-list {
    .btn-content {
      margin: 15px 0 0 15px;
      .all-check {
        width: 15px;
        height: 15px;
        margin-bottom: -4px;
        background: url('../../static/img/all-2.png') 72px 15px;
        text-align: center;
        position: relative;
        .all-check-yes {
          position: absolute;
          top: 4px;
          left: 4px;
          width: 7px;
          height: 7px;
          background-color: #ea5442;
          border-radius: 50%;
        }
      }
      .submit {
        margin: 0 25px 0 11px;
      }
    }
    table#sg-table {
      tbody {
        cursor: pointer;
        .check-td {
          width: 43px;
          text-align: center;
          padding: 8px 0;
          .check-no {
            float: left;
            margin-left: 14.5px;
            width: 15px;
            height: 15px;
            background: url(../../static/img/all-2.png) 43px 0;
          }
          .check-yes {
            float: left;
            margin-left: 14.5px;
            width: 15px;
            height: 15px;
            background: url(../../static/img/all-2.png) 15px 0;
          }
        }
        .list-delete {
          margin: -1px 0 0 10px;
        }
      }
    }

    #editModal .modal-body {
      .row:not(:first-child) {
        border-top: 1px solid #e5e5e5;
      }
      .row:first-child {
        height: 41px;
        .col-md-9 {
          margin-top: 10px;
        }
      }
      input, select {
        width: 70%;
        height: 30px;
        margin: 5px 0;
        line-height: 20px;
      }
      select {
        padding: 2px 16px;
      }
      .col-md-3 {
        margin-top: 10px;
        .fa-star {
          color: red;
          margin-right: 10px;
        }
      }
      .toArea {
        position: absolute;
        top: 10px;
        right: 5%;
      }
      textarea {
        margin-top: 10px;
        width: 90%;
        height: 80px;
      }
    }

  }
</style>
