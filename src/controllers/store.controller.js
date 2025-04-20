const Store = require('../models/store.model');

//Get all stores
exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();
    return res.status(200).json({
      success: true,
      message: 'All Stores fetched successfully',
      stores,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving stores',
      error,
    });
  }
};

