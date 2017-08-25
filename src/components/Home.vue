<template>
  <div class="all-content">
    <top-header></top-header>
    <div class="under">
      <ul class="under-left">
        <li class="active">
          <div class="father">
            <span class="img analyze-flow"></span>
            <span>分析流程</span>
            <i class="triangle"></i>
            <img src="../../static/img/under-left-1.png" alt="">
          </div>
          <div class="children" @click.stop="">
            <router-link to="/dataA/foo/cnvList" class="block" data-code="grandwcnv">低深度全基因CNV检测</router-link>
            <router-link to="/dataA/foo/sgList" class="block" data-code="grandmgd">单基因遗传病检测</router-link>
            <router-link to="/dataA/foo/mtList" class="block" data-code="grandmito">线粒体检测</router-link>
            <router-link to="/dataA/foo/snvList" class="block" data-code="grandanno">SNV注释</router-link>
            <router-link to="/dataA/foo/trioList" class="block" data-code="grandtrio">核心家系分析</router-link>
          </div>
        </li>
        <li>
          <div class="father">
            <span class="img analyze-soft"></span>
            <span>分析软件</span>
            <i class="triangle"></i>
            <img src="../../static/img/under-left-1.png" alt="">
          </div>
        </li>
        <li>
          <div class="father">
            <span class="img analyze-tool"></span>
            <span>实用工具</span>
            <i class="triangle"></i>
            <img src="../../static/img/under-left-1.png" alt="">
          </div>
        </li>
      </ul>
      <div class="under-right">

        <div class="shadow" id="home-content">
          <div class="title">
            分析解读平台
          </div>
          <div class="content">
            <div class="row topRow">
              <div class="col-md-6">
                <img src="../../static/img/home-1.jpg" alt="">
                <div class="right">
                  <div class="right-title">分析流程</div>
                  <div class="remark">基因测序与芯片数据全自动化分析</div>
                </div>
              </div>
              <div class="col-md-6">
                <img src="../../static/img/home-2.jpg" alt="">
                <div class="right">
                  <div class="right-title">分析软件</div>
                  <div class="remark">多种分析软件挖掘和分析相关Gene信息</div>
                </div>
              </div>
            </div>

            <div class="row topRow">
              <div class="col-md-6">
                <img src="../../static/img/home-3.png" alt="">
                <div class="right">
                  <div class="right-title">实用工具</div>
                  <div class="remark">基因诊断分析工具</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import topHeader from './global/Header.vue'
  export default {
    components: {
      'top-header': topHeader,
    },
    data: function () {
      return {
        leftObj: {
          pipelineArr: []
        },
        pageObj: {  //页面的code对应的name
          grandmgd: 'dataA-sgList',
          grandmito: 'dataA-mtList',
          grandwcnv: 'dataA-cnvList',
          grandanno: 'dataA-annoList',
          grandtrio: 'dataA-trioList',
        }
      }
    },
    updated: function () {
      this.getActive();
//      this.getHref();
    },
    created: function () {
//      const _vue = this;
//      this.myAxios({
//        url: 'application/app/',
//      }).then(function (resp) {
//        $.each(resp.data.results, function (i, data) {
//            data.vue_name = '';
//          if (data.category === "pipeline") {
//            _vue.leftObj.pipelineArr.push(data)
//          }
//        });
//      }).catch(function (error) {
//        _vue.catchFun(error);
//      })
    },
    methods: {
      getHref: function () {
        const _vue = this;
        $.each(_vue.leftObj, function (k1, k2) { //k2代表pipelineArr
          $.each(k2, function (k3, k4) {
            $.each(_vue.pageObj, function (k5, k6) {
              if (k5 === k4.code) {
                k4.vue_name = k6
              }
            });
          })
        })
      },
      getActive: function () {  //通过子页面判断左边具体的active
        const currentPath = this.$router.currentRoute.name;
        $.each(this.pageObj, function (code, name) {
          if (name === currentPath) {
            $(".children").find('a').each(function () {
              if ($(this).data('code') === code) {
                $(this).addClass('active')
              }
            });
          }
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .under-left {
    .analyze-flow {
      background: url(../../static/img/all-1.png) 0 400px;
    }
    .analyze-soft{
      background: url(../../static/img/all-1.png) 0 374px;
    }
    .analyze-tool{
      background: url(../../static/img/all-1.png) 0 346px;
    }
    .active {
      .analyze-flow {
        background: url(../../static/img/all-1.png) 16px 400px;
      }
      .analyze-soft{
        background: url(../../static/img/all-1.png) 16px 374px;
      }
      .analyze-tool{
        background: url(../../static/img/all-1.png) 16px 346px;
      }
      .father{
        img{
          transform:rotate(180deg);
          -ms-transform:rotate(180deg); 	/* IE 9 */
          -moz-transform:rotate(180deg); 	/* Firefox */
          -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
          -o-transform:rotate(180deg); 	/* Opera */
        }
      }
    }
  }

  .shadow#home-content {
    background: #fff;
    margin-top: 20px;
    .title {
      height: 60px;
      line-height: 60px;
      color: rgb(67, 67, 67);
      font-size: 16px;
      padding-left: 40px;
      border-bottom: 1px solid rgb(221, 221, 221);
    }
    .content {
      padding: 0 90px;
      .row.search-content {
        text-align: center;
        margin-top: 140px;
        margin-bottom: 70px;
        input {
          width: 250px;
        }
        .remove-input {
          position: relative;
          display: inline-block;
          border-radius: 3px;
          margin-left: -7px;
          height: 28px;
          vertical-align: top;
          background: linear-gradient(to bottom, #f46554, #ea533f);
          >img{
            height: 27px;
          }
          .search {
            cursor: pointer;
            display: inline-block;
            width: 35px;
            &:active {
              background: linear-gradient(to bottom, #ea533f, #f46544);
              border-radius: 3px 0 0 3px;
            }
            img {
              margin-left: 5px;
              margin-top: 2px;
            }
          }
          .select {
            cursor: pointer;
            display: inline-block;
            width: 24px;
            height: 24px;
            &:active {
              background: linear-gradient(to bottom, #ea533f, #f46544);
              border-radius: 0 3px 3px 0;
            }
            img {
              margin-right: 5px;
            }
          }
          .select-div {
            position: absolute;
            width: 100px;
            img {
              position: absolute;
              right: 37px;
              z-index: 10;
            }
            ul {
              position: absolute;
              top: 8px;
              width: 100px;
              /*height: 77px;*/
              height: 52px;
              li {
                height: 25px;
              }
            }
          }
        }
      }
      .topRow {
        margin: 50px 0 40px 0;
        img {
          float: left;
          margin-right: 20px;
        }
        .right {
          float: left;
          .right-title {
            font-weight: bold;
            margin: 5px 0 8px 0;
          }
          .remark {
            max-width: 210px;
            font-size: 12px;
          }
        }
      }
    }
  }

</style>
