import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { userActions } from "../../store/user.js";
import classes from "./MainNavigation.module.css";
import IconCart from "../UI/IconCart";
import IconUser from "../UI/IconUser";
import IconDown from "../UI/IconDown";
import NavIcon from "./NavIcon.js";

function MainNavigation() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const data = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <Container fluid="md">
      <ul
        className={`d-flex justify-content-between align-items-center ${classes.navbar}`}
      >
        <li className="d-sm-none">
          <NavIcon isLogin={isLogin} data={data} onLogout={handleLogout} />
        </li>

        <li className="d-none d-sm-flex">
          <div className="me-3">
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/"
            >
              Home
            </NavLink>
          </div>
          <div>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/shop"
            >
              Shop
            </NavLink>
          </div>
        </li>
        <li>
          <h2>BOUTIQUE</h2>
        </li>
        <li className="d-none d-sm-flex">
          <div>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/cart"
            >
              <IconCart width="20px" className={classes.icon} />
              Cart
            </NavLink>
          </div>
          {!isLogin && (
            <div>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="/login"
              >
                <IconUser width="14px" className={classes.icon} />
                Login
              </NavLink>
            </div>
          )}

          {isLogin && (
            <>
              <div>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  to="/login"
                >
                  <IconUser width="14px" className={classes.icon} />
                  {data.name}
                  <IconDown width="9px" className={classes.iconBlack} />
                </NavLink>
              </div>
              <div>
                <NavLink to="?" onClick={handleLogout}>
                  ( Logout )
                </NavLink>
              </div>
            </>
          )}
        </li>
      </ul>
    </Container>
  );
}

export default MainNavigation;
