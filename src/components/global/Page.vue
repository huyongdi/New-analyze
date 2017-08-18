<!--页码-->
<template>
  <div class="text-right">
    页数
    <select class="black" name="" id="" v-model="currentPage">
      <option v-for="page in allPage" :value="page">{{page}}</option>
    </select>
    <span class="black">{{currentPage}}/{{allPage}}</span>
    <span class="lr-content"> <!--左右按钮-->
      <span @click="currentPage !==1 && --currentPage"
            :class="{'left-no':currentPage === 1,'left-yes':currentPage !==1}"
      ></span>
      <span @click="currentPage !==allPage && ++currentPage"
            :class="{'right-no':currentPage === allPage,'right-yes':currentPage !==allPage}"
      ></span>
    </span>
    <span class="fl-content"><!--第一和最后-->
      <span @click="toFirst" :class="{'first-no':currentPage===1,'first-yes':currentPage!==1}"
      ></span>
      <span @click="toLast"
            :class="{'last-no':currentPage===allPage,'last-yes':currentPage!==allPage}"></span>
    </span>
    <input type="text" class="page-input" v-model="inputValue" @keyup.enter="jump">
    <span :class="{'jump-no':!usableInput,'jump-yes':usableInput}" @click="jump"></span>
  </div>
</template>

<script>
  export default {
    props: ['childCount', 'childReset'],
    data: function () {
      return {
        currentPage: 1,
        inputValue: 1,
        usableInput: false
      }
    },
    watch: {
      currentPage: function () {
        this.inputValue = this.currentPage;
        this.$emit('childCurrent', this.currentPage)
      },
      inputValue: function () {
        this.usableInput = !(!/^\+?[1-9][0-9]*$/.test(this.inputValue) || this.inputValue > this.allPage || this.inputValue == this.currentPage);
      },
      childReset:function () {
        if(this.childReset){
          this.currentPage = 1;
        }
      }
    },
    methods: {
      jump: function () {
        if (!this.usableInput) {
//          alert('请输入正确的页码！');
        } else {
          this.currentPage = this.inputValue;
        }
      },
      toFirst: function () {
        this.currentPage = 1;
      },
      toLast: function () {
        this.currentPage = this.allPage;
      }
    },
    computed: {
      allPage: function () {
        return Math.ceil(this.childCount / 20) ? Math.ceil(this.childCount / 20): 1;
      }
    }
  }
</script>

<style scoped lang="less">
  .transform-deg (@deg: 180deg) {
    transform: rotate(@deg);
    -ms-transform: rotate(@deg); /* IE 9 */
    -moz-transform: rotate(@deg); /* Firefox */
    -webkit-transform: rotate(@deg); /* Safari 和 Chrome */
    -o-transform: rotate(@deg); /* Opera */
  }

  .text-right {
    margin-top: 20px;
    select {
      width: 57px;
      margin: 0 5px;
      max-height: 150px;
      overflow-y: auto;
    }
    .black {
      color: black;
    }
    .lr-content {
      span {
        display: inline-block;
        height: 13px;
        width: 13px;
      }
      span:first-child {
        margin-right: 10px;
      }
      .left-no { /*b5b6b6-NO  6d6e76-YES*/
        background: url(../../../static/img/page-left-no.png) no-repeat center;
        cursor: not-allowed;
      }
      .left-yes {
        background: url(../../../static/img/page-left-yes.png) no-repeat center;
        cursor: pointer;
      }
      .right-no {
        cursor: not-allowed;
        background: url(../../../static/img/page-left-no.png) no-repeat center;
        .transform-deg
      }
      .right-yes {
        cursor: pointer;
        background: url(../../../static/img/page-left-yes.png) no-repeat center;
        .transform-deg
      }
    }
    .fl-content {
      margin: 0 5px;
      span {
        display: inline-block;
        height: 13px;
        width: 13px;
      }
      span:first-child {
        margin-right: 10px;
      }
      .first-no {
        background: url(../../../static/img/page-first-no.png);
        cursor: not-allowed;
      }
      .first-yes {
        background: url(../../../static/img/page-first-yes.png);
        cursor: pointer;
      }
      .last-no {
        background: url(../../../static/img/page-first-no.png);
        .transform-deg;
        cursor: not-allowed;
      }
      .last-yes {
        background: url(../../../static/img/page-first-yes.png);
        .transform-deg;
        cursor: pointer;
      }
    }
    .page-input {
      width: 30px;
      height: 23px;
      margin-left: 5px;
      text-align: center;
    }
    .jump-no {
      display: inline-block;
      width: 17px;
      height: 13px;
      background: url(../../../static/img/page-jump-no.png);
      cursor: not-allowed;
    }
    .jump-yes {
      display: inline-block;
      width: 17px;
      height: 13px;
      background: url(../../../static/img/page-jump-yes.png);
      cursor: pointer;
    }
  }
</style>
