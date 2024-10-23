import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constant";
import { addPopularMovies } from "../utils/moviesSlice";
import { useState, useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const existingMovies =
    useSelector((store) => store.movies.popularMovies) || [];

  const getPopularMovies = async (page) => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        options
      );
      const json = await data.json();

      if (page === 1) {
        dispatch(addPopularMovies(json.results));
      } else {
        // Combine existing movies with new movies, removing duplicates
        const newMovies = [...existingMovies, ...json.results].reduce(
          (unique, movie) => {
            const exists = unique.find((item) => item.id === movie.id);
            if (!exists) {
              unique.push(movie);
            }
            return unique;
          },
          []
        );
        dispatch(addPopularMovies(newMovies));
      }

      // Check if we've reached the last page
      setHasMore(json.page < json.total_pages);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      getPopularMovies(nextPage);
    }
  };

  useEffect(() => {
    getPopularMovies(1);
  }, []);

  return { loadMore, isLoading, hasMore };
};

export default usePopularMovies;
