// main.js
import { createApp } from 'vue';
import App from './App.vue';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);

app.config.globalProperties.$swal = Swal;

app.mount('#app');
