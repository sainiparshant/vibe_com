import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/cart");
      setCartItems(res.data.data || []);
    } catch (error) {
      console.log("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:9000/api/cart/${id}`);

      if (res.data.success) {
        alert("item deleted from cart");

        setCartItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      } else {
        alert("error deleting item");
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleQuantityChange = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600 text-lg">
        Loading your cart...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-6">
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer font-semibold"
      >
        <ArrowLeft size={20} />
        <h1 className="font-bold">Home</h1>
      </div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-lg text-center">
            Your cart is empty 🛒
          </p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white shadow-sm p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId?.image}
                    alt={item.productId?.name}
                    className="w-20 h-20 object-contain rounded-md"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {item.productId?.name}
                    </h3>
                    <p className="text-gray-500">${item.productId?.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, -1)}
                        className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, +1)}
                        className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-500 hover:text-red-600 font-medium transition"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="border-t border-gray-200 mt-6 pt-4 text-right">
              <p className="text-lg font-semibold text-gray-800">
                Total: $
                {cartItems
                  .reduce(
                    (acc, item) =>
                      acc + (item.productId?.price || 0) * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
              <button
                onClick={handleCheckout}
                className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
