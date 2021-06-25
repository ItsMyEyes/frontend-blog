import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import Toasted from 'vue-toasted'
import MediumEditor from 'vuejs-medium-editor'
import Editor from '@junhao/vue-editorjs'
import vSelect from 'vue-select'
import vuetify from './plugins/vuetify'

Vue.use(Editor)
Vue.component('v-select', vSelect)

Vue.component('medium-editor', MediumEditor)

require('@/store/subscriber')

Vue.use(Toasted)
Vue.config.productionTip = false
axios.defaults.baseURL = (process.env.NODE_ENV != 'development') ? 'api.random.my.id' : 'http://localhost:8000'

store.dispatch('user/attempt',localStorage.getItem('sesSuccess')).then(() => { 
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
