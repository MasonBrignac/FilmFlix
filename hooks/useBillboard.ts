import useSwr from 'swr';
import fetcher from '@/libs/fetcher';

const useBillboard = () => {
  const { data, error, isValidating } = useSwr('/api/random', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading: isValidating,
  };
};

export default useBillboard;
