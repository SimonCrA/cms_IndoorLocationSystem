var express = require('express');
var router = express.Router();

// Require controller modules.
var apiModificar = require('../controladores/database/modifbd');
var apidelete = require('../controladores/database/deletebd');

// router.put('/tag_data', apiModificar.dataTag);





router.delete('/regiones/:id',apidelete.regiones)
router.delete('/pisos/:id',apidelete.pisos)
router.delete('/ubicacion/:id',apidelete.ubicacion)

module.exports = router;