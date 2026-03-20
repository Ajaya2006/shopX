import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./app/components/Layout";   // ✅ adjusted path
import { Home } from "./app/pages/Home";
import { About } from "./app/pages/About";
import { Contact } from "./app/pages/Contact";
import { SignUp } from "./app/pages/SignUp";
import { Login } from "./app/pages/Login";
import { ProductDetail } from "./app/pages/ProductDetail";
import { Cart } from "./app/pages/Cart";
import { Checkout } from "./app/pages/Checkout";
import { Account } from "./app/pages/Account";
import { Wishlist } from "./app/pages/Wishlist";
import { NotFound } from "./app/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,   // ✅ FIX
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "account", element: <Account /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);