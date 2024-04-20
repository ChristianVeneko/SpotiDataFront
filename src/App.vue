<template>
  <div id="app">
    <h1>{{ appTitle }}</h1>
    <div v-if="isLoading">Cargando...</div>
    <div v-else-if="isLoggedIn">
      <UserInfo :accessToken="accessToken" :refreshAccessToken="refreshAccessToken" />
    </div>
    <div v-else>
      <LoginForm />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LoginForm from './components/LoginForm.vue';
import UserInfo from './components/UserInfo.vue';

const appTitle = ref('SpotiData');
const isLoading = ref(true);
const isLoggedIn = ref(false);
const accessToken = ref(null);

const refreshAccessToken = async () => {
  // Lógica para refreshAccessToken (igual que antes)
}

const checkAccessToken = async () => {
  isLoading.value = true;

  const storedAccessToken = localStorage.getItem('accessToken');

  if (storedAccessToken) {
    isLoggedIn.value = true;
    accessToken.value = storedAccessToken;
  } else {
    try {
      const response = await fetch('http://localhost:3000/api/token', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          isLoggedIn.value = true;
          this.accessToken = accessToken;
        } else {
          isLoggedIn.value = false;
        }
      } else {
        isLoggedIn.value = false;
      }
    } catch (error) {
      console.error('Error al obtener el token de acceso:', error);
      isLoggedIn.value = false;
    }
  }

  isLoading.value = false;
}

onMounted(() => {
  checkAccessToken();
});
</script>