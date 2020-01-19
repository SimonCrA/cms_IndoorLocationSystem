
const bcrypt = require('bcrypt');
const _ = require('underscore');
const passport = require('passport')
let {Users} = require('../variables')
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

let postUser = (req, res) =>{

    let body = req.body;
    // console.log(body);

    let usuario =  new User({
        name: body.name,
        surname: body.surname,
        email: body.email,
        password: body.password,
        role: body.role,
        department: body.department
    });
    usuario.save( (err, usuarioCreado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            usuarioCreado
        });

    });


}


let postLogIn = (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', (err, usuario, info) => {

        if (err) {
            next(err);
        }
        if (!usuario) {
            return res.status(408).send('Email o Contraseña no son válidos')
        }
        req.logIn(usuario, (err) => {
            if (err) {
                next(err)
            }
            console.log(req.sessionID);
        let findIt2 = Users.findIndex(tarea =>tarea.sessionId === req.sessionID);
        // console.log(findIt2);
        // console.log(Users.length);
        // if(Users.length >0){
        //     if( Users[0].sessionId === ''){
            
        //         Users[0].sessionId = req.sessionID
        //     }
        // }
        // else
        if(findIt2>=0){

        }else{
                let use={
                    sessionId: req.sessionID,
                    constantes:{nPropagacion:1,
                                desviacionEstandar:1,
                                rssiProm:1},
                    graphRaw:[{name:'',
                                data:[{x:1,y:1}]
                            }],
                    graphValidator:[{name:'',
                                    data:[{x:1, y:1}]}],
                    region:{id:'',
                            rpi:[]},
                    
                }
                Users.push(use)
                
                
            }
            
            console.log(Users);
            // res.send('Login Exitoso')
            res.jsonp({ok:true, sessionId:req.sessionID})
        })
    })(req, res, next)
}

let logout = (req, res) => {


    console.log(req.sessionID);
    console.log(Users);
    let index = Users.findIndex(tarea =>tarea.sessionId === req.sessionID);
    if(index >=0 ){
        Users.splice(index, 1);

    }
    console.log(`SE DESCONECTO!`);
    req.logout();
    console.log(Users);

    res.send('Logout Exitoso')
}

let putUser =(req, res) => {
console.log(`Update user`);
    let id = req.params.id;

    let body = _.pick(req.body,['name','surname','role', 'department']) ;


    User.findByIdAndUpdate(id, body, {new: true, runValidators: true, useFindAndModify: false }, (err, usuarioModificado) =>{
    console.log(usuarioModificado);
        if (err) {
            console.log(err);
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
    console.log(`Delete user`);
    let id = req.params.id;
    let cambiaEstado = {
        state: false
    }
    User.findByIdAndUpdate(id, cambiaEstado, { new: true, runValidators: true, useFindAndModify: false }, (err, usuarioInhabilitado) => {
        console.log(usuarioInhabilitado);
        console.log(err);

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

module.exports = {
    getAllUsuario,
    getOneUser,
    postSignUp,
    postLogIn,
    logout,
    putUser,
    deleteUser,
    postUser
}