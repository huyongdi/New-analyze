<template>
  <div class="right-content">
    <loading v-if="loading"></loading>
    <location imgClass="database-small" currentPage="捕获区域管理"></location>

    <div class="detailShow">
      <search :inputValue='inputValue' @onEnter="onEnter"></search>

      <div class="btn-content">
        <label class="checkbox-inline">
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
      </div>

      <table class="table myTable">
        <thead>
        <tr>
          <th>选择</th>
          <th>捕获芯片</th>
          <th>出产厂家</th>
          <th>捕获区域文件</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <tr v-for="(val,index) in lists" @click="addBc">
          <td><input class="list-input" :data-name="val.name" @click="listInput" type="checkbox" :data-i="index"/></td>
          <td>{{val.name}}</td>
          <td>{{val.maker}}</td>
          <td><a :href="val.bed">下载</a></td>
          <td>
            <button type="button" class="btn my-btn my-btn-small" :data-index="index" @click="editFun(val)">
              <i class="fa fa-pencil fa-fw"></i>编辑
            </button>
            <button type="button" class="btn my-btn my-btn-small" :data-name="val.name" @click='deleteFun'>
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
              <h4 class="modal-title">修改数据</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-3">捕获芯片</div>
                <div class="col-md-9">
                  <input type="text" disabled class="form-control" id="edit-name" :data-oldName="editModalData.name"
                         :value="editModalData.name">
                </div>
              </div>
              <div class="row noneBottom">
                <div class="col-md-3">出产厂家</div>
                <div class="col-md-9">
                  <input type="text" class="form-control" id="edit-maker" :value="editModalData.maker">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-primary my-btn" @click="saveEdit">保存</button>
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
                  <div class="col-md-3">捕获芯片</div>
                  <div class="col-md-9">
                    <input type="text" id="add-name" class="form-control" name="name">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">出产厂家</div>
                  <div class="col-md-9">
                    <input type="text" id="add-maker" class="form-control" name="maker">
                  </div>
                </div>
                <div class="row noneBottom">
                  <div class="col-md-3">捕获区域文件</div>
                  <div class="col-md-9">
                    <input type="file" name="bed">
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-primary my-btn" @click="saveData">保存</button>
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
  export default {
    components: {
      'location': topLocation,
      'search': search,
      'pagenation': pagenation
    },
    data: function () {
      return {
        inputValue: '',
        hasAllchecked: false,
        hasAllcheckedFlag: false,
        page: 1,
        count: 0,
        reset: 0,
        loading: true,
        lists: [],
        editModalData: ''
      }
    },
    created: function () {
      this.captureAxios();
    },
    methods: {
      captureAxios: function () {
        const _vue = this;
        const axiosUrl = this.inputValue ? 'sample/capture/' + '?page=' + this.page + '&query=' + this.inputValue
          : 'sample/capture/' + '?page=' + this.page;
        this.$axios({
          url: axiosUrl,
          method: 'get'
        }).then(function (resp) {
          _vue.count = resp.data.count;
          _vue.lists = resp.data.results;
          _vue.loading = false;
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      editFun: function (data) {
        this.editModalData = data;
        $("#editModal").modal('show');
      },
      saveEdit: function () {
        const _vue = this;
        this.$axios({
          url: 'sample/capture/' + $("#edit-name").data('oldname') + '/',
          method: 'patch',
          data: {
            name: $("#edit-name").val(),
            maker: $("#edit-maker").val()
          }
        }).then(function () {
          alert('编辑成功');
          $("#editModal").modal('hide');
          _vue.captureAxios();
//          _vue.$router.go(0);
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      deleteFun: function (event) {
        const _vue = this;
        const name = $(event.target).data('name');
        if (confirm('是否删除该样本')) {
          _vue.$axios({
            url: 'sample/capture/' + name + '/',
            method: 'delete'
          }).then(function () {
            alert('已成功删除该样品');
            $(event.target).parent().parent().remove();
//            _vue.$router.go(0);
          }).catch(function (error) {
            _vue.catchFun(error);
          })
        }
      },
      allChecked: function () {
        if (!this.hasAllcheckedFlag) {  //准备变成true状态
          $(".list-input").each(function () {
            $(this).prop('checked', true);
          })
          this.hasAllcheckedFlag = true;
        } else {
          $(".list-input").each(function () {
            $(this).prop('checked', false);
          })
          this.hasAllcheckedFlag = false;
        }
      },
      listInput: function () {
        this.hasAllchecked = $(".list-input:checked").length === this.lists.length;
        this.hasAllcheckedFlag = $(".list-input:checked").length === this.lists.length;
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
                const name = $(this).data('name');
                const _this = $(this);
                _vue.$axios({
                  url: 'sample/capture/' + name + '/',
                  method: 'delete'
                }).then(function () {
                  _this.parent().parent().remove();
                  i += 1;
                  if (i === length) {
                    alert('全部删除成功');
//                    _vue.$router.go(0);
                    _vue.captureAxios();
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
        $("#add-name").val($("#add-name").val());
        $("#add-maker").val($("#add-maker").val());
        const _vue = this;
        this.$axios({
          url: 'sample/capture/',
          method: 'post',
          data: new FormData(document.getElementById('addDataForm'))
        }).then(function () {
          alert('提交成功');
          $("#addData").modal("hide");
          _vue.captureAxios();
//          _vue.$router.go(0);
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      onEnter: function (data) {
        this.inputValue = data;
        this.page = 1;
        this.reset = 1; //重置当前页面为1
        this.captureAxios();
      },
      getCurrent: function (data) {
        this.page = data;
        this.reset = 0;
        this.captureAxios();
      },
      addBc:function (event) {
        const _tr = $(event.target).closest('tr');
        const _table = _tr.closest('table');
        _table.find('.tr-active').removeClass('tr-active')
        _tr.addClass('tr-active');
      }
    }
  }
</script>


<style scoped>
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
    /*height: 120px;*/
    border-bottom: none;
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
</style>
