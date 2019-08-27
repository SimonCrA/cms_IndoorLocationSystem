




const  ConstsDistancia = require("../../models/constantesdistancia")
            
exports.constantes = function (req, res, next){            
            let constantesDeBD = new ConstsDistancia({

                macRpi: req.body.macrpi,
                macTag: req.body.mactag,
                rssiProm: req.body.rssiprom,
                nPropagacion: req.body.n,
                desviacionEstandar: req.body.desvia,

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

}