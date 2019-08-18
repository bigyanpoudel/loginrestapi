require('./api/model/db');
var express = require('express');
var app = express();
var path = require('path');
var ejs =require('ejs');
var expressLayout = require('express-ejs-layouts');
const bodyparser = require('body-parser');






//ejs

app.set('view engine','ejs');

//static file
app.use('/cssfile',express.static(__dirname + '/css'));

//bodyparser
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());

//handlling cores error
app.use((req, res, next) => {
    res.header("Access-Comtrol-Allow-Orign","*");
    res.header("Access-Controll-Allow-Header","*");
    //origin x-request-with content-type accept authorization
    if(req.method === "OPTIONAL")
    {
        res.header("Access-Control-Allow-Method",'PUT,POST,DELET,PATCH');
        return res.status(200).json({});
    }
    next();
});




app.use('/users',require('./router/user'));




app.listen(3000,() => {
    console.log('App listening on port 3000!');
});