import React from "react";
import usePopularMovies from "../hooks/usePopularMovies";
import MovieList from "../components/MovieList";
import { useSelector } from "react-redux";

const popular = () => {
  usePopularMovies();
  const movies = useSelector((store) => store.movies);
  return (
    <div>
      {movies.popularMovies && (
        <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
      )}
    </div>
  );
};

export default popular;
