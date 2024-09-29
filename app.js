
const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/route');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', routes);
app.use(express.static('public'));

app.listen(1500, ()=>{
    console.log('server running pn http://localhost:1500');
})

