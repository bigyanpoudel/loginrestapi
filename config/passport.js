const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../model/user');



module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
          // Matching user
          User.findOne({
            email: email
          }).then(user => {
            if (!user) {
              return done(null, false, { message: 'The email is not registered' });
            }
    
            // Matching password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: 'Password Incorrect' });
              }
            });
          });
        })
      );
     //seralize and deseralize user
      passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
    };