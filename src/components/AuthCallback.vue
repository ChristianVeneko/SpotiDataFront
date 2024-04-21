<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/token', {
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
        router.push('/login');
      }
    } else {
      console.error(`Error al obtener el token de acceso: ${response.status}`);
      router.push('/login');
    }
  } catch (error) {
    console.error('Error al obtener el token de acceso:', error);
    router.push('/login');
  }
});
</script>

<template>
  <div>Cargando...</div>
</template>