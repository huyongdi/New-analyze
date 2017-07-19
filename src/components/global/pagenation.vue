<template>
  <div class="text-center" id="aaa">
    <nav>
      <ul class="pagination" v-if="count">
        <!--上一页逻辑-->
        <li :class="{'disabled':current == 1}" @click='current !=1 && goTo(--current)'>
          <span class='po'>&laquo;上一页</span>
        </li>

        <!--中间页码-->
        <li v-for="index in pages" @click="current != index && goTo(index)" :class="{'active c-not':current == index}">
          <span class="po">{{index}}</span>
        </li>

        <!--下一页逻辑-->
        <li :class="{'disabled':allPage==current || allPage ==1}"
            @click="allPage!=current && allPage !=1 && goTo(++current)">
          <span class="po">下一页&raquo;</span>
        </li>

        <!--跳转逻辑-->
        <li>
          <span class="toPage">第<input v-model="inputValue" @keyup.enter="goTo()">页/共{{allPage}}页</span>
        </li>
      </ul>
      <span v-else="">数据为空</span>
    </nav>
  </div>
</template>

<script>
  export default {
    props: ['count', 'reset'],
    data: function () {
      return {
        showItem: 10,
        allPage: 1,
        current: 1,
        inputValue: 1,
      }
    },
    methods: {
      goTo: function (byCurrent) {
        if (byCurrent) {  //如果是直接传的页码（通过点击页码或者是上一页下一页按钮）
          this.current = byCurrent; //点击中间页码的时候保证传过去的是中间页码
          this.inputValue = byCurrent;//保证输入框里面的页码同步更新
          this.$emit('getCurrent', this.current)
        } else {
          //保证输入框的值是正整数 值不能大于总页码
          if (!/^\+?[1-9][0-9]*$/.test(this.inputValue) || this.inputValue > this.allPage) {
            alert('请输入正确的页码！');
          } else {
            this.current = this.inputValue;
            this.$emit('getCurrent', this.current)
          }
        }
      }
    },
    computed: {
      pages: function () { //计算上一页按钮于下一页按钮中间该显示多少页
        this.allPage = Math.ceil(this.count / 20); //拿到父组件的值进行计算
        if (this.reset) { //如果父组件更换除页码的查询条件，重置当前页面为1
          this.current = 1;
          this.inputValue = 1;
        }
        let pagArr = [], i = null;
        if (this.current < this.showItem) { //如果当前页码小于10
          i = Math.min(this.showItem, this.allPage); //取小值
          while (i) { //变成数组方便vue遍历
            pagArr.unshift(i--); //把一个元素添加到数组的开头
          }
        } else { //如果当前页码大于等于10
          let start = this.current - this.showItem / 2;//从哪个页码数开始显示
          i = this.showItem;
          if (start > (this.allPage - this.showItem)) { //如果总页码数并不足以支持到从这个start开始，那么修改start
            start = (this.allPage - this.showItem) + 1
          }
          while (i--) {
            pagArr.push(start++);
          }
        }
        return pagArr
      }
    },
  }
</script>

<style scoped>
  .pagination li span.toPage {
    padding: 4px;
  }

  .pagination li span.toPage input {
    width: 35px;
    text-align: center;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .po {
    cursor: pointer;
  }

  .text-center .pagination > .active.c-not span,
  .text-center .pagination > .active.c-not span:focus,
  .text-center .pagination > .active.c-not span:focus:hover {
    cursor: not-allowed;
  }

  .pagination > .active > a, .pagination > .active > a:focus,
  .pagination > .active > a:hover, .pagination > .active > span,
  .pagination > .active > span:focus, .pagination > .active > span:hover{
    background-color: #2c7fd2;
  }

</style>
