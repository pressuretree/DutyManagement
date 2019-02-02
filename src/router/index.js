import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Break from '@/components/Break.vue'
import Swap from '@/components/Swap'
import Statistics from '@/components/Statistics'
import Approve from '@/components/Approve'
import Schedule from '@/components/Schedule'
import MoreDutyInfo from '@/components/MoreDutyInfo'
import MoreBreakInfo from '@/components/MoreBreakInfo'
import Tips from '@/components/Tips'
import Success from '@/components/Success'

Vue.use(Router)

let routerMap = [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: ['leader', 'emp','admin']
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
      meta: ['leader', 'emp','admin']
    },
    {
      path: '/break',
      name: 'break',
      component: Break,
      meta: ['emp','admin']
    },
    {
      path: '/swap',
      name: 'swap',
      component: Swap,
      meta: ['emp','admin']
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
      meta: ['leader', 'emp','admin']
    },
    {
      path: '/approve',
      name: 'approve',
      component: Approve,
      meta: ['leader','admin']
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule,
      meta: ['leader','admin']
    },
    {
      path: '/moredutyinfo',
      name: 'moredutyinfo',
      component: MoreDutyInfo,
      meta: ['leader', 'emp','admin']
    },
    {
      path: '/morebreakinfo',
      name: 'morebreakinfo',
      component: MoreBreakInfo,
      meta: ['leader', 'emp','admin']
    },
    {
      path: '/tips',
      name: 'tips',
      component: Tips,
      meta: ['leader', 'emp','admin']
    },
    {
      path: '/success',
      name: 'success',
      component: Success,
      meta: ['leader', 'emp','admin']
    }
  ];

let route =  new Router({
  routes: routerMap
})

route.beforeEach((to, from, next) => {
  //获取用户权限信息，为空即没登录，跳转至登录页
  if (to.path === '/') {
    next();
  } else {
    let role = route.app.$options.store.state.loginuser.role;
    if (role === '' || role === undefined) {
      next('/');
    } else {
      if(to.matched.every(item => item.meta.indexOf(role) > -1)) {
        next();
      } else {
        next('/tips');
      }
    }
  }
});

export default route;
