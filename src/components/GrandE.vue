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
      <table id="sg-table">
        <thead>
        <tr>
          <th></th>
          <th>样本编号</th>
          <th>姓名</th>
          <th>数据</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="list in results" @click="addIn" class="not-base">
          <td class="check-td">
            <span :data-datafile='list.code' :data-prefix='list.sampleCode' class="check-span check-no"></span>
          </td>
          <td>{{list.sampleCode}}</td>
          <td>{{list.patientName}}({{list.gender}})</td>
          <td>{{list.code}}:{{list.capture}}</td>
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
        pageNum: 1
      }
    },
    created: function () {
      this.getList();
    },
    methods: {
      getList: function () {
        this.loading = true;
        const _vue = this;
        this.$axios({
          url: 'sample/datafile/?app=grandmgd&page=' + this.pageNum
        }).then(function (resp) {
          _vue.count = resp.data.count;
          $.each(resp.data.results,function (i,data) {
            if(data.gender === 'female'){
              data.gender = '女'
            }else if(data.gender === 'male'){
              data.gender = '男'
            }else {
              data.gender = '未知'
            }
          });
          _vue.results = resp.data.results;
          _vue.loading = false;
        })
      },
      getCurrent: function (data) {
        this.pageNum = data;
        this.getList();
      },
      refresh:function () {
        this.getList();
      },
      filter: function () {

      },
      deleteAll:function () {

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
        if(hasCheck === this.results.length){
          _allYes.removeClass('hide')
        }else{
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
      .all-check{
        width: 15px;
        height: 15px;
        margin-bottom: -4px;
        background: url('../../static/img/all-2.png') 72px 15px;
        text-align: center;
        position: relative;
        .all-check-yes{
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
      }
    }
  }
</style>
