const express = require('express');
const router = express.Router();
const prod_Cntrl = require('../controllers/productController');
const cart_items_Cntrl = require('../controllers/cart_itemController');
const cart_Cntrl = require('../controllers/cartController');
const order_items_Cntrl = require('../controllers/order_itemController');
const order_Cntrl = require('../controllers/orderController');
const payment_Cntrl = require('../controllers/paymentController');
const user_Cntrl = require('../controllers/userController');

// router.get('', (req, res) => {
//     if (req.session.authorized) {
//         res.render('profile', {username: req.session.user.username});
//     }else {S
//         res.render('login');
//     }
// } );

module.exports = router;