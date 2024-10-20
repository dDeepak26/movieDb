import React from "react";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";

const topRated = () => {
  useTopRatedMovies();
  const movies = useSelector((store) => store.movies);

  return (
    <div>
      {movies.topRatedMovies && (
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
      )}
    </div>
  );
};

export default topRated;
