import React from "react";
import { Link } from "react-router-dom";
import { TMDB_IMAGE_URL } from "../utils/constant";

const MovieCard = ({ id, posterPath, movieName, rating }) => {
  if (!posterPath) return null;

  return (
    <Link to={`/movie/${id}`} className="block">
      <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 h-full">
        <div className="aspect-[2/3] relative">
          <img
            src={TMDB_IMAGE_URL + posterPath}
            alt={movieName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2 line-clamp-2 min-h-[3.5rem]">
            {movieName}
          </h2>
          <div className="flex items-start justify-start space-x-1">
            <span className="text-yellow-400">⭐</span>
            <span className="text-yellow-400">{rating.toFixed(1)}/10</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
