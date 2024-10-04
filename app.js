const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const productController = require('./controllers/productController');

const app = express();
const PORT = process.env.PORT || 3002;

// Set up storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', productController.getAdmin);       // Root route
app.get('/admin', productController.getAdmin);  // Explicit "/admin" route
app.post('/admin/add', upload.single('image'), productController.addProduct);
app.get('/admin/edit/:id', productController.getEditProduct);
app.post('/admin/edit/:id', upload.single('image'), productController.editProduct);
app.post('/admin/delete/:id', productController.deleteProduct);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
