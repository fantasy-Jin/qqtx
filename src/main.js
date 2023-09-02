import { createApp } from 'vue'
import App from './App.vue'
import "../src/assets/css/global.css"
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import router from "./router/index.js"
import pinia from "./pinia/index.js";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { Dialog } from 'vant';

createApp(App)
    .use(router)
    .use(pinia)
    .use(Antd)
    .use(Dialog)
    .mount('#app')
