var express = require('express');
var router = express.Router();

// Require controller modules.
var apiGet = require('../controladores/database/getdb');


router.get('/region', apiGet.region);
router.get('/pisos', apiGet.pisos);

router.get('/ubicacion', apiGet.ubicacion);


module.exports = router;