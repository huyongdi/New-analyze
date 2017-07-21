<template>
  <div class="fuzzy-content">
    <div class="left">
      <!--<input type="text" class="form-control" :placeholder='placeholder' v-model="fuzzyInput" @keyup="sendInput">-->

      <div class="searchBorder" id="search_gene">
        <input type="text" class="form-control input_hasImg" :placeholder='placeholder' v-model="fuzzyInput">
        <button class="search-btn myBtn" @click.stop="sendInput"></button>
      </div>

      <ul>
        <li v-for="list in leftData" :data-key="list.key" @click="toRight(list)">{{list.value}}</li>
      </ul>
    </div>
    <div class="right">
      <div class="title">{{title}}</div>
      <ul id="right-ul">
        <li v-for="list in rightData" :data-key="list.key" @click="rightRemove(list.key)">
          <span>{{list.value}}</span>
          <span>&times;</span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['leftData', 'placeholder', 'rightData','title'],
    data: function () {
      return {
        fuzzyInput: '',
      }
    },
    methods: {
      toRight: function (list) {
        let flag = true;
        const _vue = this;
        $.each(_vue.rightData, function (i, data) {
          if (list.key === data.key) {
            alert('请不要重复添加');
            flag = false;
          }
        });
        if (flag) {
          _vue.rightData.push(list)
        }
      },
      rightRemove: function (originalKey) {
//        $(event.target).closest('li').remove();
//        const _vue = this;
//        const orignKey = $(event.target).closest('li').data('key');
//        console.log(_vue.rightData)
//        $.each(_vue.rightData, function (i, data) {
//          if (orignKey === data.key) {
//            _vue.rightData.splice(i,1);
//          }
//        });

        const _vue = this;
        $.each(this.rightData, function (i, data) {
          if (originalKey === data.key) {
            _vue.rightData.splice(i, 1);
          }
        });

      },
      sendInput: function () {
        this.$emit('sendInput', this.fuzzyInput) //函数名和父元素的@onEnter一致
      }
    },
//    computed: {
//      leftDataArr: function () {
//          console.log(this.leftData)
//      }
//    }
  }
</script>

<style scoped lang="less">
  @border: #d3d3d3;
  @bc:rgb(240,244,247);
  .fuzzy-content {
    overflow: hidden;
    > div {
      float: left;
    }
    .title {
      /*padding-left: 20px;*/
      border-bottom: 1px solid @border;
      height: 40px;
      line-height: 40px;
      background: @bc;
      text-align: center;
    }
    ul {
      padding: 0;
      margin: 0;
      overflow-y: auto;
      li {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left: 20px;
        padding-right: 20px;
        cursor: pointer;
        height: 25px;
        line-height: 25px;
        &:hover {
          background-color: rgb(44, 127, 210);
          /*background-color: rgb(240,244,247);*/
          color: #fff;
        }
      }
    }
    .left {
      height: 310px;
      width: 50%;
      border: 1px solid @border;
      border-right: none;
      input {
        /*width: 90%;*/
        /*height: 25px;*/
        /*line-height: 25px;*/
        /*margin: 5px 0 5px 5%;*/
      }
      ul {
        height: 268px;
        border-top: 1px solid @border;
        background-color: @bc;
      }
    }
    .right {
      height: 310px;
      width: 50%;
      border: 1px solid @border;
      ul {
        height: 268px;
        li {
          position: relative;
          &:hover {
            span {
              display: block;
            }
          }
        }
        span:first-child {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span:last-child {
          display: none;
          position: absolute;
          right: 8px;
          top: 0;
        }
      }
    }
  }

  .searchBorder {
    width: 100%;
    height: 40px;
    position: relative;

  }

  .searchBorder .input_hasImg {
    display: inline-block;
    width: 80%;
    border: none;
    height: 40px;
    outline: none;
    box-shadow: none;
    padding-left: 20px;
  }

  .myBtn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 13px;
    color: #fff;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    border: 1px solid transparent;
    border-radius: 3px;
  }

  .search-btn {
    position: absolute;
    width: 36px;
    height: 36px;
    background: url(../../../static/img/search.png) no-repeat center;
    background-size: 36px 36px;
    margin: 2px 6px 2px 6px;
    right: 0;
  }

</style>
