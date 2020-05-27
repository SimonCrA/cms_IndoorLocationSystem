var express = require('express');
var router = express.Router();

// Require controller modules.
let apiModificar = require('../controladores/database/modifbd');

var r = require('../middlewares/autenticacion');


router.put ('/regions/:id', r.validarUpTech, apiModificar.regiones);

router.put('/regions/arrivalzone/:id', r.validarUpTech, apiModificar.regionArrival);

router.put ('/floors/:id', r.validarUpTech, apiModificar.pisos);

router.put ('/location/:id', r.validarUpTech, apiModificar.ubicacion);

router.put ('/ubicacionrpiselect',r.validarUpTech, apiModificar.ubicacionSelect);


router.put ('/tag_data/:id', r.validarUpTech, apiModificar.putTags);

// Asset

router.put ('/asset/:id', r.validarUpAsset, apiModificar.putActivo);

router.put ('/sales/:idAsset/:idTag', r.validarUpAsset,apiModificar.venderAuto); 

router.put('/service/:idAsset/:idTag', r.validarUpAsset, apiModificar.despacharServicio);



module.exports = router;