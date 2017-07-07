<template>
  <div class="row">
    <loading v-if="loading"></loading>
    <div class="sg-list col-md-10">
      <div class="title">
        <span class="title-b">检测平台</span>
        <span class="title-s">< GrandExome</span>
      </div>
      <div class="btn-content">
        <span class="all-check inline po">
          <span class="all-check-yes hide"></span>
        </span>
        <img src="../../static/img/deleteAll.png" alt="" class="my-btn submit" @click="deleteAll">
        <img src="../../static/img/refresh.png" alt="" class="my-btn refresh" @click="refresh">
        <img src="../../static/img/condition.png" alt="" class="my-btn condition pull-right" @click="filter">
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
            <img src="../../static/img/edit.png" alt="">
            <img src="../../static/img/delete.png" class="list-delete" :data-code=list.code @click='deleteFun'>
            <!--<button type="button" class="btn my-btn my-btn-small" :data-index="index" @click="editFun(list)">-->
            <!--<i class="fa fa-pencil fa-fw"></i>编辑-->

            <!--</button>-->
            <!--<button type="button" class="btn my-btn my-btn-small" :data-code=list.code @click='deleteFun'>-->
            <!--<i class="fa fa-minus-square-o fa-fw"></i>删除-->

            <!--</button>-->
          </td>
        </tr>
        </tbody>
      </table>
      <page :childCount="count" :childReset="0" @childCurrent="getCurrent"></page>
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
        const axiosUrl = this.inputValue ? 'sample/datafile/' + '?page=' + this.page + '&query=' + this.inputValue
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
      refresh: function () {
        this.getList();
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
      filter: function () {

      },
      deleteAll: function () {

      },
      addIn: function (event) {
        //给tr内容加上样式
        const _tr = $(event.target).closest('tr');
        if (_tr.hasClass('in')) {
          _tr.removeClass('in');
          _tr.find('.check-span').removeClass('check-yes').addClass('check-no')
        } else {
          _tr.addClass('in');
          _tr.find('.check-span').removeClass('check-no').addClass('check-yes')
        }
        //判断全选
        const _allYes = $(".all-check-yes");
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
        .list-delete{
          margin: -1px 0 0 10px;
        }
      }
    }
  }
</style>
