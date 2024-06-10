import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/Todos.vue';
import Posts from '../components/Posts.vue';
import Album from '../components/Album.vue';

const routes = [
  { path: '/', redirect: '/todos' },
  { path: '/todos', component: Todos },
  { path: '/posts', component: Posts },
  { path: '/album', component: Album },
  { path: '/album/:id', component: Album }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
