import "./App.css";
import {
  Address,
  Cart,
  Home,
  Login,
  OrderSuccess,
  PageNotFound,
  Payment,
  ProductDetail,
  Register,
  Profile,
} from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";

import Protected from "./auth/Protected";
import AddProduct from "./pages/admin/AddProduct";
import Admin from "./auth/Admin";
import Dashboard from "./pages/admin/Dashboard";
import EditProduct from "./pages/admin/EditProduct";
import OrderHistory from "./pages/OrderHistory";
import UserDetail from "./pages/admin/UserDetail";
import ForgotPassword from "./pages/ForgotPassword";
import UserOrders from "./pages/UserOrders";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"/orders"} element={<UserOrders />} />
        <Route path={"/product-detail/:id"} element={<ProductDetail />} />
        <Route path={"/forgetpassword"} element={<ForgotPassword />} />

        {/* admin only */}
        <Route
          path={"/admin/add-product"}
          element={<Admin element={<AddProduct />} />}
        />
        <Route
          path={"/admin/orders"}
          element={<Admin element={<OrderHistory />} />}
        />
        <Route
          path={"/admin/users"}
          element={<Admin element={<UserDetail />} />}
        />
        <Route
          path={"/admin/edit/:id"}
          element={<Admin element={<EditProduct />} />}
        />
        <Route
          path={"/admin/dashboard"}
          element={<Admin element={<Dashboard />} />}
        />
        {/* admin only */}

        {/* login only */}
        <Route
          path="/profile/*"
          element={<Protected element={<Profile />} />}
        />
        <Route path="/payment" element={<Protected element={<Payment />} />} />
        <Route path="/address" element={<Protected element={<Address />} />} />
        <Route
          path="/order-success"
          element={<Protected element={<OrderSuccess />} />}
        />
        <Route path={"*"} element={<PageNotFound />} />
        {/* login only */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
