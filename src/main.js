import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import VueCookies from 'vue-cookies';

import { createPinia } from 'pinia';

import router from './router';
import axios from 'axios';

axios.defaults.baseURL = 'https://a9b2-178-43-138-218.ngrok-free.app'
axios.defaults.headers.common['ngrok-skip-browser-warning'] = true;

const token = $cookies.get('auth_token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(VueCookies, { expires: '3d', secure: 'true', sameSite: 'strict' });
app.mount("#app");
