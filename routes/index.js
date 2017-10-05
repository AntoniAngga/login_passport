const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'express' });
});

router.get('/signup', function(req,res){
  res.render('signup', {message: req.flash('signupMessage')})
})
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/login', function(req,res){
  res.render('login', {message: req.flash('loginMessage')})
})

router.get('/profile', isLoggedIn, function(req,res) {
  res.render('/profile', {
    user : req.user
  })
})

router.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/');
})

//middleware

function isLoggedIn (req,res,next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

module.exports = router;
