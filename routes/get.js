var express = require('express');
var router = express.Router();



// Require controller modules.
var apiGet = require('../controladores/database/getdb');

const { verificartoken, verificarAdmin_Role, verificarSuper_Role ,verificarSuperAll_Role, } = require('../middlewares/autenticacion');


router.get('/region', apiGet.region);
router.get('/pisos', apiGet.pisos);

router.get('/ubicacion', apiGet.ubicacion);
router.get('/activo', apiGet.activoGet);
router.get('/tag_data', apiGet.getTags);
router.get('/topten/:tipo/:order', apiGet.getTopTen);
router.get('/topsales/:order', apiGet.getTopTenSales); 



/* *****************************************
*	Buscar activos
*	
/* *****************************************/
router.get('/buscar/:item/:termino', apiGet.searchAssets)


module.exports = router;