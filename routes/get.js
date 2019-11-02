var express = require('express');
var router = express.Router();

// Require controller modules.
var apiGet = require('../controladores/database/getdb');

const { verificartoken, verificarAdmin_Role, verificarSuper_Role } = require('../middlewares/autenticacion');


router.get('/region', apiGet.region);
router.get('/pisos', apiGet.pisos);

router.get('/ubicacion', apiGet.ubicacion);

/* *****************************************
*	Buscar activos
*	
/* *****************************************/
app.get('/usuario/buscar/:termino', [verificartoken, verificarSuperAll_Role, verificarAdmin_Role], apiGet.searchAssets)


module.exports = router;