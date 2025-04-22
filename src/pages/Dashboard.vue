<template>
  <div>
    <h2>Your Todos</h2>

    <button @click="logout" style="margin-bottom: 1rem;">Logout</button>

    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Add new todo" />
      <button type="submit">Add</button>
    </form>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input v-model="todo.title" @blur="updateTodo(todo)" />
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../axios'

const router = useRouter()

const todos = ref([])
const newTodo = ref('')

const getTodos = async () => {
  const res = await axios.get('api/todos')
  todos.value = res.data
}

const addTodo = async () => {
  const res = await axios.post('api/todos', { title: newTodo.value })
  todos.value.push(res.data)
  newTodo.value = ''
}

const updateTodo = async (todo) => {
  await axios.put(`api/todos/${todo.id}`, { title: todo.title })
}

const deleteTodo = async (id) => {
  await axios.delete(`api/todos/${id}`)
  todos.value = todos.value.filter((todo) => todo.id !== id)
}

const logout = async () => {
  try {
    await axios.post('api/logout')
    localStorage.removeItem('token') // If you're using token storage
    router.push('/login')
  } catch (error) {
    console.error('Logout failed', error)
  }
}

onMounted(getTodos)
</script>
