const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../config/authentication');



router.get('/',ensureAuthenticated, function(req,res){
 res.render('dashboard',{
   name : req.user.name
 });

});



module.exports = router;