import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { options, TMDB_IMAGE_URL } from "../utils/constant";
import { setCurrentMovieIndex } from "../utils/moviesSlice";
import Cast from "../components/Cast";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const movies = useSelector((state) => state.movies.popularMovies); // Assuming we're using popularMovies
  const currentIndex = useSelector((state) => state.movies.currentMovieIndex);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchCastDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          options
        );
        const data = await response.json();
        setCast(data.cast.slice(0, 6)); // Get first 6 cast members
      } catch (error) {
        console.error("Error fetching cast details:", error);
      }
    };

    fetchMovieDetails();
    fetchCastDetails();

    // Update the current movie index
    const index = movies.findIndex((m) => m.id.toString() === id);
    if (index !== -1) {
      dispatch(setCurrentMovieIndex(index));
    }
  }, [id, movies, dispatch]);

  const goToMovie = (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < movies.length) {
      navigate(`/movie/${movies[newIndex].id}`);
    }
  };

  if (!movie) return <div className="text-white">Loading...</div>;

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden">
        <div className="md:w-1/3">
          <img
            src={TMDB_IMAGE_URL + movie.poster_path}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-6">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="mb-4">
            <span className="text-yellow-400">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          </div>
          <div className="mb-4">
            <span>{movie.runtime} min</span> •
            <span>{movie.genres.map((genre) => genre.name).join(", ")}</span>
          </div>
          <div className="mb-4">
            Release Date: {new Date(movie.release_date).toLocaleDateString()}
          </div>
          <h2 className="text-2xl font-bold mb-2">Overview</h2>
          <p className="mb-4">{movie.overview}</p>
        </div>
      </div>
      <Cast cast={cast} />
      <div className="flex justify-between mt-8">
        <button
          onClick={() => goToMovie(-1)}
          disabled={currentIndex === 0}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Previous Movie
        </button>
        <button
          onClick={() => goToMovie(1)}
          disabled={currentIndex === movies.length - 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Next Movie
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
