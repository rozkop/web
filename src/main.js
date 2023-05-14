import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import VueCookies from 'vue-cookies';

import { createPinia } from 'pinia';

import router from './router';
import axios from 'axios';

axios.defaults.baseURL = 'https://phplaravel-999417-3518047.cloudwaysapps.com'

const token = $cookies.get('auth_token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(VueCookies, { expires: '3d', secure: 'true', sameSite: 'strict' });
app.mount("#app");
