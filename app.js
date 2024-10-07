const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/router')
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const app =express();

const PORT = process.env.PORT || 3002;

// Set up storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/prod_img/');
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

app.use(express.json());
app.use(session({
    secret: 'secret-key',
    cookie: {
        sameSite: 'strict',
        maxAge: 60000 * 60,
    }
}));

// Routes
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
