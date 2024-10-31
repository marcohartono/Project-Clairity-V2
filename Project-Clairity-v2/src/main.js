import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import endpoints from '../services/api';
import { createBootstrap } from 'bootstrap-vue-next'
import VueGoogleMaps from '@fawmi/vue-google-maps'


import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'



const app = createApp(App)
  .use(router)
  .use(createBootstrap({ components: true, directives: true }))
  .use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAu_FjQY1_hxZZUIGej6HLlein1hC1ugMQ',
    },
  })


// global this.$api
app.config.globalProperties.$api = endpoints
app.component('VueDatePicker', VueDatePicker);


app.mount('#app')