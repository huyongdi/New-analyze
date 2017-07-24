<!--各种分析结果页面，疾病那一行-->
<template>
  <td class="disease-td">
    <div v-for="(disease,index) in geneResp" v-if="disease.geneData.phenotypeMap.length !== 0">
      <!--小圆点-->
      <span :data-geneId="disease.geneId"
            :class="{color0:index===0,color1:index%4===1,color2:index%4===2,color3:index%4===3,color4:index%4===0&&index!==0}">
      </span>
      <div v-for="diseaseSingle in disease.geneData.phenotypeMap">
        <div v-if="diseaseSingle.inheritances.gene.length!=0">
          <!--[AD]-->
          <span class="po bold" data-toggle="tooltip" data-placement="top"
                :data-original-title="diseaseSingle.inheritances.gene.join(',')">
                  [{{diseaseSingle.inheritances.gene_ab.join(',')}}]
          </span>
          <!--Pfeiffer综合征有中文名-->
          <a class="po common-a" v-if="diseaseSingle.omim.titles.chinese"
             @click="showHPO(diseaseSingle)"
             data-toggle="tooltip"
             data-placement="top" :data-original-title='diseaseSingle.phenotype'>
            {{diseaseSingle.omim.titles.chinese}}
          </a>
          <!--Pfeiffer综合征没有中文名-->
          <a class="po common-a" v-else @click="showHPO(diseaseSingle)">{{diseaseSingle.phenotype}}</a>
          <!--(100100)-->
          (
          <a target="_blank"
             :href="dbHtml+'#/geneOmDetail?&omId='+diseaseSingle.omim.mimNumber"
             class="common-a">{{diseaseSingle.omim.mimNumber}}
          </a>
          )
        </div>
        <div v-else> <!--phenotypeMap数组里面的值的inheritances.gene不存在就用inheritances.phenotype-->
          <span class="po bold" data-toggle="tooltip" data-placement="top"
                :data-original-title="diseaseSingle.inheritances.phenotype.join(',')">
            [{{diseaseSingle.inheritances.phenotype_ab.join(',')}}]
          </span>
          <a class="po common-a" v-if="diseaseSingle.omim.titles.chinese"
             @click="showHPO(diseaseSingle)"
             data-toggle="tooltip" data-placement="top"
             :data-original-title='diseaseSingle.phenotype'>
            {{diseaseSingle.omim.titles.chinese}}
          </a>
          <a class='common-a po' v-else
             @click="showHPO(diseaseSingle)">{{diseaseSingle.phenotype}}</a>
          (
          <a target="_blank"
             :href="dbHtml+'#/geneOmDetail?&omId='+diseaseSingle.omim.mimNumber"
             class="common-a">{{diseaseSingle.omim.mimNumber}}</a>
          )
        </div>
      </div>
    </div>
  </td>
</template>

<script>
  export default {
    props: ['geneResp'],
    methods:{
      showHPO:function (data) {
        this.$emit('sendPhenotypeMapSingle', data);
        $("#hpo_detail").modal('show');
      }
    }
  }
</script>

<style scoped lang="less">
  .disease-td {
    padding-left: 16px;
    > div {
      position: relative;
    }
    > div:not(:last-child) {
      border-bottom: 1px solid #ddd;
      padding-bottom: 8px;
    }
    > div:not(:first-child) {
      margin-top: 8px;
    }
    .color {
      position: absolute;
      border-radius: 50%;
      width: 8px;
      height: 8px;
      top: 3.5px;
      left: -15px;
    }
    .color0 {
      .color;
      background-color: #eeb763;
    }
    .color1 {
      .color;
      background-color: #8ebf73;
    }
    .color2 {
      .color;
      background-color: #d32c52;
    }
    .color3 {
      .color;
      background-color: #2a7fd2;
    }
    .color4 {
      .color;
      background-color: #959595;
    }
  }
</style>
