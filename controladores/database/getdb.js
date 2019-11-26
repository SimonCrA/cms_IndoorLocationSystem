
const InfoUbicacion = require('../../models/ubicacion');
const Activo = require('../../models/activo');
const {ejecucionEnSerie} = require('../calculos/configfile/configfile');
const Region = require('../../models/zona')
const Graficar = require('../../models/graficar')

const async = require('async');

/* *****************************************
*	Buscar Activos
*	
/* *****************************************/

let searchAssets = async (req, res) => {
    try {
        let promise_Activo = () => {
            return new Promise((reject, resolve)=>{
                let termino = req.params.termino; 
                let regex = new RegExp(termino, 'i')
            
            
                Activo.find({nombre: regex})
                    .limit(5)
                    .populate('taginfo')
                    .exec((err, ActivoBuscado) => {
            
                        if (err) {
                            return reject({ok:false, err})
                        };
            
                        if (!ActivoBuscado) {
                            return reject({
                                ok:false,
                                err:{mensaje:"there isn't any asset with that name"}
                            })
                        };
            
                        Activo.countDocuments({name: regex}, (err, conteo) => {
                            return resolve({ok: true,
                                    activo: ActivoBuscado,
                                    cantidad: conteo})
                        });
            
                    });
            
 
            });

        }
        let promise_pointXY = (resultPromiseActivo)=>{
            return new Promise((reject, resolve)=>{
                
                for (let i = 0; i < resultPromiseActivo.length; i++) {
                    let idActivo = resultPromiseActivo.activo.idTag[i];
                    console.log(resultPromiseActivo);
                    console.log(idActivo);

                    Graficar.findById({idActivo})
                        .exec((err, puntoBuscado) => {

                            if (err) {
                                return reject({
                                    ok: false,
                                    err
                                })
                            };

                            if (!ActivoBuscado) {
                                return reject({
                                    ok: false,
                                    err: {
                                        mensaje: "there isn't any asset with that name"
                                    }
                                });
                            };

                            Graficar.countDocuments({idActivo}, (err, conteo) => {
                                return resolve({
                                    ok: true,
                                    punto: puntoBuscado,
                                    activo: resultPromiseActivo[i],
                                    cantidad: conteo,

                                });
                            });

                            
                        });  
                }


                
            });
        }
        
        
        let resultPromiseActivo = await promise_Activo();
        
        let resultPromisePoint = await promise_pointXY(resultPromiseActivo);

        console.log(resultPromisePoint);
        



        return res.status(200).json({
            ok: true,
            activo: resultPromisePoint
        });
        
    } catch (error) {
        console.log(error);
        
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
		
		
		res.status(200).jsonp({'idzonas':results.idzona, 'tags':results.tags});
		
    });

};


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


let pisos = (req, res, next) =>{
        
    Region.find({ estatus: true, tipo:'piso' })
        .populate('idLocation')

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



module.exports = {
    region,ubicacion,
    
    findZona,pisos,
    searchAssets
}