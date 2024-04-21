import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import AuthCallback from './components/AuthCallback.vue';

const routes = [
  {
    path: '/',
    component: App,
  },
  {
    path: '/auth-callback',
    component: AuthCallback,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;