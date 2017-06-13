<template>
  <div class="all-content">
    <top-header></top-header>
    <div class="under">
      <ul class="under-left">
        <li @click="leftLi" class="active">
          <div class="father">
            <span class="img analyze-flow"></span>
            <span>分析流程</span>
            <i class="triangle"></i>
            <img src="../../static/img/under-left-1.png" alt="">
          </div>
          <div class="children">
            <router-link v-for="pipeline in leftObj.pipelineArr" :key="pipeline.id" :to="{name:pipeline.vue_name}" @click.stop="leftSpan"
                         class="block" :data-code="pipeline.code">
              {{pipeline.name}}
            </router-link>
          </div>
        </li>
        <li @click="leftLi">
          <div class="father">
            <span class="img analyze-soft"></span>
            <span>分析软件</span>
            <i class="triangle"></i>
            <img src="../../static/img/under-left-1.png" alt="">
          </div>
        </li>
        <li @click="leftLi">
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
        pageObj: {  //页面的name对应的code
          grandmgd: 'dataA-sgList',
          grandmito: 'dataA-mtList'
        }
      }
    },
    updated: function () {
      this.getActive();
      this.getHref();
    },
    created: function () {
      const _vue = this;
      this.$axios({
        url: 'application/app/',
      }).then(function (resp) {
        $.each(resp.data.results, function (i, data) {
            data.vue_name = '';
          if (data.category === "pipeline") {
            _vue.leftObj.pipelineArr.push(data)
          }
        });
      }).catch(function (error) {
        _vue.catchFun(error);
      })
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
      leftLi: function (event) {
        $(".under-left").find("li.active").removeClass('active');
        const _currentLi = $(event.target).closest('li');
        const _children = _currentLi.find('.children');
        _currentLi.addClass('active');
        /*如果children里面没有处于active的页面*/
        if (_children.find('.active').length === 0) {
          _children.find('span').first().addClass('active')
        }
      },
      leftSpan: function (event) {
        const _children = $(event.target).parent();
        _children.find('.active').removeClass('active');
        $(event.target).addClass('active');
      }
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
    }
  }

</style>
