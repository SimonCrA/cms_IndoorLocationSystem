
const InfoUbicacion = require('../../models/ubicacion');
const TagInfo = require('../../models/tagInfo');
const {ejecucionEnSerie} = require('../calculos/configfile/configfile');

const Region = require ('../../models/zona')

const async = require('async');

let searchAssets = (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i')


    TagInfo.find({nombre: regex})
        .exec((err, tagBuscado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            if (!tagBuscado) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        mensaje: "there isn't any asset with that name"
                    }
                });
            };

            TagInfo.countDocuments({name: regex}, (err, conteo) => {

                res.json({
                    ok: true,
                    activo: tagBuscado,
                    cantidad: conteo
                });

            });

        });

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