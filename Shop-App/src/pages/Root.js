import { useEffect } from "react";
import { Outlet, defer, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import MainNavigation from "../components/MainNavigation/MainNavigation";
import Footer from "../components/Footer/Footer";
import LiveChat from "../components/LiveChat/LiveChat";

function Root() {
  const location = useLocation();
  // useEffect tự động cuộn khi chuyển trang
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
  // Chỉ cuộn lên đầu trang khi pathname thay đổi

  return (
    <>
      <MainNavigation />
      <Container fluid="md">
        <Outlet />
      </Container>
      <LiveChat />
      <Footer />
    </>
  );
}

export default Root;

async function loadProductsData() {
  const res = await fetch(
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
  );
  const data = await res.json();
  return data;
}

// hàm loader dùng cho các trang
// defer để render trước các component không cần load data
export function loader() {
  return defer({
    products: loadProductsData(),
  });
}
