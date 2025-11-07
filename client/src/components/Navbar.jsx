import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center bg-white shadow-sm px-8 py-4">
      <h1
        className="text-2xl font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
        onClick={() => navigate("/")}
      >
        Vibe<span className="text-blue-600">Com</span>
      </h1>

      <button
        onClick={() => navigate("/cart")}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-2 rounded-lg transition-colors cursor-pointer"
      > Cart
      </button>
    </nav>
  );
};

export default Navbar;
