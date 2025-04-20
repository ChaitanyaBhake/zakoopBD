const express = require('express');
const { placeOrder2 } = require('../controllers/order.controller');
const router = express.Router();

router.post("/",placeOrder2)


module.exports = router;