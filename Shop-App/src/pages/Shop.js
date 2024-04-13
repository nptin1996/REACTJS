import { useSearchParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Header from "../components/Header/Header";
import CategoryBar from "../components/CategoryBar/CategoryBar";
import SearchInput from "../components/SearchInput/SearchInput";
import ShopList from "../components/ShopList/ShopList";

function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const name = searchParams.get("name");
  const category = searchParams.get("category");

  // thiết lập dataFilter
  let dataFilter;

  if (name) {
    dataFilter = {
      type: "name",
      data: name,
    };
  }

  if (category) {
    dataFilter = {
      type: "category",
      data: category,
    };
  }

  // nếu không có dữ liệu mặc định là all
  if (!name && !category) {
    dataFilter = {
      type: "category",
      data: "all",
    };
  }

  return (
    <>
      <Header title="SHOP" />
      <Row className="my-5">
        <Col sm="3">
          <CategoryBar category={dataFilter.data} />
        </Col>
        <Col sm>
          <SearchInput onSetKey={setSearchParams} />
          <ShopList dataFilter={dataFilter} />
        </Col>
      </Row>
    </>
  );
}

export default ShopPage;
