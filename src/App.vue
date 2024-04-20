<script setup>
import LoginForm from './components/LoginForm.vue';
import UserInfo from './components/UserInfo.vue'
</script>

<template>
  <div id="app">
    <LoginForm v-if="!isLoggedIn" />
    <UserInfo v-else :accessToken="accessToken" />
  </div>
</template>


<style lang="scss" scoped>

</style>