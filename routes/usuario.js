var express = require('express');
var router = express.Router();

const { verificartoken, verificarAdmin_Role, verificarSuper_Role } = require('../middlewares/autenticacion');
const apiUser = require ('../controladores/database/usuario')


//================================
//Consultar los usuarios
//================================
router.get('/usuario', verificartoken , apiUser.getAllUsuario)

//================================
//Consultar un usuario
//================================
router.get('/usuario/:id', verificartoken , apiUser.getOneUser)

//================================
//Crear usuarios
//================================
router.post('/usuario', [verificartoken, verificarSuper_Role], apiUser.postUser);

//================================
//Actualizar usuario
//================================
router.put('/usuario/:id', [verificartoken, verificarSuper_Role || verificarAdmin_Role], apiUser.putUser)

//================================
//Borrar usuarios
//================================

router.delete('/usuario/:id', [verificartoken, verificarSuper_Role], apiUser.deleteUser)

module.exports = router;