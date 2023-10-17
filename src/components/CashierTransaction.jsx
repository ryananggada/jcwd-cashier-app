import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, emptyCart } from "../slices/cart";
import api from "../api";

function CashierTransaction() {
  const [products, setProducts] = useState([]);
  const cartItems = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const handleAddTransaction = async () => {
    try {
      const response = await api.post(
        "/transaction/new",
        {
          products: cartItems,
          totalPrice: cartItems.reduce((total, item) => {
            const subtotal = item.price * item.quantity;
            return total + subtotal;
          }, 0),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { data } = response;
      console.log(data.data);
      dispatch(emptyCart());
    } catch (error) {
      window.alert("Add transaction failed");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get("/products");
      const { data } = response;
      setProducts(data.data);
    };

    fetchProducts();
  }, []);

  return (
    <section>
      <div className="flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-7/12">
          {products.map((product) => {
            return (
              <div
                className="w-full max-w-[200px] m-3 p-3 bg-white border border-gray-200 rounded-lg shadow flex flex-col items-center"
                onClick={() => {
                  dispatch(addToCart(product));
                }}
              >
                <img
                  className="justify-center items-center max-h-36"
                  src={`http://localhost:8000/product-image/${product.image}`}
                  alt="product"
                />

                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {product.name}
                </h1>
                <span className="text-xl font-semibold text-gray-900 my-2">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(product.price)}
                </span>
              </div>
            );
          })}
        </div>
        <div className="w-5/12">
          <h1 className="text-2xl font-bold">Orders</h1>
          {cartItems.map((item) => {
            return (
              <div>
                <h1>{item.name}</h1>
                <p>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(item.price)}
                </p>
                <p>{item.quantity}</p>
                <button onClick={() => dispatch(removeFromCart(item))}>
                  -
                </button>
                <button onClick={() => dispatch(addToCart(item))}>+</button>
              </div>
            );
          })}
          <h2>
            Total Price{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(
              cartItems.reduce((total, item) => {
                const subtotal = item.price * item.quantity;
                return total + subtotal;
              }, 0)
            )}
          </h2>
          <button onClick={handleAddTransaction}>Checkout</button>
        </div>
      </div>
    </section>
  );
}

export default CashierTransaction;
