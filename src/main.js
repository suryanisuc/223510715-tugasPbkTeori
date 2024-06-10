import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.css';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(Quasar, {
  plugins: {}, // Pastikan tidak ada kesalahan di sini
});

app.mount('#app'); // Tambahkan ini untuk memastikan aplikasi ter-mount dengan benar
