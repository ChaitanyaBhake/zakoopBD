const express = require('express');
const { getProductByStoreName } = require('../controllers/product.controller');
const router = express.Router();

//Get products by the storeName
router.get("/store/:storeName",getProductByStoreName)


module.exports = router;