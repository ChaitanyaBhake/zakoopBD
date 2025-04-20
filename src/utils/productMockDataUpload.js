const mongoose = require('mongoose');
const Store = require('../models/store.model'); // Store model
const Product = require('../models/product.model'); // Product model

// Mock product data
const productData = [
  {
    name: 'Apple',
    price: 150,
    quantity: 100,
    storeName: 'Fresh Mart',
  },
  {
    name: 'Banana',
    price: 50,
    quantity: 200,
    storeName: 'Fresh Mart',
  },
  {
    name: 'Tomato',
    price: 30,
    quantity: 150,
    storeName: 'Organic Hub',
  },
  {
    name: 'Carrot',
    price: 40,
    quantity: 100,
    storeName: 'Local Greens',
  },
];


const seedProducts = async () => {
  try {
    for (let product of productData) {
      const store = await Store.findOne({ name: product.storeName });

      if (!store) {
        console.log(` Store not found: ${product.storeName}`);
        continue;
      }

      const existingProduct = await Product.findOne({
        name: product.name,
        storeName: store._id,
      });

      if (existingProduct) {
        console.log(` Product already exists: ${product.name} (${product.storeName})`);
        continue;
      }

      await Product.create({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        storeName: store._id,
      });

      console.log(` Added: ${product.name} (${product.storeName})`);
    }

    console.log('\n Product seeding completed!');
  } catch (error) {
    console.error(' Error inserting mock data:', error);
  }
};

module.exports = seedProducts;

