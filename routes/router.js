const express = require('express');
const router = express.Router();
const prod_Cntrl = require('../controllers/productController');
const cart_items_Cntrl = require('../controllers/cart_itemController');
const cart_Cntrl = require('../controllers/cartController');
const order_items_Cntrl = require('../controllers/order_itemController');
const order_Cntrl = require('../controllers/orderController');
const payment_Cntrl = require('../controllers/paymentController');
const user_Cntrl = require('../controllers/userController');

router.get('', prod_Cntrl.index );

module.exports = router;