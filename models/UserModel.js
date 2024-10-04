const db = require('../config/db'); // Assuming you have a db connection setup

// Create a new user
const create = (userData) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO users 
          (user_role, full_name, email_add, password, street, city, state, zip_code) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(
            query,
            [
                userData.user_role,
                userData.full_name,
                userData.email_add,
                userData.password, // Storing password in plain text (not secure)
                userData.street,
                userData.city,
                userData.state,
                userData.zip_code,
            ],
            (error, results) => {
                if (error) reject(error);
                resolve(results);
            }
        );
    });
};

const authenticateUser = (emailadd, password) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT userid, email_add, password FROM users WHERE email_add = ? AND password = ?';
        db.query(query, [emailadd, password], (err, results) => {
            if (err) {
                reject(err); // This will be logged in your login function's catch block
            } else if (results.length > 0) {
                resolve(results[0]); // Return the first matched user
            } else {
                resolve(null); // No matching user found
            }
        });
    });
};

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM products';
        db.query(query, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email_add = ?';
        db.query(query, [email], (error, results) => {
            if (error) {
                reject(error);
            } else if (results.length > 0) {
                resolve(results[0]); // Return the first matched user
            } else {
                resolve(null); // No matching user found
            }
        });
    });
};

// Exporting the functions as an object
module.exports = {
    create,
    authenticateUser,
    getAllProducts,
    findByEmail
};
