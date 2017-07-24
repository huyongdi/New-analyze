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
            <!--<router-link v-for="pipeline in leftObj.pipelineArr" :key="pipeline.id" :to="{name:pipeline.vue_name}"-->
                         <!--class="block" :data-code="pipeline.code">-->
              <!--{{pipeline.name}}-->
            <!--</router-link>-->
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
        <router-view></router-view>
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
        background: url(../../static/img/all-1.png) 18px 400px;
      }
      .analyze-soft{
        background: url(../../static/img/all-1.png) 18px 374px;
      }
      .analyze-tool{
        background: url(../../static/img/all-1.png) 18px 346px;
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

</style>
