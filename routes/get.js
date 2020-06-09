var express = require('express');
var router = express.Router();

var r = require('../middlewares/autenticacion');

const raw = require('../models/rawdatamuestras')
// Require controller modules.
var apiGet = require('../controladores/database/getdb');


const {IniciarContador } = require('../controladores/database/SaveDataToReports')

router.get('/regions', r.Validar_TechLead, apiGet.region);
router.get('/floors', r.Validar_TechLead, apiGet.pisos);
router.get('/location', r.Validar_TechLead, apiGet.ubicacion);
router.get('/tag_data', r.Validar_TechLead, apiGet.getTags);


router.get('/rw/:distance', (req, res, next)=>{
    let distanc= parseInt(req.params.distance)
    raw.find({macRpi:'dc:a6:32:0b:a2:6a', macTag:'c4:04:ca:41:50:ad',distance:distanc})
    .limit(100)
    .select('rssi')
    .sort({_id:-1})
    .exec((err, data)=>{
        if(err){res.status(400)}
        if(!data){res.status(402)}

        let rssisum = 0 
        for (let i = 0; i < data.length ; i++) {
            rssisum += data[i].rssi;
        };

        let rssiprom = rssisum / data.length;

        let desviacion = 0

        for (let i = 0; i < data.length; i++) {
            desviacion += Math.pow(data[i].rssi - rssiprom, 2);
        }
        let Varianza = (desviacion / data.length)
        let desviacionT = Math.sqrt(desviacion / data.length)

        res.status(200).jsonp({
            Varianza,
            desviacionT
        })
        
    })
})
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

