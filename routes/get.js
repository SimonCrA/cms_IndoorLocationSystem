var express = require('express');
var router = express.Router();
var r = require('../middlewares/autenticacion');
// Require controller modules.
var apiGet = require('../controladores/database/getdb');
const {IniciarContador } = require('../controladores/database/SaveDataToReports')

router.get('/regions', r.Validar_TechLead, apiGet.region);
router.get('/floors', r.Validar_TechLead, apiGet.pisos);
router.get('/location', r.Validar_TechLead, apiGet.ubicacion);
router.get('/tag_data', r.Validar_TechLead, apiGet.getTags);



router.get('/asset', r.validarSearchAsset, apiGet.activoGet);





router.get('/tag_data/false', r.validarSearchAsset, apiGet.getTagsfalse);



/* *****************************************
*	Reportes
*	
/* *****************************************/

router.get('/topten/:tipo/:order', r.validarSearchAsset,apiGet.getTopTen);
router.get('/topsales/:order', r.validarSearchAsset,apiGet.getTopTenSales); 
router.get('/saletime', r.validarSearchAsset,apiGet.getSaleTime);
router.get('/servicetime', r.validarSearchAsset,apiGet.getServiceTime);
router.get('/dealertime', r.validarSearchAsset,apiGet.getDealerTime);
router.get('/timeactiverecive',r.validarSearchAsset, apiGet.timeActiveRecive);
router.get('/nomotionasset',r.validarSearchAsset, apiGet.getRegionTime);
router.get('/IniciarContador/:idactivo',r.validarSearchAsset, IniciarContador);
router.get('/attendedbyseller',r.validarSearchAsset, apiGet.getAtendidosbySeller);

router.get('/topten/:tipo/:order', r.validarSearchAsset,apiGet.getTopTen);




//***************************************** */


router.get('/testing/:region', apiGet.test) //?



router.get('/counter', r.validarSearchAsset, apiGet.contador); 

/* *****************************************
*	Buscar activos
*	
/* *****************************************/
router.get('/search/:item/:term',  r.validarSearchAsset,apiGet.searchAssets)

router.get('/assetsregion/:idregion', r.validarSearchAsset, apiGet.searchAssetsRegion)


module.exports = router;