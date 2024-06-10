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
        <div class="form-group">
          <label for="username">Username</label>
          <select v-model="selectedUsername" class="form-control" id="username" required>
            <option value="">Select a username</option>
            <option v-for="user in users" :key="user.id" :value="user.username">{{ user.username }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Add</button>
        <button @click="showPostsList = !showPostsList" class="btn btn-secondary ml-3">
          {{ showPostsList ? 'Hide' : 'Show' }} Posts List
        </button>
      </form>
    </div>

    <select v-if="showPostsList" v-model="selectedPostId" class="mt-3">
      <option value="">None</option>
      <option v-for="post in posts" :key="post.id" :value="post.id">{{ post.email }}</option>
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
      selectedUsername: '',
      posts: this.initialPosts,
      selectedPostId: '',
      showPostsList: true,
      users: [],
    };
  },
  async created() {
    if (this.posts.length === 0) {
      const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
      this.posts = postsResponse.data.slice(0, 10); // Mengambil 10 post pertama
    }

    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    this.users = usersResponse.data.slice(0, 10);  // Ambil 10 username pertama
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
        username: this.selectedUsername,
        id: Date.now(),
      };
      this.posts.unshift(newPost);
      this.email = '';
      this.description = '';
      this.imageLink = '';
      this.selectedUsername = '';
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
.good {
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
.good input,
.good select {
  background-color: transparent;
  backdrop-filter: blur(5px);
  color: white;
}
.good button {
  margin-left: 10px;
  margin-top: 10px;
}
.post-details {
  color: white;
}

input::placeholder{
  color: white;
}
</style>
