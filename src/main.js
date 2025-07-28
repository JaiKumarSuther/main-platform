// main.js or main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css'; // ✅ your global CSS file here

createApp(App).use(router).mount('#app');
