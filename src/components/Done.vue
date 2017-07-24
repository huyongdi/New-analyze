<!--suppress HtmlUnknownTag -->
<template>
  <div class="row">
    <loading v-if="loading"></loading>
    <div class="done-list col-md-10">
      <div class="title">
        <span class="title-b">任务详情</span>
        <span class="title-s">< 已完成</span>
      </div>
      <div class="btn-content">
        <span class="my-btn refresh" @click="refresh"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
      </div>
      <table id="done-table" class="bc-fff my-table">
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
          <!--<th>状态</th>-->
          <th>开始时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="result in results" @click="toResult(result.type,result.typeId)" title="点击查看结果">
          <td>
            <span :data-type="result.type">{{ result.id}} / {{result.typeId}}</span>
          </td>
          <td>{{result.app}}</td>
          <td>{{result.nameArr[1]}}</td>
          <td>{{result.nameArr[0]}}</td>
          <td>{{result.nameArr[2]}}</td>
          <!--<td>-->
          <!--<i v-if="result.status == 'completed' && !result.error" class="fa fa-check text-success"-->
          <!--title="已完成"></i>-->
          <!--<i v-else="" class="fa fa-bug text-danger" title="出错"></i>-->
          <!--</td>-->
          <td>{{result.startTime}}</td>
          <td>
            <!--<router-link v-if="result.grandmgds" :to="{path:'/dataA/foo/sgResult',query:{id:result.typeId}}"-->
            <!--class="fa fa-folder-open text-success open-icon po" title="查看任务"></router-link>-->
            <!--<router-link v-if="result.grandmitos" :to="{path:'/dataA/foo/sgResult',query:{id:result.typeId}}"-->
            <!--class="fa fa-folder-open text-success open-icon po" title="查看任务"></router-link>-->
            <!--<i v-if="result.status == 'error'" class="fa fa-refresh po" title="重新运行"-->
            <!--:data-id=result.id></i>-->
            <img src="../../static/img/delete.png" title="删除" class="remove-job" :data-id=result.id
                 @click.stop="removeTask">
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
        selectArr: [],
        appCode: ''
      }
    },
    created: function () {
      this.getList();
      this.getSelect()
    },
    methods: {
      appClick: function (code) {
        this.appCode = code ? code : '';
        this.getList()
      },
      getList: function () {
        this.loading = true;
        const _vue = this;
        this.myAxios({
          url: 'application/job/?compl=true&page=' + this.pageNum + '&app=' + this.appCode
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
      toResult: function (type, id) {
        let url = '';
        if (type === 0) {
          url = '/taskM/foo/sgResult'
        } else if (type === 1) {
          url = '/taskM/foo/mtResult'
        } else if(type === 2){
          url = '/taskM/foo/cnvResult'
        } else if(type === 3){
          url = '/taskM/foo/snvResult'
        }else if(type === 4){
          url = '/taskM/foo/trioResult'
        }
        this.$router.push({path: url, query: {id: id}})
      }
    }
  }
</script>

<style scoped lang="less">
  @border: rgb(185, 184, 184);
  .done-list {
    .btn-content {
      margin: 15px 0 0 0;
    }
    table#done-table {
      overflow: auto;
      .remove-job {
        margin: -3px 0 0 10px;
        cursor: pointer;
      }
    }
  }
</style>
