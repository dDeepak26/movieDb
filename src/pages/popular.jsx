import React from "react";
import usePopularMovies from "../hooks/usePopularMovies";
import MovieList from "../components/MovieList";
import { useSelector } from "react-redux";

const Popular = () => {
  const { loadMore, isLoading, hasMore } = usePopularMovies();
  const movies = useSelector((store) => store.movies);

  return (
    <div className="pb-8">
      {movies.popularMovies && (
        <>
          <MovieList title={"Popular Movies"} movies={movies.popularMovies} />

          <div className="flex justify-center mt-8">
            {hasMore && (
              <button
                onClick={loadMore}
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg text-white font-semibold
                  ${
                    isLoading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 transition-colors"
                  }
                `}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Load More Movies"
                )}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Popular;
