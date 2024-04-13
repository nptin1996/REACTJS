import { formatPrice } from "../../function.js";
import classes from "./TotalList.module.css";

function TotalList(props) {
  const cartList = props.cartList;
  const total = props.total;
  return (
    <div className={classes.totalList}>
      <h4>YOUR ORDER</h4>
      <ul>
        {cartList.map((ele) => (
          <li key={ele.name}>
            {ele.name}
            <p>
              {formatPrice(ele.price)}
              <span> x {ele.quantity}</span>
            </p>
          </li>
        ))}
        <li>
          TOTAL
          <p
            style={{
              color: "#000",
            }}
          >
            {formatPrice(total)}
          </p>
        </li>
      </ul>
    </div>
  );
}
export default TotalList;
