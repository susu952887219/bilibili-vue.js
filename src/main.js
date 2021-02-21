import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vant from 'vant'
import 'vant/lib/index.css';
import { Toast } from 'vant';


import { request } from 'network/request'

Vue.use(vant)
Vue.prototype.Toast = Toast
Vue.prototype.request = request
Vue.config.productionTip = false

new Vue({
  router,
  vant,
  // Toast, 
  render: h => h(App),
}).$mount('#app')
