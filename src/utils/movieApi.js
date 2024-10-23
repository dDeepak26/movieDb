export const searchMoviesTMDB = async (movieName, page = 1) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzk2ZjBmZTdmMzIzOTYyMGMxZTlkNjM1YzZlZTNhZSIsIm5iZiI6MTcyOTMzNjU5NC4xMDQyNjUsInN1YiI6IjY2OGMwMDhhOTIzYjA4Mzk3YTYyYzA0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D_DJkPImcw0riRjCfQMzVHUJ5V8RUO6slbvwWz9tISg`,
    },
  };

  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=${page}`,
      options
    );
    const json = await data.json();
    return json;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [] };
  }
};
