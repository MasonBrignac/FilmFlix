import React from 'react';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const indieShortsRaw = await prisma.movie.findMany({
    where: {
      category: 'indieShorts',
    },
  });

  const indieShorts = indieShortsRaw.reduce((acc, movie) => {
    const key = movie.seriesId || movie.id;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(movie);
    return acc;
  }, {});

  return {
    props: {
      indieShorts,
    },
  };
}


export default function IndieShorts({ indieShorts }) {
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        {indieShorts && Object.entries(indieShorts).map(([seriesId, movies]) => (
          <MovieList key={seriesId} title={movies[0]?.title} data={movies} />
        ))}
      </div>
    </>
  );
}
