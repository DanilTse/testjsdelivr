import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import vueDebounce from 'vue-debounce'
Vue.config.productionTip = false

Vue.use(VueAxios, Axios)
Vue.use(vueDebounce, {
  lock: true,
  listenTo: ['input', 'keyup']
})
new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
