import React from 'react';
import MovieCard from './MovieCard';

interface MovieListProps {
  title: string;
  data: Record<string, any>[];
}

const MovieList: React.FC<MovieListProps> = ({ title, data }) => {
  return (
    <>
      <p className="px-2 md:px-10 text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
      <div className="px-2 md:px-10" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {data && data.length > 0 ? (
          <div className="scroll-container" style={{ display: 'inline-flex' }}>
            {data.map((movie) => (
              <MovieCard key={movie.id} data={movie} />
            ))}
          </div>
        ) : (
          <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">No series available.</p>
        )}
      </div>
    </>
  );
};

export default MovieList;