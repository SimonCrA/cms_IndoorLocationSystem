var express = require('express');
var router = express.Router();

// Require controller modules.
var apiScanner = require('../controladores/database/scan');
var apiGuardardb = require('../controladores/database/guardarbd');

// guardar en base de datos desde RASPBERRYPI

// router.post('/rasp_data', apiScanner.dataRaspi);
router.post('/tag_data', apiGuardardb.dataTag);


router.post('/rasp_data_c', apiGuardardb.rawCaracterizacion);


router.post ('/regiones', apiGuardardb.regiones);
router.post ('/pisos', apiGuardardb.pisos);
router.post ('/constantes', apiGuardardb.constantes);
router.post ('/ubicacion', apiGuardardb.ubicacion);
router.post ('/activo', apiGuardardb.activoPost);

router.post('/newconstant',apiGuardardb.newConstant)

module.exports = router;
