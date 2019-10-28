
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../../models/usuario');

let getAllUsuario = (req, res) =>{

    User.find({state: true})
            .populate('client')
            .exec((err, usuariosDB) =>{

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                };

                User.countDocuments({state: true}, (err, conteo) =>{

                    res.json({
                        ok:true,
                        usuarios: usuariosDB,
                        cantidad: conteo
                    });

                });

            });

}



let getOneUser = (req, res) =>{

    let id = req.params.id;

    User.findById(id)
            .exec( (err, usuarioDB) =>{

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        };

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'No existe un usuario con ese id'
                }
            });
        };

        res.json({
            ok:true,
            usuarioDB
        })


    });

};



let postUser = (req, res) => {

    let body = req.body;
    console.log(body);

    let usuario =  new User ({
        name: body.name,
        surname: body.surname,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        state: body.state,
        department: body.department,
        client: body.client
    });

    usuario.save( (err, usuarioCreado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok:true,
            usuarioCreado
        });

    });
    

}

let putUser =(req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name','surname','email','role','state','department']);

    User.findByIdAndUpdate(id, body, {new: true, runValidators: true, useFindAndModify: false }, (err, usuarioModificado) =>{

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        };
        if (!usuarioModificado) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: ' El id no existe'
                }
            });
        };

        res.json({
            ok:true,
            usuarioModificado
        });

    });

}


let deleteUser = (req, res) => {

    let id = req.params.id;
    let cambiaEstado = {
        state: false
    }

    User.findByIdAndUpdate(id, cambiaEstado, { new: true, runValidators: true, useFindAndModify: false }, (err, usuarioInhabilitado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuarioBorrado: usuarioInhabilitado
        });

    });

}

module.exports = {getAllUsuario, getOneUser,postUser, putUser, deleteUser}