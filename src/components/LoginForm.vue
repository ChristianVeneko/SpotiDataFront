<template>
    <div id="loginform">
          <p class="logintext">
            Please login with your spotify accout to see your charts
          </p>
          <button @click="initiateSpotifyLogin">login with Spotify</button>
      </div>
</template>
  
  <script setup>
  const API_URL = import.meta.env.VITE_API_URL
  const initiateSpotifyLogin = () => {
    window.location.href = `${API_URL}/login`;
  }
  </script>