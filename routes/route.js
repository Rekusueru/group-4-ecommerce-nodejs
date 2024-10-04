const express = require('express');
const router = express.Router();
const main = require('../controller/MainController');

router.get('/', main.index);
router.get('/index/:userId', main.getIndexPage);  // Handle dynamic userId

router.get('/shop', main.shop);
router.get('/about', main.about);
router.get('/services', main.services);
router.get('/contact', main.contact);


router.get('/cart', main.cart);
router.get('/checkout', main.checkout);
router.get('/thankyou', main.thankyou);


router.get('/register', (req, res) => {
    res.render('register'); // Render registration form
});


router.post('/register', main.register); // Handle registration form submission

router.get('/login', (req, res) => {
    res.render('login'); // Render login form
});

router.post('/login', main.login); // Handle login form submission




module.exports = router; 