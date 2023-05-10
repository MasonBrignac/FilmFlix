import React from 'react';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const indieMovies = await prisma.movie.findMany({
    where: {
      category: 'indieMovies',
    },
  });

  return {
    props: {
      indieMovies,
    },
  };
}

export default function IndieMovies({ indieMovies }) {
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Indie Movies" data={indieMovies} />
      </div>
    </>
  );
}
