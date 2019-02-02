import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Break from './components/Break.vue'
import Swap from './components/Swap'
import Statistics from './components/Statistics'
import Approve from './components/Approve'
import Schedule from './components/Schedule'
import MoreDutyInfo from './components/MoreDutyInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/break',
      name: 'break',
      component: Break
    },
    {
      path: '/swap',
      name: 'swap',
      component: Swap
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics
    },
    {
      path: '/approve',
      name: 'approve',
      component: Approve
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule
    },
    {
      path: '/moredutyinfo',
      name: 'moredutyinfo',
      component: MoreDutyInfo
    }
  ]
})
