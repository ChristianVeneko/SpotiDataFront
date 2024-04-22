<template>
    <div id="loginform">
          <p class="logintext">
            Please login with your spotify accout to see your charts
          </p>
          <button @click="initiateSpotifyLogin">login with Spotify</button>
      </div>
</template>
  
  <script setup>
  const initiateSpotifyLogin = () => {
    window.location.href = 'http://localhost:3000/login';
  }
  </script>