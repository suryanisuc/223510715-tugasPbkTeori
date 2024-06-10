<template>
    <div class="album-container mt-5">
      <div class="gallery">
        <div v-for="photo in photos" :key="photo.id" class="gallery-item">
          <img :src="photo.thumbnailUrl" @click="showPhoto(photo)" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        photos: [],
      };
    },
    async created() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
        this.photos = response.data.slice(0, 32);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    },
    methods: {
      showPhoto(photo) {
        Swal.fire({
          title: photo.title,
          imageUrl: photo.url,
          imageAlt: 'Photo',
        });
        this.$router.push(`/album/${photo.id}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .album-container {
    display: flex;
    justify-content: center;
  }
  
  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .gallery-item img {
    cursor: pointer;
    max-width: 150px;
    border-radius: 5px;
    transition: transform 0.2s;
  }
  
  .gallery-item img:hover {
    transform: scale(1.1);
  }
  </style>
  