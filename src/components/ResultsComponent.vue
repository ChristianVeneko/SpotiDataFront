<template>
    <div id="results">
      <div v-if="type === 'artist'">
        <div v-for="artist in data" :key="artist.name" class="artist-card">
          <div class="artist-image">
             <a :href="`${artist.url}`"><img :src="artist.image" :alt="artist.name + ' photo'"></a>
          </div>
          <div>{{ artist.name }}</div>
        </div>
      </div>
      <div v-else>
        <div v-for="song in data" :key="song.title" class="song-card">
          <div class="index">
            <h2>{{ song.index }}</h2>
          </div>
          <div class="cover">
            <img :src="song.cover" alt="Cover Image">
          </div>
          <div class="info">
            <h2 class="name">{{ song.title }}</h2>
            <p class="artists">{{ song.artists.join(', ') }}</p>
            <div class="spotify-link">
              <a :href="`${song.url}`"><img class="spotify-logo" src="https://static.vecteezy.com/system/resources/previews/023/986/728/original/spotify-logo-spotify-logo-transparent-spotify-icon-transparent-free-free-png.png" alt="Spotify logo"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template> 
  
  <script setup>
  defineProps({
    data: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  });
  </script>