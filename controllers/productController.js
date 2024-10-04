const db = require('../config/db');
const path = require('path');

exports.getAdmin = (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) throw err;
        res.render('admin', { products: results });
    });
};

exports.addProduct = (req, res) => {
    const newProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        image: req.file.filename
    };
    db.query('INSERT INTO products SET ?', newProduct, (err, results) => {
        if (err) throw err;
        res.redirect('/admin');
    });
};

exports.getEditProduct = (req, res) => {
    db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, results) => {
        if (err) throw err;
        res.render('edit', { product: results[0] });
    });
};

// Edit Product
exports.editProduct = (req, res) => {
    const updatedProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        image: req.file ? req.file.filename : null
    };

    db.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, req.params.id], (err, results) => {
        if (err) throw err;
        res.redirect('/admin');
    });
};

// Delete Product
exports.deleteProduct = (req, res) => {
    db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, results) => {
        if (err) throw err;
        res.redirect('/admin');
    });
};


