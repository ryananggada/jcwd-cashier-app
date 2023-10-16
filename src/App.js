import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { default as AdminProductList } from "./pages/product-list";
import ProductCategoryList from "./pages/product-category-list";
import AdminMenu from "./pages/AdminMenu";
import CashierMenu from "./pages/CashierMenu";
import CreateProduct from "./pages/CreateProduct";
import CreateCategory from "./pages/CreateCategory";
import UserSeting from "./pages/UserSettings";
import KitchenMenu from "./components/KitchenMenu";

function App() {
  return (
    <>
      <Routes>
        {/* Homepage langsung ke Login aja */}
        <Route path="/" element={<Login />} />
        {/* TO DO: Ubah path tergantung dia admin atau cashier */}
        {/* TO DO: integrasikan routes ke Sidebar admin atau cashier */}
        {/* TO DO: kalau localStorage.token atau cookies == null harus redirect ke "/" */}
        <Route path="/products/:page" element={<AdminProductList />} />
        <Route path="/product-categories" element={<ProductCategoryList />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/admin" element={<AdminMenu />} />
        <Route path="/cashier" element={<CashierMenu />} />
        <Route path="/kitchen" element={<KitchenMenu />} />
      </Routes>
    </>
  );
}

export default App;
