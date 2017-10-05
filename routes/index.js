var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'express' });
});

router.get('/signup', function(req,res){
  res.render('signup', {})
})

router.get('/login', function(req,res){
  res.render('login', {})
})

module.exports = router;
