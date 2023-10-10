import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { default as AdminProductList } from "./pages/product-list"

function App() {
  return (
    <>
      <Link to="/">Go home</Link>
      <Link to="/login">Login</Link>
      <Link to="/products">products</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<AdminProductList />}/>
      </Routes>
    </>
  );
}

export default App;
