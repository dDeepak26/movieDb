import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieList from "../components/MovieList";
import { searchMoviesTMDB } from "../utils/movieApi"; // Helper function for TMDB search
import { addGptMovieResult } from "../utils/gptSlice";

const SearchResult = () => {
  const { moviesName, moviesResult } = useSelector((store) => store.gpt);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // For checking if there are more pages to load

  const loadMoreMovies = async () => {
    if (!hasMore || isLoading) return; // Prevent multiple clicks or loading when no more movies exist

    setIsLoading(true);
    const movieName = moviesName[0]; // Assuming the first movieName is the one we're searching for
    const nextPage = currentPage + 1;
    const result = await searchMoviesTMDB(movieName, nextPage);

    if (result.results.length > 0) {
      dispatch(
        addGptMovieResult({
          moviesName: moviesName,
          moviesResult: [...moviesResult[0], ...result.results], // Append new results
        })
      );
      setCurrentPage(nextPage); // Update current page for pagination
    } else {
      setHasMore(false); // No more pages to load
    }
    setIsLoading(false);
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-white mb-4">Search Results</h2>
      {moviesName.map((name, index) => (
        <div key={name} className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
          <MovieList movies={moviesResult[index]} />
        </div>
      ))}
      {hasMore && (
        <button
          onClick={loadMoreMovies}
          className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default SearchResult;
