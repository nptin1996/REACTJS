import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { formatPrice } from "../../function.js";
import { cartActions } from "../../store/cart.js";
import Button from "../Button/Button";
import QuantityInput from "../QuantityInput/QuantityInput";
import classes from "./ProductDescription.module.css";

function ProductDescription(props) {
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const ref = useRef();
  const data = props.data;

  let defaultQuantity = 1;

  if (cart.length > 0) {
    const productCart = cart.find(
      (ele) => ele["_id"]["$oid"] === data["_id"]["$oid"]
    );
    if (productCart) {
      defaultQuantity = productCart.quantity;
    }
  }

  function handleIncrease() {
    ref.current.value = Number(ref.current.value) + 1;
  }

  function handleDecrease() {
    if (Number(ref.current.value) > 1) {
      ref.current.value = Number(ref.current.value) - 1;
    } else {
      ref.current.value = 1;
    }
  }

  const handleAddCart = () => {
    dispatch(
      cartActions.addCart({
        ...data,
        quantity: Number(ref.current.value),
      })
    );
  };

  return (
    <Row className="p-4">
      <Col md className="p-4">
        <div className={classes.imgList}>
          <div>
            <img src={data.img1} alt={data.name} />
            <img src={data.img2} alt={data.name} />
            <img src={data.img3} alt={data.name} />
            <img src={data.img4} alt={data.name} />
          </div>
          <div>
            <img src={data.img4} alt={data.name} />
          </div>
        </div>
      </Col>

      <Col md className={classes.text}>
        <h2>{data.name}</h2>
        <p>{formatPrice(data.price)}</p>
        <p>{data["short_desc"]}</p>
        <h5>
          CATEGORY:<span>{data.category}s</span>
        </h5>

        <div className={classes.quantity}>
          <div className={classes.input}>
            <p>QUANTITY</p>
            <QuantityInput
              ref={ref}
              defaultValue={defaultQuantity}
              increaseClick={handleIncrease}
              decreaseClick={handleDecrease}
            />
          </div>
          <div>
            <Button onClick={handleAddCart} to="/cart">
              Add to cart
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default ProductDescription;
