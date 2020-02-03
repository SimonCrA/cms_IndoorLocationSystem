    const express = require('express');
    const app = express();
    const User = require('../models/usuario');
    const Client = require('../models/client');
    const Zona = require('../models/zona');
    let fs = require('fs');
    let path = require('path');
    
    //default options
    
    
    let uploadFile = (req, res) =>{
        let tipo = (req.params.tipo).toLowerCase();
        let id = req.params.id;
        if (!req.files){
            return res.status(400).json({
            ok: false,
            err: {
                mensaje: 'No se ha seleccionado ningún archivo'
            }
        });
    };
    
    //valida tipo
    let tiposValidos = ['clients', 'usuarios', 'maps'];
    
    if (tiposValidos.indexOf( tipo ) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                mensaje: 'Las extensiones permitidas son ' + extensionesValidas.join(', ')
            }
        });
    }
    
    let archivo =  req.files.file;
    console.log(`line 28`);
    let fragmentarNombre = archivo.name.split('.');
    let extension = fragmentarNombre[fragmentarNombre.length -1]
    // console.log(extension);
    
    
    
    //Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    
    if (extensionesValidas.indexOf( extension ) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                mensaje: 'Las extensiones permitidas son ' +extensionesValidas.join(', '),
                extensionRecibida: extension
            }
        })
    };
    
    //Cambiar nombre del archivo.
    //el nombre se genera en este formato aseicnai31n32i9-432.jpg
    
    let nombreArchivo = `${id}-${ new Date().getMilliseconds() }.${extension}`
    
    console.log(archivo.mv(`uploads/${tipo}/${ nombreArchivo }`));
    

    archivo.mv(`uploads/${tipo}/${ nombreArchivo }`, (err)=>{
        
        if(err){
            console.log(`line 64`);
            return res.status(500).json({
                ok: false,
                err,
                msj:'aca esta lo malo'
                
            });
        };

        if (tipo === 'usuarios') {
            guardarImgUsuario(id, res, nombreArchivo);
        }
        if (tipo === 'clients') {
            guardarImgClient(id, res, nombreArchivo);
        }
        if (tipo === 'maps') {
            guardarImgMap(id, res, nombreArchivo);
        }
        

    });

};

function guardarImgUsuario( id, res, nombreArchivo ){

    User.findById(id, (err, usuarioDB) =>{

        if (err) {
        borrarArchivo(nombreArchivo, 'usuarios');
            console.log('line94');
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!usuarioDB) {
            console.log(usuarioDB);
        borrarArchivo(nombreArchivo, 'usuarios');

            return res.status(400).json({
                ok: true,
                err: {
                    mensaje: 'no existe un usuario con ese id'
                }
            });
        };

        borrarArchivo(usuarioDB.img, 'usuarios');

        usuarioDB.img = nombreArchivo;

        // console.log(nombreArchivo);


        usuarioDB.save( (err, usuarioActualizado)=> {

            res.json({
                ok: true,
                usuario: usuarioActualizado,
                img: nombreArchivo
            });

        });

    })

};

function guardarImgClient(id, res, nombreArchivo) {

    Client.findById(id, (err, clientDB) => {
        if (err) {
            borrarArchivo(nombreArchivo, 'clients');
console.log(`line 138`);
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!clientDB) {
            borrarArchivo(nombreArchivo, 'clients');

            return res.status(400).json({
                ok: true,
                err: {
                    mensaje: 'no existe un client con ese id'
                }
            });
        };

        borrarArchivo(clientDB.img, 'clients');
        console.log(clientDB.img);

        clientDB.img = nombreArchivo;

        clientDB.save( (err, clienteActualizado) =>{
            
            res.json({
                ok: true,
                client: clienteActualizado,
                img: nombreArchivo
            });
        });

    });

}
function guardarImgMap(id, res, nombreArchivo) {

    Zona.findById(id, (err, zonaDB) => {
        console.log(err);
        if (err) {
            borrarArchivo(nombreArchivo, 'maps');
console.log(`178`);
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!zonaDB) {
            borrarArchivo(nombreArchivo, 'maps');

            return res.status(400).json({
                ok: true,
                err: {
                    mensaje: 'no existe un zona con ese id'
                }
            });
        };

        console.log(zonaDB.plano);

        zonaDB.plano = nombreArchivo;

        zonaDB.save( (err, zonaActualizada) =>{
            
            res.json({
                ok: true,
                zona: zonaActualizada,
                maps: nombreArchivo
            });
        });

    });

}

let borrarArchivo = (nombreImagen, tipo) =>{
    
    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    };

}

module.exports = {app, uploadFile};