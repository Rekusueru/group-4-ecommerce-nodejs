
const products = require('../models/ProductModels');
const main ={
    index: (req, res)=>{
        res.render('index');
    },
    shop: (req, res)=>{
        res.render('shop');
    },
    about: (req, res)=>{
        res.render('about');
    },
    services: (req, res)=>{
        res.render('services');
    },
    contact: (req, res)=>{
        res.render('contact');
    },
    login: (req, res)=>{
        res.render('login');
    },
    register: (req, res)=>{
        res.render('register');
    },
    cart: (req, res)=>{
        res.render('cart');
    },
    checkout: (req, res)=>{
        res.render('checkout');
    },
    thankyou: (req, res)=>{
        res.render('thankyou');
    },
  

    
};

module.exports = main;