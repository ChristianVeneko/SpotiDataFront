<template>
    <button @click="initiateSpotifyLogin">Iniciar sesión</button>
</template>
  
  <script setup>
  const initiateSpotifyLogin = () => {
    window.location.href = 'http://localhost:3000/login';
  }
  </script>