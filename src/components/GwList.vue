<template>
  <div class="right-content">
    <loading v-if="loading"></loading>
    <location imgClass="analyzeTool-small" currentPage="低深度全基因CNV检测列表"></location>

    <div class="all-content">

      <button class="btn btn-color todo-btn" @click="submitFun">提&nbsp;&nbsp;交</button>

      <table class="table singleGene-table myTable">
        <thead>
        <tr>
          <th>
            <input type="checkbox" v-model="hasAllchecked" @click.stop="allChecked">
            选择
          </th>
          <th>样本</th>
          <th>数据</th>
        </tr>
        </thead>
        <tbody id="to_analyse"> <!--待分析-->
        <tr v-for="result in results" @click="addBc">
          <td><label>
            <input type="checkbox" class="todo-input list-input" :data-prefix=result.sampleCode @click="listInput"
                   :data-datafile=result.code>
          </label></td>
          <td>{{result.sampleCode}}:{{result.patientName}}</td>
          <td>{{result.code}}:{{result.capture}}</td>
        </tr>
        </tbody>
      </table>

      <pagenation :count="count" @getCurrent="getCurrent"></pagenation>

    </div>

  </div>
</template>

<script>
  import topLocation from './global/location'
  import pagenation from './global/pagenation'
  export default {
    components: {
      'location': topLocation,
      'pagenation': pagenation,
    },
    data: function () {
      return {
        loading: true,
        results: [],
        hasAllchecked: false,
        hasAllcheckedFlag: false, /*chrome和firefox对点击判断checked不一样*/

        page: 1,
        count: 1,
      }
    },
    created: function () {
      this.getList()
    },
    methods: {
      submitFun: function () {
        let count = 0;
        let ajax = 0;
        const _vue = this;
        $(".todo-input").each(function () {
          if ($(this).prop('checked')) {
            let _html = $(this).parent().parent().next().html();
            count += 1;
            _vue.$axios({
              url: 'application/grandwcnv/',
              method: 'post',
              data: {
                prefix: $(this).data('prefix'),
                datafile: $(this).data('datafile')
              }
            }).then(function (resp) {
              ajax += 1;
              if (ajax === count) {
                alert('任务已全部提交');
                _vue.$router.push({path: '/task'})
              }
            }).catch(function () {
              alert('样本' + _html + '未提交成功');
            })
          }
        });
      },
      getCurrent: function (data) {
        this.page = data;
        this.getList()
      },
      getList: function () {
        const _vue = this;
        _vue.loading = true;
        _vue.results = [];
        this.$axios({
          url: 'sample/datafile/?app=grandwcnv&page=' + this.page,
        }).then(function (resp) {
          _vue.count = resp.data.count;
          _vue.results = resp.data.results;
          _vue.loading = false;
        });
      },
      allChecked: function () {
        if (!this.hasAllcheckedFlag) {  //准备变成true状态
          $(".list-input").each(function () {
            $(this).prop('checked', true);
          });
          this.hasAllcheckedFlag = true;
        } else {
          $(".list-input").each(function () {
            $(this).prop('checked', false);
          });
          this.hasAllcheckedFlag = false;
        }
      },
      listInput: function () {
        this.hasAllchecked = $(".list-input:checked").length === this.results.length;
        this.hasAllcheckedFlag = $(".list-input:checked").length === this.results.length;
      },
      addBc:function (event) {
        const _tr = $(event.target).closest('tr');
        const _table = _tr.closest('table');
        _table.find('.tr-active').removeClass('tr-active')
        _tr.addClass('tr-active');
      }
    }
  }
</script>

<style scoped>
  .detail-content {
    margin-top: 20px;
  }

  .singleGene-table {
    /*min-height: 500px;*/
  }

  .todo-btn {
    float: right;
    margin-right: 100px;
    margin-bottom: 20px;
  }
</style>
