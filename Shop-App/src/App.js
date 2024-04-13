import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as productsLoader } from "./pages/Root";
import HomePage from "./pages/Home";
import ErrorPage from "./pages/Error";
import ShopPage from "./pages/Shop";
import DetailPage from "./pages/Detail";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: productsLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "detail/:productId", element: <DetailPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
