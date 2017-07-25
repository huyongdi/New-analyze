<template>
  <div class="right-content">
    <loading v-if="Loading"></loading>
    <location imgClass="analyzeTool-small" currentPage="位点图"></location>

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
</template>

<script>
  import topLocation from './global/location'


  export default {
    data: function () {
      return {
        Loading: true,
      }
    },
    components: {
      'location': topLocation,
    },
    mounted: function () {
      const _vue = this;
      const id = this.$route.query.id;
      console.log(id);
      if (!id) {
        alert('页面错误');
        this.$router.push('/')
      }
      const pos = this.$route.query.pos;
      console.log(this.$route.query.t)
      const myUrl = this.$route.query.t == 1 ? 'application/grandmito/' + id + '/svg/?pos=' + pos
        : 'application/grandmgd/' + id + '/svg/?pos=' + pos;
      this.$axios({
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
