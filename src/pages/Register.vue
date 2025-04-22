<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Name" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <input v-model="password_confirmation" type="password" placeholder="Confirm Password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '../axios';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const router = useRouter();

const register = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post('api/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });
    localStorage.setItem('token', response.data.token);
    router.push('/dashboard');
  }catch (err) {
    alert('Registration failed');
  }
};
</script>