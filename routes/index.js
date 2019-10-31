var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('in', { title: 'Express' });
});
router.get('/prueba', function(req, res, next) {
  res.render('indexCaracterizacion', { title: 'Express' });
});

module.exports = router;
