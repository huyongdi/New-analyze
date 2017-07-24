import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

import DataM from '@/components/DataM'
import GrandE from '@/components/GrandE'
import Hg19 from '@/components/Hg19'
import CapList from '@/components/CapList'
import AddCap from '@/components/AddCap'
import SingleUpload from '@/components/SingleUpload'
import AllUpload from '@/components/AllUpload'

import DataA from '@/components/DataA'
import SgList from '@/components/SgList'
import MtList from '@/components/MtList'
import CnvList from '@/components/CnvList'
import SnvList from '@/components/SnvList'
import TrioList from '@/components/TrioList'

import TaskM from '@/components/TaskM'
import ReportSe from '@/components/ReportSearch'
import ReportSt from '@/components/ReportStatistics'
import Done from '@/components/Done'
import Doing from '@/components/Doing'
import LocusSvg from '@/components/LocusSvg'
import GetInterVar from '@/components/GetInterVar'
import SgResult from '@/components/SgResult'
import MtResult from '@/components/MtResult'
import CnvResult from '@/components/CnvResult'
import SnvResult from '@/components/SnvResult'
import TrioResult from '@/components/TrioResult'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    { /*数据管理*/
      path: '/dataM/:id',
      name:'dataM',
      component: DataM,
      children: [
        {
          path: 'grandE',
          name: 'dataM-grandE',
          component: GrandE
        },
        {
          path: 'hg19',
          name: 'dataM-hg19',
          component: Hg19
        },
        {
          path: 'capList',
          name: 'dataM-capList',
          component: CapList
        },
        {
          path: 'addCap',
          name: 'dataM-addCap',
          component: AddCap
        },
        {
          path: 'sUpload',
          name: 'dataM-sUpload',
          component: SingleUpload
        },
        {
          path: 'aUpload',
          name: 'dataM-aUpload',
          component: AllUpload
        },
      ]
    },
    { /*数据分析*/
      path: '/dataA/:id',
      name:'dataA',
      component: DataA,
      children: [
        {
          path: 'sgList',
          name: 'dataA-sgList',
          component: SgList
        },
        {
          path: 'mtList',
          name: 'dataA-mtList',
          component: MtList
        },
        {
          path: 'cnvList',
          name: 'dataA-cnvList',
          component: CnvList
        },
        {
          path: 'snvList',
          name: 'dataA-snvList',
          component: SnvList
        },
        {
          path: 'trioList',
          name: 'dataA-trioList',
          component: TrioList
        },
      ]
    },
    { /*任务管理*/
      path: '/taskM/:id',
      name:'taskM',
      component: TaskM,
      children: [
        {
          path: 'reportSe',
          name: 'taskM-reportSe',
          component: ReportSe
        },
        {
          path: 'reportSt',
          name: 'taskM-reportSt',
          component: ReportSt
        },
        {
          path: 'done',
          name: 'taskM-done',
          component: Done
        },
        {
          path: 'doing',
          name: 'taskM-doing',
          component: Doing
        },
        {
          path: 'locusSvg',
          name: 'taskM-locusSvg',
          component: LocusSvg
        },
        {
          path: 'getInterVar',
          name: 'taskM-getInterVar',
          component: GetInterVar
        },
        {
          path: 'sgResult',
          name: 'taskM-sgResult',
          component: SgResult
        },
        {
          path: 'mtResult',
          name: 'taskM-mtResult',
          component: MtResult
        },
        {
          path: 'cnvResult',
          name: 'taskM-cnvResult',
          component: CnvResult
        },
        {
          path: 'snvResult',
          name: 'taskM-snvResult',
          component: SnvResult
        },
        {
          path: 'trioResult',
          name: 'taskM-trioResult',
          component: TrioResult
        },
      ]
    },
  ]
})
