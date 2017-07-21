<template>
  <div class="right-content">
    <loading v-if="doingLoading"></loading>
    <loading v-if="doneLoading"></loading>

    <location imgClass="task-small" currentPage="任务"></location>

    <div class="all-content">
      <ul class="nav nav-tabs ulList" role="tablist">
        <li role="presentation" class="active"><a @click="toDoing" href="#doing" aria-controls="doing" role="tab"
                                                  data-toggle="tab">正在运行</a></li>
        <li role="presentation"><a href="#done" aria-controls="done" role="tab" data-toggle="tab"
                                   @click="toDone">已完成</a></li>
        <select name="" id="checkApp" v-model="selected" class="form-control">
          <option value="">请选择软件/工具</option>
          <option v-for="single in selectArr" :value="single.code">{{single.name}}</option>
        </select>
        <!--<button class="btn btn-success search-btn" @click="searchFun">搜索</button>-->
      </ul>

      <!-- Tab panes -->
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="doing">
          <table class="table myTable">
            <thead>
            <tr>
              <th>任务号</th>
              <th>软件/工具</th>
              <th>名称</th>
              <th>状态</th>
              <th>开始时间</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody id="taskDoing_tbody">
            <tr v-for="result in doingList" @click="addBc">
              <td>
               <span v-if="result.grandmgds">
                  {{ result.id}} / {{result.grandmgdId}}
                </span>
                <span v-if="result.grandmitos">
                    {{ result.id}} / {{result.grandmitoId}}
                </span>
                <span v-if="result.grandwcnvs">
                    {{ result.id}} / {{result.grandwcnvId}}
                </span>
                <span v-if="result.grandannos">
                    {{ result.id}} / {{result.grandannoId}}
                </span>
                <span v-if="result.grandtrios">
                    {{ result.id}} / {{result.grandtrioId}}
                </span>
              </td>
              <td>{{result.app}}</td>
              <td>{{result.name}}</td>
              <td>
                <i v-if='result.status == "waiting"' class="fa fa-hourglass-1 text-success" title="等待"></i>
                <i v-else-if='result.status == "running"' class="fa fa-spinner fa-pulse text-success" title="运行中"></i>
                <i v-else="" class="fa fa-bug text-danger" title="出错"></i>
              </td>
              <td>{{result.startTime}}</td>
              <td>
                <i :class="{'fa fa-refresh po':result.status == 'error','noError':result.status != 'error'}"
                   @click="refreshTask" title="重新运行" :data-id=result.id></i>
                <i class="fa fa-remove text-danger remove-job po" @click="removeTask" title="删除任务"
                   :data-id=result.id></i>
              </td>
            </tr>
            </tbody>
          </table>
          <pagenation :count="doingCount" :reset="doingReset" @getCurrent="getCurrentDoing"></pagenation>
        </div>

        <div role="tabpanel" class="tab-pane" id="done">
          <table class="table myTable">
            <thead>
            <tr>
              <th>任务号</th>
              <th>软件/工具</th>
              <th>名称</th>
              <th>状态</th>
              <th>开始时间</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody id="taskDone_tbody">
            <tr v-for="result in doneList" @click="addBc">
              <td>
                <span v-if="result.grandmgds">
                  {{ result.id}} / {{result.grandmgdId}}
                </span>
                <span v-if="result.grandmitos">
                    {{ result.id}} / {{result.grandmitoId}}
                </span>
                <span v-if="result.grandwcnvs">
                    {{ result.id}} / {{result.grandwcnvId}}
                </span>
                <span v-if="result.grandannos">
                    {{ result.id}} / {{result.grandannoId}}
                </span>
                <span v-if="result.grandtrios">
                    {{ result.id}} / {{result.grandtrioId}}
                </span>
              </td>
              <td>{{result.app}}</td>
              <td>{{result.name}}</td>
              <td>
                <i v-if="result.status == 'completed' && !result.error" class="fa fa-check text-success"
                   title="已完成"></i>
                <i v-else="" class="fa fa-bug text-danger" title="出错"></i>
              </td>
              <td>{{result.startTime}}</td>
              <td>
                <router-link v-if="result.grandmgds" :to="{path:'/sgResult',query:{id:result.grandmgdId}}"
                             class="fa fa-folder-open text-success open-icon po" title="查看任务"></router-link>
                <router-link v-if="result.grandmitos" :to="{path:'/gmResult',query:{id:result.grandmitoId}}"
                             class="fa fa-folder-open text-success open-icon po" title="查看任务"></router-link>
                <router-link v-if="result.grandwcnvs" :to="{path:'/gwResult',query:{id:result.grandwcnvId}}"
                             class="fa fa-folder-open text-success open-icon po" title="查看任务"></router-link>
                <router-link v-if="result.grandannos" :to="{path:'/snvResult',query:{id:result.grandannoId}}"
                             class="fa fa-folder-open text-success open-icon po" title="查看任务"></router-link>
                <router-link v-if="result.grandtrios" :to="{path:'/trioResult',query:{id:result.grandtrioId}}"
                             class="fa fa-folder-open text-success open-icon po" title="查看任务"></router-link>

                <i class="fa fa-remove text-danger remove-job po" title="删除任务" @click="removeTask"
                   :data-id=result.id></i>
              </td>
            </tr>
            </tbody>
          </table>

          <pagenation :count="doneCount" :reset="doneReset" @getCurrent="getCurrentDone"></pagenation>

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
        doingLoading: true,
        doingPage: 1,
        doingCount: 1,
        doingReset: 0,
        doingList: [],
        selectArr: [],
        selected: '',

        doneLoading: false,
        donePage: 1,
        doneCount: 1,
        doneReset: 0,
        doneList: [],
      }
    },
    created: function () {
      this.activeJob();
      this.doingAxios();
      this.getSelect()
    },
    methods: {
      toDone: function () {
        this.doneLoading = true;
        this.doneAxios();
      },
      toDoing: function () {
        this.doingLoading = true;
        this.doingAxios();
      },
      getSelect: function () {
        const _vue = this;
        this.$axios({
          url: 'application/app/',
        }).then(function (resp) {
          resp = resp.data;
          _vue.selectArr = resp.results;
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      searchFun: function () {
        if ($('#doing').hasClass('active')) {
          this.doingReset = 1;
          this.doingPage = 1;
          this.doingAxios();
        } else {
          this.doneReset = 1;
          this.donePage = 1;
          this.doneAxios();
        }
      },
      activeJob: function () {
        const _vue = this;
        this.$axios({
          url: 'application/job/sge/',
          method: 'get'
        }).then(function (resp) {

        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      doingAxios: function () {
        const _vue = this;
        let myUrl = '';
        _vue.doingList = [];
        _vue.doingLoading = true;
        if (this.selected) {
          myUrl = 'application/job/?compl=false&page=' + this.doingPage + '&app=' + this.selected
        } else {
          myUrl = 'application/job/?compl=false&page=' + this.doingPage;
        }
        this.$axios({
          url: myUrl,
          method: 'get'
        }).then(function (resp) {
          _vue.doingCount = resp.data.count;
          $.each(resp.data.results, function (a, b) {
            b.startTime = b.startTime.substring(0, b.startTime.indexOf('T'));
            if (b.grandmgds) {
              b.grandmgdId = b.grandmgds.split('/')[b.grandmgds.split('/').length - 2];
            }
            if (b.grandmitos) {
              b.grandmitoId = b.grandmitos.split('/')[b.grandmitos.split('/').length - 2];
            }
            if (b.grandwcnvs) {
              b.grandwcnvId = b.grandwcnvs.split('/')[b.grandwcnvs.split('/').length - 2];
            }
            if (b.grandannos) {
              b.grandannoId = b.grandannos.split('/')[b.grandannos.split('/').length - 2];
            }
            if (b.grandtrios) {
              b.grandtrioId = b.grandtrios.split('/')[b.grandtrios.split('/').length - 2];
            }
          });
          _vue.doingList = resp.data.results;
          _vue.doingLoading = false;
        })
      },
      getCurrentDoing: function (data) {
        this.doingPage = data;
        this.doingReset = 0;
        this.doingAxios();
      },
      removeTask: function (event) {
        const _vue = this;
        if (confirm('确定要删除该任务吗？')) {
          const sId = $(event.target).data('id');
          this.$axios({
            url: 'application/job/' + sId + '/',
            method: 'delete'
          }).then(function (resp) {
            alert('删除成功');
            $(event.target).parent().parent().remove();
          }).catch(function (error) {
            _vue.catchFun(error);
          });
        }
      },
      refreshTask: function (event) {
        if (confirm('确定要重新运行任务吗?')) {
          const sId = $(event.target).data('id');
          const _vue = this;
          this.$axios({
            url: 'application/job/' + sId + '/rerun/',
            method: 'get'
          }).then(function (resp) {
            alert(resp.data);
            $.each(_vue.doingList,function (i,data) {
              if(data.id === sId){
                data.status = 'waiting'
              }
            })
//            _vue.doingAxios();
//            _vue.$router.go(0);
//            window.location.reload();
          }).catch(function (error) {
            _vue.catchFun(error);
          });
        }
      },

      doneAxios: function () {
        const _vue = this;
        let myUrl = '';
        _vue.doneList = [];
        _vue.doneLoading = true;
        if (this.selected) {
          myUrl = 'application/job/?compl=true&page=' + this.donePage + '&app=' + this.selected
        } else {
          myUrl = 'application/job/?compl=true&page=' + this.donePage
        }
        this.$axios({
          url: myUrl,
          method: 'get'
        }).then(function (resp) {
          _vue.doneCount = resp.data.count;
          $.each(resp.data.results, function (a, b) {
            b.startTime = b.startTime.substring(0, b.startTime.indexOf('T'));
            if (b.grandmgds) {
              b.grandmgdId = b.grandmgds.split('/')[b.grandmgds.split('/').length - 2];
            }
            if (b.grandmitos) {
              b.grandmitoId = b.grandmitos.split('/')[b.grandmitos.split('/').length - 2];
            }
            if (b.grandwcnvs) {
              b.grandwcnvId = b.grandwcnvs.split('/')[b.grandwcnvs.split('/').length - 2];
            }
            if (b.grandannos) {
              b.grandannoId = b.grandannos.split('/')[b.grandannos.split('/').length - 2];
            }
            if (b.grandtrios) {
              b.grandtrioId = b.grandtrios.split('/')[b.grandtrios.split('/').length - 2];
            }

          });
          _vue.doneList = resp.data.results;
          _vue.doneLoading = false;
        })
      },
      getCurrentDone: function (data) {
        this.donePage = data;
        this.doneReset = 0;
        this.doneAxios();
      },
      addBc:function (event) {
        const _tr = $(event.target).closest('tr');
        const _table = _tr.closest('table');
        _table.find('.tr-active').removeClass('tr-active');
        _tr.addClass('tr-active');
      }
    },
    watch: {
      selected: function () {
        this.searchFun()
      }
    }
  }
</script>

<style scoped lang="less">
  @inColor: rgb(44, 127, 210);
  @bcIn: rgb(240, 244, 247);
  @border: rgb(225, 226, 227);
  @bcTable:rgb(242,242,242);
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

  .myTable {
    margin-top: 30px;
  }

  .remove-job {
    margin-left: 15px;
  }

  .ulList {
    position: relative;
  }

  #checkApp {
    width: 250px;
    margin-left: 150px;
    margin-right: 30px;
    display: inline-block;
  }

  .search-btn {
    margin-bottom: 5px;
  }
</style>
