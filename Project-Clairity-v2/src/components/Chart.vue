<template>
    <div style="height:500px;width: 1000px; display: flex;flex-direction:column;">
      <vue3-chart-js
        type="line"
        :data="data"
      ></vue3-chart-js>
    </div>
  </template>
  
  <script>
  import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
  
  export default {
    name: 'App',
    components: {
      Vue3ChartJs,
    },
    props: {
        data: {
            type: Object,
            Required: true
    },
    computed: {
        // chartData() {
        // return this.data;
        // }
    },
  }
}
  </script>