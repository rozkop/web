import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import VueCookies from 'vue-cookies';

import { createPinia } from 'pinia';

import router from './router';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(VueCookies, { expires: '3d', secure: 'true', sameSite: 'strict' });
app.mount("#app");
