import React from "react";
import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";
import useUpcomingMovies from "../hooks/useUpcomingMovies";

const upcoming = () => {
  useUpcomingMovies();
  const movies = useSelector((store) => store.movies);

  return (
    <div>
      {movies.topRatedMovies && (
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
      )}
    </div>
  );
};

export default upcoming;
