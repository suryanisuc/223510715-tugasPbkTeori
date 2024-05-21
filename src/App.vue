<template>
  <div class="background">
       <img src="https://wallpaperwaifu.com/wp-content/uploads/2023/12/totoro-sitting-on-a-tree-my-neighbor-totoro-thumb.jpg" />
   </div>
 <div id="app" class="container">
   <nav class="navbar navbar-light ">
     <button @click="toggleTodos" class="navbar-brand btn btn-primary" style="color: white;">Todos</button>
     <button @click="togglePosts" class="navbar-brand btn btn-primary" style="color: white;">Posts</button>
   </nav>

   <div v-if="showTodos" class="mt-5">
     <div class="test">
     <input v-model="newTodo" @keyup.enter="addTodo" class="form-control mb-3" placeholder="Add a new todo">
     <button @click="addTodo" class="btn btn-primary">Add</button>
     </div>
     <div class="test2">
     <button @click="toggleFilter" class="btn btn-secondary ml-3">{{ filterButtonText }}</button>
       </div>
     <table class="table mt-1">
       <thead>
         <tr>
           <th>Tugas</th>
           <th>Status</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>
         <tr v-for="(activity, index) in filteredActivities" :key="index">
           <td>{{ activity.name }}</td>
           <td><input type="checkbox" v-model="activity.completed"></td>
           <td><button @click="editActivity(activity)" class="btn btn-primary btn-sm">Edit</button></td>
         </tr>
       </tbody>
     </table>
   </div>

   <div v-if="showPosts" class="mt-5">
     <div class="good">
     <form @submit.prevent="addPost">
       <div class="form-group">
         <label for="email">Email</label>
         <input v-model="email" type="email" class="form-control" id="email" placeholder="Email" required>
       </div>
       <div class="form-group">
         <label for="description">Description</label>
         <input v-model="description" type="text" class="form-control" id="description" placeholder="Description" required>
       </div>
       <div class="form-group">
         <label for="imageLink">Image Link</label>
         <input v-model="imageLink" type="text" class="form-control" id="imageLink" placeholder="Image Link" required>
       </div>
       <button type="submit" class="btn btn-primary">Add</button>
       <button @click="showPostsList = !showPostsList" class="btn btn-secondary ml-3">
         {{ showPostsList ? 'Hide' : 'Show' }} Posts List
       </button>
     </form>
     </div>

     <select v-if="showPostsList" v-model="selectedPost" class="mt-3">
       <option value="">None</option>
       <option v-for="(post, index) in posts" :key="post.id" :value="post">{{ post.email }}</option>
     </select>

     <div v-if="selectedPost" class="post-details mt-3">
       <h3>{{ selectedPost.email }}</h3>
       <p>{{ selectedPost.description }}</p>
       <img :src="selectedPost.imageLink" alt="Post image" class="img-fluid">
     </div>
   </div>
 </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import Swal from 'sweetalert2';

export default {
 data() {
   return {
     showTodos: true,
     showPosts: false,
     newTodo: '',
     email: '',
     description: '',
     imageLink: '',
     posts: [],
     selectedPost: null,
     showPostsList: true,
     activities: ref([
       { name: 'Membaca buku', completed: false },
       { name: 'Menulis laporan', completed: true },
       { name: 'Bersantai di taman', completed: true },
     ]),
     filterActive: false,
  }
 },
 async created() {
   const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
   this.posts = postsResponse.data;
 },
 computed: {
   filteredActivities() {
     if (this.filterActive) {
       return this.activities.filter(activity => !activity.completed);
     } else {
       return this.activities;
     }
   },
   filterButtonText() {
     return this.filterActive ? 'All' : 'Incomplete';
   }
 },
 methods: {
   toggleTodos() {
     this.showTodos = true;
     this.showPosts = false;
   },
   togglePosts() {
     this.showTodos = false;
     this.showPosts = true;
   },
   addTodo() {
     this.activities.push({
       name: this.newTodo,
       completed: false
     });
     this.newTodo = '';
     Swal.fire('Todo added!', 'Your new todo has been added successfully!', 'success');
   },
   editActivity(activity) {
     const newName = prompt('Edit activity', activity.name);
     if (newName) {
       activity.name = newName;
       Swal.fire('Todo updated!', 'Your todo has been updated successfully!', 'success');
     }
   },
   toggleFilter() {
     this.filterActive = !this.filterActive;
   },
   addPost() {
     const newPost = {
       email: this.email,
       description: this.description,
       imageLink: this.imageLink,
       id: Date.now(),
     };
     this.posts.unshift(newPost);
     this.email = '';
     this.description = '';
     this.imageLink = '';
     this.showPostDetails(newPost);
     Swal.fire('Post added!', 'Your new post has been added successfully!', 'success');
   },
   showPostDetails(post) {
     this.selectedPost = post;
   },
 },
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
.test{
 display: flex;
 margin-right: 50%;
}
.test input {
 background-color: transparent;
 backdrop-filter: blur(5px);
 color: white;
}
.test button {
 margin-left: 10px;
 margin-bottom: 15px;
 padding: 15px;
}
.test2 button {
 margin-right: 100%;
}
.tabel{
 margin-top: 100px;
}
.table th{
 background-color: gray;
}
tr th{
 color: white;
 border-color: white;
}
tr td{
 color: white;
 backdrop-filter: blur(5px);
}
.good{
 display: flex;
 padding-left: 42%;
 left: -50%;
}
.good label {
 color: white;
 display: flex;
 margin-bottom: 10px;
 margin-top: 10px;
}
.good input {
 background-color: transparent;
 backdrop-filter: blur(5px);
 color: white;
}
.good button {
 margin-left: 10px;
 margin-top: 10px;
}
.post-details{
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