const bcrypt = require('bcrypt');
const _ = require('underscore');
const Client = require('../../models/client');


//================================
//Consultar los usuarios
//================================
let getClient =  (req, res) => {

    Client.find({})
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


//================================
//Consultar un usuario
//================================
let getOneClient = (req, res) => {

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
                        mensaje: 'No existe un Cliente con ese id'
                    }
                });
            };

            res.json({
                ok: true,
                ClientDB
            })


        });

}



//================================
//Crear client
//================================
let postClient = (req, res) => {

    let body = req.body;
    console.log(body);

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





module.exports = {getClient,  getOneClient, postClient}
