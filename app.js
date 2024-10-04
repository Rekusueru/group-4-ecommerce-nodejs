const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes/route');
const session = require('express-session');

const app = express();


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Serve static files from uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static('public')); // For static files like CSS or images

// Use the router
app.use('/', router);


app.listen(1500, () => {
    console.log(`Server running on port http://localhost:1500`);
});
