var express = require('express');
var router = express.Router();

// Require controller modules.
var apidelete = require('../controladores/database/deletebd');

// router.put('/tag_data', apiModificar.dataTag);

 



router.delete('/regiones/:id',apidelete.regiones)
router.delete('/pisos/:id',apidelete.pisos)
router.delete('/ubicacion/:id',apidelete.ubicacion)
router.delete('/activo/:id', apidelete.deleteActivo);
router.delete('/tag_data/:id', apidelete.deleteTags);


module.exports = router;