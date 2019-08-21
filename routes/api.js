var express = require('express');
var router = express.Router();

// Require controller modules.
var apiScanner = require('../controladores/database/scan');
var apiConfigFile= require('../controladores/calculos/configfile/configfile');

// guardar en base de datos desde RASPBERRYPI
router.get('/dato/:datp',apiScanner.dato)

router.get('/rpi/:rssi/:macBeacon/:macRpi/:date/:beaconType/:sampleId', apiScanner.rpi);



router.get('/constantes/:region/:mactag', apiConfigFile.ejecucionFnEnSerie );




router.get('/constantes/zona/:edif/:piso/:oficina/:tipo', apiConfigFile.guardarzona );

router.get('/constantes/ubicacion/:edif/:macrpi', apiConfigFile.guardarubicacion );
router.get('/rawData/:macRpi/:macTag/:rssi/:distancia', apiScanner.guardarRawDataMuestras );





module.exports = router;
