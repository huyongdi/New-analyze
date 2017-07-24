<template>
  <div>
    <loading v-show="loading"></loading>

    <div class="title">
      <span class="title-b">分析流程</span>
      <span class="title-s">< 核心家系分析</span>
    </div>
    <div class="btn-content">
        <span class="all-check inline po">
          <span class="all-check-yes hide"></span>
        </span>
      <span class="my-btn submit" @click="submitFun"><img src="../../static/img/red-submit.png" alt="">提交</span>
    </div>

    <div class="row trio-content" id="trio-content">
      <div class="col-md-4">
        <div class="title">受检者</div>
        <div class="searchBorder">
          <input type="text" class="form-control input_hasImg" placeholder='请输入关键字' v-model="input0" @keyup.enter="search(input0,0)">
          <button class="search-btn myBtn" @click.stop="search(input0,0)"></button>
        </div>
        <ul id="ul0">
          <li v-for="list in list0" @click="addIn" :data-prefix="list.sampleCode" :data-datafile="list.code">
            {{list.code}} ( {{list.sampleCode}} - {{list.patientName}} )
          </li>
          <li v-if="list0.length ==0">暂无数据</li>
        </ul>
      </div>
      <div class="col-md-4">
        <div class="title">父亲</div>
        <div class="searchBorder">
          <input type="text" class="form-control input_hasImg" placeholder='请输入关键字' v-model="input1" @keyup.enter="search(input1,1)">
          <button class="search-btn myBtn" @click.stop="search(input1,1)"></button>
        </div>
        <ul id="ul1">
          <li v-for="list in list1" @click="addIn" :data-father="list.code">
            {{list.code}} ( {{list.sampleCode}} - {{list.patientName}} )
          </li>
          <li v-if="list1.length ==0">暂无数据</li>
        </ul>
      </div>
      <div class="col-md-4">
        <div class="title">母亲</div>
        <div class="searchBorder">
          <input type="text" class="form-control input_hasImg" placeholder='请输入关键字' v-model="input2" @keyup.enter="search(input2,2)">
          <button class="search-btn myBtn" @click.stop="search(input2,2)"></button>
        </div>
        <ul id="ul2">
          <li v-for="list in list2" @click="addIn" :data-mother="list.code">
            {{list.code}} ( {{list.sampleCode}} - {{list.patientName}} )
          </li>
          <li v-if="list2.length ==0">暂无数据</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data:function () {
      return{
        loading: false,
        input0: '',
        list0:[],
        input1: '',
        list1:[],
        input2: '',
        list2:[],
      }
    },
    created: function () {
      this.getList();
    },
    methods: {
      getList:function () {
        this.loading = true;
        const _vue = this;
        _vue.myAxios({
          url:'sample/datafile/?app=grandtrio&parent='
        }).then(function (resp) {
          _vue.loading = false;
          _vue.list0 = resp.data.results;
        }).catch(function (error) {
          _vue.catchFun(error)
        });
        _vue.myAxios({
          url:'sample/datafile/?app=grandtrio&parent=father'
        }).then(function (resp) {
          _vue.list1 = resp.data.results;
        }).catch(function (error) {
          _vue.catchFun(error)
        });
        _vue.myAxios({
          url:'sample/datafile/?app=grandtrio&parent=mother'
        }).then(function (resp) {
          _vue.list2 = resp.data.results;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      addIn:function (event) {
        $(event.target).closest('ul').find('.in').removeClass('in');
        $(event.target).closest('li').addClass('in')
      },
      search: function (data,type) {
        this.loading = true;
        const _vue = this;
        this.myAxios({
          url:'sample/datafile/?app=grandtrio&search='+data
        }).then(function (resp) {
          const respData = resp.data.results;
          _vue.loading = false;
          if(type == 0){
            _vue.list0 = respData
          }else if(type == 1){
            _vue.list1 = respData
          }else{
            _vue.list2 = respData
          }
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      submitFun: function () {
        const _vue = this;
        this.myAxios({
          url: 'application/grandtrio/',
          method: 'post',
          data: {
            prefix: $('#ul0').find('.in').data('prefix'),
            datafile: $('#ul0').find('.in').data('datafile'),
            father: $('#ul1').find('.in').data('father'),
            mother: $('#ul2').find('.in').data('mother'),
          }
        }).then(function () {
          alert('任务已提交')
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      addBc: function (event) {
        const _tr = $(event.target).closest('tr');
        const _table = _tr.closest('table');
        _table.find('.tr-active').removeClass('tr-active');
        _tr.addClass('tr-active');
      }
    }
  }
</script>
<style scoped lang="less">
  .btn-content{
    margin: 15px 0 0 15px;
  }
  .trio-content#trio-content {
    clear: both;
    .searchBorder {
      border: 1px solid #ccc;
      width: 100%;
      height: 40px;
      position: relative;
      .input_hasImg {
        display: inline-block;
        width: 80%;
        border: none;
        height: 38px;
        outline: none;
        box-shadow: none;
        padding-left: 20px;
      }
      .myBtn {
        display: inline-block;
        padding: 4px 12px;
        font-size: 13px;
        color: #fff;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        border: 1px solid transparent;
        border-radius: 3px;
        position: absolute;
        width: 36px;
        height: 36px;
        background: url(../../static/img/fu-search.png) no-repeat center;
        background-size: 36px 36px;
        margin: 1px 6px 2px 6px;
        right: 0;

      }
    }
    .col-md-4{
      padding: 0 50px;
      .title{
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px;
      }
      ul{
        max-height: 400px;
        overflow-y: auto;
        padding-left: 0;
        border-bottom: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        li.in{
          background-color: rgb(44, 127, 210);
          color: #fff;
        }
        li{
          padding-left: 20px;
          height: 25px;
          line-height: 25px;
          cursor: pointer;
          &:hover{
            background-color: rgb(44, 127, 210);
            color: #fff;
          }
        }
      }
    }
  }

  .todo-btn {
    float: right;
    margin-right: 100px;
    margin-bottom: 20px;
  }
</style>
