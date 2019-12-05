
const bcrypt = require('bcrypt');
const _ = require('underscore');
const passport = require('passport')

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



let postSignUp = (req, res, next) => {
    console.log('entre en signup');

    let body = req.body;
    console.log(body);

    let usuario =  new User({
        name: body.name,
        surname: body.surname,
        email: body.email,
        password: body.password,
        role: body.role,
        department: body.department
    });

    usuario.save( (err, usuarioCreado) => {
        console.log(err);
        console.log(usuarioCreado);

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        req.logIn(usuario, (err) => {
            if (err) {
                next(err)
            }
            res.status(200).json({
                ok: true,
                usuarioCreado
            });
        })

        

    });
    

}

let postLogIn = (req, res, next) => {
    passport.authenticate('local', (err, usuario, info) => {

        if (err) {
            next(err);
        }
        if (!usuario) {
            return res.status(400).send('Email o Contraseña no son válidos')
        }
        req.logIn(usuario, (err) => {
            if (err) {
                next(err)
            }
            res.send('Login Exitoso')
        })
    })(req, res, next)
}

let logout = (req, res) => {
    req.logout();
    res.send('Logout Exitoso')
}

let putUser =(req, res) => {

    let id = req.params.id;
    let body = req.body;

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
console.log('entre en controller');

module.exports = {
    getAllUsuario,
    getOneUser,
    postSignUp,
    postLogIn,
    logout,
    putUser,
    deleteUser
}