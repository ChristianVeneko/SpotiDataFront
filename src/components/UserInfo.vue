<script setup>
import { ref } from 'vue';

const props = defineProps({
  accessToken: {
    type: String,
    required: true
  },
  refreshAccessToken: {
    type: Function,
    required: true
  }
});

const getUserInfo = async () => {
    try {
        const userData = await fetchFromSpotifyAPI('v1/me', props.accessToken);
        console.log('Información del usuario:', userData);
    } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
    }
}

const fetchFromSpotifyAPI = async (endpoint, accessToken) => {
    try {
        const response = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.ok) {
            return await response.json();
        } else if (response.status === 401) {
            // El token de acceso ha expirado, necesitamos refrescarlo
            const newAccessToken = await props.refreshAccessToken();
            if (newAccessToken) {
                // Intentar la solicitud nuevamente con el token de acceso refrescado
                return await fetchFromSpotifyAPI(endpoint, newAccessToken);
            } else {
                throw new Error('No se pudo obtener un nuevo token de acceso');
            }
        } else {
            throw new Error(`Error en la solicitud a la API de Spotify: ${response.status}`);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud a la API de Spotify:', error);
        throw error;
    }
}
</script>

<template>
    <div>
        <p>Token de acceso: {{ accessToken }}</p>
        <button @click="getUserInfo()">Mostrar info</button>
    </div>
</template>