<script setup>
import { ref, onMounted } from 'vue';
import LoginForm from './components/LoginForm.vue';
import UserInfo from './components/UserInfo.vue'

const appTitle = ref('SpotiData');
const isLoggedIn = ref(false);
const accessToken = ref(null);

const refreshAccessToken = async () => {
  // Lógica para refreshAccessToken (igual que antes)
}

const checkAccessToken = async () => {
  // Lógica para checkAccessToken (igual que antes)
}
onMounted(() => {
  checkAccessToken();
});
</script>

<template>
  <div id="app">
    <LoginForm v-if="!isLoggedIn" />
    <UserInfo v-else :accessToken="accessToken" />
  </div>
</template>


<style lang="scss" scoped>

</style>