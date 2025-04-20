const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
  totalPrice: Number,
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
  },
},{timestamps:true});

module.exports = mongoose.model('Order', orderSchema);
