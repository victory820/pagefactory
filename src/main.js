import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import '@/assets/css/rewrite.css'
import 'view-design/dist/styles/iview.css'
import '@/assets/css/common.css'

Vue.config.productionTip = false
Vue.use(ViewUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
