import classes from "./ProductItem.module.css";
import { formatPrice } from "../../function.js";

function ProductItem(props) {
  return (
    <li
      className={
        props.className
          ? `${classes.productItem} ${props.className}`
          : classes.productItem
      }
      onClick={props.onClick}
    >
      <img src={props.data.img1} alt={props.data.name} />
      <p>{props.data.name}</p>
      <p>{formatPrice(props.data.price)}</p>
    </li>
  );
}

export default ProductItem;
