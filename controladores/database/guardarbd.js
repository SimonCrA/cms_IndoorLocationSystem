
const  ConstsDistancia = require("../../models/constantesdistancia");
const  InfoUbicacionRpi = require("../../models/ubicacion");
const Region = require ('../../models/zona')
const RawMuestras = require ('../../models/rawdatamuestras')
const TagInfo = require ('../../models/tagInfo')
const Activo = require ('../../models/activo')

const {conversorP_M} = require('../variables')


let dataTag =  (req, res, next) =>{  
    console.log(req.body);
              
    let tagInfo = new TagInfo({
        
        mactag: req.body.mactag,
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        estado:false,
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
    console.log(req.body);
  
    let ubicaciones = req.body.ubicacion.toUpperCase()

    let ubicacion = new InfoUbicacionRpi({

        macRpi: req.body.macRpi,
        axis: req.body.axis,
        ubicacion: ubicaciones,
        xpos: conversorP_M(req.body.xpos),
        ypos: conversorP_M(req.body.ypos),
        idZona: req.body.idZona,
        compartido: req.body.compartido

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

    let region = new Region({

        idPiso:req.body.idPiso  ,

        nombreRegion:req.body.nombreRegion   ,
        numeroRegion:parseInt(req.body.numeroRegion)   ,

        bottomLeft:conversorP_M(parseFloat(req.body.bottomLeft)) ,
        bottomRigth:conversorP_M(parseFloat(req.body.bottomRigth)) ,
        topLeft:conversorP_M(parseFloat(req.body.topLeft)) ,
        topRight:conversorP_M(parseFloat(req.body.topRight)) ,
        
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

    console.log(req.body);

    let region = new Region({

        idLocation:req.body.idLocacion  ,

        nombrePiso:req.body.nombrePiso   ,
        numeroPiso:parseInt(req.body.numeroPiso)   ,

        plano:'',
        alto: parseInt(req.body.alto) ,
        ancho: parseInt(req.body.ancho) ,
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
    let idbeacon = req.body.idTag
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


        let id = idbeacon;

        let body = {
            estado:true
        }
       
        
        TagInfo.findByIdAndUpdate(id, body, {new:true, runValidators:true },(err, tag)=>{
            if(err){
                console.log(err);
            }
            console.log(tag);
            
            res.status(200).json({
                ok: true,
                activoCreado
            });
        })



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