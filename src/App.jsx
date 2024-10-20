import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Popular from "./pages/popular";
import TopRated from "./pages/topRated";
import Upcoming from "./pages/upcoming";
import SearchResult from "./pages/SearchResult";
import NoPage from "./pages/NotFound";
import MovieDetails from "./pages/MovieDetails";

const App = () => {
  return (
    <div className="bg-gray-800">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Popular />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/topRated" element={<TopRated />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/searchResult" element={<SearchResult />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
