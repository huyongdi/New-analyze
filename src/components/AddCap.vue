<template>
  <div class="row" id="addCap">
    <div class="col-md-10 single-upload">
      <div class="title">
        <span class="title-b">捕获区域管理</span>
        <span class="title-s">< 添加捕获区域数据</span>
      </div>

      <div class="btn-content">
        <span class="my-btn" @click="save"><img src="../../static/img/red-submit.png" alt="">提交</span>
        <span class="my-btn" @click="refresh"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
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
                  <input type="text" name="name" placeholder="输入捕获芯片数据">
                </div>
                <div class="row">
                  <span>出产厂家：</span>
                  <input type="text" name="maker" placeholder="输入出产厂家">
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="title">
              捕获区域文件
            </div>
            <div class="content">
              <div class="single">
                <div class="row">
                  <span>捕获芯片：</span>
                  <div class="upload-content" id="upload">
                    <input type="text" class="show-name" id="input-show">
                    <span class="text">选择</span>
                    <input type='file' name="bed" class="hide-input" id="input-hide">
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
        $('input').each(function(){
          $(this).val('')
        })
      },
      save: function () {
        const _vue = this;
        this.myAxios({
          url: 'sample/capture/',
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
  #addCap{
    #upload{
      width: 300px;
      input,span{
        height: 30px;
        line-height: 30px;
      }
    }
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
            .row:first-child{
              margin-bottom: 26px;
            }
            .row{
              padding-left: 100px;
              >input{
                height: 30px;
                width: 300px;
                line-height: 30px;
              }
            }
          }
        }
      }
    }
  }

</style>
