const con = require('../models/contactmodel');
const d = {
    index:(req,res)=>{
        res.render('index');
    },
    save:(req,res)=>{
        const data = req.body;
        con.create(data,(err)=>{
            if(err)throw err;
            res.redirect('/');
        });
    }
}