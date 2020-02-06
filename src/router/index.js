import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import SmallScreen from '@/components/SmallScreen'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      redirect: '/index/home',
      name: 'Index',
      component: Index,
      children: [
        {path: 'home',
          component: resolve => require(['@/components/Index/home'],resolve),
        },
        {
          path: 'monitormsg/:id?/:idOne?',
          component: resolve => require(['@/components/Index/monitorMsg'],resolve),
        },
        {
          path: 'warningmsg',
          component: resolve => require(['@/components/Index/warningmsg'],resolve),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'toolCom',
          component: resolve => require(['@/components/Index/toolCom'],resolve),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'equipmentMan',
          component: resolve => require(['@/components/Index/equipmentMan'],resolve),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'roleMan',
          component: resolve => require(['@/components/Index/roleMan'],resolve),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'personMan',
          component: resolve => require(['@/components/Index/personMan'],resolve),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'systemMan',
          component: resolve => require(['@/components/Index/systemMan'],resolve),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'newWarning',
          component: resolve => require(['@/components/Index/newWarning'],resolve),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'screen',
          component: resolve => require(['@/components/screen'],resolve),
          meta: {
            keepAlive: true
          }
        }
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/smallScreen',
      name: 'SmallScreen',
      component: SmallScreen
    }
  ]
})
