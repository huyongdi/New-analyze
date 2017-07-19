<template>
  <div class="locationShow">
    <div class="navTitle">
      <span :class="imgClass"></span>
      <span class="navTitle-span">{{currentPage}}</span>
    </div>
    <div class="detailTitle">
      <span>您现在的位置：</span>
      <span>分析</span>&nbsp;>&nbsp;<span id="database-title">{{currentPage}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['imgClass', 'currentPage']
  }
</script>
<style scoped>
  .database-small {
    float: left;
    background: url(../../../static/img/left-all.png) -2px -113px;
    width: 30px;
    height: 38px;
  }

  .task-small {
    float: left;
    background: url(../../../static/img/left-all.png) -2px -233px;
    width: 30px;
    height: 33px;
  }

  .analyzeTool-small {
    /*float: left;*/
    /*background: url(../../../static/img/left-all.png) -2px -175px;*/
    /*width: 30px;*/
    /*height: 33px;*/
    /*margin-top: 5px;*/
    float: left;
    background: url(../../../static/img/single-gene.png) no-repeat center;
    width: 33px;
    height: 31px;
    margin-top: 5px;
  }
</style>
