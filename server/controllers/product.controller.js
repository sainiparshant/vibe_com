import Product from "../models/product.model.js";
import axios from "axios";


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

     if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data:products
    });
    } catch (error) {
    res.status(500).json({ 
        success: false,
        message: "Error fetching products", 
        error: error.message 
    });
  }
};

export const seedProducts = async () => {
    try {
        const counts = await Product.countDocuments();
        
        if(counts === 0){
            const {data} = await axios.get('https://fakestoreapi.com/products');
            
            const products = data.map((item) => ({
                name: item.title,
                price: item.price,
                image: item.image,
                category: item.category,
            }));

            await Product.insertMany(products);
            console.log("Products seeded successfully");
        }else{
            console.log("Product already there!")
        }
    } catch (error) {
        console.log("Some error occured fetching data" , error.message);
    }
};

export  default { 
    getAllProducts,
    seedProducts

}