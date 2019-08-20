var express = require('express');
var router = express.Router();

// Require controller modules.
var apiScanner = require('../controladores/database/scan');

// guardar en base de datos desde RASPBERRYPI
router.get('/dato/:datp',apiScanner.dato)
router.get('/rpi/:rssi/:macBeacon/:macRpi/:date/:beaconType/:sampleId', apiScanner.rpi);




module.exports = router;
