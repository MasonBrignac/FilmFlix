import React from 'react';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const indieShorts = await prisma.movie.findMany({
    where: {
      category: 'indieShorts',
    },
    include: {
      episodes: true,
    },
  });

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
        <MovieList title="Indie Shorts" data={indieShorts} />
      </div>
    </>
  );
}
