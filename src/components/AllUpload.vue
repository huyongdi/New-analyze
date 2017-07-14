<template>
  <div class="row">
    <div class="col-md-10 single-upload">
      <div class="title">
        <span class="title-b">数据上传</span>
        <span class="title-s">< 多个文件上传</span>
      </div>

      <div class="btn-content">
        <span class="my-btn" @click="save"><img src="../../static/img/red-submit.png" alt="">提交</span>
        <span class="my-btn"><img src="../../static/img/red-save.png" alt="">保存</span>
        <span class="my-btn" @click="refresh"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
        <span class="my-btn"><img src="../../static/img/red-back.png" alt="">返回</span>
      </div>

      <div class="dataContent shadow-top">
        <form id="addDataForm">
          <div class="row">
            <div class="title">
              文件
            </div>
            <div class="content">
              <div class="single">
                <div class="inline">
                  <span>excel：</span>
                  <div class="upload-content">
                    <input type="text" class="show-name">
                    <span class="text">选择</span>
                    <input type='file' name="file1" class="hide-input">
                  </div>
                </div>
                <div class="inline">
                  <span>数据模板：</span>
                  <div class="upload-content">
                    <a :href='anaHtml+"/static/数据模版.xlsx"'>点击下载</a>
                  </div>
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
      this.getLink();
    },
    methods: {
      getLink:function () {

      },
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
      refresh:function () {

      }
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
          margin: 5px 0 23px 0;
          .inline {
            width: 49%;
            margin-top: 10px;
            > span {
              display: inline-block;
              width: 18%;
              min-width: 100px;
            }
            input, select, textarea {
              width: 50%;
            }
          }
          .remark-content {
            margin-left: 4px;
            .remark-text {
              height: 100px;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
</style>
