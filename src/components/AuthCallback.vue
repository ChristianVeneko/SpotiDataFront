<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('access_token');
  console.log(accessToken)
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    router.push('/');
  } else {
    console.error('No se encontró el token de acceso en la URL');
    router.push('/login');
  }
  router.push('/');
});
</script>

<template>
    <div>Cargando...</div>
    <div>{{ accessToken }}</div>
</template>