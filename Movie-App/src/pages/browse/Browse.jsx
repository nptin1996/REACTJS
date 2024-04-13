import { useState } from "react";
import { usePickMovie } from "../../hooks/usePickMovie.js";
import NavBar from "../../component/NavBar/NavBar";
import Banner from "../../component/Banner/Banner";
import MovieList from "../../component/MovieList/MovieList";
import MovieDetail from "../../component/MovieDetail/MovieDetail";

function Browse() {
  const [bannerData, setBannerData] = useState(null);
  const { pickedMovie, handlePickMovie } = usePickMovie();

  return (
    <div className="app">
      <NavBar />

      {bannerData && <Banner data={bannerData} />}

      <MovieList
        url="/discover/tv?with_network=123&"
        onSendBanner={setBannerData}
        onSendData={handlePickMovie}
        typeList="netflix"
      />

      <MovieList
        url="/trending/all/week?language=en-US&"
        onSendData={handlePickMovie}
        title="Xu hướng"
      />

      <MovieList
        url="/movie/top_rated?language=en-US&"
        onSendData={handlePickMovie}
        title="Xếp hạng cao"
      />

      <MovieList
        url="/discover/movie?with_genres=28&"
        onSendData={handlePickMovie}
        title="Hành động"
      />

      <MovieList
        url="/discover/movie?with_genres=35&"
        onSendData={handlePickMovie}
        title="Hài"
      />

      <MovieList
        url="/discover/movie?with_genres=27&"
        onSendData={handlePickMovie}
        title="Kinh dị"
      />

      <MovieList
        url="/discover/movie?with_genres=10749&"
        onSendData={handlePickMovie}
        title="Lãng mạn"
      />

      <MovieList
        url="/discover/movie?with_genres=99&"
        onSendData={handlePickMovie}
        title="Tài liệu"
      />

      {pickedMovie && (
        <MovieDetail
          data={pickedMovie}
          key={pickedMovie.id}
          onClose={handlePickMovie}
        />
      )}
    </div>
  );
}

export default Browse;
