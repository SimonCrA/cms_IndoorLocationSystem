var express = require('express');
var router = express.Router();

// Require controller modules.
var apiModificar = require('../controladores/database/modifbd');
var apidelete = require('../controladores/database/deletebd');

// router.put('/tag_data', apiModificar.dataTag);





router.put ('/regiones/:id', apiModificar.regiones);

router.put ('/pisos/:id', apiModificar.pisos);

router.put ('/ubicacion/:id', apiModificar.ubicacion);

router.put ('/ubicacionrpiselect', apiModificar.ubicacionSelect);


module.exports = router;