var express = require('express');
var router = express.Router();

// Require controller modules.
var apidelete = require('../controladores/database/deletebd');

// router.put('/tag_data', apiModificar.dataTag);



var r = require('../middlewares/autenticacion');



router.delete('/regions/:id', r.validarPostTech, apidelete.regiones)
router.delete('/floors/:id',r.validarPostTech, apidelete.pisos)
router.delete('/location/:id',r.validarPostTech, apidelete.ubicacion)
router.delete('/asset/:id', r.validarPostTech, apidelete.deleteActivo);
router.delete('/tag_data/:id', r.validarPostTech, apidelete.deleteTags);


module.exports = router;