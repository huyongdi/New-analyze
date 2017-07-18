<template>
  <div class="row">
    <div class="col-md-10 single-upload">
      <div class="title">
        <span class="title-b">数据上传</span>
        <span class="title-s">< 多个文件上传</span>
      </div>

      <div class="btn-content">
        <span class="my-btn" @click="save"><img src="../../static/img/red-submit.png" alt="">提交</span>
        <!--<span class="my-btn"><img src="../../static/img/red-save.png" alt="">保存</span>-->
        <span class="my-btn" @click="refresh"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
        <span class="my-btn"><img src="../../static/img/red-back.png" alt="">返回</span>
      </div>

      <div class="dataContent shadow-top">
        <form id="addExcelForm">
          <div class="row">
            <div class="title">
              文件
            </div>
            <div class="content">
              <div class="single">
                <div class="inline">
                  <span>excel：</span>
                  <div class="upload-content">
                    <input type="text" class="show-name" id="input-show">
                    <span class="text">选择</span>
                    <input type='file' name="excel" class="hide-input" id="input-hide">
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

    },
    methods: {
      refresh:function () {
        $("#input-hide").val('');
        $("#input-show").val('');
      },
      save: function () {
        const _vue = this;
        this.loading = true;
        this.myAxios({
          url: 'sample/datafile/excel/',
          method: 'post',
          data: new FormData(document.getElementById('addExcelForm'))
        }).then(function (resp) {
          alert(resp.data);
          _vue.loading = false;
        }).catch(function (error) {
          _vue.loading = false;
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
