<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from './useAuth';

//components
import LoginForm from './components/LoginForm.vue';
import UserInfo from './components/UserInfo.vue';
import AuthCallback from './components/AuthCallback.vue';
import Header from './components/Header.vue';
const router = useRouter();


const appTitle = ref('SpotiData');
const { isLoading, isLoggedIn, accessToken } = useAuth();

const updateIsLoggedIn = (newValue) => {
  isLoggedIn.value = newValue;
  console.log(isLoading)
};
const reLogin = async () => {
  window.location.href = 'http://localhost:3000/login';
}
</script>

<template>
  <div id="app">
    <AuthCallback @updateIsLoggedIn="updateIsLoggedIn" v-if="$route.path === '/auth-callback'" />
    <Header></Header>
    <div v-if="isLoading">Cargando...</div>
    <div v-else-if="isLoggedIn">
      <UserInfo :accessToken="accessToken" :refreshAccessToken="reLogin" />
    </div>
    <div v-else>
      <!-- Mostrar LoginForm solo cuando no se ha iniciado sesión -->
      <LoginForm v-if="!isLoggedIn" />
    </div>
  </div>
</template>