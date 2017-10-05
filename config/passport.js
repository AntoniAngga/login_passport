const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id,done) {
        User.findById(id, function(err,user) {
            done(err, user)
        })
    })

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req,email,password,done) {
        process.nextTick(function () {
            User.findOne({'local.email' : email}, function (err,user) {
                if(err) {
                    return done(err);
                }
                if(user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    let newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err) {
                        if(err) {
                            throw err
                        }
                        return done(null,newUser);
                    });
                }
            })
        })
    }));

}