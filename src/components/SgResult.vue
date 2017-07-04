<!--suppress HtmlUnknownTag -->
<template>
  <div class="row">
    <loading v-if="loading"></loading>
    <div class="done-list col-md-10 ">
      <div class="title">
        <span class="title-b">任务详情</span>
        <span class="title-s">< {{sampleInfo}}</span>
      </div>

      <div class="all-content bc-fff">
        <div class="title">
          <div class="title-single">质控统计</div>
          <div class="title-single">变异详情</div>
          <div class="title-single">XHMM CNV</div>
          <div class="title-single">基因覆盖度查询</div>
        </div>
      </div>

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
        ID: this.$route.query.id,
        datafile:'',
        sampleInfo:'',

        loading: false,
        count: 0,
        pageNum: 1,
      }
    },
    created: function () {
      this.getSample();
    },
    methods: {
      getSample:function () {  //获取样本信息
        const _vue = this;
        this.$axios({
          url: 'application/grandmgd/' + this.ID + '/',
        }).then(function (resp) {
          _vue.datafile = resp.data.datafile;
          _vue.$axios({
            url: resp.data.job
          }).then(function (respJob) {
            _vue.sampleInfo = respJob.data.name;
          })
        });
      }
    }

  }
</script>

<style scoped lang="less">
  @border:rgb(193,192,192);
.all-content{
  margin: 15px 0 0 0;
  .title{
    .title-single{
      display: inline-block;
      width: 116px;
      height: 26px;
      padding-top: 3px;
      vertical-align: middle;
      text-align: center;
      border: 1px solid @border;
      border-top-right-radius: 3px;
      border-top-left-radius: 3px;
      margin-left: 3px;
    }
  }
}
</style>
