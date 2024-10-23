import React from "react";
import { Link } from "react-router-dom";
import { TMDB_IMAGE_URL } from "../utils/constant";

const MovieCard = ({ id, posterPath, movieName, rating }) => {
  if (!id || !movieName) return null;

  return (
    <Link to={`/movie/${id}`} className="block">
      <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 h-full">
        <div className="aspect-[2/3] relative">
          {posterPath ? (
            <img
              src={TMDB_IMAGE_URL + posterPath}
              alt={movieName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-image.jpg";
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              No Image
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2 line-clamp-2 min-h-[3.5rem]">
            {movieName}
          </h2>
          <div className="flex items-start justify-start space-x-1">
            <span className="text-yellow-400">⭐</span>
            <span className="text-yellow-400">
              {rating ? rating.toFixed(1) : "N/A"}/10
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
