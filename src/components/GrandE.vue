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
        <img src="../../static/img/deleteAll.png" alt="" class="my-btn submit" @click="deleteAll">
        <img src="../../static/img/refresh.png" alt="" class="my-btn refresh" @click="refresh">
        <img src="../../static/img/condition.png" alt="" class="my-btn condition pull-right" @click="filtrate">
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
          <img src="../../static/img/search.png" class="search-btn my-btn" alt="" @click="search">
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
                  <a href="javascript:void(0)" class="toArea" @click="toArea">新增捕获区域</a>
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
                  <select name="dataFormat" id="" class="form-control">
                    <option value="fastq">fastq</option>
                    <option value="fastqSE">fastqSE</option>
                    <option value="vcf">vcf</option>
                  </select>
                  <!--<input type="text" class="form-control" id="edit-dateFormat" :value="editModalData.dataFormat">-->
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
              <button type="button" class="btn btn-primary my-btn" @click="editShowGene">基因信息</button>
              <button type="button" class="btn btn-primary my-btn" @click="saveEdit">保存</button>
            </div>
          </div>
        </div>
      </div>
      <!--点击单列的编辑里面的基因-->
      <!--<div class="modal fade" tabindex="-1" role="dialog" id="editGeneModal">
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
                  <fuzzyQuery placeholder='请输入panel名' :leftData="panelData" :rightData="originalPanelData"
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
      </div>-->

    </div>
  </div>
</template>

<script>
  import page from './global/Page.vue'
  export default {
    components: {
      'page': page
    },
    data: function () {
      return {
        results: [],
        inputValue: '',
        editModalData:'',
        loading: false,
        count: 0,
        pageNum: 1
      }
    },
    created: function () {
      this.getList();
    },
    methods: {
      getList: function () {
        const _vue = this;
        this.results = [];
        this.loading = true;
        const axiosUrl = this.inputValue ? 'sample/datafile/' + '?page=' + this.pageNum + '&query=' + this.inputValue
          : 'sample/datafile/' + '?page=' + this.pageNum;
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
          console.log(resp.data.results);
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
          _vue.$axios({
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
      search:function () {
        this.pageNum = 1;
        this.getList();
        $("#filtrate-content").addClass('hide')
      },
      refresh: function () {
        this.getList();
      },
      listEdit:function (code) {  /*20170712*/
          $.each(this.results,function (i,data) {

          });
        $("#editModal").modal('show')
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
            $(event.target).closest(tr).remove();
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
            _vue.$axios({
              url: 'sample/datafile/' + $(this).data('datafile') + '/',
              method: 'delete'
            }).then(function () {
              $(this).closest(tr).remove();
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
          if(_filtrate.hasClass('hide')){
            _filtrate.removeClass('hide')
          }else{
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
            $(this).addClass('check-yes');
            $(this).closest('tr').addClass('in')
          });
        } else {
          _allYes.addClass('hide');
          $('.check-span').each(function () {
            $(this).removeClass('check-yes');
            $(this).closest('tr').removeClass('in')
          });
        }
      }
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

    #editModal .modal-body{
      .row:not(:first-child){
        border-top: 1px solid #e5e5e5;
      }
      .row:first-child{
        height: 41px;
      }
      input,select{
        width: 70%;
        height: 30px;
        margin: 5px 0;
        line-height: 20px;
      }
      select{
        padding: 2px 16px;
      }
      .col-md-3{
        margin-top: 10px;
        .fa-star{
          color: red;
          margin-right: 10px;
        }
      }
      .toArea{
        position: absolute;
        top: 10px;
        right: 5%;
      }
      textarea{
        margin-top: 10px;
        width: 90%;
        height: 80px;
      }
    }

  }
</style>
