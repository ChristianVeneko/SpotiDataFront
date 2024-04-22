<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const API_URL = import.meta.env.API_URL
const router = useRouter();
const emit = defineEmits(['updateIsLoggedIn']);

onMounted(async () => {
  try {
    const response = await fetch(`${API_URL}/api/token`, {
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.access_token;

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        router.push('/');
      } else {
        console.error('No se encontró el token de acceso en la respuesta del servidor');
        emit('updateIsLoggedIn', false);
        router.push('/');
      }
    } else {
      console.error(`Error al obtener el token de acceso: ${response.status}`);
      emit('updateIsLoggedIn', false);
      router.push('/');
    }
  } catch (error) {
    console.error('Error al obtener el token de acceso:', error);
    emit('updateIsLoggedIn', false);
    router.push('/');
  }
});
</script>

<template>
  <h1>AAAAAAAAAAAAAAAAAAAAAAAAAA</h1>
</template>