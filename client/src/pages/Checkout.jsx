import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cartItems = state?.cartItems || [];

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReceipt(true);
  };

  const closeModal = () => {
    setReceipt(false);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-6 relative">
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer font-semibold"
      >
        <ArrowLeft size={20} />
        <h1 className="font-bold">Home</h1>
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Your Details
            </h2>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-md font-medium transition"
            >
              Place Order
            </button>
          </form>

          <div className="bg-gray-50 border border-gray-200 rounded-md p-5">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-gray-700">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center border-b border-gray-100 pb-2"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.productId?.name.slice(0, 10)}
                    </p>
                  </div>
                  <span className="font-semibold">
                    ${(item.productId?.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 text-lg font-semibold text-gray-800">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {receipt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Receipt 🧾
            </h2>

            <p className="text-gray-700 mb-2">
              <strong>Name:</strong> {formData.name}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> {formData.email}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Total Amount:</strong> ${total.toFixed(2)}
            </p>

            <p className="text-green-600 font-medium mb-4">
              ✅ Your order has been placed successfully!
            </p>

            <button
              onClick={closeModal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md font-medium transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Checkout;
