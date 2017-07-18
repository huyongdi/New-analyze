<template>
  <div class="all-content">
    <top-header></top-header>
    <div class="under">
      <ul class="under-left">
        <li class="active">
          <div class="father">
            <span class="img task-detail"></span>
            <span>任务详情</span>
            <i class="triangle"></i>
            <img src="../../static/img/under-left-1.png" alt="">
          </div>
          <div @click.stop="" class="children">
            <router-link to="/taskM/foo/done" data-code='done' class="block">
              已完成
            </router-link>
            <router-link to='/taskM/foo/doing' data-code="doing" class="block">
              未完成
            </router-link>
          </div>
        </li>
        <li>
          <div class="father">
            <span class="img task-automate"></span>
            <span>自动化报告</span>
            <i class="triangle"></i>
            <img src="../../static/img/under-left-1.png" alt="">
          </div>
          <div @click.stop="" class="children">
            <router-link to="/taskM/foo/reportSe" data-code='taskM-reportSe' class="block">
              在线报告查询
            </router-link>
            <router-link to='/taskM/foo/reportSt' data-code="taskM-reportSt" class="block">
              报告统计
            </router-link>
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
  import done from './Done.vue'
  import doing from './Doing.vue'
  export default {
    components: {
      'top-header': topHeader,
      'done': done,
      'doing': doing,
    },
    data:function () {
      return{
        pageObj: {  //页面的code对应的name
          done: 'taskM-done',
          doing: 'taskM-doing',
          reportSt: 'taskM-reportSt',
          reportSe: 'taskM-reportSe',
          SgResult: 'taskM-sgResult',
        }
      }
    },
    mounted: function () {
      this.getActive();
    },
    updated:function () {
      this.getActive()
    },
    methods: {
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
        });
      },
    }
  }
</script>

<style scoped lang="less">
  .under-left {
    .task-detail{
      background: url(../../static/img/all-1.png) 0 320px;
    }
    .task-automate{
      background: url(../../static/img/all-1.png) 0 293px;
    }
    .active {
      .father{
        img{
          transform:rotate(180deg);
          -ms-transform:rotate(180deg); 	/* IE 9 */
          -moz-transform:rotate(180deg); 	/* Firefox */
          -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
          -o-transform:rotate(180deg); 	/* Opera */
        }
      }
      .task-detail{
        background: url(../../static/img/all-1.png) 18px 320px;
      }
      .task-automate{
        background: url(../../static/img/all-1.png) 18px 293px;
      }
    }
  }

</style>
