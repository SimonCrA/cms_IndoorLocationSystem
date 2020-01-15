var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/caracterizacion', function(req, res, next) {
  res.render('in', { title: 'Express' });
});
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
