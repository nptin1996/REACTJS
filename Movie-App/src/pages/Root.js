import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar/NavBar";

function Root() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default Root;
