import React from "react";
import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";

const SearchResult = () => {
  const { moviesName, moviesResult } = useSelector((store) => store.gpt);

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-white mb-4">Search Results</h2>
      {moviesName.map((name, index) => (
        <div key={name} className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
          <MovieList movies={moviesResult[index]} />
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
