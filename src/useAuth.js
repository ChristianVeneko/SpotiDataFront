import { ref, onMounted } from 'vue';

export function useAuth() {
  const isLoading = ref(true);
  const isLoggedIn = ref(false);
  const accessToken = ref(null);

  const checkAccessToken = async () => {
    isLoading.value = true;

    const storedAccessToken = localStorage.getItem('accessToken');

    if (storedAccessToken) {
      isLoggedIn.value = true;
      accessToken.value = storedAccessToken;
    } else {
      try {
        const response = await fetch('http://localhost:3000/api/token', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          const newAccessToken = data.access_token;

          if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken);
            isLoggedIn.value = true;
            accessToken.value = newAccessToken;
          } else {
            isLoggedIn.value = false;
          }
        } else {
          isLoggedIn.value = false;
        }
      } catch (error) {
        console.error('Error al obtener el token de acceso:', error);
        isLoggedIn.value = false;
      }
    }

    isLoading.value = false;
  }

  onMounted(() => {
    checkAccessToken();
  });

  return { isLoading, isLoggedIn, accessToken };
}