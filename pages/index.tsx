import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';



export async function getServerSideProps(context: NextPageContext) {
  try {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      };
    }

    return {
      props: {}
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {}
    };
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();

  return (
    <>
      <Navbar/>
      <Billboard/>
      <div className="pb-40">
      <MovieList title="Trending Now" data={movies} />
      <MovieList title="MyList" data={favorites} />
      </div>
    </>
  );
}
