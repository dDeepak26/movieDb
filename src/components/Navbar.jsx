import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addGptMovieResult } from "../utils/gptSlice";
import { options } from "../utils/constant";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchText = useRef(null);
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const searchMoviesTMDB = async (movieName) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movieName +
        "&include_adult=false&language=en-US&page=1",
      options
    );
    const json = await data.json();
    return json.results;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const prompt =
      "Act as a movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      "only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Don, Sholay, Golmaal, Koi Mil Gaya";
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
      const result = await model.generateContent([prompt]);
      const gptMoviesArray = result.response.text().split(",");
      const promiseArray = gptMoviesArray.map((movie) =>
        searchMoviesTMDB(movie)
      );
      const tmdbResults = await Promise.all(promiseArray);
      dispatch(
        addGptMovieResult({
          moviesName: gptMoviesArray,
          moviesResult: tmdbResults,
        })
      );
      navigate("/searchResult");
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return (
    <nav className="bg-gray-700 text-white p-4">
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
