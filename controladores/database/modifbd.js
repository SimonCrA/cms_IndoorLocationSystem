const  InfoUbicacionRpi = require("../../models/ubicacion");
const Region = require ('../../models/zona')
const RawMuestras = require ('../../models/rawdatamuestras')
const Activo = require ('../../models/activo')
const TagInfo = require ('../../models/tagInfo')
const ConstsDistancia = require('../../models/constantesdistancia');

const Toptensales = require('../../models/reportetoptenventas');

const {crearReporteVentas} = require('./SaveDataToReports');

const {conversorP_M} = require('../variables')



let {paramsValidacionCaract, globalDataGraphDos} = require('../variables')
const async = require('async');
const _ = require('underscore');


let regiones = (req, res, next) => {
    
    console.log(req.params);
    
    console.log(req.body);
    let x = parseFloat(req.body.xbottomleft)
    let y = parseFloat(req.body.ybottomleft)

    let alto = parseFloat(req.body.alto)
    let ancho = parseFloat(req.body.ancho)


    let bl=[ x , y ]
   let  br=[ancho + x, y ]
    let tl=[x, alto+y]
    let tr=[ancho+x, alto+y]
    
    let id = req.params.id;
    let body = {
        floorId: req.body.floorId,
        regionName: req.body.regionName,
        regionNumber: req.body.regionNumber,
        bottomLeft: conversorP_M(bl),
        bottomRigth: conversorP_M(br),
        topLeft:conversorP_M( tl),
        topRight: conversorP_M(tr),
        alto:conversorP_M(alto),
        ancho:conversorP_M(ancho)
    }


    
    Region.findByIdAndUpdate(id, body, {new:true, runValidators:true },(err, regiondb)=>{
        console.log(regiondb);
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            Region: regiondb
        })

    })

}

let regionArrival = async (req, res, next) => {

    let id = req.params.id

    
    
    let searchLocation = (id)=>{
        return new Promise((resolve,reject)=>{
            
            Region.find({_id:id})
            .populate([{
                path:'idPiso',
                model:'zona',
                select:'idLocation'
            }])

            .exec((er, locatio)=>{

                if(er){
                    return reject(er)
                }
                return resolve(locatio[0])
            })
            
        })
    }

    let respons = await searchLocation(id)

    let body = {
        arrivalZone: true,
        idLocation:respons.idPiso.idLocation
        
    }
    Region.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, regiondb) => {
        console.log(regiondb);
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            Region: regiondb
        })

    })

}

let pisos = (req, res, next) => {

    console.log(`SOY PISOS NO REGION STUPIDA!!`);
    console.log(req.body);
    let body1 = req.body

    body1.alto = conversorP_M(body1.alto)
    body1.ancho = conversorP_M(body1.ancho)


    let id = req.params.id;

    let body = _.pick(req.body, ['idLocation', 'floorName', 'floorNumber', 'width', 'height']);
    
    Region.findByIdAndUpdate(id, body, {new:true, runValidators:true },(err, regiondb)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        console.log(regiondb);
        res.json({
            ok:true,
            Region: regiondb
        })

    })

}
 
let putTags = (req, res, next) => {
    console.log(req.body);
    console.log("holaaaaa estoy aquiiiii");
    let id = req.params.id;
    console.log(id);
    let body = _.pick(req.body, ['name', 'type', 'mactag']);

    
    TagInfo.findByIdAndUpdate(id, body, {new:true, runValidators:true, useFindAndModify: false },(err, tagModificado)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.status(200).json({
            ok:true,
            tagModificado
        })

    })

}

let putActivo = (req, res) => {

    let id = req.params.id;
    // let body = req.body;
    let body = _.pick(req.body, ['name', 'type','VIN', 'year', 'model', 'color', 'description']);

    Activo.findByIdAndUpdate(id, body, {new: true,runValidators: true,useFindAndModify: false}, (err, activoModificado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        };
        if (!activoModificado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Can't find this asset"
                }
            });
        };

        res.status(200).json({
            ok: true,
            asset: activoModificado
        }); 

    });

}

let ubicacion = (req, res, next) => {

    

    let id = req.params.id;

    let body = _.pick(req.body,['macRpi','axis','xpos','ypos', 'compartido', 'idZona', 'ubicacion']) ;

    
    InfoUbicacionRpi.findByIdAndUpdate(id, body, {new:true, runValidators:true },(err, ubicacion)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            location: ubicacion
        })

    })


}

let ubicacionSelect = async(req, res, next) => {

try{
    globalDataGraphDos =  [
        {
            name: 'rssi',
            data:[{x:1, y:1}
            ]
            }
    ];


    console.log(globalDataGraphDos);
    console.log(req.body);

    let getConstantes = () =>{
        return new Promise((resolve, reject)=>{
            ConstsDistancia.find({macRpi:req.body.macrpi, macTag:req.body.mactag, type:'generado'}).sort({_id:-1})
            .exec(function (err, data){
                err 
                ? reject(err) 
                : resolve(data[0])
            });

        });
    }

    let promesa_id_Const = () =>{
        return new Promise((resolve, reject) => {

            ConstsDistancia.aggregate([{
            $match: {
                type: 'seleccionado',
                idRegion:req.body.regionid

            }
        },
        {
            "$group": {
                _id:"$_id",
                count: {
                    $sum: 1
                }
            }
        }])
        .exec( (err, agregate_id_Const) =>{
            err
                ?
                reject(err) :
                resolve(agregate_id_Const);
            });
    
        });
    }

    


    let result = await getConstantes();
    let result2 = await promesa_id_Const();
    // console.log(result2);
    // console.log(result);
    // result.length
    // return res.status(200).json({ok:true,
    // result, result2})

    for (let i = 0; i < result2.length; i++) {
        
        let id = result2[i]._id;
    
        let body = _.pick(result,['rssiProm','propagationN','standardDeviation']) ;
        // console.log(id);
        
        ConstsDistancia.findByIdAndUpdate(id, body, {new:true, runValidators:true },(err, ubicacionS)=>{
    
            if(err){
                
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            // console.log(ubicacionS);
    
        })
        
    }

	paramsValidacionCaract[0].mostrarGrafica = true

    return res.status(200).json({
        ok:true
    })

}catch(e){
    console.log(e);
}

}

let venderAuto = (req, res, next) =>{

    let idAsset = req.params.idAsset;
    let idTag = req.params.idTag;
    console.log(`activo: ${idActivo}\nTag:${idTag}`);


    let tagStatus = {
        status: false,
        
    }
    let activoStatus = {
        // idTag: "a2a2a2a2a2a2a2a3a3a3a3a3",
        status: false,
        $unset: {idTag:""},
        endDate: new Date().getTime()

    }

    
    
    async.parallel({
        activo: function (callback) {
            Activo.findByIdAndUpdate(idAsset, activoStatus, {
                    new: true,
                    runValidators: true,
                    
                },
                (callback)
                )
        },
        tags: function (callback) {
            TagInfo.findByIdAndUpdate(idTag, tagStatus, {
                    new: true,
                    runValidators: true
                },
                (callback)
            )

        }
    }, function (err, results) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            crearReporteVentas(results.activo);

            res.status(200).jsonp({
                'asset': results.activo,
                'tag': results.tags
            });

        
    });

}

let despacharServicio = (req, res, next) =>{

    let idAsset = req.params.idAsset;
    let idTag = req.params.idTag;


    let tagStatus = {
        status: false,

    }
    let activoStatus = {
        // idTag: "a2a2a2a2a2a2a2a3a3a3a3a3", 
        status: false,
        $unset: {
            idTag: ""
        },
        endDate: new Date().getTime()

    }



    async.parallel({
        activo: function (callback) {
            Activo.findByIdAndUpdate(idAsset, activoStatus, {
                    new: true,
                    runValidators: true,

                },
                (callback)
            )
        },
        tags: function (callback) {
            TagInfo.findByIdAndUpdate(idTag, tagStatus, {
                    new: true,
                    runValidators: true
                },
                (callback)
            )

        }
    }, function (err, results) {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.status(200).jsonp({
            'asset': results.activo,
            'tag': results.tags
        });


    });


}

module.exports = {
    regiones,
     pisos, 
     ubicacion, 
     ubicacionSelect,
      putActivo, 
      putTags, 
      venderAuto,
      despacharServicio,
      regionArrival
}





