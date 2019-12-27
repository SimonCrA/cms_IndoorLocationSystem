
const  ConstsDistancia = require("../../models/constantesdistancia");
const  InfoUbicacionRpi = require("../../models/ubicacion");
const Region = require ('../../models/zona')
const RawMuestras = require ('../../models/rawdatamuestras')
const TagInfo = require ('../../models/tagInfo')
const Activo = require ('../../models/activo')


let dataTag =  (req, res, next) =>{  
              
    let tagInfo = new TagInfo({
        
        mactag: req.body.mactag,
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        estado:req.body.estado

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
        nPropagacion: req.body.n,
        desviacionEstandar: req.body.desvia,
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
    

    let ubicacion = new InfoUbicacionRpi({

        macRpi: req.body.macrpi,
        axis: req.body.axis,
        xpos: req.body.xpos,
        ypos: req.body.ypos,
        idZona: req.body.idzona,
        compartido: req.body.idzonaCompartido

    });

    ubicacion.save(function (err) {
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

    let region = new Region({

        idPiso:req.body.idPiso  ,

        // nombrePiso:req.body.nombrePiso   ,
        // numeroPiso:parseInt(req.body.numeroPiso)   ,

        nombreRegion:req.body.nombreRegion   ,
        numeroRegion:parseInt(req.body.numeroRegion)   ,

        largo:parseFloat(req.body.largo)   ,
        ancho:parseFloat(req.body.ancho),
        estatus: true,
        tipo:'region'  

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
    // console.log(req.body);

    let region = new Region({

        idLocation:req.body.idLocacion  ,

        nombrePiso:req.body.nombrePiso   ,
        numeroPiso:parseInt(req.body.numeroPiso)   ,

        plano:req.body.plano ,
        estatus: true,
        tipo:'piso'  

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
    // console.log(req.body);

    let activo = new Activo({

        nombre: req.body.nombre,
        VIN: parseInt(req.body.VIN),
        anio: parseInt(req.body.anio),
        modelo: req.body.modelo,
        color: req.body.color,
        estado: req.body.estado,
        idTag: req.body.idTag,
        tipo: req.body.tipo,
        descripcion: req.body.descripcion

    });

    activo.save((err, activoCreado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.status(200).json({
            ok: true,
            activoCreado
        });

    });

}

/* *****************************************
*	caracterización
*	
/* *****************************************/


let rawCaracterizacion = (data) => {

    // console.log(req.body);
    let rawMuestras ;
    for (let i = 0; i < data.length; i++) {
        
        rawMuestras = new RawMuestras({
    
            macRpi:data[i].macrpi,
            macTag:data[i].mactag,  
            rssi:parseInt(data[i].rssi),
            distancia:parseInt(data[i].distancia)
            
        });
    
        rawMuestras.save(function (err) {
            if (err) {
                console.log(err);
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

                TagInfo.aggregate([{
                    $match: {
                        estado: true        
                    }
                },
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
                    nPropagacion: resultConstants.nPropagacion,
                    desviacionEstandar: resultConstants.desviacionEstandar,
                    idRegion:body.regionid,
                    tipo:'established'

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
    newConstant
}















// /* 1 */
// {
    
//     "estatus" : false,
//     "macRpi" : "b8:27:eb:bd:36:61",
//     "axis" : "x",
//     "xpos" : 6,
//     "ypos" : 0,
//     "idZona" : "5dbdd4d35faeb2211cf84e5e",
//     "__v" : 0
// }

// /* 2 */
// {
    
//     "estatus" : false,
//     "macRpi" : "b8:27:eb:de:9f:60",
//     "axis" : "o",
//     "xpos" : 0,
//     "ypos" : 0,
//     "idZona" : "5dbdd4d35faeb2211cf84e5e",
//     "__v" : 0
// }

// /* 3 */
// {
    
//     "estatus" : false,
//     "macRpi" : "b8:27:eb:d4:04:c9",
//     "axis" : "y",
//     "xpos" : 0,
//     "ypos" : 6,
//     "idZona" : "5dbdd4d35faeb2211cf84e5e",
//     "__v" : 0
// }

// /* 4 */
// {
    
//     "estatus" : false,
//     "macRpi" : "dc:a6:32:0b:97:a7",
//     "axis" : "y",
//     "xpos" : 0,
//     "ypos" : 6,
//     "idZona" : "5dbdd5035faeb2211cf84e5f",
//     "__v" : 0
// }

// /* 5 */
// {
    
//     "estatus" : false,
//     "macRpi" : "dc:a6:32:0b:a2:6a",
//     "axis" : "o",
//     "xpos" : 0,
//     "ypos" : 0,
//     "idZona" : "5dbdd5035faeb2211cf84e5f",
//     "__v" : 0
// }

// /* 6 */
// {
    
//     "estatus" : false,
//     "macRpi" : "dc:a6:32:0b:a2:be",
//     "axis" : "x",
//     "xpos" : 6,
//     "ypos" : 0,
//     "idZona" : "5dbdd5035faeb2211cf84e5f",
//     "__v" : 0
// }

// /* 7 */






























// {
    
//     "estatus" : false,
//     "macRpi" : "dc:a6:32:0b:a2:6a",
//     "axis" : "o",
//     "xpos" : 0,
//     "ypos" : 0,
//     "idZona" : "5dd1ab5465597324382a8a1f",
//     "__v" : 0
// }

// /* 14 */
// {
    
//     "estatus" : false,
//     "macRpi" : "dc:a6:32:0b:a2:be",
//     "axis" : "y",
//     "xpos" : 0,
//     "ypos" : 2.8,
//     "idZona" : "5dd1ab5465597324382a8a1f",
//     "__v" : 0
// }

// /* 15 */
// {
    
//     "estatus" : false,
//     "macRpi" : "dc:a6:32:0b:a5:e6",
//     "axis" : "x",
//     "xpos" : 2.8,
//     "ypos" : 0,
//     "idZona" : "5dd1ab5465597324382a8a1f",
//     "__v" : 0
// }

// /* 16 */
// {
    
//     "estatus" : false,
//     "macRpi" : "b8:27:eb:de:9f:60",
//     "axis" : "o",
//     "xpos" : 0,
//     "ypos" : 0,
//     "idZona" : "5dd1ab8265597324382a8a20",
//     "__v" : 0
// }

// /* 17 */
// {
    
//     "estatus" : false,
//     "macRpi" : "b8:27:eb:bd:36:61",
//     "axis" : "y",
//     "xpos" : 0,
//     "ypos" : 2.9,
//     "idZona" : "5dd1ab8265597324382a8a20",
//     "__v" : 0
// }

// /* 18 */
// {
    
//     "estatus" : false,
//     "macRpi" : "b8:27:eb:d4:04:c9",
//     "axis" : "x",
//     "xpos" : 2.6,
//     "ypos" : 0,
//     "idZona" : "5dd1ab8265597324382a8a20",
//     "__v" : 0
// }