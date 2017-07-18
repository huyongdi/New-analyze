<template>
  <div class="all-content">
    <top-header></top-header>
    <div class="under">
      <ul class="under-left">
        <li>
          <div class="father">
            <span class="img test-platform"></span>
            <span>检测平台</span>
            <i class="triangle"></i>
            <img src="../../static/img/under-left-1.png" alt="">
          </div>
          <div @click.stop="" class="children">
            <router-link to="/dataM/foo/grandE" data-code='grandE' class="block">
              GrandExome
            </router-link>
            <router-link to='/dataM/foo/hg19' data-code="hg19" class="block">
              hg19_MT
            </router-link>
          </div>
        </li>
        <li>
          <div class="father">
            <span class="img capture-region"></span>
            <span>捕获区域管理</span>
            <i class="triangle"></i>
            <img src="../../static/img/under-left-1.png" alt="">
          </div>
          <div @click.stop="" class="children">
            <router-link to="/dataM/foo/capList" data-code='capList' class="block">
              捕获区域数据
            </router-link>
            <router-link to='/dataM/foo/addCap' data-code="addCap" class="block">
              添加捕获区域数据
            </router-link>
          </div>
        </li>
        <li>
          <div class="father">
            <span class="img capture-up"></span>
            <span>数据上传</span>
            <i class="triangle"></i>
            <img src="../../static/img/under-left-1.png" alt="">
          </div>
          <div @click.stop="" class="children">
            <router-link to="/dataM/foo/sUpload" data-code='sUpload' class="block">
              单个文件上传
            </router-link>
            <router-link to='/dataM/foo/aUpload' data-code="aUpload" class="block">
              多个文件批量上传
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
          grandE: 'dataM-grandE',
          hg19: 'dataM-hg19',
          capList: 'dataM-capList',
          addCap: 'dataM-addCap',
          sUpload: 'dataM-sUpload',
          aUpload: 'dataM-aUpload',
        }
      }
    },
    mounted: function () {
      this.getActive();
    },
    watch: {
      '$route' (to, from) {
        this.getActive();
      }
    },
    methods: {
      getActive: function () {  //通过子页面判断左边具体的active
        const currentPath = this.$router.currentRoute.name;
        $.each(this.pageObj, function (code, name) {
          if (name === currentPath) {
            $(".children").find('a').each(function () {
              if ($(this).data('code') === code) {
                  $(this).parent().find('.active').removeClass('active');
                $(this).addClass('active');
                $(this).closest('li').addClass('active')
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
    .data-centre{
      background: url(../../static/img/all-1.png) 0 266px;
    }
    .test-platform{
      background: url(../../static/img/all-1.png) 0 240px;
    }
    .capture-region{
      background: url(../../static/img/all-1.png) 0 212px;
    }
    .capture-up{
      background: url(../../static/img/all-1.png) 0 186px;
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
      .data-centre{
        background: url(../../static/img/all-1.png) 18px 266px;
      }
      .test-platform{
        background: url(../../static/img/all-1.png) 18px 240px;
      }
      .capture-region{
        background: url(../../static/img/all-1.png) 18px 212px;
      }
      .capture-up{
        background: url(../../static/img/all-1.png) 18px 186px;
      }
    }
  }

</style>
