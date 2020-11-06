import "babel-polyfill"
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import element from './element/index'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
// import Swiper from "swiper";

axios.defaults.baseURL = process.env.VUE_APP_BASE_API

import "swiper/dist/css/swiper.min.css";

Vue.use(VueAxios, axios)
Vue.use(element)
Vue.config.productionTip = false
Vue.prototype.openLoading = function() {
  const loading = this.$loading({           // 声明一个loading对象
    lock: true,                             // 是否锁屏
    customClass: 'create-isLoading',        //添加类名
    text: '正在加载中...',                     // 加载动画的文字
    spinner: 'el-icon-loading',             // 引入的loading图标
    background: 'rgba(3, 5, 57, 0.8)',       // 背景颜色
    fontSize:'30px'
  })
  return loading;
}
Vue.use(VueLazyLoad)
 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
