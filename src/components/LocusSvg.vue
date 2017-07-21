<template>
  <div class="row">
    <loading v-if="Loading"></loading>
    <div class="col-md-10 bc-fff">
      <div class="title">
        <span class="title-b">任务详情</span>
        <span class="title-s">> 计算Interval</span>
      </div>

      <div class="detail-content">
        <div class="svg-title">
          <span>样本信息：</span>
          <span id="svg-title"></span>
          <span class="svg-locus">位点：</span>
          <span>{{$route.query.pos}}</span>
        </div>
        <div id="svg-detail"></div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data: function () {
      return {
        Loading: true,
      }
    },
    created: function () {
      const _vue = this;
      const id = this.$route.query.id;
      if (!id) {
        alert('页面错误');
        this.$router.push('/')
      }
      const pos = this.$route.query.pos;
      const myUrl = this.$route.query.t == 1 ? 'application/grandmito/' + id + '/svg/?pos=' + pos
        : 'application/grandmgd/' + id + '/svg/?pos=' + pos;
      this.myAxios({
        url: myUrl,
      }).then(function (resp) {
        $("#svg-title").html(resp.data.sample);
        $("#svg-detail").html(resp.data.svg);
        _vue.Loading = '';
      });
    }
  }
</script>

<style scoped>
  .detail-content {
    overflow: auto;
    min-height: 200px;
    margin: 20px;
  }

  .svg-title {
    font-size: 20px;
  }

  .svg-locus {
    margin-left: 40px;
  }
</style>
