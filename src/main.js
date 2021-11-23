import { createApp } from 'vue';
import VueApexCharts from "vue3-apexcharts";
import App from './components/App.vue';
import router from './router';
import store from './store';
import './styles/main.scss'

createApp(App)
  .use(store)
  .use(router)
  .use(VueApexCharts)
  .mount('#app');
