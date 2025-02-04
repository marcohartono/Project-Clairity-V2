import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import endpoints from '../services/api';
import firebase from '../services/firebase';
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
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    },
  })


// global this.$api

app.config.globalProperties.$api = endpoints
app.config.globalProperties.$firebase = firebase
app.component('VueDatePicker', VueDatePicker);


app.mount('#app')