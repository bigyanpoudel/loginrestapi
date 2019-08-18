
var express = require('express');
const bcrypt =require('bcryptjs');
const mongoose = require('mongoose');
const People = require('../api/model/index');


var myrouter = express.Router();
myrouter.post('/listdata',(req,res)=>{
   const people = new People({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
   }) ;
   people.save().then(doc => {
       console.log(doc);
       res.status(201).json(doc);
   }).catch(err=>{
  console.log(err);
  res.status(404).json(err);
   });
});

myrouter.get('/login',function(req,res){
    res.render('login');
});
myrouter.get('/register',function(req,res){
    res.render('register');
});


myrouter.post('/register',function(req,res){
    const { name, email,password,password2} = req.body;
    let errors = [];

    //validation for fill
    if(!name || !password || !email || !password2)
    {
        errors.push({ msg :' Please fill in all the field'});
    }
    //validation for password match
    if( password !== password2)
    {
        errors.push({msg : 'password not matched'});
    }
    
    //valitaion for password length
    if( password.length < 6 )
    {
        errors.push({msg : 'Please enter password greater then 6 character'});
    }

    if(errors.length > 0)
    {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }else
   {
       res.send('done');
   }
});


module.exports = myrouter;