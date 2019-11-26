const express = require('express');
var router = express.Router();
const {
    verificartoken,
    verificarAdmin_Role,
    verificarSuper_Role,
    verificarSuperAll_Role,
    verificarUser_Role
} = require('../middlewares/autenticacion');

const apiclient =  require('../controladores/database/client')
//================================
//Consultar los usuarios
//================================
router.get('/client', verificartoken, apiclient.getAllClients );



//================================
//Consultar un usuario
//================================
router.get('/client/:id', verificartoken, apiclient.getAClient);


//================================
//Crear client
//================================
router.post('/', [verificartoken, verificarSuper_Role], apiclient.postClient);






module.exports = router;