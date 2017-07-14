<template>
  <div class="row">
    <div class="col-md-10 single-upload">
      <div class="title">
        <span class="title-b">捕获区域管理</span>
        <span class="title-s">< 添加捕获区域数据</span>
      </div>

      <div class="btn-content">
        <span class="my-btn" @click="save"><img src="../../static/img/red-submit.png" alt="">提交</span>
        <span class="my-btn"><img src="../../static/img/red-back.png" alt="">返回</span>
      </div>

      <div class="dataContent shadow-top">
        <form id="addDataForm">
          <div class="row">
            <div class="title">
              捕获区域数据
            </div>
            <div class="content">
              <div class="single">
                <div class="row">
                  <span>捕获芯片：</span>
                  <input type="text" placeholder="输入捕获芯片数据">
                </div>
                <div class="row">

                </div>
              </div>
            </div>
          </div>

        </form>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        capList: []
      }
    },
    created: function () {
    },
    methods: {
      save: function () {
        const _form = $("#addDataForm");
        const _remark = $("#remark");
        _form.find('input[type=text]').each(function () {
          $(this).val($.trim($(this).val()))
        });
        _remark.val(_remark.val());
        this.$axios({
          url: 'sample/datafile/',
          method: 'post',
          data: new FormData(document.getElementById('addDataForm'))
        }).then(function () {
          alert('提交成功');
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .single-upload {
    .btn-content {
      margin: 15px 0;
      .my-btn {
        margin-right: 9px;
      }
    }
    .dataContent {
      width: 100%;
      padding: 33px 37px 43px 44px;
      .content {
        .single {
          margin: 50px 0 23px 0;
        }
      }
    }
  }
</style>
