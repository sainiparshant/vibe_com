import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity  } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    const existingItem = await Cart.findOne({productId});
    if(existingItem){
      existingItem.quantity += quantity;
      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Quantity updated",
        data: existingItem,
      });
    }

    const cartItem = new Cart({
      productId,
      quantity,
    });
    await cartItem.save();
    res.status(201).json({
      success: true,
      message: "Product added to cart",
      data: cartItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const removeItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is required",
      });
    }

    const deletedItem = await Cart.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "cart item deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("productId");
    if (!cartItems) {
      return res.status(404).json({
        success: false,
        message: "No item Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Items fetched successfully",
      data: cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server failed to load data",
      error: error.message,
    });
  }
};

export const checkout = async (req, res) => {
  try {
    const { cartItems } = req.body;
    if (!cartItems || !cartItems.length) {
      return res.status(400).json({
        success: false,
        message: "cart is empty or invalid",
      });
    }

    let total = 0;
    const detailedItems = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      

      const itemTotal = product.price * item.quantity;
      total = total + itemTotal;

      detailedItems.push({
        name: product.name,
        price: product.price,
        subtotal: itemTotal,
      });
    }

    const receipt = {
      items: detailedItems,
      total: total.toFixed(2),
      timestamp: new Date(),
    };

    await Cart.deleteMany({});

    return res.status(200).json({
        success: true,
        message: "Checkout successfully",
        receipt
    });

  } catch (error) {
    return res.status(500).json({
        success: false,
        message: "server error",
        error: error.message
    });
  }
};

export default {
  addToCart,
  removeItem,
  getCartItems,
  checkout
};
