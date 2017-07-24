<template>
  <div class="row">
    <loading v-if="loading"></loading>
    <div class="doing-list col-md-10">
      <div class="title">
        <span class="title-b">任务详情</span>
        <span class="title-s">< 未完成</span>
      </div>
      <div class="btn-content">
        <span class="my-btn refresh" @click="refresh"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
      </div>
      <table id="doing-table" class="bc-fff my-table" >
        <thead>
        <tr>
          <th>任务号</th>
          <th>
            软件/工具
            <div class="img1">
              <div class="hide-content">
                <img class="img2" src="../../static/img/th-1.png" alt="">
                <ul>
                  <li @click="appClick()">请选择软件/工具</li>
                  <li v-for="single in selectArr" @click="appClick(single.code)">{{single.name}}</li>
                </ul>
              </div>
            </div>
          </th>
          <th>样本编号</th>
          <th>姓名</th>
          <th>数据</th>
          <th>
            状态
            <div class="img1">
              <div class="hide-content">
                <img class="img2" src="../../static/img/th-1.png" alt="">
                <ul>
                  <li><img src="../../static/img/task-1.png" alt="">出错</li>
                  <li><img src="../../static/img/task-2.png" alt="">运行中</li>
                  <li><img src="../../static/img/task-3.png" alt="">等待</li>
                </ul>
              </div>
            </div>
          </th>
          <th>开始时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="result in results">
          <td>
            <span :data-type="result.type">{{ result.id}} / {{result.typeId}}</span>
          </td>
          <td>{{result.app}}</td>
          <td>{{result.nameArr[1]}}</td>
          <td>{{result.nameArr[0]}}</td>
          <td>{{result.nameArr[2]}}</td>
          <td>
            <img v-if='result.status == "waiting"' src="../../static/img/task-3.png" title="等待">
            <img v-else-if='result.status == "running"' src="../../static/img/task-2.png" title="运行中">
            <img v-else="" src="../../static/img/task-1.png" title="出错">
          </td>
          <td>{{result.startTime}}</td>
          <td>
            <i :class="{'fa fa-refresh po':result.status == 'error','noError':result.status != 'error'}"
               @click="refreshTask(result.id)" title="重新运行"></i>
            <img src="../../static/img/delete.png" title="删除" class="remove-job" :data-id=result.id @click="removeTask">
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
        loading: false,
        count: 0,
        pageNum: 1,
        selectArr:[],
        appCode:''
      }
    },
    created: function () {
      this.getList();
      this.getSelect()
    },
    methods: {
      appClick:function (code) {
        this.appCode = code?code:'';
        this.getList()
      },
      getList: function () {
        this.loading = true;
        const _vue = this;
        this.myAxios({
          url: 'application/job/?compl=false&page=' + this.pageNum+'&app=' + this.appCode
        }).then(function (resp) {
          _vue.count = resp.data.count;
          $.each(resp.data.results, function (a, b) {
            b.startTime = b.startTime.substring(0, b.startTime.indexOf('T'));
            if (b.grandmgds) {
              b.type = 0;
              b.typeId = b.grandmgds.split('/')[b.grandmgds.split('/').length - 2];
            }
            if (b.grandmitos) {
              b.type = 1;
              b.typeId = b.grandmitos.split('/')[b.grandmitos.split('/').length - 2];
            }
            if (b.grandwcnvs) {
              b.type = 2;
              b.typeId = b.grandwcnvs.split('/')[b.grandwcnvs.split('/').length - 2];
            }
            if (b.grandannos) {
              b.type = 3;
              b.typeId = b.grandannos.split('/')[b.grandannos.split('/').length - 2];
            }
            if(b.grandtrios){
              b.type = 4;
              b.typeId = b.grandtrios.split('/')[b.grandtrios.split('/').length - 2];
            }
            b.nameArr = [];
            $.each(b.name.split(' '), function (i, data) {
              b.nameArr.push(data.split(':')[1])
            })
          });
          _vue.results = resp.data.results;
          _vue.loading = false;
        })
      },
      getCurrent: function (data) {
        this.pageNum = data;
        this.getList();
      },
      refresh: function () {
        this.getList();
      },
      refreshTask: function (sId) {
        if (confirm('确定要重新运行任务吗?')) {
          const _vue = this;
          this.myAxios({
            url: 'application/job/' + sId + '/rerun/',
            method: 'get'
          }).then(function (resp) {
            alert(resp.data);
            $.each(_vue.results, function (i, data) {
              if (data.id === sId) {
                data.status = 'waiting'
              }
            })
          }).catch(function (error) {
            _vue.catchFun(error);
          });
        }
      },
      removeTask: function (event) {
        const _vue = this;
        if (confirm('确定要删除该任务吗？')) {
          const sId = $(event.target).data('id');
          this.myAxios({
            url: 'application/job/' + sId + '/',
            method: 'delete'
          }).then(function () {
            alert('删除成功');
            $(event.target).closest('tr').remove();
          }).catch(function (error) {
            _vue.catchFun(error);
          });
        }
      },
      getSelect: function () {
        const _vue = this;
        this.myAxios({
          url: 'application/app/',
        }).then(function (resp) {
          _vue.selectArr = resp.data.results;
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
    }
  }
</script>

<style scoped lang="less">
  @border: rgb(185, 184, 184);
  .doing-list {
    .btn-content {
      margin: 15px 0 0 0;
    }
    table#doing-table {
      overflow: inherit;
      .remove-job {
        margin: -3px 0 0 10px;
        cursor: pointer;
      }
      li{
        img{
          margin: -2px 8px 0 -5px;
        }
      }
    }
  }
</style>
