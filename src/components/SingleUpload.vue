<template>
  <div class="row">
    <div class="col-md-10 single-upload">
      <div class="title">
        <span class="title-b">数据上传</span>
        <span class="title-s">< 单个文件上传</span>
      </div>

      <div class="btn-content">
        <span class="my-btn" @click="save"><img src="../../static/img/red-submit.png" alt="">提交</span>
        <!--<span class="my-btn"><img src="../../static/img/red-save.png" alt="">保存</span>-->
        <span class="my-btn" @click="refresh"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
        <span class="my-btn"><img src="../../static/img/red-back.png" alt="">返回</span>
      </div>

      <div class="dataContent shadow-top bc-fff">
        <form id="addDataForm">
          <div class="row">
            <div class="title base-color">
              文件信息
            </div>
            <div class="content">
              <div class="single">
                <div class="inline">
                  <span><!--<span class="fa fa-star red"></span>-->文件编号：</span>
                  <input type="text" name="code" id="code" class="light-font">
                </div>
                <div class="inline">
                  <span><!--<span class="fa fa-star red"></span>-->样本编号：</span>
                  <input type="text" name="patient.code" id="patient-code" class="light-font" placeholder="">
                </div>
                <div class="inline">
                  <span><!--<span class="fa fa-star red"></span>-->检测平台：</span>
                  <select name="capture.id" id="capture-id" class="my-select light-font">
                    <option value="" class="hide">请选择检测平台</option>
                    <option :value="list.id" v-for="list in capList">{{list.code}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="title base-color">
              受检者信息
            </div>
            <div class="content">
              <div class="single">
                <div class="inline">
                  <span><!--<span class="fa fa-star red"></span>-->受检者姓名：</span>
                  <input type="text" name="patient.name" id="patient-name" class="light-font">
                </div>
                <div class="inline">
                  <span>受检者性别：</span>
                  <select name="patient.gender" class="my-select light-font" id="patient-gender">
                    <option value="" class="hide">请选择性别</option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                    <option value="未知">未知</option>
                  </select>
                </div>
              </div>
            </div>

            <!--patient对象每个数据都必须提交，因此伪造2个-->
            <input type="text" name="patient.clinical" class="hide">
            <input type="text" name="patient.phenotypes" class="hide" value="[]">

          </div>
          <div class="row">
            <div class="title base-color">
              数据信息
            </div>
            <div class="content">
              <div class="single">
                <div class="inline">
                  <span><!--<span class="fa fa-star red"></span>-->数据格式：</span>
                  <select name="dataFormat" class="my-select light-font" id="dataFormat">
                    <option value="" class="hide">请选择数据格式</option>
                    <option value="fastq">fastq</option>
                    <option value="fastqSE">fastqSE</option>
                    <option value="vcf">vcf</option>
                  </select>
                </div>
                <div class="inline">
                  <span>数据量(Mbp)：</span>
                  <input type="text" name="volume" id="volume" class="light-font">
                </div>
                <div class="inline pull-left">
                  <span>Q30：</span>
                  <input name="q30" type="text" id="q30" class="light-font">
                </div>
                <div class="inline remark-content">
                  <span class="pull-left">备注：</span>
                  <textarea id="remark" class="pull-left remark-text light-font" name="comment"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="title base-color">
              文件
            </div>
            <div class="content">
              <div class="single">
                <div class="inline">
                  <span><!--<span class="fa fa-star red"></span>-->文件1：</span>
                  <input type="text" v-model="file1" class="light-font">
                  <!--<div class="upload-content">-->
                  <!--<input type="text" class="show-name">-->
                  <!--<span class="text">选择</span>-->
                  <!--<input type='file' name="file1" class="hide-input">-->
                  <!--</div>-->
                </div>
                <div class="inline">
                  <span>文件2：</span>
                  <input type="text" v-model="file2" class="light-font">
                  <!--<div class="upload-content">-->
                  <!--<input type="text" class="show-name">-->
                  <!--<span class="text">选择</span>-->
                  <!--<input type='file' name="file2" class="hide-input">-->
                  <!--</div>-->
                </div>
                <input type="text" name="files" :value="[file1,file2]" class="hide">
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
        capList: [],
        file1:'',
        file2:'',
      }
    },
    created: function () {
      this.getCap();
    },
    methods: {
      getCap: function () {
        const _vue = this;
        this.myAxios({
          url: 'sample/capture/',
          method: 'get'
        }).then(function (resp) {
          _vue.capList = resp.data.results;
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      save: function () {
        const _form = $("#addDataForm");
        const _remark = $("#remark");
        const _vue = this;
        _form.find('input[type=text]').each(function () {
          $(this).val($.trim($(this).val()))
        });
        _remark.val(_remark.val());
        this.myAxios({
          url: 'sample/datafile/',
          method: 'post',
          data:{
            code: $.trim($("#code").val()),
            patient:{
              code:$.trim($("#patient-code").val()),
              name:$.trim($("#patient-name").val()),
              gender:$.trim($("#patient-gender").val()),
              clinical: '',
              phenotypes: []
            },
            capture:{
              id:$.trim($("#capture-id").val())
            },
            dataFormat:$.trim($("#dataFormat").val()),
            volume:$.trim($("#volume").val()),
            q30:$.trim($("#q30").val()),
            remark:$.trim($("#remark").val()),
            files:[_vue.file1,_vue.file2]
          }
//          data: new FormData(document.getElementById('addDataForm'))
        }).then(function () {
          alert('提交成功');
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      refresh: function () {
        const _form = $("#addDataForm");
        _form.find('input[type=text]').each(function () {
          $(this).val('')
        });
        _form.find('select').each(function () {
          $(this).val('')
        });
        $("#remark").val('');
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
        .red{
          color: red;
          margin-right: 5px;
        }
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
