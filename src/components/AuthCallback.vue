<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const API_URL = import.meta.env.VITE_API_URL;
const router = useRouter();
const emit = defineEmits(['updateIsLoggedIn']);

onMounted(async () => {
  try {
    const response = await fetch(`${API_URL}/callback`, {
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      const { access_token, refresh_token, redirect } = data;

      if (access_token) {
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);

        // Redirigir al usuario después de almacenar los tokens
        window.location.href = redirect;
      } else {
        console.error('No se encontró el token de acceso en la respuesta del servidor');
        emit('updateIsLoggedIn', false);
        router.push('/');
      }
    } else {
      console.error(`Error al obtener los tokens: ${response.status}`);
      emit('updateIsLoggedIn', false);
      router.push('/');
    }
  } catch (error) {
    console.error('Error al obtener los tokens:', error);
    emit('updateIsLoggedIn', false);
    router.push('/');
  }
});
</script>

<template>
  <h1>AAAAAAAAAAAAAAAAAAAAAAAAAA</h1>
</template>