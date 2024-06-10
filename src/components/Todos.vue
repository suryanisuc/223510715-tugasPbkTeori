<template>
  <div class="mt-5">
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
</template>

<script>
import Swal from 'sweetalert2';
import { ref, computed } from 'vue';
import { useTodosStore } from '../store/todos';

export default {
  setup() {
    const todosStore = useTodosStore();
    const newTodo = ref('');

    const filteredActivities = computed(() => {
      return todosStore.todos.filter(activity => !filterActive.value || !activity.completed);
    });

    const filterActive = ref(false);
    const filterButtonText = computed(() => filterActive.value ? 'All' : 'Incomplete');

    const addTodo = () => {
      if (newTodo.value.trim() !== '') {
        todosStore.addTodo(newTodo.value);
        newTodo.value = '';
      }
    };

    const editActivity = (activity) => {
      Swal.fire({
        title: 'Edit activity',
        input: 'text',
        inputValue: activity.name,
        showCancelButton: true,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!';
          }
        },
        preConfirm: (name) => {
          activity.name = name;
          Swal.fire('Todo updated!', 'Your todo has been updated successfully!', 'success');
        }
      });
    };

    const toggleFilter = () => {
      filterActive.value = !filterActive.value;
    };

    return {
      newTodo,
      filteredActivities,
      filterButtonText,
      addTodo,
      editActivity,
      toggleFilter
    };
  }
};
</script>

<style scoped>
.test {
  display: flex;
  margin-right: 50%;
  width: 50%;
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
.table {
  margin-top: 100px;
  width: 50%;
}
.table th {
  background-color: gray;
}
tr th {
  color: white;
  border-color: white;
}
tr td {
  color: white;
  background-color: transparent;
  backdrop-filter: blur(5px);
}
</style>
