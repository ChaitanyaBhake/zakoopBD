const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  storeName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
