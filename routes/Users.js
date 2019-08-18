const express=require('express');
const router = express.Router();
const User = require('../model/user');
const passport =require('passport');
const bcrypt = require('bcryptjs');

const {forwardAuthenticated} = require('../config/authentication');

router.get('/goods',(req,res)=>{
    User.find().exec().then(doc=>{
        res.status(202).json(doc);
    }).catch(err=>{
     res.status(201).json(err);
    });
    });
    
    
    
    router.post('/list', (req, res) => {
        const user = new User({
         name : req.body.name,
         email : req.body.email,
         password: req.body.password
        });
        user.save().then( doc =>{
            console.log(doc);
            res.status(201).json(doc);
        }).catch(err=>{
            console.log(err);
        });
    });
    

    router.get('/login',forwardAuthenticated,function(req,res){
        res.render('login');
    });
    router.get('/register',forwardAuthenticated,function(req,res){
        res.render('register');
    });
    
    
    router.post('/register',function(req,res){
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
          
           User.findOne({email : email}).then(function(user){
               if(user)
               {
                   errors.push({ msg : ' user already exit'});
                   res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });

               } else{
                const user = new User({
                    name,
                    email,
                    password
                });
               //encrypting passport with hash
               bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(user.password,salt,function(err,hash){
                    if(err) throw err;
                    user.password = hash;
                    user.save()
                    .then(doc=>{
                        //flash message
                        req.flash('successmsg','you have successfully created and account');
                        res.redirect('/users/login')
                    })
                    .catch(err=>{ console.log(err)});
                });
            });
            
               }}
           );
       }
    });
    
    
    
//login handalling
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });
  
  // Logout  handalling
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('successmsg', 'You have successfully logged out');
    res.redirect('/users/login');
  });
  


module.exports = router;
