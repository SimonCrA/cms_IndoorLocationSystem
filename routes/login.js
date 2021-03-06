const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usuario');
const app = express();


app.post('/', (req, res) => {


    let body = req.body;
    // console.log(body)

    if(body.email == undefined || body.password == undefined){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'usuario o contraseña incorrectos'
            }
        });
    }

    User.findOne({
        email: body.email
    }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario o contraseña incorrectos'
                }
            });
        }


        
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario o contraseña incorrectos'
                }
            });
        }





        let token = jwt.sign({
            usuario: usuarioDB,
        }, process.env.SEED_AUTH, {
            expiresIn: process.env.CADUCIDAD_TOKEN
        });
        // console.log(token);
        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    });

});

module.exports = app;