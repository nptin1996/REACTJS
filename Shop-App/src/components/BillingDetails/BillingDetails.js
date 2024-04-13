import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { cartActions } from "../../store/cart.js";
import TotalList from "./TotalList";
import classes from "./BillingDetails.module.css";

function BillingDetails() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const dataUser = useSelector((state) => state.user.data);
  const cartList = useSelector((state) => state.cart.data);
  const total = useSelector((state) => state.cart.total);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const dataOrder = Object.fromEntries(fd.entries());
    dataOrder.cartList = cartList;
    dataOrder.total = total;
    console.log(dataOrder);
    dispatch(cartActions.clearCart());
    alert("Đặt hàng thành công!");
    navigate("/");
  };

  return (
    <div className={classes.billing}>
      <h4>BILLING DETAILS</h4>
      <Row>
        <Col>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">FULL NAME:</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter Your Full Name Here!"
              defaultValue={isLogin ? dataUser.name : ""}
            />
            <label htmlFor="email">EMAIL:</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter Your Email Here!"
              defaultValue={isLogin ? dataUser.email : ""}
            />
            <label htmlFor="phone">PHONE NUMBER:</label>
            <input
              id="phone"
              name="phone"
              type="text"
              required
              placeholder="Enter Your Phone Number Here!"
              defaultValue={isLogin ? dataUser.phone : ""}
            />
            <label htmlFor="address">ADDRESS:</label>
            <input
              id="address"
              name="address"
              type="text"
              required
              placeholder="Enter Your Address Here!"
            />
            <button>Place order</button>
          </form>
        </Col>
        <Col sm="5">
          <TotalList total={total} cartList={cartList} />
        </Col>
      </Row>
    </div>
  );
}

export default BillingDetails;
