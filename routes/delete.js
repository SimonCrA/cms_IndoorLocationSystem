var express = require('express');
var router = express.Router();

// Require controller modules.
var apidelete = require('../controladores/database/deletebd');

// router.put('/tag_data', apiModificar.dataTag);

 



router.delete('/regions/:id',apidelete.regiones)
router.delete('/floors/:id',apidelete.pisos)
router.delete('/location/:id',apidelete.ubicacion)
router.delete('/asset/:id', apidelete.deleteActivo);
router.delete('/tag_data/:id', apidelete.deleteTags);


module.exports = router;