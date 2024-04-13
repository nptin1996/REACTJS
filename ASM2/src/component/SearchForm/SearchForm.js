import { useRef } from "react";
import SearchIcon from "../UI/SearchIcon";
import classes from "./SearchForm.module.css";

const SearchForm = (props) => {
  const ref = useRef();

  // function chỉ chạy khi submit form đã validate
  const handleSendKey = function (e) {
    e.preventDefault();
    const query = ref.current.value;
    const url = `/search/movie?query=${query}&language=en-US&`;
    props.onSendKey(url);
    e.target.reset();
  };

  // funtion reset input
  const handleReset = function () {
    ref.current.value = "";
  };

  return (
    <div className={classes.searchForm}>
      <form onSubmit={handleSendKey}>
        <div className={classes.input}>
          <input type="text" required ref={ref} />
          <SearchIcon width="25px" />
        </div>
        <div className={classes.action}>
          <button type="button" onClick={handleReset}>
            RESET
          </button>
          <button>SEARCH</button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
