import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return <div className="text-white">Loading movies...</div>;

  if (!Array.isArray(movies))
    return <div className="text-white">No movies available</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-6">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map(
          (movie) =>
            movie && (
              <MovieCard
                key={movie.id || Math.random()}
                id={movie.id}
                posterPath={movie.poster_path}
                movieName={movie.title}
                rating={movie.vote_average}
              />
            )
        )}
      </div>
    </div>
  );
};

export default MovieList;
