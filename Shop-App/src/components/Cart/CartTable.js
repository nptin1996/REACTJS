import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { formatPrice } from "../../function.js";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import CartBar from "./CartBar";
import IconGift from "../UI/IconGift";
import ArrowLeft from "../UI/ArrowLeft";
import ArrowRight from "../UI/ArrowRight";
import classes from "./CartTable.module.css";

function CartTable() {
  const cartData = useSelector((state) => state.cart.data);
  const total = useSelector((state) => state.cart.total);
  const navigate = useNavigate();

  function gotoCheckout() {
    navigate("/checkout");
  }
  function gotoShop() {
    navigate("/shop");
  }

  return (
    <div className={classes.cart}>
      <h4>Shopping Cart</h4>

      <Row>
        <Col>
          <ul className={classes.cartItem}>
            <li>IMAGE</li>
            <li>PRODUCT</li>
            <li>PRICE</li>
            <li>QUANTITY</li>
            <li>TOTAL</li>
            <li>REMOVE</li>
          </ul>
          {cartData.map((ele) => (
            <CartBar
              data={ele}
              key={ele["_id"]["$oid"]}
              className={classes.cartItem}
            />
          ))}
        </Col>
        <Col xl="3">
          <div className={classes.total}>
            <h4>CART TOTAL</h4>
            <div className={`${classes.border} ${classes.number}`}>
              <p>SUBTOTAL</p>
              <p>{formatPrice(total)}</p>
            </div>
            <div className={classes.number}>
              <p>TOTAL</p>
              <p>{formatPrice(total)}</p>
            </div>
            <div className={classes.input}>
              <input placeholder="Enter your coupon" />
              <Button>
                <IconGift />
                Apply coupon
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Col xl="9" className={classes.action}>
        <div>
          <span onClick={gotoShop}>
            <ArrowLeft />
            Continue shopping
          </span>
        </div>
        <div>
          <span className={classes.checkout} onClick={gotoCheckout}>
            Proceed to checkout
            <ArrowRight />
          </span>
        </div>
      </Col>
    </div>
  );
}

export default CartTable;
