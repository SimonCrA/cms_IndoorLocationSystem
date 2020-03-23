var express = require('express');
var router = express.Router();

// Require controller modules.
let apiModificar = require('../controladores/database/modifbd');

router.put ('/regions/:id', apiModificar.regiones);

router.put('/regions/arrivalzone/:id', apiModificar.regionArrival);

router.put ('/floors/:id', apiModificar.pisos);

router.put ('/location/:id', apiModificar.ubicacion);

router.put ('/ubicacionrpiselect', apiModificar.ubicacionSelect);

router.put ('/asset/:id', apiModificar.putActivo);

router.put ('/tag_data/:id', apiModificar.putTags);

router.put ('/sales/:idAsset/:idTag', apiModificar.venderAuto);

router.put('/service/:idAsset/:idTag', apiModificar.despacharServicio);



module.exports = router;