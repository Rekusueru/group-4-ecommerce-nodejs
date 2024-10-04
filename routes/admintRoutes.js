const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/product');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// GET Admin Dashboard - List Products
router.get('/admin', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.render('admin', { products });
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});

// POST Add Product
router.post('/admin/add', upload.single('image'), async (req, res) => {
    const { name, description } = req.body;
    const image = req.file.filename;

    try {
        await Product.create({
            name: name,
            description: description,
            image: image,
        });
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send('Error adding product');
    }
});

// GET Edit Product Form
router.get('/admin/edit/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId);
        if (product) {
            res.render('edit', { product });
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send('Error loading edit form');
    }
});

// POST Update Product
router.post('/admin/edit/:id', upload.single('image'), async (req, res) => {
    const productId = req.params.id;
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const product = await Product.findByPk(productId);
        if (product) {
            product.name = name;
            product.description = description;
            if (image) {
                product.image = image;
            }
            await product.save();
            res.redirect('/admin');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send('Error updating product');
    }
});

// POST Delete Product
router.post('/admin/delete/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId);
        if (product) {
            await product.destroy();
            res.redirect('/admin');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting product');
    }
});

// GET Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

// GET Sales Page
router.get('/admin/sales', async (req, res) => {
    try {
        const sales = await Sale.findAll(); // Assuming you have a Sale model for tracking sales
        res.render('sales', { sales });
    } catch (error) {
        res.status(500).send('Error fetching sales');
    }
});

module.exports = router;
