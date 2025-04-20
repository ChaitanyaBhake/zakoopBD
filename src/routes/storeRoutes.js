const express = require('express');
const {
  getAllStores,
} = require('../controllers/store.controller');
const router = express.Router();

router.get('/', getAllStores);

module.exports = router;
