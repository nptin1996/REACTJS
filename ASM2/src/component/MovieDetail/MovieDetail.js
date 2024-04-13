import { createPortal } from "react-dom";
import { truncateString } from "../../funtion.js";
import { useFetchData } from "../../hooks/useFetchData.js";
import YouTube from "react-youtube";
import IconClose from "../UI/IconClose";
import classes from "./MovieDetail.module.css";

const MovieDetail = function (props) {
  const { fetchData, error } = useFetchData(`/movie/${props.data.id}/videos?`);

  let infoVideo;
  // lấy thông tin video nếu không có lỗi nạp dữ liệu
  if (!error && fetchData.length > 0) {
    // lấy mảng các videos youtube
    const youtubeVideos = fetchData.filter((ele) => ele.site === "YouTube");

    // lấy phẩn tử đầu tiên type = trailer
    infoVideo = youtubeVideos.find((ele) => ele.type === "Trailer");

    // nếu không có trailer lấy teaser
    if (!infoVideo) {
      infoVideo = youtubeVideos.find((ele) => ele.type === "Teaser");
    }
  }
  const handleOnClose = () => {
    props.onClose(props.data);
  };

  return createPortal(
    <div className={classes.movieDetail}>
      <div className={classes.text}>
        <h2>{props.data.name ? props.data.name : props.data.title}</h2>
        <div className={classes.number}>
          <p>{`Release Date: ${
            props.data["release_date"]
              ? props.data["release_date"]
              : props.data["first_air_date"]
          }`}</p>
          <p>{`Vote: ${props.data["vote_average"]} / 10`}</p>
        </div>
        <p className={classes.overview}>
          {truncateString(props.data.overview, 300)}
        </p>
        <div className={classes.icon}>
          <IconClose onClick={handleOnClose} />
        </div>
      </div>

      <div className={classes.media}>
        {infoVideo ? (
          <YouTube
            videoId={infoVideo.key}
            opts={{
              height: "400",
              width: "100%",
              playerVars: {
                autoplay: 0,
              },
            }}
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original/${props.data["backdrop_path"]}`}
            alt="Failed to load img"
          />
        )}
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default MovieDetail;
