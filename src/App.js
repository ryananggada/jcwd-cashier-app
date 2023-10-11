import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateProduct from "./pages/CreateProduct";
import CreateCashier from "./pages/CreateCashier";
import CreateCategory from "./pages/CreateCategory";

function App() {
  return (
    <>
      <Link to="/">Go home</Link>
      <Link to="/login">Login</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/create-cashier" element={<CreateCashier />} />
        <Route path="/create-category" element={<CreateCategory />} />
      </Routes>
    </>
  );
}

export default App;
