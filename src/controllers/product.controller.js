//Get products by store

const Product = require('../models/product.model');
const Store = require('../models/store.model');

//get product by store endpoint
exports.getProductByStoreName = async (req, res) => {
  try {
    const { storeName } = req.params;

    console.log(`received storeName: ${storeName}`);
    

    // 1. Find the store by name
    const store = await Store.findOne({ name: storeName });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: `Store with name "${storeName}" not found`,
      });
    }

    // 2. Find products with that store's ObjectId
    const products = await Product.find({
      storeName: store._id,
    });

    // 3. If no products found, return custom message
    if (products.length === 0) {
      return res.status(200).json({
        success: true,
        message: `No products yet by the store "${storeName}"`,
        products: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: `Products for store "${storeName}" fetched successfully`,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving products',
      error: error.message,
    });
  }
};

//get all products from all stores
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      'storeName',
      'name location'
    ); // Only fetch name & location from Store

    res.status(200).json({
      success: true,
      message: 'All products fetched successfully',
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message,
    });
  }
};
