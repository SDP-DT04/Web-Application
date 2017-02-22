var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('yo');
  res.render('home');
});

module.exports = router;
