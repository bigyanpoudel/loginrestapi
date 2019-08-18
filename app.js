require('./model/database');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const flash = require('connect-flash');
const session = require('express-session');
const passport =require('passport');
//bodyparser
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
//ejs
app.set('view engine','ejs');

//passport config
require('./config/passport')(passport);

//sesssion middleware
app.use(session({
    secret: 'secrets',
    resave: true,
    saveUninitialized: true,
    
  }));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


  //flash-connect middleware
  app.use(flash());
 

  //global varables
  app.use((req,res,next)=>{
      res.locals.successmsg = req.flash('successmsg');
      res.locals.errormsg = req.flash('errormsg');
      res.locals.error = req.flash('error');
      next();
  });

//handling error
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

//route handalling
app.use('/dashboard',require('./routes/index'));
app.use('/users',require('./routes/Users'));












app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
