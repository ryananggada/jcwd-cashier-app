import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { default as AdminProductList } from "./pages/product-list";
import ProductCategoryList from "./pages/product-category-list";
import AdminMenu from "./pages/AdminMenu";
import CashierMenu from "./pages/CashierMenu";
import CreateProduct from "./pages/CreateProduct";
import CreateCashier from "./pages/CreateCashier";
import CreateCategory from "./pages/CreateCategory";

function App() {
  return (
    <>
      {/* <Link to="/">Go home </Link>
      <Link to="/login">Login </Link>
      <Link to="/products/0">products</Link>
      <Link to="/product-categories">product categories</Link> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* TO DO: Ubah path tergantung dia admin atau cashier */}
        <Route path="/products/:page" element={<AdminProductList />} />
        <Route path="/product-categories" element={<ProductCategoryList />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/create-cashier" element={<CreateCashier />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/admin" element={<AdminMenu />} />
        <Route path="/cashier" element={<CashierMenu />} />
      </Routes>
    </>
  );
}

export default App;
