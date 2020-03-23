const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Client = require('../../models/client');
const app = express();



let getAllClients = (eq,res) =>{

    Client.find({state:true})
        .exec((err, clientDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            Client.countDocuments({}, (err, conteo) => {

                res.json({
                    ok: true,
                    users: clientDB,
                    quantity: conteo
                });

            });

        });
}

let getAClient = (req, res) =>{

    let id = req.params.id;

    Client.findById(id)
        .exec((err, ClientDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            if (!ClientDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        mensaje: "There isn´t a client with this id"
                    }
                });
            };

            res.json({
                ok: true,
                ClientDB
            })


        });

}

let postClient = (req, res) =>{

    let body = req.body;
    // console.log(body);

    let client = new Client({
        enterprise: body.enterprise,
        business: body.business,
        location: body.location
    });

    client.save((err, clientCreado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            clientCreado
        });

    });


}

let putClient = (req, res) =>{
    console.log(req.body);
    let id = req.params.id;
    let body = _.pick(req.body, ['enterprise', 'business', 'location', 'img']);

    Client.findByIdAndUpdate(id, body, {new: true,runValidators: true,useFindAndModify: false}, (err, clientModificado) => {

        if (err) {
            // console.log(err);
            return res.status(501).json({
                ok: false,
                err
            })
        };
        if (!clientModificado) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: ' El id del cliente no existe '
                }
            });
        };

        res.json({
            ok: true,
            clientModificado
        });


    });


}

let deleteClient = (req, res) => {
    console.log('hola estoy en delete client');
    let id = req.params.id;
    let cambiaEstado = {
        state: false
    }

    Client.findByIdAndUpdate(id, cambiaEstado, {new: true,runValidators: true,useFindAndModify: false}, (err, clienteInhabilitado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            clienteBorrado: clienteInhabilitado
        });
    // 
    });

}


module.exports = {
    getAllClients,
    getAClient,
    postClient,
    putClient,
    deleteClient
}