import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

import DataM from '@/components/DataM'
import GrandE from '@/components/GrandE'
import Hg19 from '@/components/Hg19'

import DataA from '@/components/DataA'
import SgList from '@/components/SgList'
import MtList from '@/components/MtList'
import SgResult from '@/components/SgResult'

import TaskM from '@/components/TaskM'
import Done from '@/components/Done'
import Doing from '@/components/Doing'

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
      ]
    },
    { /*任务管理*/
      path: '/taskM/:id',
      name:'taskM',
      component: TaskM,
      children: [
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
          path: 'sgResult',
          name: 'dataA-sgResult',
          component: SgResult
        }
      ]
    },
  ]
})
