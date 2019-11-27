var express = require('express');
var router = express.Router();

console.log("Segunda prueba tonta");
// Require controller modules.
let apiModificar = require('../controladores/database/modifbd');

router.put ('/regiones/:id', apiModificar.regiones);

router.put ('/pisos/:id', apiModificar.pisos);

router.put ('/ubicacion/:id', apiModificar.ubicacion);

router.put ('/ubicacionrpiselect', apiModificar.ubicacionSelect);

router.put ('/activo/:id', apiModificar.putActivo);

router.put ('/tag_data/:id', apiModificar.putTags);


module.exports = router;