var express = require('express');
var router = express.Router();

// Require controller modules.
let apiModificar = require('../controladores/database/modifbd');

router.put ('/regiones/:id', apiModificar.regiones);

router.put ('/pisos/:id', apiModificar.pisos);

router.put ('/ubicacion/:id', apiModificar.ubicacion);

router.put ('/ubicacionrpiselect', apiModificar.ubicacionSelect);

router.put ('/activo/:id', apiModificar.putActivo);

router.put ('/tag_data/:id', apiModificar.putTags);

router.put ('/ventas/:idActivo/:idTag', apiModificar.venderAuto);

router.put('/servicio/:idActivo/:idTag', apiModificar.despacharServicio);



module.exports = router;