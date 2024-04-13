import { Container } from "react-bootstrap";
import MainNavigation from "../components/MainNavigation/MainNavigation";
import Footer from "../components/Footer/Footer";
import banner from "../resource/banner1.jpg";

function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <Container>
        <div
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: "cover",
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#9899a0",
          }}
        >
          <h2>404. Page Not Found!</h2>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default ErrorPage;
