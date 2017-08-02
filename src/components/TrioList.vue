<template>
  <div class="row" id="trio-list">
    <div class="col-md-10 single-upload">
      <loading v-show="loading"></loading>
      <div class="title">
        <span class="title-b">分析流程</span>
        <span class="title-s">< 核心家系分析</span>
      </div>
      <div class="btn-content">
        <span class="my-btn submit" @click="submitFun"><img src="../../static/img/red-submit.png" alt="">提交</span>
        <span class="my-btn refresh pull-right" @click="refresh"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
      </div>
      <div class="trio-content shadow-top bc-fff" id="trio-content">
        <div class="title">
          选择家系分析信息
        </div>
        <div class="content">
          <div class="single">
            <div class="left">
              <span>受检者</span>
              <input type="text" @keyup="search(input0,0)" v-model="input0">
              <img src="../../static/img/trio-2.png" alt="" @click.stop="showUl(0)">
              <ul class="hide-ul" v-show="show0">
                <li v-for="list in list0" @click.stop="addIn(0,list.showHtml,list.sampleCode,list.code)" data-type="0" :data-prefix="list.sampleCode" :title='list.showHtml'
                    :data-datafile="list.code">
                  {{list.showHtml}}
                </li>
                <li v-show="list0.length == 0">暂无数据</li>
              </ul>
            </div>
            <div class="right">
              <span class="flag-img" id="flag0"></span>
              <input class="content-in" v-model="html0" :title="html0" disabled="disabled">
            </div>
          </div>

          <div class="single">
            <div class="left">
              <span>父亲</span>
              <input type="text" @keyup="search(input1,1)" v-model="input1">
              <img src="../../static/img/trio-2.png" alt="" @click.stop="showUl(1)">
              <ul class="hide-ul" v-show="show1">
                <li v-for="list in list1" @click.stop="addIn(1,list.showHtml,'',list.code)" :title='list.showHtml'>
                  {{list.showHtml}}
                </li>
                <li v-show="list1.length == 0">暂无数据</li>
              </ul>
            </div>
            <div class="right">
              <span class="flag-img" id="flag1"></span>
              <input class="content-in" v-model="html1" :title="html1" disabled="disabled">
            </div>
          </div>

          <div class="single">
            <div class="left">
              <span>母亲</span>
              <input type="text" @keyup="search(input2,2)" v-model="input2">
              <img src="../../static/img/trio-2.png" alt="" @click.stop="showUl(2)">
              <ul class="hide-ul" v-show="show2">
                <li v-for="list in list2" @click.stop="addIn(2,list.showHtml,'',list.code)" :title='list.showHtml'>
                  {{list.showHtml}}
                </li>
                <li v-show="list2.length == 0">暂无数据</li>
              </ul>
            </div>
            <div class="right">
              <span class="flag-img" id="flag2"></span>
              <input class="content-in" v-model="html2" :title="html2" disabled="disabled">
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data: function () {
      return {
        loading: false,
        input0: '',
        list0: [],
        input1: '',
        list1: [],
        input2: '',
        list2: [],

        show0: '',
        show1: '',
        show2: '',
        html0: '',
        html1: '',
        html2: '',

        prefix: '',
        datafile: '',
        father: '',
        mother: '',
      }
    },
    mounted: function () {
//      this.getList();
      this.showAndHide();
    },
    methods: {
      showAndHide: function () {
        const _vue = this;
        $("#app").on("click", function () {
          _vue.show0 = false;
          _vue.show1 = false;
          _vue.show2 = false;
        })
      },
      showUl: function (type) {
        if (type == 0) {
          this.show0 = true
        } else if (type == 1) {
          this.show1 = true
        } else {
          this.show2 = true
        }
      },
      getList: function () {
        this.loading = true;
        const _vue = this;
        _vue.myAxios({
          url: 'sample/datafile/?app=grandtrio&parent='
        }).then(function (resp) {
          _vue.loading = false;
          _vue.list0 = resp.data.results;
        }).catch(function (error) {
          _vue.catchFun(error)
        });
        _vue.myAxios({
          url: 'sample/datafile/?app=grandtrio&parent=father'
        }).then(function (resp) {
          _vue.list1 = resp.data.results;
        }).catch(function (error) {
          _vue.catchFun(error)
        });
        _vue.myAxios({
          url: 'sample/datafile/?app=grandtrio&parent=mother'
        }).then(function (resp) {
          _vue.list2 = resp.data.results;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      addIn: function (type, showHtml, a, b) {
        if (type == 0) {
          this.html0 = showHtml;
          this.show0 = false;
          this.prefix = a;
          this.datafile = b;
          $("#flag0").addClass('in');
        } else if (type == 1) {
          this.html1 = showHtml;
          this.show1 = false;
          this.father = b;
          $("#flag1").addClass('in');
        } else if (type == 2) {
          this.html2 = showHtml;
          this.show2 = false;
          this.mother = b;
          $("#flag2").addClass('in');
        }
      },
      search: function (data, type) {
        this.loading = true;
        const _vue = this;
        this.myAxios({
          url: 'sample/datafile/?app=grandtrio&search=' + data
        }).then(function (resp) {
          const respData = resp.data.results;
          _vue.loading = false;
          if (type == 0) {
            _vue.list0 = respData;
            _vue.show0 = true
          } else if (type == 1) {
            _vue.list1 = respData;
            _vue.show1 = true
          } else {
            _vue.list2 = respData;
            _vue.show2 = true
          }
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      submitFun: function () {
        const _vue = this;
        this.myAxios({
          url: 'application/grandtrio/',
          method: 'post',
          data: {
            prefix: _vue.prefix,
            datafile: _vue.datafile,
            father: _vue.father,
            mother: _vue.mother,
          }
        }).then(function () {
          alert('任务已提交');
          _vue.$router.push({path: '/taskM/foo/doing'})
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      refresh: function () {
        this.html0 = '';
        this.html1 = '';
        this.html2 = '';

        this.datafile = '';
        this.prefix = '';
        this.father = '';
        this.mother = '';

        this.input0 = '';
        this.input1 = '';
        this.input2 = '';

        $("#flag0").removeClass('in');
        $("#flag1").removeClass('in');
        $("#flag2").removeClass('in');

      }
    },
    watch: {
      list0: function () {
        const _vue = this;
        $.each(_vue.list0, function (i, data) {
          data.showHtml = `${data.code}(${data.sampleCode}-${data.patientName})`
        })
      },
      list1: function () {
        const _vue = this;
        $.each(_vue.list1, function (i, data) {
          data.showHtml = `${data.code}(${data.sampleCode}-${data.patientName})`
        })
      },
      list2: function () {
        const _vue = this;
        $.each(_vue.list2, function (i, data) {
          data.showHtml = `${data.code}(${data.sampleCode}-${data.patientName})`
        })
      }
    }
  }
</script>
<style scoped lang="less">
  #trio-list {
    .btn-content {
      margin: 15px 0 0 15px;
    }
    .trio-content#trio-content {
      margin-top: 20px;
      .title {
        margin: 16px 33px 0 33px;
        padding-bottom: 5px;
        border-bottom: 1px solid rgb(212, 212, 212);

        color: rgb(0, 118, 192);

      }
      .content {
        margin-top: 40px;
        margin-left: 78px;
        padding-bottom: 40px;
        .single{
          width: 850px;
          padding: 15px 10px;
          background-color: rgb(245,245,245);
        }
        .single:not(:first-child) {
          margin-top: 50px;
        }
        .left {
          display: inline-block;
          position: relative;
          > span {
            display: inline-block;
            width: 45px;
          }
          input {
            width: 300px;
          }
          img {
            float: right;
            height: 24px;
            margin-left: -1px;
            cursor: pointer;
          }
          .hide-ul {
            padding: 0;
            position: absolute;
            left: 49px;
            width: 300px;
            background-color: #fff;
            z-index: 10;
            max-height: 200px;
            overflow-y: auto;
            border-right: 1px solid rgb(209, 209, 209);
            border-left: 1px solid rgb(209, 209, 209);
            border-bottom: 1px solid rgb(209, 209, 209);
            li {
              height: 26px;
              line-height: 26px;
              font-size: 12px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              padding-left: 10px;
              cursor: pointer;
              &:hover {
                background-color: rgb(220, 238, 249);
              }
            }
          }
        }
        .right {
          display: inline-block;
          width: 350px;
          border: 1px solid #d4d4d4;
          border-radius: 3px;
          height: 24px;
          vertical-align: top;
          margin-left: 40px;
          .flag-img {
            float: left;
            background: url("../../static/img/trio-4.png") no-repeat center;
            width: 11px;
            height: 11px;
            margin: 6px 0 0 6px;
          }
          .flag-img.in {
            background: url("../../static/img/trio-3.png") no-repeat center;
          }
          .content-in {
            float: left;
            margin-left: 10px;
            width: 310px;
            border: 0;
            height: 22px;
            padding: 1px 0;
            font-size: 12px;
            background-color: #fff;
            color: rgb(125, 125, 125);

            /*white-space: nowrap;*/
            /*text-overflow: ellipsis;*/
            /*overflow: hidden;*/
          }
        }
      }
    }
  }

</style>
