import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import LocalBrewsPage from '../pages/LocalBrewsPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/local-brews',
      name: 'local-brews',
      component: LocalBrewsPage,
    },
  ],
});

export default router;
