const Order = require("../models/order.model");
const Product = require("../models/product.model");

exports.placeOrder = async (req, res) => {
  try {
    const { name, items, storeId, totalPrice } = req.body;
    const issues = [];
    const itemDetails = [];

    if (!name || !items || !storeId || !totalPrice) {
      return res
        .status(400)
        .json({ message: 'Missing required fields' });
    }

    // Validate stock and update inventory
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product || product.quantity < item.quantity) {
        return res
          .status(400)
          .json({ message: 'Invalid quantity or product' });
      }

      product.quantity -= item.quantity;
      await product.save();
    }

    // Create and save order
    const order = await Order.create({
      name,
      items,
      store: storeId,
      totalPrice,
    });

    // Send response with desired fields
    res.status(201).json({
      success: true,
      order: {
        id: order._id,
        name: order.name,
        items: order.items,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        'Error placing order.Please try again later or contact us',
      error,
    });
  }
};

exports.placeOrder2 = async (req, res) => {
    try {
      const { name, items, storeId, totalPrice } = req.body;
  
      const itemDetails = [];
      const issues = [];
  
      // Fetch all product IDs at once
      const productIds = items.map(item => item.productId);
      const productsFromDb = await Product.find({ _id: { $in: productIds } });
  
      const productMap = {};
      productsFromDb.forEach(product => {
        productMap[product._id.toString()] = product;
      });
  
      for (let item of items) {
        const product = productMap[item.productId];
  
        if (!product || product.quantity < item.quantity) {
          issues.push({
            productName: product?.name || 'Unknown Product',
            available: product?.quantity || 0,
            requested: item.quantity
          });
          continue;
        }
  
        itemDetails.push({ product: product._id, quantity: item.quantity });
  
        // Deduct product stock
        product.quantity -= item.quantity;
      }
  
      if (issues.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Some products are unavailable in requested quantity',
          issues
        });
      }
  
      // Save updated product quantities
      await Promise.all(productsFromDb.map(p => p.save()));
  
      const order = await Order.create({
        name,
        items: itemDetails,
        store: storeId,
        totalPrice 
      });
  
      res.status(201).json({ success: true, order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Order failed' });
    }
  };
  
