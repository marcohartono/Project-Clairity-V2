import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import endpoints from '../services/api';
import { createBootstrap } from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const app = createApp(App)
  .use(router)
  .use(createBootstrap({ components: true, directives: true }))

// global this.$api
app.config.globalProperties.$api = endpoints

app.mount('#app')