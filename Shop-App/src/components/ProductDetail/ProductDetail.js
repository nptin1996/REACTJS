import { Suspense } from "react";
import { useParams, Await, useRouteLoaderData } from "react-router-dom";
import ProductDescription from "../ProductDescription/ProductDescription";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import Loading from "../UI/Loading";
import classes from "./ProductDetail.module.css";

function ProductDetail() {
  const { products } = useRouteLoaderData("root");
  const params = useParams();
  const searchId = params.productId;

  return (
    <>
      <Suspense
        fallback={
          <div className={classes.layoutFail}>
            <Loading />
          </div>
        }
      >
        <Await resolve={products}>
          {(loadedProducts) => {
            // tìm product
            const product = loadedProducts.find(
              (ele) => ele["_id"]["$oid"] === searchId
            );

            // check kết quả
            if (!product) {
              return (
                <div className={classes.layoutFail}>
                  <h5>Không tìm thấy sản phẩm phù hợp!</h5>
                </div>
              );
            } else {
              // lấy thông tin các sản phẩm cùng thẻ loại
              const relatedList = loadedProducts.filter(
                (ele) =>
                  ele.category === product.category &&
                  ele["_id"]["$oid"] !== searchId
              );

              return (
                <div className={classes.layout}>
                  <ProductDescription data={product} />
                  <RelatedProducts
                    data={product["long_desc"]}
                    relatedList={relatedList}
                  />
                </div>
              );
            }
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default ProductDetail;
