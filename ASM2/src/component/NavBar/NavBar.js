import { useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../UI/SearchIcon";
import classes from "./NavBar.module.css";

const NavBar = memo(function () {
  const [isScroll, setIsScroll] = useState(false);
  const navigate = useNavigate();

  // Thêm sự kiện lắng nghe khi component được Scroll
  useEffect(() => {
    // Hàm xử lý sự kiện cuộn trang
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Dọn dẹp sự kiện khi component được unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // hàm chuyển trang
  const handleClickHome = () => {
    navigate("/");
  };
  const handleClickSearch = () => {
    navigate("/search");
  };

  return (
    <div className={`${classes.navbar} ${isScroll ? classes.bgDark : ""}`}>
      <h2 className={classes.logo} onClick={handleClickHome}>
        Movie App
      </h2>
      <div className={`${classes.logo}`} onClick={handleClickSearch}>
        <SearchIcon width="30px" />
      </div>
    </div>
  );
});

export default NavBar;
