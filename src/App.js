import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { default as AdminProductList } from "./pages/product-list"

function App() {
  return (
    <>
      <Link to="/">Go home </Link>
      <Link to="/login">Login </Link>
      <Link to="/products/0">products</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:page" element={<AdminProductList />}/>
      </Routes>
    </>
  );
}

export default App;
