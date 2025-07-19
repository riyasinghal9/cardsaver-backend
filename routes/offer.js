
const express = require('express');
const router = express.Router();
const { storeOffers } = require('../controllers/offerController');

router.post('/', storeOffers);

module.exports = router;
