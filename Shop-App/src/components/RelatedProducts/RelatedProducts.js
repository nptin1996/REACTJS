import { useNavigate } from "react-router-dom";
import { splitString } from "../../function.js";
import ProductItem from "../ProductItem/ProductItem";
import Button from "../Button/Button";
import classes from "./RelatedProducts.module.css";
function RelatedProducts(props) {
  const textList = splitString(props.data);
  const navigate = useNavigate();

  return (
    <div className={classes.related}>
      <Button>Description</Button>
      <h4>Product Description</h4>
      <ul className={classes.list}>
        {textList.map((text, i) => (
          <li key={i}>{i === 0 ? text.toUpperCase() : "- " + text}</li>
        ))}
      </ul>
      <h4 className={classes.relatedTitle}>Related Products</h4>
      <ul>
        {props.relatedList.map((ele, i) => {
          // hàm chuyển trang
          const handleOnClick = () => {
            navigate(`/detail/${ele["_id"]["$oid"]}`);
          };
          return (
            <ProductItem
              data={ele}
              key={i}
              onClick={handleOnClick}
              className={classes.item}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default RelatedProducts;
