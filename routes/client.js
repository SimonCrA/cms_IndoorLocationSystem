const express = require('express');
var router = express.Router();
var r = require('../middlewares/autenticacion');
const apiclient =  require('../controladores/database/client')


//================================
//Consultar los usuarios
//================================
router.get('/', r.validarSalesUser, apiclient.getAllClients );



//================================
//Consultar un usuario
//================================

router.get('/:id', r.validarSalesUser, apiclient.getAClient);


//================================
//Crear client
//================================
router.post('/', r.Super_Role, apiclient.postClient);

router.put('/:id', r.validarUpUser, apiclient.putClient);

router.delete('/:id', r.Super_Role, apiclient.deleteClient);






module.exports = router;