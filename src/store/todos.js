import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [
      { name: 'Membaca buku', completed: false },
      { name: 'Menulis laporan', completed: true },
      { name: 'Bersantai di taman', completed: true },
    ],
  }),
  actions: {
    addTodo(name) {
      this.todos.push({ name, completed: false });
      Swal.fire('Todo added!', 'Your new todo has been added successfully!', 'success');
    },
    updateTodos(updatedTodos) {
      this.todos = updatedTodos;
    },
  },
});
