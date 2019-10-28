var express = require('express');
var router = express.Router();

// Require controller modules.
var apiScanner = require('../controladores/database/scan');
var apiConfigFile= require('../controladores/calculos/configfile/configfile');
var apiZona= require('../controladores/database/getdb');


// guardar en base de datos desde RASPBERRYPI



router.get('/dato/:datp',apiScanner.dato)

router.get('/rpi/:rssi/:macBeacon/:macRpi/:/:beaconType/:sampleId', apiScanner.rpi);

router.get('/configuracion/:mactag/:region/:cantm', apiConfigFile.ejecucionEnSerie);


router.get('/cambiarvariable/:derror',apiScanner.cambiar )

router.get('/cambiarvariable2', apiScanner.cambiar2 )


router.get('/zona', apiZona.findZona);

router.get('/fileconfig/:zona/:tags/:cantmuestras', apiConfigFile.ejecucionEnSerie);


// router.get('/constantes/zona/:edif/:piso/:oficina/:tipo', apiConfigFile.guardarzona );

// router.get('/constantes/ubicacion/:edif/:macrpi', apiConfigFile.guardarubicacion );


// router.get('/rawdatam/:macRpi/:mactag/:distancia', apiScanner.guardarRawDataMuestras );





module.exports = router;
