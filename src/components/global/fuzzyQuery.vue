<template>
  <div class="fuzzy-content">
    <div class="left">
      <div class="title">待选项</div>
      <input type="text" class="form-control" :placeholder='placeholder' v-model="fuzzyInput" @keyup="sendInput">
      <ul>
        <li v-for="list in leftData" :data-key="list.key" @click="toRight(list)">{{list.value}}</li>
      </ul>
    </div>
    <div class="right">
      <div class="title">已选项</div>
      <ul>
        <li v-for="list in rightData" @click.stop="rightRemove(list.key)">
          <span>{{list.value}}</span>
          <span>&times;</span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['leftData', 'placeholder', 'rightData'],
    data: function () {
      return {
        fuzzyInput: '',
      }
    },
    methods: {
      toRight: function (list) {
        let flag = true;
        const _vue = this;
        $.each(this.rightData, function (i, data) {
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
        const _vue = this;
        $.each(this.rightData, function (i, data) {
          if (originalKey === data.key) {
            _vue.rightData.splice(i, 1);
          }
        });
      },
      sendInput: function () {
        this.$emit('sendInput', this.fuzzyInput) //函数名和父元素的@一致
      }
    },
  }
</script>

<style scoped lang="less">
  @border: #d3d3d3;
  .fuzzy-content {
    overflow: hidden;
    > div {
      float: left;
    }
    .title {
      padding-left: 20px;
      border-bottom: 1px solid @border;
      height: 30px;
      line-height: 30px;
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
      height: 230px;
      width: 45%;
      margin-right: 5%;
      border: 1px solid @border;
      input {
        width: 90%;
        height: 25px;
        line-height: 25px;
        margin: 5px 0 5px 5%;
      }
      ul {
        height: 163px;
        border-top: 1px solid @border;
      }
    }
    .right {
      height: 230px;
      width: 45%;
      border: 1px solid @border;
      ul {
        height: 198px;
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
</style>
