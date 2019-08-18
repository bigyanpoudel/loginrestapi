const mongoose = require('mongoose');
const mongodb = require('mongodb');


mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser : true},(err)=>{
    if(!err)
    {
        console.log('mongodb connection succeeded !');
    } else
    {
        console.log('error in db connection :' + err);
    }
});
mongoose.Promise = global.Promise;
require('./user');