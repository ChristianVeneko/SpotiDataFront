import { ref, onMounted } from 'vue';

export function useAuth() {
  const isLoading = ref(true);
  const isLoggedIn = ref(false);
  const accessToken = ref(null);

  const validateAccessToken = async (token) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {

        return true;
      } else {

        return false;
      }
    } catch (error) {
      console.error('Error al validar el token de acceso:', error);
      return false;
    }
  }

  const fetchAccessToken = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/token', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        return data.access_token;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el token de acceso:', error);
      return null;
    }
  }
  
  const checkAccessToken = async () => {
    isLoading.value = true;

    const storedAccessToken = localStorage.getItem('accessToken');

    if (storedAccessToken) {
      const isTokenValid = await validateAccessToken(storedAccessToken);

      if (isTokenValid) {
        isLoggedIn.value = true;
        accessToken.value = storedAccessToken;
      } else {
        localStorage.removeItem('accessToken');
        const newAccessToken = await fetchAccessToken();

        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          isLoggedIn.value = true;
          accessToken.value = newAccessToken;
        } else {
          isLoggedIn.value = false;
        }
      }
    } else {
      const newAccessToken = await fetchAccessToken();

      if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken);
        isLoggedIn.value = true;
        accessToken.value = newAccessToken;
      } else {
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