
const  ConstsDistancia = require("../../models/constantesdistancia");
const  InfoUbicacionRpi = require("../../models/ubicacion");
const Region = require ('../../models/zona')
// const {findZona} = require ('../database/getdb')
            
let constantes =  (req, res, next) =>{            
            let constantesDeBD = new ConstsDistancia({

                macRpi: req.body.macrpi,
                macTag: req.body.mactag,
                rssiProm: req.body.rssiprom,
                nPropagacion: req.body.n,
                desviacionEstandar: req.body.desvia,
                idRegion:req.body.idregion

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


let ubicacion = (req, res, next)=>{
    

    let ubicacion = new InfoUbicacionRpi({

        macRpi: req.body.macrpi,
        axis: req.body.axis,
        xpos: req.body.xpos,
        ypos: req.body.ypos,
        idZona: req.body.idzona

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

let zona = (req, res, next) =>{

    let region = new Region({

        edificio: req.body.edificio,
        piso: req.body.piso,        
        oficina: req.body.oficina,
        tipodeZona: req.body.tipo

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

module.exports = {
    constantes,
    ubicacion,
    zona
}





