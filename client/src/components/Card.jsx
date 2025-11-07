import React from "react";
import axios from 'axios'

const Card = ({ product }) => {

  const addToCart = async() =>{
    try {
      const res = await axios.post('http://localhost:9000/api/cart',{
        productId: product._id,
        quantity: 1
      });

      if(res.data.success){
        alert("item added successfully!")
      }else{
        alert("error in adding item");
      }

    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className="bg-white shadow-sm hover:shadow-md rounded-xl p-4 w-full max-w-xs transition-all duration-200">
      <div className="w-full h-48 flex justify-center items-center mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain rounded-lg"
        />
      </div>

     
      <h3 className="text-gray-800 font-semibold text-lg mb-1 truncate">
        {product.name}
      </h3>
      <p className="text-gray-500 text-sm mb-1 capitalize">
        {product.category}
      </p>
      <p className="text-blue-600 font-bold mb-3">${product.price}</p>

      
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer font-medium py-2 rounded-lg transition-colors"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Card;
