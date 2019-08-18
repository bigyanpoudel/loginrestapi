var express = require('express');

var myrouter = express.Router();
//for login
myrouter.post('/register',function(req,res){
    res.render('register');
});

//for register
myrouter.get('/register',function(req,res){
    res.render('register');
});


module.exports =myrouter;