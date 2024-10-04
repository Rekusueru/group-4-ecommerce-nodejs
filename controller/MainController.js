const products = require('../models/ProductModels');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel'); // Import the entire User object

const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images only!');
        }
    }
}).single('prod-img');

// Define each method using const
const index = (req, res) => {
    const userId = req.params.userId; // Get userId from the URL
    res.render('index', { userId });  // Pass userId to the EJS view
};

const shop = (req, res) => {
    res.render('shop');
};

const about = (req, res) => {
    res.render('about');
};

const services = (req, res) => {
    res.render('services');
};

const contact = (req, res) => {
    res.render('contact');
};


const login = async (req, res) => {
    const { emailadd, password } = req.body;

    try {
        const user = await User.authenticateUser(emailadd, password);
        
        if (!user) {
            return res.render('login', { error: 'Invalid Email or password' });
        }

        // Now, directly compare the password (as we're storing it in plain text)
        if (user.password !== password) {
            return res.render('login', { error: 'Invalid Email or password' });
        }

        // Successful login
        req.session.userId = user.userid; // Adjust according to your user ID field
        res.redirect(`/index/${user.userid}`); // Use user.userid

    } catch (error) {
        console.error(error);
        res.render('login', { error: 'An error occurred. Please try again.' });
    }
};






const register = async (req, res) => {
    const { name, email, password, confirm_password, address, city, state, zip } = req.body;

    if (password !== confirm_password) {
        return res.render('register', { error: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findByEmail(email); // Call User's findByEmail method
        if (existingUser) {
            return res.render('register', { error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            user_role: 'user',
            full_name: name,    
            email_add: email,
            password: hashedPassword,
            street: address,
            city: city,
            state: state,
            zip_code: zip,
        };

        await User.create(userData); // Call User's create method
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.render('register', { error: 'An error occurred. Please try again.' });
    }
};


const cart = (req, res) => {
    res.render('cart');
};

const checkout = (req, res) => {
    res.render('checkout');
};

const thankyou = (req, res) => {
    res.render('thankyou');
};

const getIndexPage = async (req, res) => {
    const userId = req.params.userId;  // Get userId from the URL

    try {
        const products = await User.getAllProducts();  // Fetch all products
        res.render('index', { products, userId });  // Pass userId to the view
    } catch (error) {
        console.error(error);  // Log any error for debugging
        res.status(500).send('Error loading homepage');  // Send error response
    }
};




// Export all the methods using module.exports
module.exports = {
    index,
    shop,
    about,
    services,
    contact,
    login,
    register,
    cart,
    checkout,
    thankyou,
    getIndexPage,
 
};
