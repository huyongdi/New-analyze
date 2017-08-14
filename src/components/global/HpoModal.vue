<!--弹框显示hpo中英文和ClinicalPhenotye-->
<loading v-if="loading"></loading>
<template>
  <div class="modal fade  bs-example-modal-lg" tabindex="-1" id="hpo_detail" role="dialog"
       aria-labelledby="gridSystemModalLabel3">
    <div class="modal-dialog modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="gridSystemModalLabel3">详情</h4>
        </div>
        <div class="modal-body">
          <table class="table my-table">
            <thead>
            <tr>
              <th>#</th>
              <th>ClinicalPhenotye</th>
              <th>HPO</th>
            </tr>
            </thead>
            <tbody id="synopsis_table">
            <tr v-if="clinicalSynopsis.length === 0" class="center">
              <td colspan="3" class="center">暂无数据</td>
            </tr>
            <tr v-else class="font-12" v-for="data in sortSyn(clinicalSynopsis)">
              <td>{{data.name}}</td>
              <td>
                <div v-for="singleData in data">{{singleData.clinicalPhenotye}}
                </div>
              </td>
              <td>
                <div v-for="singleData in data">
                  <span v-if="singleData.hpo">{{singleData.hpo}}({{singleData.hpoName}})</span>
                  <span v-else> - </span>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer analyze-footer">
          <span class="my-btn pull-left" data-dismiss="modal"><img src="../../../static/img/red-close.png" alt="">关闭</span>
          <!--<button type="button" class="my-btn pull-left" data-dismiss="modal">关闭</button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['phenotypeMapSingle'],
    data: function () {
      return {
        clinicalSynopsis: [],
        loading: true,
        sortArr: ["inheritance", "growth", "growthHeight", "growthWeight", "growthOther",
          "headAndNeck", "headAndNeckHead", "headAndNeckFace", "headAndNeckEars", "headAndNeckEyes",
          "headAndNeckNose", "headAndNeckMouth", "headAndNeckTeeth", "headAndNeckNeck", "cardiovascular",
          "cardiovascularHeart", "cardiovascularVascular", "respiratory", "respiratoryNasopharynx", "respiratoryLarynx",
          "respiratoryAirways", "respiratoryLung", "chest", "chestExternalFeatures", "chestRibsSternumClaviclesAndScapulae", "chestBreasts",
          "chestDiaphragm", "abdomen", "abdomenExternalFeatures", "abdomenLiver", "abdomenPancreas", "abdomenBiliaryTract", "abdomenSpleen", "abdomenGastrointestinal", "genitourinary",
          "genitourinaryExternalGenitaliaMale",
          "genitourinaryExternalGenitaliaFemale",
          "genitourinaryInternalGenitaliaMale",
          "genitourinaryInternalGenitaliaFemale",
          "genitourinaryKidneys",
          "genitourinaryUreters",
          "genitourinaryBladder",
          "skeletal",
          "skeletalSkull",
          "skeletalSpine",
          "skeletalPelvis",
          "skeletalLimbs",
          "skeletalHands",
          "skeletalFeet",
          "skinNailsHair",
          "skinNailsHairSkin",
          "skinNailsHairSkinHistology",
          "skinNailsHairSkinElectronMicroscopy",
          "skinNailsHairNails",
          "skinNailsHairHair",
          "muscleSoftTissue",
          "neurologic",
          "neurologicCentralNervousSystem",
          "neurologicPeripheralNervousSystem",
          "neurologicBehavioralPsychiatricManifestations",
          "voice",
          "metabolicFeatures",
          "endocrineFeatures",
          "hematology",
          "immunology",
          "neoplasia",
          "prenatalManifestations",
          "prenatalManifestationsMovement",
          "prenatalManifestationsAmnioticFluid",
          "prenatalManifestationsPlacentaAndUmbilicalCord",
          "prenatalManifestationsMaternal",
          "prenatalManifestationsDelivery",
          "laboratoryAbnormalities",
          "miscellaneous",
          "molecularBasis",
        ],

      }
    },
    watch: {
      phenotypeMapSingle: function (newData) {
        this.loading = !$.isEmptyObject(newData.omim.clinicalSynopsis);
        this.clinicalSynopsis = [];
        const _vue = this;
        let count = 0;
        let count1 = 0;
        $.each(newData.omim.clinicalSynopsis, function (n2, data2) {
          count += 1; //对象里面的key个数
          data2.name = n2;
          let data2Length = 0;
          $.each(data2, function (n3, data3) {
            if (data3.hpo) {
              _vue.myAxios({
                method: "get",
                url: _vue.dbUrl + 'knowledge/hpo/' + data3.hpo + '/',
              }).then(function (resp) {
                data3.hpoName = resp.data.titles.chinese;
                data2Length += 1;
                if (data2Length === data2.length) {
                  _vue.clinicalSynopsis.push(data2);
                  count1 += 1;
                  if (count1 === count) {
                    _vue.loading = false;
                  }
                }
              }).catch(function () {
                data2Length += 1;
                if (data2Length === data2.length) {
                  _vue.clinicalSynopsis.push(data2);
                  count1 += 1;
                  if (count1 === count) {
                    _vue.loading = false;
                  }
                }
              });
            } else {
              data2Length += 1;
              if (data2Length === data2.length) {
                _vue.clinicalSynopsis.push(data2);
                count1 += 1;
                if (count1 === count) {
                  _vue.loading = false;
                }
              }
            }
          });
        });
      },
    },
    methods:{
      sortSyn: function (clinicalSynopsis) {
        let arr = [];
        let _vue = this;
        $.each(clinicalSynopsis, function (i, value) {
          if (value.name === 'dateCreated') { //剔除数据
            return;
          }
          $.each(_vue.sortArr, function (k, data) {
            if (value.name === data) {
              value.code = k;
            }
          });
          arr.push(value)
        });
        arr = arr.sort(function (a, b) {
          return a.code - b.code
        });
        return arr
      },
    }
  }
</script>

<style scoped>

</style>
