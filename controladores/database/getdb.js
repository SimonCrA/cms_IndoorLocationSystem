
const InfoUbicacion = require('../../models/ubicacion');
const Region = require('../../models/zona')
const Graficar = require('../../models/graficar')
const Activo = require('../../models/activo');
const TagInfo = require ('../../models/tagInfo')

// const {ejecucionEnSerie} = require('../calculos/configfile/configfile');

const async = require('async');

/* *****************************************
*	Buscar Activos
*	
/* *****************************************/

let searchAssets = async (req, res) => {
    console.log("hola entre en buuscar activossss");
    try {
        let promise_Activo = () => {
            return new Promise((resolve, reject) => {

                let termino = req.params.termino; 
                let regex = new RegExp(termino, 'i')
            
            
                Activo.find({nombre: regex})
                    // .limit(5)
                    .populate('idTag')
                    .exec((err, ActivoBuscado) => {
            
                        err
                            ?
                            reject(err) :
                            resolve(ActivoBuscado);
            
                    });
            
 
            });

        }
        let promise_pointXY = (resultPromiseActivo)=>{
            return new Promise((resolve, reject) => {

                
                let idActivo = resultPromiseActivo.idTag.mactag
                // console.log(resultPromiseActivo);
                // console.log(idActivo);

                Graficar.find({idTag:idActivo})
                    .sort({_id:-1}).limit(1)
                    .exec((err, puntoBuscado) => {

                        if (err) {
                            reject({
                                ok: false,
                                err
                            })
                        };

                        if (!puntoBuscado) {
                            reject({
                                ok: false,
                                err: {
                                    mensaje: "there isn't any asset with that name"
                                }
                            });
                        };

                        // Graficar.countDocuments({idActivo}, (err, conteo) => {
                            resolve(puntoBuscado);
                        // });

                        
                    });  
                


                
            });
        }
        
        
        let arrayfinish =[]
        let js
        let resultPromiseActivo = await promise_Activo()
        // console.log(resultPromiseActivo);
        // console.log(`uno`);

        for (let i = 0; i < resultPromiseActivo.length; i++) {
            console.log(`vuelta ${i}`);
            
            let resultPromisePoint = await promise_pointXY(resultPromiseActivo[i]);
            // console.log(resultPromisePoint);
            js={activo: resultPromiseActivo[i], puntoXY: resultPromisePoint[0]}
            arrayfinish.push(js)
        }

        // console.log(JSON.stringify(arrayfinish, null, 2));

        if(arrayfinish[0]===undefined){
            return res.status(400).json({
                ok: true,
                err: {
                    mensaje: "there isn't any asset with that name"
                }
            });

        }else{

            return res.status(200).json({
                ok: true,
                activo: arrayfinish
            });
        }



        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ok:false, error})
        
    }
    
}

/* *****************************************
*	ZONA
*	
/* *****************************************/

let findZona = (req, res, next) => {
	
	// console.log(sample, mac, muestras)
	async.parallel({
		idzona: function(callback) {
            InfoUbicacion.aggregate([
            {
                "$group": {
                    _id:"$idZona",
                    count: {
                        $sum: 1
                    }
                }
            }])
            .exec(callback)
        },
		tags: function(callback) {
			TagInfo.find().select('mactag')
              .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
		// Successful, so render.
		
		console.log({'idzonas':results.idzona, 'tags':results.tags});
		res.status(200).jsonp({'idzonas':results.idzona, 'tags':results.tags});
		
    });

};
/* *****************************************
*	Region
*	
/* *****************************************/



let region = (req, res, next) =>{
        
    Region.find({ estatus: true, tipo:'region' })
        .populate('idPiso')

        .exec((err, region) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            
            res.json({
                ok: true,
                region
            });

        });

}

/* *****************************************
*	Activos
*	
/* *****************************************/


let activoGet = (req, res, next) =>{
        
    Activo.find({})
        .populate('idTag')
        .exec((err, activoBuscado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            
            res.status(200).json({
                ok: true,
                activoBuscado
            });

        });

}

/* *****************************************
*	Pisos
*	
/* *****************************************/


let pisos = (req, res, next) =>{
        
    Region.find({ estatus: true, tipo:'piso' })
        .populate('tagInfo')

        .exec((err, pisos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            
            res.json({
                ok: true,
                pisos
            });

        });

}


/* *****************************************
*	Ubicacion Rpi
*	
/* *****************************************/
let ubicacion = (req, res, next) =>{
        
    InfoUbicacion.find({ estatus: true })
        .populate('idZona')

        .exec((err,infoUbicacion ) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            
            res.json({
                ok: true,
                infoUbicacion
            });

        });

}


/* *****************************************
*	Ubicacion Rpi
*	
/* *****************************************/
let getTags = (req, res, next) =>{
        
    TagInfo.find()

        .exec((err,tagGuardado ) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            // console.log(tagGuardado);
            res.status(200).json({
                ok: true,
                tagGuardado
            });

        });

}



module.exports = {
    region,ubicacion,
    findZona,pisos,
    searchAssets,
    activoGet, getTags
}
