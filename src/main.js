// main.js or main.ts
import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';
import router from './router';
import './style.css'; // ✅ your global CSS file here

const app = createApp(App);

app.use(VueQueryPlugin);
app.use(router);
app.mount('#app');
