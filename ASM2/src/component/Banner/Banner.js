import { memo } from "react";
import { truncateString } from "../../funtion";
import classes from "./Banner.module.css";

const Banner = memo(function (props) {
  return (
    <div
      className={classes.banner}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${props.data["backdrop_path"]}`,
      }}
    >
      <div className={classes.text}>
        <h1>{props.data.name}</h1>
        <div className={classes.button}>
          <button>Play</button>
          <button>My List</button>
        </div>
        <p>{truncateString(props.data.overview)}</p>
      </div>
    </div>
  );
});

export default Banner;
