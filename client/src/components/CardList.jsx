import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const CardList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/products");
      setProducts(res.data.data);
    } catch (error) {
      console.log("Error in fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600 text-lg">
        Loading products...
      </div>
    );
  }

  return (
    <section className="px-6 py-10 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Explore Our Products
        </h1>
        <p className="text-gray-500">
          Handpicked items just for you — add to cart and checkout easily.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
        {products.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CardList;
