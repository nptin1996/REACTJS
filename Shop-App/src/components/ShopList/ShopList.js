import { Await, useRouteLoaderData, useNavigate, Link } from "react-router-dom";
import { Suspense } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loading from "../UI/Loading";
import IconNext from "../UI/IconNext";
import IconPrev from "../UI/IconPrev";
import classes from "./ShopList.module.css";

function ShopList(props) {
  const { products } = useRouteLoaderData("root");
  const navigate = useNavigate();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={products}>
          {(loadedProducts) => {
            // filter dữ liệu để hiển thị
            let data = [];
            if (props.dataFilter.type === "name") {
              data = loadedProducts.filter((product) =>
                product.name.includes(props.dataFilter.data)
              );
            }

            if (props.dataFilter.type === "category") {
              if (props.dataFilter.data === "all") {
                data = loadedProducts.map((product) => product);
              } else {
                data = loadedProducts.filter(
                  (product) => product.category === props.dataFilter.data
                );
              }
            }

            // check dữ liệu để hiển thị
            if (data.length === 0) {
              return (
                <p style={{ textAlign: "center" }}>
                  Không tìm thấy sản phẩm phù hợp
                </p>
              );
            } else {
              // hiển thị sản phẩm đúng yêu cầu
              return (
                <ul className={classes.shopList} key={props.dataFilter.data}>
                  {data.map((ele) => {
                    // hàm onClick lên từng item
                    const hanleOnClick = () => {
                      navigate(`/detail/${ele["_id"]["$oid"]}`);
                    };
                    return (
                      <ProductItem
                        key={ele["_id"]["$oid"]}
                        data={ele}
                        className={classes.animated}
                        onClick={hanleOnClick}
                      />
                    );
                  })}
                </ul>
              );
            }
          }}
        </Await>
      </Suspense>

      {/* Thanh chuyển trang */}
      <div className="d-flex justify-content-end mt-3">
        <div className={classes.pagination}>
          <IconPrev />
        </div>
        <div className={`${classes.pagination} ${classes.link}`}>
          <Link>?</Link>
        </div>
        <div className={classes.pagination}>
          <IconNext />
        </div>
      </div>
    </>
  );
}

export default ShopList;
