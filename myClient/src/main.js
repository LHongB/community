// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios';
import './utils/aa.js'
import './assets/stylus/index.styl'
import './assets/font-awesome/css/font-awesome.css'
Vue.config.productionTip = false
import Ripple from 'vue-ripple-directive'
Vue.directive('ripple', Ripple)
Vue.prototype.$axios = axios;
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  mounted(){
    var that = this;
    this.$axios('/users/').then(function(result){
        console.log(result);
         that.$store.commit("setLogin",result.data.user);
    })
  //  this.$axios('/users/mesCount').then(function(result){
  //       console.log(result);
  //        that.$store.commit("setMes",result.data.count);
  //   })
  },
  template: '<App/>',
  components: { App }
})
