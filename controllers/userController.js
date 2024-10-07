const user = require('../models/userModel');
const main ={
    // create: async (req, res) => {
    //    if (req.body.username && req.body.password) {
    //     const { username, password } = req.body;

    //     await user.create({
    //         username,
    //         password
    //     });

    //     res.cookie('username', username, { secure: true});
    //     res.render('profile', { username });
    //    } else {
    //     res.send('Not added to the database!');
    //    }
    // },

    // login: async (req, res) =>{
    //     if (req.body.username && req.body.password) {
    //         const {username, password} = req.body;

    //         let User = await user.findOne({
    //             where: {username, password}
    //         });

    //         if (User) {
    //             req.session.user = User;
    //             res.render('profile', {username});
    //         } else {
    //             res.render('login');
    //         }
    //     }
    // },
};

module.exports = main;