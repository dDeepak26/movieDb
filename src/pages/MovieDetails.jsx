import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { options, TMDB_IMAGE_URL } from "../utils/constant";
import Cast from "../components/Cast";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCastDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cast details");
        }
        const data = await response.json();
        setCast(data.cast?.slice(0, 6) || []); // Safely handle undefined cast
      } catch (error) {
        console.error("Error fetching cast details:", error);
        setCast([]); // Set empty array if fetch fails
      }
    };

    fetchMovieDetails();
    fetchCastDetails();
  }, [id]);

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;
  if (!movie) return <div className="text-white">No movie data available</div>;

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden">
        <div className="md:w-1/3">
          {movie.poster_path ? (
            <img
              src={TMDB_IMAGE_URL + movie.poster_path}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-image.jpg"; // Add a placeholder image
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              No Image Available
            </div>
          )}
        </div>
        <div className="md:w-2/3 p-6">
          <h1 className="text-4xl font-bold mb-4">
            {movie.title || "Untitled"}
          </h1>
          <div className="mb-4">
            <span className="text-yellow-400">
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </span>
          </div>
          <div className="mb-4">
            <span>
              {movie.runtime ? `${movie.runtime} min` : "Duration N/A"}
            </span>{" "}
            •
            <span>
              {movie.genres?.map((genre) => genre.name).join(", ") ||
                "Genre N/A"}
            </span>
          </div>
          <div className="mb-4">
            Release Date:{" "}
            {movie.release_date
              ? new Date(movie.release_date).toLocaleDateString()
              : "N/A"}
          </div>
          <h2 className="text-2xl font-bold mb-2">Overview</h2>
          <p className="mb-4">{movie.overview || "No overview available"}</p>
        </div>
      </div>
      <Cast cast={cast} />
    </div>
  );
};

export default MovieDetails;
