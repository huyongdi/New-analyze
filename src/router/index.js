import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import DataList from '@/components/DataList'
import CaptureArea from '@/components/CaptureArea'
import Task from '@/components/Task'
import SgResult from '@/components/SgResult'
import GmResult from '@/components/GmResult'
import Svg from '@/components/Svg'
import SgList from '@/components/SgList'
import GmList from '@/components/GmList'
import GetInterVar from '@/components/GetInterVar'
import Report from '@/components/Report'
import GwList from '@/components/GwList'
import SnvList from '@/components/SnvList'
import TrioList from '@/components/TrioList'
import GwResult from '@/components/GwResult'
import SnvResult from '@/components/SnvResult'
import TrioResult from '@/components/TrioResult'
import ReportTest from '@/components/ReportTest'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dataList',
      name: 'dataList',
      component: DataList
    },
    {
      path: '/captureArea',
      name: 'captureArea',
      component: CaptureArea
    },
    {
      path: '/task',
      name: 'task',
      component: Task
    },
    {
      path: '/sgResult',
      name: 'sgResult',
      component: SgResult
    },
    {
      path: '/gmResult',
      name: 'gmResult',
      component: GmResult
    },
    {
      path: '/svg',
      name: 'svg',
      component: Svg
    },
    {
      path: '/gmList',
      name: 'gmList',
      component: GmList
    },
    {
      path: '/sgList',
      name: 'sgList',
      component: SgList
    },
    {
      path: '/trioList',
      name: 'trioList',
      component: TrioList
    },
    {
      path: '/getInterVar',
      name: 'getInterVar',
      component: GetInterVar
    },
    {
      path: '/report',
      name: 'report',
      component: Report
    },
    {
      path: '/gwList',
      name: 'gwList',
      component: GwList
    },
    {
      path: '/gwResult',
      name: 'gwResult',
      component: GwResult
    },
    {
      path: '/reportTest',
      name: 'reportTest',
      component: ReportTest
    },
    {
      path: '/snvList',
      name: 'snvList',
      component: SnvList
    },
    {
      path: '/snvResult',
      name: 'snvResult',
      component: SnvResult
    },
    {
      path: '/trioResult',
      name: 'trioResult',
      component: TrioResult
    }
  ]
})
