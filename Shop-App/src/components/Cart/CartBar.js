import { useRef } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart.js";
import { formatPrice } from "../../function.js";
import QuantityInput from "../QuantityInput/QuantityInput";
import IconDelete from "../UI/IconDelete";
import classes from "./CartBar.module.css";

function CartBar(props) {
  const ref = useRef();
  const dispatch = useDispatch();
  const data = props.data;

  // hàm điều khiển tăng giảm
  function handleIncrease() {
    ref.current.value = Number(ref.current.value) + 1;
    dispatch(
      cartActions.addCart({
        ...data,
        quantity: Number(ref.current.value),
      })
    );
  }

  function handleDecrease() {
    if (Number(ref.current.value) > 1) {
      ref.current.value = Number(ref.current.value) - 1;
      dispatch(
        cartActions.addCart({
          ...data,
          quantity: Number(ref.current.value),
        })
      );
    } else {
      ref.current.value = 1;
    }
  }

  // hàm on change input
  function hanleOnChange(e) {
    const quantityInput = Number(e.target.value);

    if (quantityInput >= 1) {
      dispatch(
        cartActions.addCart({
          ...data,
          quantity: quantityInput,
        })
      );
    }
  }

  // hàm xóa item
  function handleDelete() {
    dispatch(cartActions.removeCart(data));
  }

  return (
    <ul className={`${props.className} ${classes.cartBar}`}>
      <li>
        <img src={data.img1} alt={data.name} />
      </li>
      <li>
        <h6>{data.name}</h6>
      </li>
      <li>
        <p>{formatPrice(data.price)}</p>
      </li>
      <li>
        <QuantityInput
          defaultValue={props.data.quantity}
          ref={ref}
          increaseClick={handleIncrease}
          decreaseClick={handleDecrease}
          onChangeInput={hanleOnChange}
        />
      </li>
      <li>
        <p>{formatPrice(data.quantity * data.price)}</p>
      </li>
      <li className={classes.icon}>
        <IconDelete onClick={handleDelete} />
      </li>
    </ul>
  );
}
export default CartBar;
