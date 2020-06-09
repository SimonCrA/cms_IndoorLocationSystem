var express = require('express');
var router = express.Router();

// Require controller modules.
var apiScanner = require('../controladores/database/scan');
var apiGuardardb = require('../controladores/database/guardarbd');


const r = require('../middlewares/autenticacion');


// guardar en base de datos desde RASPBERRYPI

// router.post('/rasp_data', apiScanner.dataRaspi);


router.post('/tag_data', r.validarPostTech, apiGuardardb.dataTag);


router.post('/rasp_data_c', apiGuardardb.rawCaracterizacion);

router.post('/alarmSettings', r.validarPostTech, apiGuardardb.saveAlarmSettings);

router.post ('/regions', r.validarPostTech, apiGuardardb.regiones);
router.post ('/floors', r.validarPostTech, apiGuardardb.pisos);
router.post ('/contstants', r.validarPostTech, apiGuardardb.constantes);
router.post ('/location',r.validarPostTech, apiGuardardb.ubicacion);


router.post ('/asset', r.validarPostAsset, apiGuardardb.activoPost);//
router.post('/newconstant', r.validarPostTech,apiGuardardb.newConstant);


module.exports = router;
