import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constant";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useState, useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const existingMovies =
    useSelector((store) => store.movies.upcomingMovies) || [];

  const getUpcomingMovies = async (page) => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
        options
      );
      const json = await data.json();

      if (page === 1) {
        dispatch(addUpcomingMovies(json.results));
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
        dispatch(addUpcomingMovies(newMovies));
      }

      // Check if we've reached the last page
      setHasMore(json.page < json.total_pages);
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      getUpcomingMovies(nextPage);
    }
  };

  useEffect(() => {
    getUpcomingMovies(1);
  }, []);

  return { loadMore, isLoading, hasMore };
};

export default useUpcomingMovies;
