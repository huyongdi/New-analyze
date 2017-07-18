<template>
  <div class="row">
    <loading v-if="loading"></loading>
    <div class="sg-list col-md-10">
      <div class="title">
        <span class="title-b">捕获区域管理</span>
        <span class="title-s">< 捕获区域数据</span>
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
              <div class="left">捕获芯片：</div>
              <div class="right">
                <input type="text" v-model="inputValue0" @keyup.enter="search">
              </div>
            </div>
            <div class="single">
              <div class="left">出产厂家：</div>
              <div class="right">
                <input type="text" v-model="inputValue1" @keyup.enter="search">
              </div>
            </div>
          </div>
          <span class="my-btn search-btn" @click="search"><img src="../../static/img/red-con.png" alt="">搜索</span>
        </div>
      </div>
      <table id="sg-table" class="bc-fff my-table">
        <thead>
        <tr>
          <th></th>
          <th>捕获芯片</th>
          <th>出产厂家</th>
          <th>捕获区域文件</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(val,index) in lists" @click="addIn" class="not-base">
          <td class="check-td">
            <span :data-name="val.name" :data-i="index" class="check-span check-no"></span>
          </td>
          <td>{{val.name}}</td>
          <td>{{val.maker}}</td>
          <td><a :href="val.bed">下载</a></td>
          <td>
            <img src="../../static/img/edit.png" :data-index="index" @click.stop="editFun(val)">
            <img src="../../static/img/delete.png" class="list-delete" :data-name="val.name" @click.stop='deleteFun'>
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
              <button type="button" class="btn btn-primary" @click="saveEdit">保存</button>
            </div>
          </div>
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
        lists: [],
        inputValue0: '',
        inputValue1: '',
        editModalData: '',

        loading: false,
        count: 0,
        pageNum: 1
      }
    },
    created: function () {
      this.getList();
    },
    methods: {
      getList:function () {
        const _vue = this;
        _vue.loading = true;
        _vue.lists = [];
        const axiosUrl = this.inputValue0 ? 'sample/capture/' + '?page=' + this.pageNum + '&query=' + this.inputValue0
          : 'sample/capture/' + '?page=' + this.pageNum;
        this.myAxios({
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
      getCurrent: function (data) {
        this.pageNum = data;
        this.getList();
      },
      deleteAll: function () {
        let k1 = 0;
        let k2 = 0;
        const _vue = this;
        $(".check-span").each(function () {
          if ($(this).hasClass('check-yes')) {
            const name = $(this).data('name');
            k1 += 1;
            _vue.myAxios({
              url: 'sample/capture/' + name + '/',
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
      refresh: function () {
        this.getList();
      },
      filtrate: function () {
        const _filtrate = $("#filtrate-content");
        if (_filtrate.hasClass('hide')) {
          _filtrate.removeClass('hide')
        } else {
          _filtrate.addClass('hide')
        }
      },
      search: function () {
        this.pageNum = 1;
        this.getList();
        $("#filtrate-content").addClass('hide')
      },
      editFun: function (data) {
        this.editModalData = data;
        $("#editModal").modal('show');
      },
      saveEdit:function () {
        const _vue = this;
        this.myAxios({
          url: 'sample/capture/' + $("#edit-name").data('oldname') + '/',
          method: 'patch',
          data: {
            name: $("#edit-name").val(),
            maker: $("#edit-maker").val()
          }
        }).then(function () {
          alert('编辑成功');
          _vue.getList();
          $("#editModal").modal('hide');
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      deleteFun: function (event) {
        const _vue = this;
        const name = $(event.target).data('name');
        if (confirm('是否删除该数据')) {
          _vue.myAxios({
            url: 'sample/capture/' + name + '/',
            method: 'delete'
          }).then(function () {
            alert('已成功删除该数据');
            $(event.target).parent().parent().remove();
          }).catch(function (error) {
            _vue.catchFun(error);
          })
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
        if (hasCheck === this.lists.length) {
          _allYes.removeClass('hide')
        } else {
          _allYes.addClass('hide')
        }
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
