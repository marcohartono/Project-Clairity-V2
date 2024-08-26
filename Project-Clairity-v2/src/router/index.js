import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/', // <- URL
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../components/Home.vue'), // <- Component File Location
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../components/About.vue'),
  },
  // {
  //   path: '/detail/:deviceId',
  //   name: 'Device Detail',
  //   component: () => import(/* webpackChunkName: "about" */ '../components/DeviceDetail.vue'),
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router