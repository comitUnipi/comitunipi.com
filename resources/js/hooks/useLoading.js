import { ref, onMounted } from 'vue';

export function useLoading() {
  const isLoading = ref(true);

  const startLoading = () => {
    isLoading.value = true;
  };

  const stopLoading = () => {
    isLoading.value = false;
  };

  onMounted(() => {
    setTimeout(() => {
      stopLoading();
    }, 2000);
  });

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
}
