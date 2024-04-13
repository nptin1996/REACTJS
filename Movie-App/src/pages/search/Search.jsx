import React, { useState } from "react";
import { usePickMovie } from "../../hooks/usePickMovie.js";
import NavBar from "../../component/NavBar/NavBar";
import SearchForm from "../../component/SearchForm/SearchForm";
import MovieList from "../../component/MovieList/MovieList";
import MovieDetail from "../../component/MovieDetail/MovieDetail";

const Search = () => {
  const { pickedMovie, handlePickMovie } = usePickMovie();
  const [keySearch, setKeySearch] = useState("");

  return (
    <div className="app">
      <NavBar />
      <SearchForm onSendKey={setKeySearch} />
      {keySearch && (
        <MovieList
          typeList="search"
          title="Search Result"
          url={keySearch}
          onSendData={handlePickMovie}
        />
      )}
      {pickedMovie && (
        <MovieDetail
          data={pickedMovie}
          key={pickedMovie.id}
          onClose={handlePickMovie}
        />
      )}
    </div>
  );
};

export default Search;
