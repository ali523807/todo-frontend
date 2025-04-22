<template>
  <form @submit.prevent="login">
    <input v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button>Login</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import axios from '../axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie'); // important
    await axios.post('/api/login', {email: email.value, password: password.value});
    router.push('/dashboard');
  } catch (err) {
    alert('Login failed');
  }
};
</script>
