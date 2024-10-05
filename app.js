const bodyParser =require('body-parser');
const express = require('express');
const routes = require ('./routes/contactroutes');
const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',routes);

app.listen(4000,()=>{
    console.log('server initialized at http://localhost:8002');
})