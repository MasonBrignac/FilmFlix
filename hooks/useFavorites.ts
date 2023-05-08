import useSwr from 'swr'
import fetcher from '@/libs/fetcher';
import { useSession } from 'next-auth/react';

const useFavorites = () => {
  const { session } = useSession(); // Add this line
  console.log('Session in useFavorites:', session); // Add this line

  const { data, error, isLoading, mutate } = useSwr('/api/favorites', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useFavorites;