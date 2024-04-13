import { Await, useRouteLoaderData } from "react-router-dom";
import { Suspense, useRef } from "react";
import { useDispatch } from "react-redux";
import { pickedActions } from "../../store/picked.js";
import ProductItem from "../ProductItem/ProductItem";
import classes from "./HomeList.module.css";
import Title from "../Title/Title";
import Popup from "../Popup.js/Popup";
import Loading from "../UI/Loading";

function HomeList() {
  const { products } = useRouteLoaderData("root");
  const ref = useRef();
  const dispatch = useDispatch();

  return (
    <div className={classes.productsList}>
      <Title text1="MADE THE HARD WAY" text2="TOP TRENDING PRODUCTS" />
      <Suspense fallback={<Loading />}>
        <Await resolve={products}>
          {(loadedProducts) => {
            // filter lấy tối đa 8 phần tử
            let filteredProducts = [];
            if (loadedProducts.length <= 8) {
              filteredProducts = loadedProducts;
            } else {
              filteredProducts = loadedProducts.slice(0, 8);
            }

            return (
              <ul className={classes.listItem}>
                {filteredProducts.map((product) => {
                  // hàm onClick cho từng product
                  const hanleOnClick = () => {
                    dispatch(pickedActions.pickProduct(product));
                    ref.current.open();
                  };

                  return (
                    <ProductItem
                      key={product["_id"]["$oid"]}
                      data={product}
                      onClick={hanleOnClick}
                    />
                  );
                })}
              </ul>
            );
          }}
        </Await>
      </Suspense>
      <Popup ref={ref} />
    </div>
  );
}

export default HomeList;
