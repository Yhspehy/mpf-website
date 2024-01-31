import { createApp } from 'vue';
import { setupRouter } from './router';

import App from './App.vue';

import './assets/main.css';
import 'virtual:uno.css';

async function setupApp() {
  const app = createApp(App);

  await setupRouter(app);

  app.mount('#app');
}

setupApp();
