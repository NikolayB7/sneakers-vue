import './assets/main.css'

import { createApp } from 'vue'
import i18n from './i18n';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import FavoritesView from '@/pages/FavoritesView.vue'
// import router from './router'

const app = createApp(App)

const routes = [
  { path: '/', name:'home', component: HomeView },
  { path: '/favorites', name:'favorites', component: FavoritesView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app
  .use(autoAnimatePlugin)
  .use(i18n)
  .use(router)
  .mount('#app')
