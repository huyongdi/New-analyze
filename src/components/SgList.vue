<template>
  <div class="row">
    <div class="sg-list col-md-10">
      <div class="title">
        <span class="title-b">分析流程</span>
        <span class="title-s">< 单基因遗传病检测</span>
      </div>
      <div class="btn-content">
        <span class="all-check inline po"></span>
        <img src="../../static/img/submit.png" class="submit po" alt="">
        <img src="../../static/img/refresh.png" class="refresh po" alt="">
        <img src="../../static/img/condition.png" class="pull-right po condition" alt="">
      </div>
      <div class="table-content">
        <table class="table">
          <thead>
          <tr>
            <th></th>
            <th>样本编号</th>
            <th>姓名</th>
            <th>数据</th>
          </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created: function () {

    },
    methods: {}
  }
</script>

<style scoped lang="less">
  @border:rgb(185,184,184);
  .sg-list {
    .btn-content {
      margin: 15px 0 0 15px;
      .all-check {
        width: 15px;
        height: 15px;
        background: url('../../static/img/all-2.jpg') 72px 15px;
        margin-bottom: -4px;
      }
      .submit {
        margin: 0 25px 0 11px;
      }
    }
    .table-content{
      margin-top: 15px;
      border: 1px solid @border;
      border-radius: 5px;
      box-shadow:10px 10px 20px @border, /*左边阴影*/
    }
  }
</style>
