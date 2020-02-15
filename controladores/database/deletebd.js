
const  InfoUbicacionRpi = require("../../models/ubicacion");
const Region = require ('../../models/zona')
const TagInfo = require ('../../models/tagInfo')
const Activo = require ('../../models/activo')

 
let regiones = (req, res, next)=>{

    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estatus: false
    };
 
    Region.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });


}


let pisos = (req, res, next) => {
    
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estatus: false
    };

    Region.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
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
        estado: false
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
            activoInhabilitado
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
        estado: false
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
            tagInhabilitado
        });

    });

}

let ubicacion = (req, res, next) => {
    
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estatus: false
    };

    InfoUbicacionRpi.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });



    
}


module.exports = {
    regiones,ubicacion,
    pisos, deleteActivo, deleteTags
}