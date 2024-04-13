import banner from "../../resource/banner1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { userActions } from "../../store/user.js";
import { getLocalStorage, setLocalStorage } from "../../function.js";
import classes from "./AuthFrom.module.css";
function AuthForm(props) {
  const usersArr = getLocalStorage("userArr") || [];
  const navigate = useNavigate();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const email = fd.get("email");
    const password = fd.get("password");

    // submit sign up
    if (props.type === "signup") {
      const emailIndex = usersArr.findIndex((user) => user.email === email);

      // validate
      if (emailIndex !== -1) {
        alert("Email đã được sử dụng, vui lòng dùng email khác!");

        // đăng ký thành công
      } else {
        const name = fd.get("name");
        const phone = fd.get("phone");
        const data = {
          email,
          password,
          name,
          phone,
        };
        usersArr.push(data);
        setLocalStorage("userArr", usersArr);
        alert("Đăng ký tài khoản thành công!");
        navigate("/login");
      }
    }

    // submit sign in
    if (props.type === "signin") {
      const findedUser = usersArr.find((user) => user.email === email);

      // validate
      if (!findedUser) {
        alert("Email không đúng, nếu chưa tạo tài khoản bấm đăng ký!");
      } else if (findedUser.password !== password) {
        passwordRef.current.value = "";
        alert("Password không đúng, vui lòng nhập lại!");

        // đăng nhập thành công
      } else {
        const data = {
          email,
          name: findedUser.name,
          phone: findedUser.phone,
        };
        // localStorage.setItem("currentUser", JSON.stringify(data));
        dispatch(userActions.login(data));
        alert("Đăng nhập thành công!");
        navigate("/");
      }
    }
  };

  return (
    <div
      className={classes.authForm}
      style={{ backgroundImage: `url(${banner})` }}
    >
      <form className={classes.form} onSubmit={handleSubmit}>
        <h3>{props.type === "signup" ? "Sign up" : "Sign in"}</h3>
        <ul>
          {props.type === "signup" && (
            <li>
              <input placeholder="Full Name" type="text" name="name" required />
            </li>
          )}
          <li>
            <input placeholder="Email" type="email" name="email" required />
          </li>
          <li>
            <input
              ref={passwordRef}
              placeholder="Password"
              type="password"
              name="password"
              minLength={8}
              required
            />
          </li>
          {props.type === "signup" && (
            <li>
              <input placeholder="Phone" type="text" name="phone" required />
            </li>
          )}
        </ul>
        <button>{props.type === "signup" ? "SIGN UP" : "SIGN IN"}</button>

        {props.type === "signup" && (
          <p>
            Login?
            <Link to="/login"> Click</Link>
          </p>
        )}
        {props.type === "signin" && (
          <p>
            Create an account?
            <Link to="/register"> Sign up</Link>
          </p>
        )}
      </form>
    </div>
  );
}

export default AuthForm;
