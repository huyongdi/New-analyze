<template>
  <div class="row">
    <div class="col-md-10">
      <div class="title">
        <span class="title-b">任务详情</span>
        <span class="title-s">> 计算Interval</span>
      </div>
      <div class="title-content row">
        <div class="col-md-offset-4 col-md-3">
          <input class="form-control" id="countInput">
        </div>
        <div class="col-md-1">
          <!--<span class="my-btn" @click="calculate"><img src="../../static/img/red-submit.png" alt="">计算</span>-->
          <span class="my-btn submit" @click="submit"><img src="../../static/img/red-submit.png" alt="">提交</span>
        </div>
      </div>

      <table class="table my-table bc-fff">
        <thead>
        <tr>
          <th></th>
          <th>名称</th>
          <th>中文定义</th>
          <th>英文定义</th>
          <th>级别</th>
        </tr>
        </thead>
        <tbody id="submit_table">
        <tr v-for="data in allData">
          <td><input type="checkbox" class="valueBox" :data-value=data.value></td>
          <td class="t-name">{{data.name}}</td>
          <td>{{data.cn}}</td>
          <td>{{data.en}}</td>
          <td>{{data.level}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import acmgJson from  '../../static/acmg_rank.json'
  export default {
    data:function () {
      return{
        allData: acmgJson
      }
    },
    mounted:function () {
      let param = this.$route.query.query;
      if(param){
        param = param.split(',');
        $.each(param,function (i,value) {
          $('.t-name').each(function () {
            if(value === $(this).html()){
              $(this).prev().find('input').attr('checked','checked');
            }
          })
        })
      }
    },
    methods:{
      submit:function () {
        this.calculate();
        let obj={
          snv:this.$route.query.snv,
          weight:$('#countInput').val(),
          pvs1:0,
          bv1:0,
          ps:[],
          pm:[],
          pp:[],
          bp:[],
          ba:[],
        };
        $(".valueBox").each(function () {
          const html = $(this).parent().next().html();
          const _value = $(this).data('value');
          if ($(this).prop("checked")) {
            if(html == 'PVS1'){
              obj.pvs1 = _value
            }else if(html.includes('PS')){
              obj.ps.push(_value)
            }else if(html.includes('PM')){
              obj.pm.push(_value)
            }else if(html.includes('BP')){
              obj.bp.push(_value)
            }else if(html.includes('BS')){
              obj.bs.push(_value)
            }else if(html == 'BA1'){
              obj.ba.push(_value)
            }
          }
        });

        this.myAxios({
          url:'report/snv/intervar/',
          method:'post',
          data:obj
        }).then(function (resp) {

        })
      },
      calculate:function () {
        let allValue = 0;
        let interVar = '';
        $(".valueBox").each(function () {
          if ($(this).prop("checked")) {
            allValue += $(this).data('value');
          }
        });
        if (allValue >= 20) {
          interVar = 'Pathogenic'
        } else if (allValue >= 12 && allValue < 20) {
          interVar = 'Likely pathogenic'
        } else if (allValue > 0 && allValue < 12) {
          interVar = 'Uncertain significance'
        } else if (allValue > -4  && allValue <= 0) {
          interVar = 'Uncertain significance'
        } else if ( allValue > -8 && allValue <=-4) {
          interVar = 'Likely benign'
        } else if (-8 >= allValue) {
          interVar = 'Benign'
        }
        $("#countInput").val(interVar);
      },
      addBc:function (event) {
        const _tr = $(event.target).closest('tr');
        const _table = _tr.closest('table');
        _table.find('.tr-active').removeClass('tr-active');
        _tr.addClass('tr-active');
      }
    }
  }
</script>

<style scoped>

</style>
