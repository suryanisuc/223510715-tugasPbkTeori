<template>
    <div class="mt-5">
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
  
      <select v-if="showPostsList" v-model="selectedPostId" class="mt-3">
        <option value="">None</option>
        <option v-for="(post, index) in posts" :key="post.id" :value="post.id">{{ post.email }}</option>
      </select>
  
      <div v-if="selectedPost" class="post-details mt-3">
        <h3>{{ selectedPost.email }}</h3>
        <p>{{ selectedPost.description }}</p>
        <img :src="selectedPost.imageLink" alt="Post image" class="img-fluid">
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    props: {
      initialPosts: {
        type: Array,
        default: () => [],
      }
    },
    data() {
      return {
        email: '',
        description: '',
        imageLink: '',
        posts: this.initialPosts,
        selectedPostId: '',
        showPostsList: true,
      };
    },
    async created() {
      if (this.posts.length === 0) {
        const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
        this.posts = postsResponse.data;
      }
    },
    computed: {
      selectedPost() {
        return this.posts.find(post => post.id === this.selectedPostId);
      }
    },
    methods: {
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
        this.$emit('update-posts', this.posts);
      },
      showPostDetails(post) {
        this.selectedPostId = post.id;
      },
    }
  }
  </script>

  <style scoped>
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
  </style>
  