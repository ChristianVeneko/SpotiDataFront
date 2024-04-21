<template>
  <div id="app">
    <h1>{{ appTitle }}</h1>
    <div v-if="isLoading">Cargando...</div>
    <div v-else-if="isLoggedIn">
      <UserInfo :accessToken="accessToken" :refreshAccessToken="refreshAccessToken" />
    </div>
    <div v-else>
      <!-- Mostrar LoginForm solo cuando no se ha iniciado sesión -->
      <LoginForm v-if="!isLoggedIn" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from './useAuth';
import LoginForm from './components/LoginForm.vue';
import UserInfo from './components/UserInfo.vue';

const appTitle = ref('SpotiData');
const { isLoading, isLoggedIn, accessToken } = useAuth();

const refreshAccessToken = async () => {
}
</script>