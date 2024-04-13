import { useEffect, memo } from "react";
import { useFetchData } from "../../hooks/useFetchData.js";
import { getRandomElement } from "../../funtion.js";
import classes from "./MoviesList.module.css";

const MovieList = memo(function ({
  url,
  typeList = "normal",
  title,
  onSendData,
  onSendBanner,
}) {
  // console.log(`render list ${title ? title : "Netflix"}`);

  const { fetchData: movies, error } = useFetchData(url);
  // useEffect send data nếu type = "netflix"
  useEffect(() => {
    if (typeList === "netflix" && movies.length !== 0) {
      onSendBanner(getRandomElement(movies));
    }
  }, [movies, typeList, onSendBanner]);

  // hàm xử lý pick movie
  const handleOnClick = function (e) {
    const idMovie = Number(e.target.alt);
    const movie = movies.find((ele) => ele.id === idMovie);
    onSendData(movie);
  };

  return (
    <div className={classes.movieList}>
      {typeList !== "netflix" && <h3>{title}</h3>}

      <div
        className={`${classes.container} ${
          typeList === "normal" ? classes.normal : classes.netflix
        } ${typeList === "search" ? classes.search : ""}`}
      >
        {error ? (
          <p>{error.message}</p>
        ) : (
          movies.map((movie) => (
            <img
              src={`https://image.tmdb.org/t/p/original/${
                typeList === "normal"
                  ? movie["backdrop_path"]
                  : movie["poster_path"]
              }`}
              alt={movie.id}
              key={movie.id}
              onClick={handleOnClick}
            />
          ))
        )}
      </div>
    </div>
  );
});

export default MovieList;
