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
router.get('/', apiclient.getAllClients );



//================================
//Consultar un usuario
//================================
router.get('/:id', verificartoken, apiclient.getAClient);


//================================
//Crear client
//================================
router.post('/', apiclient.postClient);

router.put('/:id', apiclient.putClient);

router.delete('/:id', apiclient.deleteClient);






module.exports = router;