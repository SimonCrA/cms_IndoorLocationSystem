const  ConstsDistancia = require("../../models/constantesdistancia");
const  InfoUbicacionRpi = require("../../models/ubicacion");
const Region = require ('../../models/zona')
const RawMuestras = require ('../../models/rawdatamuestras')
const TagInfo = require ('../../models/tagInfo')
const Activo = require ('../../models/activo')
const Alarmsettings = require('../../models/alarmSettings');
const {conversorP_M} = require('../variables')

/* *****************************************
*	Alarmas
*	
/* *****************************************/

let saveAlarmSettings = async (req, res, next) => {

    try {

        console.log(req.body);
        let batterymV = req.body.lowBatteryLevel*13;
        let batteryLevel = batterymV || 0;
        let tagLastSeen = req.body.tagLastSeen || 0;
        let gatewayLastSeen = req.body.gatewayLastSeen || 0;
        let idClient = req.body.idClient;

        console.log("ESTO ESTA FUNCIONANDO??");
        let refreshAlarmSettings = (dataToRefresh) => {

            return new Promise((resolve, reject) => {
                console.log("es hora de actualizar");

                let id = dataToRefresh[0]._id
                let body = {
                    lowBatteryLevel: batteryLevel,
                    tagLastSeen: tagLastSeen,
                    gatewayLastSeen: gatewayLastSeen,
                    idClient: idClient
                }
                console.log(body);

                Alarmsettings.findByIdAndUpdate(id, body, {
                    new: true,
                    runValidators: true
                }, (err, alarmSettingsUpdated) => {
                    console.log(alarmSettingsUpdated);
                    err
                        ?
                        reject(err) :

                        resolve(alarmSettingsUpdated)
                })


            })

        }

        let searchClient = (idClient) => {

            return new Promise((resolve, reject) => {

                console.log("BUSCAR client");

                Alarmsettings.find({
                    idClient: idClient
                }).exec((err, clientDB) => {
                    if (err) {
                        return reject(err)
                    }
                    if (Array.isArray(clientDB) && clientDB.length) {
                        return resolve({
                            ok: true,
                            clientDB
                        })
                    } else {
                        console.log("ESTO ES FALSE");

                        return resolve({
                            ok: false
                        })
                    }

                })
            })


        }

        let clientSearched = await searchClient(idClient);

        if (clientSearched.ok === false) {

            let alarmSettings = new Alarmsettings({
                lowBatteryLevel: batteryLevel,
                tagLastSeen: tagLastSeen,
                gatewayLastSeen: gatewayLastSeen,
                idClient: idClient
            });

            alarmSettings.save((err, DB) => {
                if (err) {
                    console.log(err);
                    return err;
                };
                if (DB) {
                    console.log(`guardó ${DB}`);
                    res.status(200).jsonp({
                        ok: true,
                        settingsUpdated: DB
                    })
                    
                }
            });

        } else if (clientSearched.ok === true) {
            let settingsUpdated = await refreshAlarmSettings(clientSearched.clientDB)

            res.status(200).jsonp({
                ok: true,
                settingsUpdated
            })
        }


       

    } catch (error) {
        console.log(error);
    }

}



let dataTag =  (req, res, next) =>{  
    console.log(req.body);
              
    let tagInfo = new TagInfo({
        
        mactag: req.body.mactag,
        name: req.body.name,
        type: req.body.type,
        status: false,
        temperature: 0,
        batteryLevel: 0

    }); 

    tagInfo.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        };
    
        console.log("guarde Esto:\n" + tagInfo + "\n");
        // Successful - redirect to new author record.	
        res.status(202).jsonp({
            ok: true,
            tagInfo
        });

    });

};
    
/* *****************************************
*	Constantes
*	
/* *****************************************/

let constantes =  (req, res, next) =>{            
    let constantesDeBD = new ConstsDistancia({

        macRpi: req.body.macrpi,
        macTag: req.body.mactag,
        rssiProm: req.body.rssiprom,
        propagationN: req.body.n,
        standardDeviation: req.body.desvia,
        idRegion:req.body.idregion,
        test: req.body.tests
    });

    constantesDeBD.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        };
    
        console.log("guarde Esto:\n" + constantesDeBD + "\n");
        // Successful - redirect to new author record.	
        res.status(202).jsonp({
            ok: true,
            constantesDeBD
        });

    });

};

/* *****************************************
*	Ubicación
*	
/* *****************************************/


let ubicacion = (req, res, next)=>{
    console.log(req.body);
  
    let location = req.body.location.toUpperCase()

    let ubicacion = new InfoUbicacionRpi({

        macRpi: req.body.macRpi,
        axis: req.body.axis,
        location: location,
        xpos: conversorP_M(req.body.xpos),
        ypos: conversorP_M(req.body.ypos),
        idZona: req.body.idZona,
        shared: req.body.shared 

    });

    ubicacion.save(function (err) {
        console.log(err);
        if (err) {
            console.log(err);
            return next(err);
        };

        console.log("guarde Esto:\n" + ubicacion + "\n");
        // Successful - redirect to new author record.	
        res.status(202).jsonp({
            ok: true,
            ubicacion
        });

    });

}

/* *****************************************
*	Regiones 
*	
/* *****************************************/


let regiones = (req, res, next) =>{
    console.log(req.body);
    
    let x = parseFloat(req.body.xbottomleft)
    let y = parseFloat(req.body.ybottomleft)

    let height = parseFloat(req.body.height)
    let width = parseFloat(req.body.width)

    let bl=[ x , y ]
    let  br=[width + x, y ]
    let tl=[x, height+y]
    let tr=[width+x, height+y]

console.log(conversorP_M(bl));

    let region = new Region({

        floorId:req.body.floorId,

        regionName:req.body.regionName,
        regionNumber:parseInt(req.body.regionNumber),
        height:conversorP_M(height),
        width:conversorP_M(width),
        bottomLeft:conversorP_M(bl) ,
        bottomRight:conversorP_M(br) ,
        topLeft:conversorP_M(tl) ,
        topRight:conversorP_M(tr) ,
        status: true,
        type: 'region'

    });

    region.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        };

        console.log("guarde Esto:\n" + region + "\n");
        // Successful - redirect to new author record.	
        res.status(202).jsonp({
            ok: true,
            region
        });

    });


}

/* *****************************************
*	Pisos
*	
/* *****************************************/


let pisos = (req, res, next) =>{

    console.log(req.body);

    let region = new Region({

        idLocation:req.body.idLocation  ,
        floorName: req.body.floorName,
        floorNumber: parseInt(req.body.floorNumber),
        // scale: parseInt(req.body.scale),
        plane:'',
        height: conversorP_M(parseFloat(req.body.height)) ,
        width: conversorP_M(parseFloat(req.body.width)) ,
        heightPixel:0,
        widthPixel:0,
        status: true,
        type:'floor'  

    });

    region.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        };

        console.log("guarde Esto:\n" + region + "\n");
        // Successful - redirect to new author record.	
        res.status(202).jsonp({
            ok: true,
            region
        });

    });


}

/* *****************************************
*	Activo
*	
/* *****************************************/


let activoPost = (req, res, next) =>{
    console.log(req.body);
    let idbeacon = req.body.idTag
    let activo = new Activo({

        name: req.body.name,
        VIN: parseInt(req.body.VIN),
        year: parseInt(req.body.year),
        model: req.body.model,
        color: req.body.color,
        status: req.body.status,
        idTag: req.body.idTag,
        type: req.body.type,
        description: req.body.description,
        client:req.body.client

    });

    activo.save((err, asset) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };


        let id = idbeacon;

        let body = {
            status: true
        }
       
        
        TagInfo.findByIdAndUpdate(id, body, {new:true, runValidators:true },(err, tag)=>{
            if(err){
                console.log(err);
            }
            console.log(tag);
            
            res.status(200).json({
                ok: true,
                asset
            });
        })



    });

}

/* *****************************************
*	caracterización
*	
/* *****************************************/


let rawCaracterizacion = (data) => { 

    // console.log(data);
    let rawMuestras ;
    for (let i = 0; i < data.length; i++) {
        
        rawMuestras = new RawMuestras({
    
            macRpi:data[i].macrpi,
            macTag:data[i].mactag,  
            rssi:parseInt(data[i].rssi),
            distance:parseInt(data[i].distancia)
            
        });
    
        rawMuestras.save(function (err) {
            if (err) {
                console.log('err');
                // return next(err);
            };
            // console.log(`Saved: ${JSON.stringify(rawMuestras, null, 2)}`);
            // Successful - redirect to new author record.	
        });
        
    }
    console.log(`Se guardaron (${data.length})`);
    // res.status(202).jsonp({
    //     ok: true,
    //     rawMuestras
    // });
}


let newConstant = async (req, res, next)=>{
    try {
        let body = req.body;

        console.log(body);

        let promise_tag = ()=>{
            return new Promise ((resolve, reject)=>{

                TagInfo.aggregate([
                   {
                    "$group": {
                        _id:"$mactag",
                        count: {
                            $sum: 1
                        }
                    }
                }])
                .exec((err, taginfo)=>{
                    err
                        ? reject(err) 
                        : resolve(taginfo)
                    
                })

            });
        }
        

        let promise_rpi = ()=>{
            return new Promise ((resolve, reject)=>{

                // InfoUbicacionRpi.aggregate([{
                //     $match: {
                //         idZona: `ObjectId("${body.regionid}")`       
                //     }
                // },
                // {
                //     "$group": {
                //         _id:"$macRpi",
                //         count: {
                //             $sum: 1
                //         }
                //     }
                // }])
                InfoUbicacionRpi.find({idZona:body.regionid})
                .exec((err, rpiinfo)=>{
                    err
                        ? reject(err) 
                        : resolve(rpiinfo)
                    
                })

            });
        }
        let getConstantes = () =>{
            return new Promise((resolve, reject)=>{
                ConstsDistancia.find({macRpi:body.macrpi, macTag:body.mactag, tipo:'generado'}).sort({_id:-1})
                .exec(function (err, data){
                    err 
                    ? reject(err) 
                    : resolve(data[0])
                });
    
            });
        }
        
        let resultTag = await promise_tag();
        let resultRPI = await promise_rpi();
        let resultConstants = await getConstantes();
        console.log(resultTag.length);
        console.log(resultRPI.length);
        console.log(resultConstants);

        
        for (let i = 0; i < resultTag.length; i++) {
            console.log(resultTag[i]._id);
            for (let j = 0; j < resultRPI.length; j++) {
                console.log(resultRPI[j].macRpi);
                let constantesDeBDs = new ConstsDistancia({

                    macRpi: resultRPI[j].macRpi,
                    macTag: resultTag[i]._id,
                    rssiProm: resultConstants.rssiProm,
                    propagationN: resultConstants.propagationN,
                    standardDeviation: resultConstants.standardDeviation,
                    idRegion:body.regionid,
                    type: 'established'

                });
                console.log(constantesDeBDs);
                constantesDeBDs.save(function (err) {
                    if (err) {
                        console.log(err);
                        return res.status(400).jsonp({err});
                    };
                
                    console.log("guarde en constantes:\n" + constantesDeBDs + "\n");
                    
                });
                
                
            }            
        }
        console.log(`Finished`);
        
        res.status(202).jsonp({
            ok: true
        });

    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    constantes,
    dataTag,
    ubicacion,
    regiones,
    rawCaracterizacion,
    pisos,
    activoPost,
    newConstant,
    saveAlarmSettings
}