import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";
import { options } from "../utils/constant";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchText = useRef(null);

  const searchMoviesTMDB = async (movieName, page = 1) => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=${page}`,
        options
      );
      const json = await data.json();
      setIsLoading(false);
      return json;
    } catch (error) {
      console.error("Error fetching movies:", error);
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const movieName = searchText.current.value;
    const results = await searchMoviesTMDB(movieName, 1);

    if (results && results.results) {
      dispatch(
        addGptMovieResult({
          moviesName: [movieName],
          moviesResult: [results.results],
        })
      );
      setCurrentPage(1); // Reset pagination
      navigate("/searchResult");
    }
  };

  // Function to load more movies for pagination
  const loadMoreMovies = async () => {
    const movieName = searchText.current.value;
    const nextPage = currentPage + 1;
    const results = await searchMoviesTMDB(movieName, nextPage);

    if (results && results.results.length > 0) {
      dispatch(
        addGptMovieResult({
          moviesName: [movieName],
          moviesResult: (prevMovies) => [...prevMovies[0], ...results.results],
        })
      );
      setCurrentPage(nextPage); // Update the current page
    }
  };

  return (
    <nav className="bg-gray-700 text-white p-4 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/" className="text-xl cursor-pointer">
            MovieDb
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        <div className="hidden md:flex flex-row space-x-4 items-center">
          <Link to="/popular" className="hover:border-b-2">
            Popular
          </Link>
          <Link to="/topRated" className="hover:border-b-2">
            Top Rated
          </Link>
          <Link to="/upcoming" className="hover:border-b-2">
            Upcoming
          </Link>
          <form onSubmit={handleSearch} className="flex">
            <input
              ref={searchText}
              type="text"
              name="movieSearchBar"
              id="movieSearchBar"
              placeholder="Movie Name"
              className="p-2 rounded-l-lg text-black"
            />
            <button type="submit" className="bg-red-600 p-2 rounded-r-lg">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className="md:hidden flex flex-col space-y-2 mt-2"
          id="mobile-menu"
        >
          <Link to="/popular" className="hover:border-b-2">
            Popular
          </Link>
          <Link to="/topRated" className="hover:border-b-2">
            Top Rated
          </Link>
          <Link to="/upcoming" className="hover:border-b-2">
            Upcoming
          </Link>
          <form onSubmit={handleSearch} className="flex">
            <input
              ref={searchText}
              type="text"
              name="movieSearchBar"
              id="movieSearchBar"
              placeholder="Movie Name"
              className="p-2 rounded-l-lg flex-grow text-black"
            />
            <button type="submit" className="bg-red-600 p-2 rounded-r-lg">
              Search
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
