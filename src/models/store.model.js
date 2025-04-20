const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    location: String,
  },
  { timestamps: true }
);

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
