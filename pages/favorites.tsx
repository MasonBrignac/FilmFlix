import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';

const prisma = new PrismaClient();

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  const favoriteMovies = await prisma.movie.findMany({
    where: {
      id: {
        in: user.favoriteIds,
      },
    },
  });

  return {
    props: {
      favoriteMovies,
    },
  };
}

export default function Favorites({ favoriteMovies }) {
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Favorites" data={favoriteMovies} />
      </div>
    </>
  );
}
