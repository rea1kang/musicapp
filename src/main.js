import Vue from "vue";
import App from "./App.vue";
import axios from 'axios'
import VueAxios from 'vue-axios';

//导入路由
import router from './router/index.js'
 
Vue.use(VueAxios, axios);

//轮播图
import { Swipe, SwipeItem, Toast } from 'vant'

Vue.use(Swipe).use(SwipeItem).use(Toast)



Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
