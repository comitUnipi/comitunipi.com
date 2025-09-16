import { useEffect, useState } from 'react';

export default function useLoading() {
  const [isLoading, setIsLoading] = useState(true);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      stopLoading();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
}
