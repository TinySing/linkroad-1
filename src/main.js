// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import 'lib-flexible'
import 'babel-polyfill'
// import store from './store/store.js'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs


// 导航守卫
// 参数1 : to 目标路由对象
// 参数2 : from 来源路由对象
// 参数3 : next() 下一步

axios.interceptors.response.use(function (response) {
  if(response.data.msg==='noSession'){
    sessionStorage.removeItem("userName");
    router.replace({
      path: '/login'
    })
    return null
  }else{
    return response
  }
}, function (error) {});

// router.beforeEach((to, from, next) => {
//   // 判断是不是登录页面
//   if (sessionStorage.getItem('userName') != null) {
//     next();
//   } else {
//     if (to.path === '/login') { //这就是跳出循环的关键
//       next()
//     } else {
//       next('/login')
//     }
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
