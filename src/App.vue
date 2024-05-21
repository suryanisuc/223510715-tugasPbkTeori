<template>
  <div class="background">
    <img src="https://wallpaperwaifu.com/wp-content/uploads/2023/12/totoro-sitting-on-a-tree-my-neighbor-totoro-thumb.jpg" />
  </div>
  <div id="app" class="container">
    <nav class="navbar navbar-light">
      <button @click="showTodos" class="navbar-brand btn btn-primary" style="color: white;">Todos</button>
      <button @click="showPosts" class="navbar-brand btn btn-primary" style="color: white;">Posts</button>
    </nav>

    <Todos v-if="activeComponent === 'todos'" :initialActivities="todos" @update-activities="updateTodos" />
    <Posts v-if="activeComponent === 'posts'" :initialPosts="posts" @update-posts="updatePosts" />
  </div>
</template>

<script>
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';

export default {
  components: {
    Todos,
    Posts
  },
  data() {
    return {
      activeComponent: 'todos',
      todos: [
        { name: 'Membaca buku', completed: false },
        { name: 'Menulis laporan', completed: true },
        { name: 'Bersantai di taman', completed: true },
      ],
      posts: [],
    };
  },
  methods: {
    showTodos() {
      this.activeComponent = 'todos';
    },
    showPosts() {
      this.activeComponent = 'posts';
    },
    addNewItem() {
      if (this.activeComponent === 'todos') {
        const newTodo = prompt('Enter new todo:');
        if (newTodo) {
          this.todos.push({ name: newTodo, completed: false });
        }
      } else if (this.activeComponent === 'posts') {
        const email = prompt('Enter email:');
        const description = prompt('Enter description:');
        const imageLink = prompt('Enter image link:');
        if (email && description && imageLink) {
          this.posts.push({
            email,
            description,
            imageLink,
            id: Date.now(),
          });
        }
      }
    },
    updateTodos(updatedTodos) {
      this.todos = updatedTodos;
    },
    updatePosts(updatedPosts) {
      this.posts = updatedPosts;
    }
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
.navbar{
 margin-right: 80%;
}
.navbar button{
 display: flex;
 position: relative;
 left: 200%;
 color: white;
}

.background img{
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
 -webkit-background-size:cover; -moz-background-size:cover; -o-background-size:cover; background-size: cover;
 filter: brightness(0.8);
}
</style>