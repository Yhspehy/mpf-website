import { createApp } from 'vue';
import { setupRouter } from './router';
import { setupStore } from './stores';

import App from './App.vue';

import './assets/main.css';
import 'virtual:uno.css';

async function setupApp() {
  const app = createApp(App);

  await setupRouter(app);

  setupStore(app);

  app.mount('#app');
}

setupApp();
