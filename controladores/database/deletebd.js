
const  InfoUbicacionRpi = require("../../models/ubicacion");
const Region = require ('../../models/zona')
const TagInfo = require ('../../models/tagInfo')
const Activo = require ('../../models/activo')

 
let regiones = (req, res, next)=>{

    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        status: false
    };
 
    Region.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, regionBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!regionBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "can't find this region"
                }
            });
        }

        res.json({
            ok: true,
            region: regionBorrado
        });

    });


}


let pisos = (req, res, next) => {
    
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        status: false
    };

    Region.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, floorBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (floorBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Can't find this floor"
                }
            });
        }

        res.json({
            ok: true,
            floor: floorBorrado
        });

    });
    
}

/* *****************************************
*	Activo
*	
/* *****************************************/

let deleteActivo = (req, res) => {

    let id = req.params.id;
    let cambiaEstado = {
        status: false
    }

    Activo.findByIdAndUpdate(id, cambiaEstado, {new: true,runValidators: true, useFindAndModify: false}, (err, activoInhabilitado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            asset: activoInhabilitado
        });

    });

}

/* *****************************************
*	Tags
*	
/* *****************************************/

let deleteTags = (req, res) => {

    let id = req.params.id;
    let cambiaEstado = {
        status: false
    }

    TagInfo.findByIdAndUpdate(id, cambiaEstado, {new: true, runValidators: true, useFindAndModify: false}, (err, tagInhabilitado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        console.log(tagInhabilitado);
        res.status(200).json({
            ok: true,
            tag: tagInhabilitado
        });

    });

}

let ubicacion = (req, res, next) => {
    
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        status: false
    };

    InfoUbicacionRpi.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, ubicacionBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!ubicacionBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'location not found'
                }
            });
        }

        res.json({
            ok: true,
            location: ubicacionBorrado
        });

    });



    
}


module.exports = {
    regiones,ubicacion,
    pisos, deleteActivo, deleteTags
}