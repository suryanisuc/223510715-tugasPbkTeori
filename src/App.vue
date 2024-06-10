<template>
  <div class="background">
    <img src="https://wallpaperwaifu.com/wp-content/uploads/2023/12/totoro-sitting-on-a-tree-my-neighbor-totoro-thumb.jpg" />
  </div>
  <div id="app" class="container">
    <q-toolbar>
      <q-btn flat label="Todos" @click="goToRoute('todos')" :class="{ active: activeComponent === 'todos' }"/>
      <q-btn flat label="Posts" @click="goToRoute('posts')" :class="{ active: activeComponent === 'posts' }"/>
      <q-btn flat label="Album" @click="goToRoute('album')" :class="{ active: activeComponent === 'album' }"/>
    </q-toolbar>
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const activeComponent = ref(route.name || 'todos');

    const goToRoute = (name) => {
      activeComponent.value = name;
      router.push(`/${name}`);
    };

    onMounted(() => {
      if (!route.name) {
        router.push('/todos');
      }
      activeComponent.value = route.name || 'todos';
    });

    return {
      activeComponent,
      goToRoute
    };
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  margin-bottom: 100px;
}

.post-details {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.background img {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 90%;
  min-width: 1500px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -2;
  object-fit: cover;
  -webkit-background-size:cover;
  -moz-background-size:cover;
  -o-background-size:cover;
  background-size: cover;
  filter: brightness(0.8);
}

.q-toolbar {
  margin-bottom: 20px;
}

.q-btn.active {
  color: #fff;
  background-color: #007bff;
}
</style>
