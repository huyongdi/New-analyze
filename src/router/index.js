import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import DataA from '@/components/DataA'
import SgList from '@/components/SgList'
import MtList from '@/components/MtList'
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
    {
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
        }
      ]
    },
    {
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
        }
      ]
    }
  ]
})
