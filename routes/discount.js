
const express = require('express');
const router = express.Router();
const { getHighestDiscount } = require('../controllers/discountController');

router.get('/', getHighestDiscount);

module.exports = router;
