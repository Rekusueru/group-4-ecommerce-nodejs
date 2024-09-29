const express = require('express');
const router = express.Router();
const main = require('../controller/MainController');

router.get('/', main.index);
router.get('/shop', main.shop);
router.get('/about', main.about);
router.get('/services', main.services);
router.get('/contact', main.contact);
router.get('/login', main.login);
router.get('/register', main.register);
router.get('/cart', main.cart);
router.get('/checkout', main.checkout);
router.get('/thankyou', main.thankyou);





module.exports = router; 