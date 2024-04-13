import { useState, useCallback } from "react";

export const usePickMovie = () => {
  const [pickedMovie, setPickedMovie] = useState();

  const handlePickMovie = useCallback(function (movie) {
    setPickedMovie((prevSate) => {
      // chưa có state return movie
      if (!prevSate) {
        return movie;
      }
      // đã có state check id
      if (prevSate.id === movie.id) {
        return undefined;
      } else {
        return movie;
      }
    });
  }, []);

  return {
    pickedMovie,
    handlePickMovie,
  };
};
