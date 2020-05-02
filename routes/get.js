var express = require('express');
var router = express.Router();
var r = require('../middlewares/autenticacion');
// Require controller modules.
var apiGet = require('../controladores/database/getdb');
const {IniciarContador } = require('../controladores/database/SaveDataToReports')

router.get('/regions', [r.Super_Role, r.Admin_Role, r.TechLeadRole, r.TechEmployeeRole], apiGet.region);
router.get('/floors', [r.Super_Role, r.Admin_Role, r.TechLeadRole, r.TechEmployeeRole], apiGet.pisos);
router.get('/location', [r.Super_Role, r.Admin_Role, r.TechLeadRole, r.TechEmployeeRole], apiGet.ubicacion);
router.get('/asset', [r.Admin_Role, r.Super_Role, r.TechLeadRole, r.TechEmployeeRole], apiGet.activoGet);
router.get('/tag_data', r.Admin_Role, apiGet.getTags);
router.get('/tag_data/false', [r.Super_Role, r.Admin_Role, r.TechLeadRole, r.TechEmployeeRole], apiGet.getTagsfalse);



/* *****************************************
*	Reportes
*	
/* *****************************************/
let premissions =[
    r.Super_Role, r.Admin_Role,
    r.TechLeadRole,r.TechEmployeeRole,
    r.SalesLeadRole,r.SalesEmployeeRole
    ]
router.get('/topten/:tipo/:order',premissions , apiGet.getTopTen);
router.get('/topsales/:order',premissions, apiGet.getTopTenSales); 
router.get('/saletime',premissions, apiGet.getSaleTime);
router.get('/servicetime',premissions, apiGet.getServiceTime);
router.get('/dealertime',premissions, apiGet.getDealerTime);
router.get('/timeactiverecive',premissions, apiGet.timeActiveRecive);
router.get('/nomotionasset',premissions, apiGet.getRegionTime);
router.get('/IniciarContador/:idactivo',premissions, IniciarContador);
router.get('/attendedbyseller',premissions, apiGet.getAtendidosbySeller);

//***************************************** */


router.get('/testing/:region', apiGet.test)
router.get('/counter', apiGet.contador); 

/* *****************************************
*	Buscar activos
*	
/* *****************************************/
router.get('/search/:item/:term', [r.Super_Role, r.Admin_Role, r.TechLeadRole], apiGet.searchAssets)

router.get('/assetsregion/:idregion', [r.Super_Role, r.Admin_Role, r.TechLeadRole], apiGet.searchAssetsRegion)


module.exports = router;