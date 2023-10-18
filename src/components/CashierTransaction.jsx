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
          <h1 className="text-2xl font-bold my-2">Orders</h1>
          {cartItems.map((item) => {
            return (
              <div className="flex space-between justify-center items-center gap-8 max-w-sm p-4 my-4 bg-white border border-gray-200 rounded-lg shadow">
                <div>
                  <h1>{item.name}</h1>
                  <p>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(item.price)}
                  </p>
                </div>
                <p className="text-xl">{item.quantity}</p>
                <div>
                  <button
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    onClick={() => dispatch(removeFromCart(item))}
                  >
                    -
                  </button>
                  <button
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
          <h2>
            Total Price:{" "}
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
          <button
            className="my-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            onClick={handleAddTransaction}
          >
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
}

export default CashierTransaction;
